import React, { useCallback, useState, useEffect } from 'react'
import { maxString, valueTime } from '../../api/tools'
import { GetVoteById } from '../../types/api'
import { SendOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { PostMessage } from '../../types/api'
import { GetMessages } from '../../types/api'
import './index.css'
import { useEnv } from '../../App'

type ReplyCommentsType = {
  commentId: number
  userName: string | undefined
  creationDate: string
  text: string
  userId: number
  isRef: false
  refComId?: number
  refUserId?: number
  refUserName?: string
  references: any[]
  postComment: any
  onFinish: any
}

const ReplyComments: React.FC<ReplyCommentsType> = ({
  commentId,
  userName,
  creationDate,
  text,
  userId,
  isRef,
  refComId,
  refUserId,
  refUserName,
  references,
  postComment,
  onFinish,
  // postComment,
}) => {
  const [toggleReplyValue, setToggleReply] = useState('hide')
  const [newReplyText, setNewReplyText] = useState('Ответить')
  const env = useEnv()
  const [form] = Form.useForm()
  const selfUser = env.rootStore.selfUser

  const toggleShowReply = useCallback(() => {
    if (toggleReplyValue === 'show') {
      setToggleReply('hide')
      setNewReplyText('Ответить')
    } else {
      setToggleReply('show')
      setNewReplyText('Отменить')
    }
  }, [toggleReplyValue])

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
            {userName}
          </h4>
          <span
            style={{
              lineHeight: '18px',
              fontSize: '14px',
              fontWeight: '400',
              color: '#8C8C8C',
            }}
          >
            {valueTime(creationDate)}
          </span>
        </div>
        <div style={{ margin: '8px 0' }}>{maxString(text, 1000)}</div>
        <div style={{ display: 'flex' }}>
          <a
            style={{
              lineHeight: '22px',
              fontSize: '14px',
              fontWeight: '400',
              marginRight: 20,
              color: '#1890FF',
            }}
            onClick={toggleShowReply}
          >
            {newReplyText}
          </a>
        </div>
        <Form
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              form.submit()
              toggleShowReply()
            }
          }}
          form={form}
          onFinish={onFinish}
          className={toggleReplyValue}
          style={{
            marginTop: 10,
          }}
        >
          <Form.Item
            style={{ marginBottom: '0' }}
            name={[`${selfUser.fullName}`, 'reply']}
            rules={[{ required: true, message: 'Поле с ответом не заполнено' }]}
          >
            <Input.TextArea
              placeholder='Ответить на комментарий...'
              defaultValue={`@${userName}, `}
              autoSize={{ minRows: 1, maxRows: 6 }}
              style={{
                width: '300px',
                marginRight: '20px',
              }}
            />
          </Form.Item>
          <Button
            htmlType='submit'
            type='text'
            className='flex items-center'
            onClick={toggleShowReply}
          >
            <SendOutlined
              style={{
                padding: '6px 0',
                fontSize: '20px',
                fontWeight: '400',
                color: '#1890FF',
                alignItems: 'flex-start',
              }}
            />
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ReplyComments
