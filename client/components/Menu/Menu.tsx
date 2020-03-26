import React, { useState } from "react"
import { Menu } from 'antd';
import Link from 'next/link'
import './Menu.less'
import { useRouter } from 'next/router'

const Index = () => {
  
  const router = useRouter()

    return (
      <Menu className="menu" selectedKeys={[router.route]} mode="horizontal">
        <Menu.Item key="/todo">
          <a href="/todo">Todo</a>
        </Menu.Item>
        <Menu.Item key="/schedule">
          <a href="/schedule">Schedule</a>
        </Menu.Item>
        <Menu.Item key="/vision">
          <a href="/vision">Vision</a>
        </Menu.Item>
      </Menu>
    );
  }

  export default Index