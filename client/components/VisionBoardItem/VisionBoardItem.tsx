import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Card, Col, Input } from 'antd';
import './VisionBoardItem.less'
const { TextArea } = Input;

type Props = {
  item: string,
  value: string,
  setIsVisions: Function
}

const VISIONS_MUTATION = gql`
mutation($args: VisionInput!){
  updateVisions(args: $args) {
    annualVision
    monthlyVision
    weeklyVision
  }
}
`
const VisionBoardItem: React.FunctionComponent<Props> = (props) => {
  // our query that defines the attributes we want to get.

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(props.value);
  const [ updateVisions ] = useMutation(VISIONS_MUTATION, {
    variables: { args: {[props.item]: value} }
  })

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (isEdit) {
      updateVisions().then((data:any) => {
        props.setIsVisions(data.data.updateVisions)
      })
      .catch(e => {
        console.log(e)
      })
    }
    setIsEdit(!isEdit) 
  }

  // console.log(props)
  return (
    <Col span={6} className="vision-board">
      <Card title={props.item} extra={<a onClick={onClick}>{isEdit ? 'confirm' : 'edit'}</a>} style={{ width: 300 }}>
        {isEdit ? 
        <TextArea value={value} onChange={onChange}/>
          : <p>{props.value}</p>}
      </Card>
    </Col>
  )
}

export default VisionBoardItem



