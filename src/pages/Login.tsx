import React, { useState } from 'react'
import { Form, Input, Button, message, Typography, Col, Row } from 'antd'

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)

    // Simulating an API call
    setTimeout(() => {
      setLoading(false)

      message.success('Авторизация получилась')
    }, 2000)
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
              <Input />
            </Form.Item>
            <Form.Item
              label='Пароль'
              name='password'
              rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
              <Input.Password />
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
