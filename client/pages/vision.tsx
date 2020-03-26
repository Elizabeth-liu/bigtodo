import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import VisionBoardItem from "../components/VisionBoardItem/VisionBoardItem";
import { Layout, Row } from "antd";
import Header from '../components/Header/Header'

const VisionBoard = (props) => {
  // our query that defines the attributes we want to get.
  const VISIONS_QUERY = gql`
    query {
      visions{
        annualVision,
        monthlyVision,
        weeklyVision
      }
    }
  `

  const queryResult = useQuery(VISIONS_QUERY)
  const visionsData = queryResult && queryResult.data && queryResult.data.visions || {}

  const [visions, setIsVisions] = useState(visionsData);
  
  const { Footer, Content } = Layout;
  
  return (
    <Layout>
    <Layout>
      <Header/>
      <Content>
      <Row justify="center">
      {
        Object.keys(visions).map(item => {
          return (
            <VisionBoardItem key={item} item={item} value={visions[item]} setIsVisions={setIsVisions}/>
          )
        }) 
      }
      </Row>
      </Content>
      <Footer>Lizzy</Footer>
    </Layout>
  </Layout>
  )
}

export default VisionBoard



