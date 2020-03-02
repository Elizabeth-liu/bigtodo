import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Card, Col, Modal, Input, Form, InputNumber } from 'antd';

type Props = {
  weekday: string
  date: string
}

const SCHEDULES_QUERY = gql`
  query($date: String!){
    schedules(date: $date) {
      id 
      name
      time,
      date
    }
  }
`
const SCHEDULES_CREATE = gql`
  mutation($args: CreateInput!){
    updateSchedules(args: $args) {
      id,
      name, 
      date,
      time
    }
  }
  `

const SCHEDULES_UPDATE = gql`
  mutation($args: UpdateInput!){
    updateSchedules(args: $args) {
      id,
      name, 
      date,
      time
    }
  }
  `

const ScheduleCard: React.FunctionComponent<Props> = (props) => {
  // console.log(props)
  const [visible, setVisible] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [time, setTime] = useState(0)
  const [id, setId] = useState(null)

  // hooks只能写在函数最外层，不能在判断、子函数等中，只能随着生命周期自动调用
  const queryResult = useQuery(SCHEDULES_QUERY, {
    // fetchPolicy: 'network-only',
    variables: {date: props.date}
  })
  const schedulesResult = queryResult && queryResult.data && queryResult.data.schedules || []

  const [schedules, setSchedules] = useState(schedulesResult)

  const [createSchedules] = useMutation(SCHEDULES_CREATE, {
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const currentSchedule = data.updateSchedules || {}
      schedules.push(currentSchedule)
      setSchedules(schedules)
    },
    variables: {
      args: {
        time: time,
        name: taskName,
        date: props.date
    }}
  })

  const [updateSchedules] = useMutation(SCHEDULES_UPDATE, {
    variables: {
      args: {
        time,
        name: taskName,
        id
    }},
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    onCompleted: (data) => {
      const currentSchedule = data.updateSchedules || {}
      const newSchedules = schedules.map((item) => {
        (item.id === currentSchedule.id) && (item = currentSchedule) 
        return item
      })
      setSchedules(newSchedules)
    }
  })

  const onClick = () => {

  }

  const handleOk = () => {
    if (id) {
      updateSchedules().then(() => {
        setVisible(false)
      }).catch(error => {
        console.log(error)
      })
    } else {
      createSchedules().then(() => {
        setVisible(false)
      }).catch(error => {
        console.log(error)
      })
    }
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const onEdit = (item) => {
    setTaskName(item.name)
    setTime(item.time)
    setId(item.id)
    setVisible(true)
  }

  const onDelete = (item) => {
    setTaskName(item.name)
    setTime(item.time)
    setId(item.id)
    setVisible(true)
  }

  return (
    <Col span={6}>
      <Card title={props.weekday + props.date} extra={<a onClick={()=>setVisible(true)}>{'add'}</a>} >
        {
          schedules.map(item => {
            return <div key={item.id}>
              <span>
                {item.name}{item.time}
              </span>
              <a onClick={() => onEdit(item)}>edit</a>
              <a onClick={() => onDelete(item)}>delete</a>
            </div>
          })
        }
      </Card>
      <Modal
          forceRender
          title="Add Task"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <span>Taskname</span><Input value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            <span>Time</span><InputNumber min={0} value={time} onChange={(value) => setTime(value)}/>
            <span>h</span>
          </div>
        </Modal>
    </Col>
  )
}

export default ScheduleCard



