import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthWithNavLogin = (initialValue: boolean) => {
  const [login, setAuth] = useState(initialValue)
  const navigate = useNavigate()

  const loggedIn = (bool: boolean) => {
    setAuth(bool)
  }

  const navLogin = (location: string) => {
    useEffect(() => {
      login ? navigate(`${location}`) : navigate('/login')
    }, [])
  }

  return { login, loggedIn, navLogin }
}
