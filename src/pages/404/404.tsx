import React from 'react'
import { Link } from 'react-router-dom'

const Page404: React.FC = () => {
  return (
    <div>
      <p
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        404 Not Found
      </p>
      <Link
        style={{
          display: 'block',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
        to='/'
      >
        Back to main page
      </Link>
    </div>
  )
}

export default Page404
