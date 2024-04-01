import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/vote')
  }, [])
  return <></>
}

export default MainPage
