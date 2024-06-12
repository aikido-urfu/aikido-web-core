import React from 'react'
import { useEnv } from '../../App'
import './index.css'
import { DeleteOutlined } from '@ant-design/icons'

type ListUserType = {
  name: string
  mail: string
  role: string
  isCanBeDeleted?: boolean
  onDeleteClick?: () => void
  members: any
}

const ListUser: React.FC<ListUserType> = ({
  name,
  mail,
  role,
  isCanBeDeleted,
  onDeleteClick,
  members,
}) => {
  const translateRole = (role: string) => {
    switch (role) {
      case 'athlete':
        return 'Атлет'
      case 'parent':
        return 'Родитель'
      case 'trainer':
        return 'Тренер'
      case 'club_head':
        return 'Создатель клуба'
      case 'federation_head':
        return 'Создатель федерации '
      case 'admin':
        return 'Админ'
    }
  }
  const getMembersOfGroup = () => {
    if (members.length <= 0) return null
    const listOfMembers: string[] = []
    members.forEach((x: any, index: number) => {
      if (members.length === index + 1) {
        listOfMembers.push(x.fullName)
      } else {
        listOfMembers.push(`${x.fullName}, `)
      }
    })
    return <span style={{ color: 'gray' }}>{listOfMembers}</span>
  }

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
        {/* {Проверка на группу} */}
        {role === '' ? (
          <div
            className='show-members'
            style={{
              display: 'flex',
            }}
          >
            <img
              src='/club.jpg'
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
              {getMembersOfGroup()}
              {/* <span style={{ color: 'gray' }}>{mail}</span> */}
            </div>
          </div>
        ) : (
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
              <span style={{ color: 'gray' }}>{translateRole(role)}</span>
              {/* <span style={{ color: 'gray' }}>{mail}</span> */}
            </div>
          </div>
        )}
        {/* {isCanBeDeleted && (
          <DeleteOutlined
            onClick={onDeleteClick}
            style={{ fontSize: '150%' }}
          />
        )} */}
      </div>
    </>
  )
}

export default ListUser
