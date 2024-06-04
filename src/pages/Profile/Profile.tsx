import React, { useState, useEffect } from 'react'
import { Result, Button, Avatar } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEnv } from '../../App'
import { observer } from 'mobx-react-lite'
import { getCookie, deleteCookie } from '../helpers/cookie.helper'
import { COOKIE } from '../../api/axios'
import { GetTgToken } from '../../types/api'

interface ProfileProps {
  isOwner: boolean
}

const Profile: React.FC<ProfileProps> = ({ isOwner }) => {
  const env = useEnv()
  const navigate = useNavigate()
  const [tgToken, setTgToken] = useState<GetTgToken>()

  useEffect(() => {
    if (getCookie('user') !== COOKIE) {
      navigate(0)
    }
  })

  const deleteCookieHandler = () => {
    deleteCookie('user')
  }

  useEffect(() => {
    env.API.getTgToken()
      .then((res) => {
        setTgToken(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [])

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
              <a
                href={
                  'https://t.me/aikido_notify_test_bot?start=' +
                    tgToken?.token || ''
                }
              >
                Telegram
              </a>
            </div>
          </>
        }
      />
    </div>
  )
}

export default observer(Profile)
