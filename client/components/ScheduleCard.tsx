import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { SCHEDULES_QUERY,  SCHEDULES_CREATE, SCHEDULES_UPDATE, SCHEDULES_DELETE } from "../query/schedule"
import { Card, Col, Modal, Input, Form, InputNumber } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

type Props = {
  weekday: string
  date: string
  id: string,
  updateSchedules: Function,
  tasks: [{
    id,
    taskName,
    date,
    plannedTime,
    actualtime
  }]
}


const ScheduleCard: React.FunctionComponent<Props> = (props) => {
  const [visible, setVisible] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [plannedTime, setPlannedTime] = useState(0)
  const [id, setId] = useState(null)

  const {tasks, date, updateSchedules} =  props

  const [createSchedule] = useMutation(SCHEDULES_CREATE, {
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const newTask = data.createSchedule || {}
      tasks.push(newTask)
      updateSchedules({[date]: tasks})
    },
    variables: {
      args: {
        plannedTime,
        taskName,
        date
    }}
  })

  const [updateSchedule] = useMutation(SCHEDULES_UPDATE, {
    variables: {
      args: {
        plannedTime,
        taskName,
        id
    }},
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const currentTask = data.updateSchedule || {}
      const newTasks = tasks.map((item) => {
        (item.id === currentTask.id) && (item = currentTask) 
        return item
      })
      updateSchedules({[date]: newTasks})
    }
  })

  const [deleteSchedule] = useMutation(SCHEDULES_DELETE, {
    variables: { id },
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const newTasks = tasks.map((item) => {
        if (item.id !== data.deleteSchedule.id) {
          return item
        }
      })
      updateSchedules({[date]: newTasks})
    }
  })

  const onClick = () => {

  }

  const handleOk = () => {
    if (id) {
      updateSchedule().then(() => {
        setVisible(false)
      }).catch(error => {
        console.log(error)
      })
    } else {
      createSchedule().then(() => {
        setVisible(false)
      }).catch(error => {
        console.log(error)
      })
    }
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const onAdd = () => {
    setId(null)
    setTaskName("")
    setPlannedTime(0)
    setVisible(true)
  }

  const onEdit = (item) => {
    setTaskName(item.taskName)
    setPlannedTime(item.plannedTime)
    setId(item.id)
    setVisible(true)
  }

  const { confirm } = Modal

  const onDelete = (item) => {
    setId(item.id)
    confirm({
      title: 'Do you want to delete the task?',
      content: 'When clicked the OK button, this task will be deleted',
      onOk() {
        deleteSchedule()
      },
      onCancel() {},
    });
  }


  return (
    <Col span={6}>
      <Card title={props.weekday + props.date} extra={<a onClick={onAdd}>{'add'}</a>} >
        {// schedules无数据时返回空数组，但依然报错map of undefined。。。费解。。。

        }
                <Droppable droppableId={date} key={date}>
          {(provided, snapshot) => (
            <div
              // isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {          tasks && tasks.map((item, index) => {
            if (!item) return
            return <Draggable draggableId={item.id} key={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
              <span>
                {item.taskName}{item.plannedTime}
              </span>
              <span><a onClick={() => onEdit(item)}>edit</a></span>
              <span><a onClick={() => onDelete(item)}>delete</a></span>
      
          </div>
        )}
      </Draggable>
            return 
          })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
      <Modal
          forceRender
          title={id ? "Edit Task" : "Add Task"}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <span>Taskname</span><Input value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            <span>plannedTime</span><InputNumber min={0} value={plannedTime} onChange={(value) => setPlannedTime(value)}/>
            <span>h</span>
          </div>
        </Modal>
    </Col>
  )
}

export default ScheduleCard



