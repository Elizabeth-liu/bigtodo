import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Layout } from 'antd';
import './index.less'


const { Header, Footer, Sider, Content } = Layout;

const Index = () => {

  return (
    <Layout>
      <Layout>
        <Header>Big Todo</Header>
        <Content>
        </Content>
        <Footer>Lizzy</Footer>
      </Layout>
    </Layout>
  )
}

export default Index



