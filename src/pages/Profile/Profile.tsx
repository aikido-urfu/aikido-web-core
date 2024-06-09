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
      console.log('ok')
      navigate(0)
      console.log('done')
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
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '28vh',
          width: '20vw',
          marginLeft: '30px',
          marginTop: '40px',
          borderRadius: '15px',
          alignItems: 'center',
          boxShadow: '0px 1px 5px 2px rgba(186,186,186,0.76)',
          WebkitBoxShadow: '0px 1px 5px 2px rgba(186,186,186,0.76)',
          MozBoxShadow: '0px 1px 5px 2px rgba(186,186,186,0.76)',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <Avatar size={172} icon={<UserOutlined />} />
        </div>
      </div>
      <div
        style={{
          height: '50vh',
          position: 'relative',
          width: '45vw',
          marginLeft: '40px',
          marginTop: '40px',
          borderRadius: '15px',
          boxShadow: '0px 1px 5px 2px rgba(186,186,186,0.76)',
          WebkitBoxShadow: '0px 1px 5px 2px rgba(186,186,186,0.76)',
          MozBoxShadow: '0px 1px 5px 2px rgba(186,186,186,0.76)',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: '30px', marginTop: '10px' }}>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>
              Основная Информация
            </p>
            <p style={{ fontSize: '16px', fontWeight: '500', color: 'gray' }}>
              Общая информация о пользователе
            </p>
          </div>
          <div style={{ position: 'absolute', right: '30px', top: '40px' }}>
            {isOwner && (
              <Link to='/login'>
                <Button type='primary' block onClick={deleteCookieHandler}>
                  Сменить пользователя
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div
          style={{
            width: 'auto',
            color: 'darkgrey',
            display: 'flex',
            fontSize: '12px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'lightgrey',
              marginTop: '7px',
            }}
          ></div>
          <div
            style={{ width: 'auto', marginLeft: '15px', marginRight: '15px' }}
          >
            Контактная&nbsp;информация
          </div>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'lightgrey',
              marginTop: '7px',
            }}
          >
            {' '}
          </div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', marginLeft: '40px' }}
        >
          <ul style={{ marginTop: '20px', listStyleType: 'none' }}>
            <li style={{ lineHeight: '4' }}>Имя пользователя:</li>
            <li style={{ lineHeight: '4' }}>Группа:</li>
            <li style={{ lineHeight: '4' }}>Роль:</li>
            <li style={{ lineHeight: '3' }}>Привязка к телеграмму:</li>
          </ul>
          <ul
            style={{
              marginTop: '20px',
              marginLeft: '20px',
              listStyleType: 'none',
            }}
          >
            <li style={{ lineHeight: '4' }}>{user.fullName}</li>
            <li style={{ lineHeight: '4' }}>{user.group?.name || ''}</li>
            <li style={{ lineHeight: '4' }}>{user.role}</li>
            <li style={{ lineHeight: '3' }}>
              Аккаунт успешно привязан<br></br>
              <a
                href={
                  'https://t.me/aikido_notify_test_bot?start=' +
                    tgToken?.token || ''
                }
              >
                Привязать к другому аккаунту
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* title={user.fullName}
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
        } */}
    </div>
  )
}

export default observer(Profile)
