import React, { useEffect, useId } from 'react'
import { GetVoteById } from '../../types/api'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEnv } from '../../App'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PostMessage } from '../../types/api'
import { Button, Form, Input } from 'antd'

import ListComments from './ListComments'
import UserDiscussionSkeleton from '../../skeletons/UserDiscussionSkeleton'

const Discussion: React.FC = () => {
  const [selectedVote, setselectedVote] = useState<GetVoteById>()
  const [messages, setmessages] = useState<any[]>([])
  const [newComment, setNewComment] = useState(false)
  const [isSkeleton, setSkeletonValue] = useState<boolean>(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const env = useEnv()
  const { API, logger } = useEnv()
  const postTextAreaId = useId()
  const [form] = Form.useForm()

  let changed = true

  const selfUser = env.rootStore.selfUser

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        console.log(res.data)
        setselectedVote(res.data)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [id])

  useEffect(() => {
    env.API.getComments(Number(id))
      .then((res) => {
        setmessages(res.data.messages)
        setNewComment(false)
      })
      .catch((err) => {
        env.logger.error(err)
      })
  }, [id, newComment])

  const postComment = async (data: PostMessage) => {
    await API.sendComment(data)
      .then((res) => {
        setNewComment(true)
        logger.info(res)
      })
      .catch((err) => {
        logger.error(err)
      })
    setSkeletonValue(false)
  }

  const onFinish = async (values: any) => {
    setSkeletonValue(true)
    const name = selfUser.fullName || ''
    const res: PostMessage = {
      userId: selfUser.id,
      voteId: selectedVote?.id || -1,
      text: values[name].comment,
      isRef: false,
      refComId: undefined,
    }
    form.resetFields()
    await postComment(res)
  }

  const sortMessagesByTime = () => {
    return messages.sort((a, b) => {
      return (
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      )
    })
  }

  return (
    <>
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
      <div className='flex flex-col items min-h-[780px]'>
        <div
          className='flex flex-col items justify-center items-center'
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '1200px' }}
        >
          <main style={{ marginTop: '20px' }}>
            {sortMessagesByTime().map((x: any, index: number) => {
              return (
                <ListComments
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
                />
              )
            })}
            {/* {isSkeleton ? <UserDiscussionSkeleton /> : null} */}
          </main>
          <Form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                form.submit()
              }
            }}
            form={form}
            onFinish={onFinish}
            layout='vertical'
            style={{ marginTop: '20px', marginBottom: '60px' }}
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
                maxLength={1000}
              />
            </Form.Item>
            <Button
              htmlType='submit'
              style={{ maxWidth: 200, fontWeight: 400 }}
            >
              Отправить комментарий
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Discussion
