import React, { useCallback, useState } from 'react'
import { maxString, valueTime } from '../../api/tools'
import { SendOutlined } from '@ant-design/icons'
// import { PostMessage } from '../../types/api'
// import { useEnv } from '../../App'
import { Button, Form, Input } from 'antd'
import './index.css'

type ListVoteType = {
  id: number
  name: string | undefined
  creationDate: string
  text: string
  // postComment: (data: PostMessage) => void
}

const ListComments: React.FC<ListVoteType> = ({
  name,
  creationDate,
  text,
  // postComment,
}) => {
  // const { rootStore } = useEnv()
  // const sendCommentModel = rootStore.SendComment
  // const env = useEnv()
  // const selfUser = env.rootStore.selfUser

  const [toggleReplyValue, setToggleReply] = useState('hide')
  const [toggleAnswersValue, setToggleAnswers] = useState('show')
  const [value, setValue] = useState('Скрыть ответы ˄')

  const toggleShowReply = useCallback(() => {
    toggleReplyValue === 'show'
      ? setToggleReply('hide')
      : setToggleReply('show')
  }, [toggleReplyValue])

  const toggleShowAnswers = useCallback(() => {
    if (toggleAnswersValue === 'show') {
      setToggleAnswers('hide')
      setValue('Раскрыть ответы ˅')
    } else {
      setToggleAnswers('show')
      setValue('Скрыть ответы ˄')
    }
  }, [toggleAnswersValue])

  const startReply = '@'

  // console.log(value)

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
            {name}
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
            Ответить
          </a>
          <a
            className='flex'
            style={{
              lineHeight: '22px',
              fontSize: '14px',
              fontWeight: '400',
              color: '#1890FF',
            }}
            onClick={toggleShowAnswers}
          >
            {value}
          </a>
        </div>
        <Form
          className={toggleReplyValue}
          style={{
            padding: '20px 0px 10px 48px',
          }}
        >
          <Form.Item style={{ marginBottom: '0' }}>
            <Input.TextArea
              placeholder='Ответить на комментарий...'
              defaultValue={startReply}
              autoSize={{ minRows: 1, maxRows: 6 }}
              style={{
                width: '300px',
                marginRight: '20px',
              }}
            />
          </Form.Item>
          <SendOutlined
            style={{
              // lineHeight: '32px',
              padding: '6px 0',
              fontSize: '20px',
              fontWeight: '400',
              color: '#1890FF',
              alignItems: 'flex-start',
            }}
            onClick={() => {}}
          />
        </Form>
      </div>
    </div>
  )
}

export default ListComments
