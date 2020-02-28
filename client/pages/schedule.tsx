import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Layout, Calendar, Row } from 'antd';
import './index.less'
import ScheduleCard from "../components/ScheduleCard";
import moment from 'moment';


const { Header, Footer, Sider, Content } = Layout;

const Index = () => {

  return (
    <Layout>
      <Layout>
        <Header>Big Todo</Header>
        <Content>
          {/* <Row gutter={16}> */}
          { 
             ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday'].map((item, index) => {
              // console.log(moment().weekday(index).format('LL'))
              const title = item + '     ' + moment().weekday(index).format('LL')
              return <ScheduleCard key={item} title={title}/>
            })
          }
          {/* </Row> */}
        </Content>
        <Footer>Lizzy</Footer>
      </Layout>
    </Layout>
  )
}

export default Index



