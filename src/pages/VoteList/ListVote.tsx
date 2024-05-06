import React from 'react'
import './index.css'
import { maxString } from '../../api/tools'
type ListVoteType = {
  id: number
  name: string
  date: string
  description: string
  isSelected: boolean
}

const ListVote: React.FC<ListVoteType> = ({
  id,
  name,
  description,
  date,
  isSelected,
}) => {
  return (
    <div
      id={id + ''}
      className='vote-list-vote'
      style={{
        minHeight: '100px',
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
          margin: '0 0 15px 0',
          justifyContent: 'space-between',
        }}
      >
        <h3>{name}</h3>
        <p className='w-[155px] whitespace-nowrap	'>{date}</p>
      </div>
      <div>{maxString(description, 35)}</div>
    </div>
  )
}

export default ListVote
