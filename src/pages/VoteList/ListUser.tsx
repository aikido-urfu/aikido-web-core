import React from 'react';
import './index.css';
import { DeleteOutlined } from '@ant-design/icons';
type ListUserType = {
  name: string;
  mail: string;
  isCanBeDeleted?: boolean;
  onDeleteClick?: () => void;
};

export const ListUser: React.FC<ListUserType> = ({
  name,
  mail,
  isCanBeDeleted,
  onDeleteClick,
}) => {
  return (
    <>
      <div
        className="vote-list-vote"
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
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'black',
              borderRadius: '50%',
              margin: '0 15px 0 0',
            }}
          ></div>
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
  );
};
