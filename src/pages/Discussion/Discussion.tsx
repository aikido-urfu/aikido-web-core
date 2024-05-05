import { Button, Form, Input } from 'antd'
import React, { useEffect, useId } from 'react'
import { GetVoteById } from '../../types/api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEnv } from '../../App'
import { ArrowLeftOutlined } from '@ant-design/icons'

import ListComments from './ListComments'

const Discussion: React.FC = () => {
  // const [selectedUsers, setData] = useState<GetUsers>([])
  const [selectedVote, setselectedVote] = useState<GetVoteById>()
  const { id } = useParams()
  const navigate = useNavigate()
  const env = useEnv()
  const postTextAreaId = useId()

  const selfUser = env.rootStore.selfUser

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [id])

  const onFinish = (values: any) => {
    console.log(values)
    console.log(selfUser)
    addComment(selfUser.fullName, values.selfUser.fullName.comment)
  }

  const addComment = (user: string | undefined, text: string) => {
    return (
      <div style={{ display: 'flex', width: '1118px', margin: '16px 0' }}>
        <img
          src='/avatar2.jpg'
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'white',
            borderRadius: '50%',
            margin: '0 16px 0 0',
          }}
        ></img>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <h4
              style={{
                lineHeight: '18px',
                fontSize: '14px',
                fontWeight: '400',
                marginRight: 8,
              }}
            >
              {user}
            </h4>
            <span
              style={{
                lineHeight: '18px',
                fontSize: '14px',
                fontWeight: '400',
                color: '#8C8C8C',
              }}
            >
              недавно
            </span>
          </div>
          <div style={{ margin: '8px 0' }}>{text}</div>
          <div style={{ display: 'flex' }}>
            <span
              style={{
                lineHeight: '22px',
                fontSize: '14px',
                fontWeight: '400',
                marginRight: 20,
                color: '#1890FF',
              }}
            >
              Ответить
            </span>
            <div className='flex'>
              <span
                style={{
                  lineHeight: '22px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1890FF',
                }}
              >
                Скрыть ответы
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          borderBottom: '1px solid #DADADA',
        }}
        className='h-[60px] flex gap-3 items-center pl-[30px]'
      >
        <ArrowLeftOutlined
          style={{ fontSize: 24 }}
          onClick={() => {
            navigate(-1)
          }}
        />
        <h3 style={{ fontSize: 20, lineHeight: '20px' }}>Обсуждение</h3>
      </div>
      <div className='flex flex-col items min-h-[800px]'>
        <div
          className='flex flex-col items justify-center items-center'
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '1200px' }}
        >
          <main style={{ marginTop: '20px' }}>
            <ListComments
              id={selfUser.id}
              name={selfUser.fullName}
              text={'какой хороший день'}
              // date={`${new Date()}`}
            ></ListComments>
          </main>
          <Form
            layout='vertical'
            onFinish={onFinish}
            style={{ marginTop: '20px' }}
            className='flex flex-col'
          >
            <label
              htmlFor={postTextAreaId}
              style={{
                lineHeight: '28px',
                fontSize: '20px',
                marginBottom: 22,
                maxWidth: 140,
                fontWeight: 500,
              }}
            >
              Комментарий
            </label>
            <Form.Item
              name={[`${selfUser.fullName}`, 'comment']}
              rules={[
                { required: true, message: 'Поле с комментарием не заполнено' },
              ]}
            >
              <Input.TextArea
                style={{ width: 1120, height: 88 }}
                placeholder='Введите текст'
                rows={3}
                maxLength={200}
              />
            </Form.Item>
            <Button
              htmlType='submit'
              style={{ maxWidth: 200, fontWeight: 400 }}
              onClick={() => {}}
            >
              Отправить комментарий
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Discussion
