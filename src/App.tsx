import React, { useContext } from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import MainContainer, { SecondContainer } from './components/MainContainer'
import { API } from './api/axios'
import { logger } from './api/tools'
// import { Mail } from './pages/Mail/Mail'
import { CreateRootStore, StoreType } from './models/voteCreate'

import {
  MainPage,
  Completed,
  Results,
  Login,
  Profile,
  VoteProgress,
  VotePage,
  VotesPage,
  VoteCreate,
  Page404,
  Discussion,
  // VoteEdit,
} from './pages'
import { messageApiType, useMessageApi } from './api/useMessageApi'

import './style.css'

const { Content } = Layout
const ENV = {
  API,
  logger,
  rootStore: {} as StoreType,
  messageApi: {} as messageApiType,
}
ENV.rootStore = CreateRootStore(ENV)
const EnvProvider = React.createContext(ENV)

export const useEnv = () => {
  const env = useContext(EnvProvider)
  return env
}

ENV.rootStore.selfUser.getMySelf()

//@ts-expect-error no window
window.env = ENV
const App: React.FC = () => {
  const o = useMessageApi()
  ENV.messageApi = o.api

  return (
    <EnvProvider.Provider value={ENV}>
      {o.contextHolder}
      <Router>
        <Layout>
          <Content>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route
                path='/'
                element={
                  <MainContainer>
                    <MainPage />
                  </MainContainer>
                }
              />
              {/* <Route path='/register' element={<Register />} /> */}
              <Route
                path='/profile'
                element={
                  <MainContainer>
                    <Profile isOwner={true} />
                  </MainContainer>
                }
              />
              <Route
                path='/vote'
                element={
                  <MainContainer>
                    <VotePage />
                  </MainContainer>
                }
              />
              <Route
                path='/vote/:id'
                element={
                  <MainContainer>
                    <VotePage />
                  </MainContainer>
                }
              />
              <Route
                path='/vote-list'
                element={
                  <MainContainer>
                    <VotesPage />
                  </MainContainer>
                }
              />
              {/* <Route
                path='/mail'
                element={
                  <MainContainer>
                    <Mail />
                  </MainContainer>
                }
              /> */}
              <Route
                path='/voteCreate'
                element={
                  <MainContainer>
                    <VoteCreate />
                  </MainContainer>
                }
              />
              <Route
                path='/vote-progress/:id'
                element={
                  <MainContainer>
                    <VoteProgress />
                  </MainContainer>
                }
              />
              {/* <Route
                path='/vote/:id/edit'
                element={
                  <MainContainer>
                    <VoteEdit />
                  </MainContainer>
                }
              /> */}
              <Route
                path='/vote/:id/discussion'
                element={
                  <SecondContainer>
                    <Discussion />
                  </SecondContainer>
                }
              />
              <Route
                path='/vote/:id/results'
                element={
                  <MainContainer>
                    <Results />
                  </MainContainer>
                }
              />
              <Route
                path='/completed'
                element={
                  <MainContainer>
                    <Completed />
                  </MainContainer>
                }
              />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </EnvProvider.Provider>
  )
}

export default App
export type IEnv = typeof ENV
