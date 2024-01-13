import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const selectedMap = {
  '/': 2,
  '/vote': 2,
  '/mail': 3,
  '/profile': 4,
}

const CustomHeader: React.FC = () => {
  const location = useLocation()

  const url = location.pathname as keyof typeof selectedMap
  const key = selectedMap[url] ?? 1
  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[key.toString() || '2']}
      >
        <div className='mr-[20px] select-none text-base font-bold flex items-center'>
          Aikido
        </div>
        <Menu.Item key='2'>
          <Link to='/vote'>Голосования</Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link to='/mail'>Почта</Link>
        </Menu.Item>
        <Menu.Item key='4' style={{ float: 'right' }}>
          <Link to='/profile'>
            <Avatar icon={<UserOutlined />} />
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default CustomHeader
