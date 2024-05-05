import React from 'react'
import { maxString } from '../../api/tools'
type ListVoteType = {
  id: number
  name: string | undefined
  // date: string
  text: string
  // isSelected: boolean
}

const ListComments: React.FC<ListVoteType> = ({
  name,
  // date,
  text,
  // isSelected,
}) => {
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
            недавно
          </span>
        </div>
        <div style={{ margin: '8px 0' }}>{text}</div>
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
