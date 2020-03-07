import React, { useEffect } from "react"
import { Layout } from 'antd';
import { useRouter } from "next/router";
import { NextPage } from 'next'
import Router from 'next/router'


const { Header, Footer, Sider, Content } = Layout;

const Index: NextPage = () => {

  useEffect(() => {
      Router.push('todo')
  })

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

// Index.getInitialProps = async ({ req }) => {
//   if (typeof window !== 'undefined') {
//     Router.push('./todo')
//   }
// }

 export default Index


