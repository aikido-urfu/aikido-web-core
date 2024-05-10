import React, { useEffect, useId } from 'react'
import { maxString, valueTime } from '../../api/tools'
// import { PostMessage } from '../../types/api'
import { useEnv } from '../../App'

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
  const { rootStore } = useEnv()
  const sendCommentModel = rootStore.SendComment
  const env = useEnv()
  const selfUser = env.rootStore.selfUser

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
          >
            Скрыть ответы ▲
          </a>
        </div>
      </div>
    </div>
  )
}

export default ListComments
