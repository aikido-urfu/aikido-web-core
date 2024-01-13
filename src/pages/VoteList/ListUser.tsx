import React from 'react'
import './index.css'
import { DeleteOutlined } from '@ant-design/icons'

type ListUserType = {
  name: string
  mail: string
  isCanBeDeleted?: boolean
  onDeleteClick?: () => void
}

export const ListUser: React.FC<ListUserType> = ({
  name,
  mail,
  isCanBeDeleted,
  onDeleteClick,
}) => {
  return (
    <>
      <div
        className='vote-list-vote'
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          borderBottom: '1px solid #DADADA',
          width: 'auto',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <img
            src='https://ru-static.z-dn.net/files/d96/ced913ba9fe71679ae395a4be5fac683.jpg'
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'gray',
              borderRadius: '50%',
              margin: '0 15px 0 0',
            }}
          ></img>
          <div>
            <h4>{name}</h4>
            <p style={{ color: 'gray' }}>{mail}</p>
          </div>
        </div>
        {isCanBeDeleted && (
          <DeleteOutlined
            onClick={onDeleteClick}
            style={{ fontSize: '150%' }}
          />
        )}
      </div>
    </>
  )
}
