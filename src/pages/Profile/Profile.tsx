import React, { useState, useEffect } from 'react'
import { Result, Button, Avatar } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEnv } from '../../App'
import { observer } from 'mobx-react-lite'
import { getCookie, deleteCookie } from '../helpers/cookie.helper'
import { COOKIE } from '../../api/axios'

interface ProfileProps {
  isOwner: boolean
}

const Profile: React.FC<ProfileProps> = ({ isOwner }) => {
  const env = useEnv()
  const navigate = useNavigate()

  useEffect(() => {
    if (getCookie('user') !== COOKIE) {
      console.log('ok')
      navigate(0)
      console.log('done')
    }
  })

  const deleteCookieHandler = () => {
    deleteCookie('user')
  }

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
            {isOwner && (
              <Link to='/login'>
                <Button type='primary' block onClick={deleteCookieHandler}>
                  Сменить пользователя
                </Button>
              </Link>
            )}
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
