import React, { useCallback, useState } from 'react'
import { maxString, valueTime } from '../../api/tools'
import { SendOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { PostMessage } from '../../types/api'
import './index.css'
import { useEnv } from '../../App'

import ReplyComments from './ReplyComments'
import UserDiscussionSkeleton from '../../skeletons/UserDiscussionSkeleton'

type ListVoteType = {
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
  selectedVote: any
}

const ListComments: React.FC<ListVoteType> = ({
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
  selectedVote,
}) => {
  const [toggleReplyValue, setToggleReply] = useState('hide')
  const [toggleAnswersValue, setToggleAnswers] = useState('show')
  const [value, setValue] = useState('Скрыть ответы ˄')
  const [newReplyText, setNewReplyText] = useState('Ответить')
  const [isSkeleton, setSkeletonValue] = useState<boolean>(false)
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

  const toggleShowAnswers = useCallback(() => {
    if (toggleAnswersValue === 'show') {
      setToggleAnswers('hide')
      setValue('Раскрыть ответы ˅')
    } else {
      setToggleAnswers('show')
      setValue('Скрыть ответы ˄')
    }
  }, [toggleAnswersValue])

  const onFinish = async (values: any) => {
    setSkeletonValue(true)
    const name = selfUser.fullName || ''
    const res: PostMessage = {
      userId: selfUser.id,
      voteId: selectedVote?.id || -1,
      text: values[name].reply,
      isRef: true,
      refComId: commentId,
    }
    form.resetFields()
    await postComment(res)
    toggleShowReply()
    setSkeletonValue(false)
  }

  return (
    <div style={{ display: 'flex', width: '1118px', margin: '16px 0' }}>
      <>
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
              {references.length > 0 && value}
            </a>
          </div>
          {toggleAnswersValue === 'show' &&
            references.length > 0 &&
            references.map((x: any) => {
              return (
                <ReplyComments
                  commentId={x.id}
                  text={x.text}
                  creationDate={x.creationDate}
                  userId={x.userId}
                  userName={x.userName}
                  isRef={x.isRef}
                  refComId={x.refComId}
                  refUserId={x.refUserId}
                  refUserName={x.refUserName}
                  references={x.references}
                  postComment={postComment}
                  selectedVote={selectedVote}
                  // onFinish={onFinish}
                />
              )
            })}
          <Form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                form.submit()
              }
              if (e.key === 'Escape') {
                toggleShowReply()
              }
            }}
            form={form}
            onFinish={onFinish}
            className={toggleReplyValue}
            style={{
              padding: '20px 0px 10px 48px',
            }}
          >
            <Form.Item
              style={{ marginBottom: '0' }}
              name={[`${selfUser.fullName}`, 'reply']}
              rules={[
                { required: true, message: 'Поле с ответом не заполнено' },
              ]}
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
            <Button htmlType='submit' type='text' className='flex items-center'>
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
      </>
    </div>
  )
}

export default ListComments
