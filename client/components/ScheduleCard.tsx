import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { SCHEDULES_QUERY,  SCHEDULES_CREATE, SCHEDULES_UPDATE, SCHEDULES_DELETE } from "../query/schedule"
import { Card, Col, Modal, Input, Form, InputNumber } from 'antd';

type Props = {
  weekday: string
  date: string
}



const ScheduleCard: React.FunctionComponent<Props> = (props) => {
  // console.log(props)
  const [visible, setVisible] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [plannedTime, setPlannedTime] = useState(0)
  const [id, setId] = useState(null)

  // hooks只能写在函数最外层，不能在判断、子函数等中，只能随着生命周期自动调用
  const queryResult = useQuery(SCHEDULES_QUERY, {
    // fetchPolicy: 'network-only',
    variables: {date: props.date}
  })
  const schedulesResult = queryResult && queryResult.data && queryResult.data.schedules || []
  const [schedules, setSchedules] = useState(schedulesResult)

  const [createSchedule] = useMutation(SCHEDULES_CREATE, {
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const currentSchedule = data.createSchedule || {}
      schedules.push(currentSchedule)
      setSchedules(schedules)
    },
    variables: {
      args: {
        plannedTime,
        taskName,
        date: props.date
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
      const currentSchedule = data.updateSchedule || {}
      const newSchedules = schedules.map((item) => {
        (item.id === currentSchedule.id) && (item = currentSchedule) 
        return item
      })
      setSchedules(newSchedules)
    }
  })

  const [deleteSchedule] = useMutation(SCHEDULES_DELETE, {
    variables: { id },
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const newSchedules = schedules.map((item) => {
        if (item.id !== data.deleteSchedule.id) {
          return item
        }
      })
      setSchedules(newSchedules)
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
          schedules && schedules.map(item => {
            if (!item) return
            return <div key={item.id}>
              <span>
                {item.taskName}{item.plannedTime}
              </span>
              <span><a onClick={() => onEdit(item)}>edit</a></span>
              <span><a onClick={() => onDelete(item)}>delete</a></span>
            </div>
          })
        }
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



