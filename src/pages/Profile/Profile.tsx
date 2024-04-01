import React, { useState } from 'react'
import { Result, Button, Avatar } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useEnv } from '../../App'
import { observer } from 'mobx-react-lite'
import { CookiesProvider } from 'react-cookie'
// import { getCookie } from '../../api/axios'

interface ProfileProps {
  isOwner: boolean
}

const Profile: React.FC<ProfileProps> = ({ isOwner }) => {
  const env = useEnv()
  // env.API.getUserByToken().then((data) => console.log(data))
  // console.log(env.API.getUserByToken())

  env.rootStore.selfUser.getMySelf().then((data) => console.log(data))
  const user = env.rootStore.selfUser

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Result
        icon={<Avatar size={64} icon={<UserOutlined />} />}
        title={user.fullName}
        subTitle={user.email}
        extra={
          <>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
              {isOwner && (
                <Link to='/login'>
                  <Button type='primary' block>
                    Сменить пользователя
                  </Button>
                </Link>
              )}
            </CookiesProvider>
            <div style={{ marginTop: 16 }}>
              <TeamOutlined style={{ marginRight: 8 }} />
              <a href={user.telegram || ''}>Telegram</a>
            </div>
          </>
        }
      />
    </div>
  )
}

export default observer(Profile)
