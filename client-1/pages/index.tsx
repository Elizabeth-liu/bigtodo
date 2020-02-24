import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import VisionBoard from "../components/VisionBoard";
import { Layout } from 'antd';
import './index.less'


const { Header, Footer, Sider, Content } = Layout;

const Index = () => {

  return (
    <div>
      <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Big Todo</Header>
        <Content>
          <VisionBoard />
        </Content>
        <Footer>Lizzy</Footer>
      </Layout>
    </Layout>
    </div>
  )
}

export default Index



