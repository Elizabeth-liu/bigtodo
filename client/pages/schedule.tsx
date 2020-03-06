import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Layout, Calendar, Row } from 'antd';
import './index.less'
import ScheduleCard from "../components/ScheduleCard";
import moment from 'moment';
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { SCHEDULES_QUERY } from "../query/schedule";
import styled from 'styled-components'


const { Header, Footer, Sider, Content } = Layout;

const Container = styled.div`
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
`

const Scrolling = styled.div`
  padding: 12px;
  display: flex;
`

const Index = () => {

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']

  // const dates = weekdays.map((item, index) => {
  //   return moment().weekday(index).format('LL')
  // })
  // console.log(dates)

  const queryResult = useQuery(SCHEDULES_QUERY, {
    variables: {date: "week"}
  })
  const schedulesResult = queryResult && queryResult.data && queryResult.data.schedules || []
  const originalSchedules = {}
  schedulesResult.map((schedule, index) => {
    if(!originalSchedules[schedule.date]) {
      originalSchedules[schedule.date] = []
    } else {
      originalSchedules[schedule.date].push(schedule)
    }
  })
  // console.log(originalSchedules)
  const [schedules, setSchedules] = useState(originalSchedules)
  
  const onDragStart = () => {}

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

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

    const updateSchedules = (schedule) => {
      setSchedules({...schedules, ...schedule})
    }

  return (
    <Layout>
      <Layout>
        <Header>Big Todo</Header>
        <Content>
          <Row gutter={16}>
            <DragDropContext
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              {/* <Container>
                <Scrolling> */}
                { 
                    Object.keys(schedules).map((key, index) => {
                    return <ScheduleCard updateSchedules={updateSchedules}tasks={schedules[key]} key={key} id={key} weekday={weekdays[index]} date={key}/>
                  })
                }
                {/* </Scrolling>
              </Container> */}
            </DragDropContext>
          </Row>
        </Content>
        <Footer>Lizzy</Footer>
      </Layout>
    </Layout>
  )
}

export default Index



