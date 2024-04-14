import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { Form, Input, Button, message, Typography, Col, Row } from 'antd'

import { useInput } from '../../hooks/input.hook'

import { setCookie } from '../helpers/cookie.helper'

const Login: React.FC = () => {
  const email = useInput('')
  const password = useInput('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        email: email.value,
        password: password.value,
      })
      .then(async (data) => {
        await message.success('Вы успешно вошли')
        const token = data.data.token
        setCookie('user', token)
        setLoading(false)
        return navigate('/')
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
              <Input type='text' onChange={email.onChange} autoFocus />
            </Form.Item>
            <Form.Item
              label='Пароль'
              name='password'
              rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
              <Input.Password type='text' onChange={password.onChange} />
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
