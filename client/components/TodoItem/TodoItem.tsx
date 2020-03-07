import React, { useState, useReducer, useEffect } from "react"
import { Row, Col } from "antd";
import moment from 'moment';
import { PlayCircleTwoTone, PauseCircleTwoTone,  } from '@ant-design/icons';
import './TodoItem.less'

const TodoItem = (props) => {

  const todo = props.todo

  const [paused, setPaused] = useState(true)
  const [actualTime, setActualTime] = useState(0)
  const [duration, setDuration] = useState('00:00:00')

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

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(() => {
        setActualTime(actualTime + 1)
        setDuration(formatTime())
      }, 1000);
      return () => {
        clearInterval(timer)
      }
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
