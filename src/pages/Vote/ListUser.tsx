import React from "react"

type ListUserType = {
    name: string
    mail: string
}

export const ListUser: React.FC<ListUserType> = ({name, mail}) => {
    return (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '20px',
              borderBottom: '1px solid #DADADA',
              width: 'auto',
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
        </>
      );
}