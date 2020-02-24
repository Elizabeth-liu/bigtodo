import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import VisionBoardItem from "./VisionBoardItem";

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
  // the hook that calls the query.
  const queryResult = useQuery(VISIONS_QUERY)
  const visions = queryResult && queryResult.data && queryResult.data.visions || {}
  // console.log(queryResult)
  
  return (
    <div>
      {
        Object.keys(visions).map(item => {
          // 无法写成visionItem={key, value:visions[key]}形式。。
          console.log(item, visions[item])
          return <VisionBoardItem item={item} value={visions[item]} />
        }) 
      }
      
    </div>
  )
}

export default VisionBoard



