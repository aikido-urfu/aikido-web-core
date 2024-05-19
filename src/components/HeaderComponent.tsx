import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const selectedMap = {
  '/': 2,
  '/vote': 2,
  '/vote/': 2,
  '/profile': 3,
}

const CustomHeader: React.FC = () => {
  const location = useLocation()
  const { id } = useParams()
  const url_id = id || ''

  let key = 1

  if (location.pathname === `/vote/${url_id}`) {
    key = 2
  } else {
    const url = location.pathname as keyof typeof selectedMap
    key = selectedMap[url] ?? 1
  }
  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[key.toString() || '2']}
      >
        <div
          className='mr-[20px] select-none font-bold flex items-center'
          style={{ color: 'white', fontSize: '18px', lineHeight: '50px' }}
        >
          Aikido
        </div>
        <Menu.Item key='2'>
          <Link to='/vote'>Голосования</Link>
        </Menu.Item>
        <Menu.Item key='3' style={{ float: 'right' }}>
          <Link to='/profile'>
            <Avatar icon={<UserOutlined />} />
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default CustomHeader
