import React, { useState } from 'react'
import axios from 'axios'
// import { useCookies } from 'react-cookie'
// import { Link } from 'react-router-dom'

import { Form, Input, Button, message, Typography, Col, Row } from 'antd'

import { useInput } from '../hooks/input.hook'

const Login: React.FC = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const email = useInput('')
  const password = useInput('')

  const [loading, setLoading] = useState(false)
  const [successLogin, setSuccessLogin] = useState(false)

  //30days
  // const date = new Date(Date.now() + 86400e3 * 30).toUTCString

  // const myRef = useRef(1)

  // useEffect(() => {
  //   myRef.current++
  //   console.log(myRef.current)
  // })

  const handleSubmit = () => {
    setLoading(true)

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        email: email.value,
        password: password.value,
      })
      .then((data) => {
        const token = data.data.token
        setSuccessLogin(true)
        setLoading(false)
        message.success('Авторизация получилась')
        document.cookie = `user=${token}; path=/; max-age=${3600 * 24 * 30}; secure`
        // console.log(document.cookie)
      })
      .catch(() => {
        setLoading(false)
        message.error('Некорректные данные')
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Row>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <Form
            layout='vertical'
            style={{ width: 300 }}
            onFinish={handleSubmit}
          >
            <Typography.Title
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              Авторизация
            </Typography.Title>
            <Form.Item
              label='Логин'
              name='username'
              rules={[{ required: true, message: 'Введите ваш логин' }]}
            >
              <Input onChange={email.onChange} autoFocus />
            </Form.Item>
            <Form.Item
              label='Пароль'
              name='password'
              rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
              <Input.Password onChange={password.onChange} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading} block>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
