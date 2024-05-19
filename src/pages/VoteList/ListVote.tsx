import React from 'react'
import './index.css'
import { maxString } from '../../api/tools'
import { CheckOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { boolean } from 'mobx-state-tree/dist/internal'

type ListVoteType = {
  id: number
  isActive: boolean
  isVoted: boolean
  name: string
  date: string
  description: string
  isSelected: boolean
}

const ListVote: React.FC<ListVoteType> = ({
  id,
  isActive,
  isVoted,
  name,
  description,
  date,
  isSelected,
}) => {
  return (
    // <Tooltip title={name}>
    <div
      id={id + ''}
      className='vote-list-vote whitespace-nowrap'
      style={{
        minHeight: '79px',
        width: '400px',
        padding: '15px',
        borderBottom: '1px solid #DADADA',
        ...(isSelected
          ? {
              backgroundColor: '#1890FF',
              color: '#FFF',
            }
          : {}),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '0 0 5px 0',
          justifyContent: 'space-between',
        }}
      >
        <h3 style={{ fontWeight: '700', fontSize: '14px', lineHeight: '22px' }}>
          {maxString(name, 23)}
        </h3>
        <div className='flex w-[178px] whitespace-nowrap justify-end items-center gap-x-[8px]'>
          {isVoted && (
            <CheckOutlined
              className='items-start'
              style={{
                color: '#52C41A',
                fontSize: '16px',
              }}
            />
          )}
          {isActive && (
            <FieldTimeOutlined
              className='items-start'
              style={{
                color: '#FF4D4F',
                fontSize: '16px',
              }}
            />
          )}
          <span
            style={{
              lineHeight: '22px',
              fontWeight: '400px',
              fontSize: '12px',
            }}
          >
            {date}
          </span>
        </div>
      </div>
      <div>{maxString(description, 41)}</div>
    </div>
    // </Tooltip>
  )
}

export default ListVote
