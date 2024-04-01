import React, { ReactNode } from 'react'
import { Layout } from 'antd'
import { Navigate, useLocation } from 'react-router-dom'

import HeaderComponent from './HeaderComponent'

const { Content } = Layout

interface MainContainerProps {
  children: React.ReactNode
}

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  if (!document.cookie) {
    // Redirect to the /login page
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <RequireAuth>
      <Layout>
        <HeaderComponent />
        <Content
          style={{
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#f5f5f5',
          }}
        >
          {children}
        </Content>
      </Layout>
    </RequireAuth>
  )
}

export default MainContainer
