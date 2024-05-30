import React from 'react'
import { useEnv } from '../../App'
import './index.css'
import { DeleteOutlined } from '@ant-design/icons'

type ListUserType = {
  name: string
  mail: string
  role: string
  // data: any
  isCanBeDeleted?: boolean
  onDeleteClick?: () => void
}

const ListUser: React.FC<ListUserType> = ({
  name,
  mail,
  // data,
  role,
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
            src='/avatar2.jpg'
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'gray',
              borderRadius: '50%',
              margin: '0 10px 0 0',
            }}
          ></img>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <h4 style={{ marginBottom: '2px' }}>{name}</h4>
            <span style={{ color: 'gray' }}>{role}</span>
            {/* <span style={{ color: 'gray' }}>{mail}</span> */}
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

export default ListUser
