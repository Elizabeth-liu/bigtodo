import React, { useState, useReducer, useEffect } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Row, Col } from "antd";
import moment from 'moment';
import { PlayCircleTwoTone, PauseCircleTwoTone,  } from '@ant-design/icons';
import './TodoItem.less'
import { SCHEDULES_UPDATE } from "../../query/schedule";

const TodoItem = (props) => {

  const todo = props.todo

  // console.log(todo)
  const formatTime = () => {
    const duration = moment.duration(actualTime, 'seconds');
    const handleTime = (time) => {
      return time > 9 ? time : '0' + time
    }
    const getTime = (duration) => {
      return handleTime(duration.hours()) + ':' + handleTime(duration.minutes()) + ':' + handleTime(duration.seconds())
    }
    return getTime(duration)
  }

  const [paused, setPaused] = useState(true)
  const [actualTime, setActualTime] = useState(todo.actualTime)
  const [duration, setDuration] = useState(formatTime())

  const [updateSchedule] = useMutation(SCHEDULES_UPDATE, {
    variables: {
      args: {
        actualTime,
        id: todo.id
    }}
  })

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        setActualTime(actualTime + 1)
        setDuration(formatTime())
      }, 1000);
      return () => {
        clearInterval(timer)
      }
    } else {
      updateSchedule()
    }
  }, [paused, actualTime])


  const toggleTodo = () => {
    setPaused(!paused)
  }
  
  return (
    <Row key={todo.id} className="todo-item">
      <Col span={12} className="todo-name">
        {todo.taskName}
      </Col>
      <Col span={6} className="planned-time">
        planned time: {todo.plannedTime}h
      </Col>
      <Col span={2} className="todo-button" onClick={toggleTodo}>
        { paused ? <PlayCircleTwoTone /> :
        <PauseCircleTwoTone />}
      </Col>
      <Col span={4}>
        {duration}
      </Col>
    </Row>
  )
}

export default TodoItem
