import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { SCHEDULES_QUERY } from "../query/schedule"
import VisionBoardItem from "../components/VisionBoardItem";
import { Layout, Row } from "antd";
import moment from 'moment';

const Todo = (props) => {
  const queryResult = useQuery(SCHEDULES_QUERY, {
    variables: {date: moment().format('LL')}
  })
  const tasksData = queryResult && queryResult.data && queryResult.data.schedules

  const [tasks, setTasks] = useState(tasksData);

  const { Header, Footer, Sider, Content } = Layout;
  
  return (
    <Layout>
    <Layout>
      <Header>Big Todo</Header>
      <Content>
      <Row justify="center">
        {// schedules无数据时返回空数组，但依然报错map of undefined。。。费解。。。
          tasks && tasks.map(item => {
            if (!item) return
            return <div key={item.id}>
              <span>
                {item.taskName}{item.plannedTime}
              </span>
              {/* <span><a onClick={() => onEdit(item)}>edit</a></span>
              <span><a onClick={() => onDelete(item)}>delete</a></span> */}
            </div>
          })
        }
      </Row>
      </Content>
      <Footer>Lizzy</Footer>
    </Layout>
  </Layout>
  )
}

export default Todo



