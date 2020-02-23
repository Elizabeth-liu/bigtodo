import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Card } from 'antd';
import './VisionBoardItem.css'

type Props = {
  item: string,
    value: string
}

const VisionBoardItem: React.FunctionComponent<Props> = (props) => {
  // our query that defines the attributes we want to get.
  const JOBS_QUERY = gql`
    query {
      vision
    }
  `

  console.log(props)
  return (
    <div>
      <h1>{props.item}</h1>
      <p>{props.value}</p>
    </div>
  )
}

export default VisionBoardItem



