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
      time 
    }
  }
`

const SCHEDULES_MUTATION = gql`
  mutation($args: ScheduleInput!){
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

  const [createSchedules] = useMutation(SCHEDULES_MUTATION, {
    refetchQueries: () => [{
      query: SCHEDULES_QUERY,
      variables: {date: props.date}
    }],
    awaitRefetchQueries: true,

    variables: {
      args: {
        time: time,
        name: taskName,
        date: props.date
    }}
  })

  const [updateSchedules] = useMutation(SCHEDULES_MUTATION, {
    // 可以更新cache，但ui始终不更新，感觉是react-apollo hooks跟react生命周期没有做好关联
    // refetchQueries: () => [{
    //   query: SCHEDULES_QUERY,
    //   variables: {date: props.date},
    //   fetchPolicy: "no-cache"
    // }],
    variables: {
      args: {
        time,
        name: taskName,
        id
    }},
    onCompleted: (data) => {
      const currentSchedule = data.updateSchedules || {}
      const newSchedules = schedules.map((item) => {
        (item.id === currentSchedule.id) && (item = currentSchedule) 
        return item
      })
      setSchedules(newSchedules)
    }
    // 使用update虽然可以智能更新对应id的schedule，但只更新了cache，无法跟新ui
    // update: async (cache, {data}) => {
      // console.log(schedules)
    //   const existingSchedules = await cache.readQuery({ query: SCHEDULES_QUERY, variables: {date: props.date} });
    //  此处只能使用existingSchedules['schedules'] ，不能使用existingSchedules.schedules...
    //   // console.log(existingSchedules['schedules'] )
    //   const newSchedule = [data.updateSchedules];
    //   console.log(newSchedule)
    //   const datas = {schedules: newSchedule}
    //   cache.writeQuery({query:SCHEDULES_QUERY, variables: {date: props.date}, data: {...datas}});
    // }
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
              <a>delete</a>
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



