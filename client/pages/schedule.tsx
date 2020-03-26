import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { Layout, Row } from 'antd';
import ScheduleCard from "../components/ScheduleCard/ScheduleCard";
import moment from 'moment';
import { DragDropContext } from 'react-beautiful-dnd'
import { SCHEDULES_QUERY } from "../query/schedule";
import '../styles/schedule.less'
import Header from '../components/Header/Header'


const { Footer, Content } = Layout;

const Index = () => {

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']

  const dates = weekdays.map((item, index) => {
    return moment().weekday(index).format('LL')
  })

  const queryResult = useQuery(SCHEDULES_QUERY, {
    // get the week's tasks
    variables: {date: "week"}
  })
  const schedulesResult = queryResult && queryResult.data && queryResult.data.schedules || []
  const originalSchedules = {}
  // transform array to object with 'date' as the key
  schedulesResult.map((schedule, index) => {
    // initialize the value to []
    if(!originalSchedules[schedule.date]) {
      originalSchedules[schedule.date] = []
    }
    originalSchedules[schedule.date].push(schedule)
  })
  // initialize the value of days without tasks to []
  dates.map((date) => {
    !originalSchedules[date] && (originalSchedules[date] = [])
  })
  const [schedules, setSchedules] = useState(originalSchedules)
  
  // reorder after drag and drop within a colum
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  // reorder after drag and drop between colums
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        const items = reorder(
            schedules[source.droppableId],
            source.index,
            destination.index
        );
        setSchedules({...schedules, [source.droppableId]: items})
    } else {
        const result = move(
            schedules[source.droppableId],
            schedules[destination.droppableId],
            source,
            destination
        );
        setSchedules({...schedules, ...result})
    }
    }
    
    // update schedules from the child component
    const updateSchedules = (schedule) => {
      setSchedules({...schedules, ...schedule})
    }

  return (
    <Layout className="schedule-layout">
      <Header />
      <Content className="schedule-content">
        <Row gutter={16}>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            { 
                Object.keys(schedules).map((key, index) => {
                return <ScheduleCard updateSchedules={updateSchedules}tasks={schedules[key]} key={key} id={key} weekday={weekdays[index]} date={key}/>
              })
            }
          </DragDropContext>
        </Row>
      </Content>
      <Footer>Lizzy</Footer>
    </Layout>
  )
}

export default Index



