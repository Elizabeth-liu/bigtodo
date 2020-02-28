import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Card, Col, Modal, Input, Form, InputNumber } from 'antd';

type Props = {
  title: string
}

const ScheduleCard: React.FunctionComponent<Props> = (props) => {
  // console.log(Form.useForm)
  // const [form] = Form.useForm();

  const onClick = () => {

  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };

  const [visible, setVisible] = useState(false)

  const handleOk = () => {
    // console.log(form.getFieldsValue())
  };

  const handleCancel = () => {
  };



  

  return (
    <Col span={6}>
      <Card title={props.title} extra={<a onClick={()=>setVisible(true)}>{'add'}</a>} >
        <p>dd</p>
      </Card>
      <Modal
          forceRender
          title="Add Task"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
        <Form
          {...layout}
          name="form"
          // form={form}
        >
          <Form.Item
            label="Task name"
            name="taskname"
            rules={[{ required: true, message: 'Please input your taskname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Please input your time!' }]}
          >
            <InputNumber min={1}/>
            <span>h</span>
          </Form.Item>
        </Form>
        </Modal>
    </Col>
  )
}

export default ScheduleCard



