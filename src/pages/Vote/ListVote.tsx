import React from "react"
import './index.css'
type ListVoteType = {
    id: number,
    name: string,
    date: string,
    description: string
    isSelected: boolean
}

export const ListVote: React.FC<ListVoteType> = ({id, name, date, description, isSelected}) => {
    return (
        <div
          className="vote-list-vote"
          style={{
            height: '100px',
            width: '400px',
            padding: '15px',
            borderBottom: '1px solid #DADADA',
            ...(isSelected ? {
              backgroundColor: '#1890FF',
              color: '#FFF'
            } : {}),
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
            <h3>Голосование № {id}</h3>
            <p>{date}</p>
          </div>
          <div>{description}</div>
        </div>
      );
}