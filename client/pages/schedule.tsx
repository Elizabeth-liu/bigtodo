import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Layout, Calendar, Row } from 'antd';
import './index.less'
import ScheduleCard from "../components/ScheduleCard";
import moment from 'moment';
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { SCHEDULES_QUERY } from "../query/schedule";
import './schedule.less'
import Header from '../components/Header'


const { Footer, Content } = Layout;

const Index = () => {

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']

  const dates = weekdays.map((item, index) => {
    return moment().weekday(index).format('LL')
  })
  // console.log(dates)

  const queryResult = useQuery(SCHEDULES_QUERY, {
    // 获取本周所有任务
    variables: {date: "week"}
  })
  const schedulesResult = queryResult && queryResult.data && queryResult.data.schedules || []
  const originalSchedules = {}
  // 将后端返回的数组加工成以date为key的对象
  schedulesResult.map((schedule, index) => {
    if(!originalSchedules[schedule.date]) {
      originalSchedules[schedule.date] = []
    } else {
      originalSchedules[schedule.date].push(schedule)
    }
  })
  // 有的日期没有返回任务，补为空数组
  dates.map((date) => {
    !originalSchedules[date] && (originalSchedules[date] = [])
  })
  // console.log(originalSchedules)
  const [schedules, setSchedules] = useState(originalSchedules)
  
  // 同列调动排序
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  // 跨列调动排序
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
    
    // 子组件更新本组件schedules
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



