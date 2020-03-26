import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { SCHEDULES_QUERY,  SCHEDULES_CREATE, SCHEDULES_UPDATE, SCHEDULES_DELETE } from "../../query/schedule"
import { Card, Col, Modal, Input, InputNumber, Row } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { EditTwoTone, DeleteTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import './ScheduleCard.less'

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

  const {tasks, date, updateSchedules, weekday} =  props

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
        date,

    }}
  })

  const [updateSchedule] = useMutation(SCHEDULES_UPDATE, {
    variables: {
      args: {
        plannedTime,
        taskName,
        id
    }},
    // update apollo cache
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    // update ui
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

  const title = (
    <Row>
      <Col span={6}>{weekday}</Col>
      <Col span={18}>{date}</Col>
    </Row>
  )

  return (
    <Col xs={24} md={12} lg={8} xl={6} className="schedule-card">
      <Card title={title} extra={<a onClick={onAdd}><PlusCircleTwoTone /></a>} >
        <Droppable droppableId={date} key={date}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              { tasks && tasks.map((item, index) => {
                if (!item) return
                return <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="task-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Col span={14}>
                        {item.taskName}
                      </Col>
                      <Col span={4}>
                        {item.plannedTime} h
                      </Col>
                      <Col span={3}><a onClick={() => onEdit(item)}><EditTwoTone /></a></Col>
                      <Col span={3}><a onClick={() => onDelete(item)}><DeleteTwoTone /></a></Col>
                    </div>
                  )}
                </Draggable>
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
          <Row>
            <Col span={6}>Taskname</Col>
            <Col span={16}>
              <Input value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            </Col>
            <Col span={6}>plannedTime</Col>
            <Col span={5}> 
              <InputNumber min={0} value={plannedTime} onChange={(value) => setPlannedTime(value)}/>
            </Col>
            <Col>h</Col>
          </Row>
        </Modal>
    </Col>
  )
}

export default ScheduleCard



