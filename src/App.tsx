import React, { useContext } from 'react';
import { Layout, message } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainContainer from './components/MainContainer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VotePage from './pages/VoteList/Vote';
import VotesPage from './pages/VotesList';
import VoteCreate from './pages/VoteCreate/VoteCreate';
import { VoteProgress } from './pages/VoteProgress/VoteProgress';
import { API } from './api/axios';
import { logger } from './api/tools';
import { Mail } from './pages/Mail/Mail';
import { CreateRootStore, StoreType } from './models/voteCreate';
import { MainPage } from './pages/Main';
import { Completed } from './pages/Completed/Completed';
import {MessageInstance} from 'antd/es/message/interface'
import './style.css';
import { Results } from './pages/Result/Results';


const { Content } = Layout;
const ENV = {
  API: API,
  logger: logger,
  rootStore: {} as StoreType,
  messageApi: {} as MessageInstance
}
ENV.rootStore = CreateRootStore(ENV)
const EnvProvider = React.createContext(ENV);

export const useEnv = () => {
  const env = useContext(EnvProvider)
  return env
}

ENV.rootStore.selfUser.getMySelf()

//@ts-ignore
window.env = ENV
const App: React.FC = () => {
  
  const [messageApi, contextHolder] = message.useMessage();
  ENV.messageApi = messageApi

  return (
    <EnvProvider.Provider value={ENV}>
      {contextHolder}
      <Router>
        <Layout>
          <Content>
            <Routes>
              <Route path="/"  element={<MainContainer ><MainPage /></MainContainer>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<MainContainer ><Profile isOwner={true} /></MainContainer>} />
              <Route path="/vote" element={<MainContainer ><VotePage /></MainContainer>} />
              <Route path="/vote-list" element={<MainContainer ><VotesPage /></MainContainer>} />
              <Route path="/mail" element={<MainContainer ><Mail /></MainContainer>} />
              <Route path="/voteCreate" element={<MainContainer ><VoteCreate /></MainContainer>} />
              <Route path="/vote-progress/:id" element={<MainContainer ><VoteProgress /></MainContainer>} />
              <Route path="/vote/:id/results" element={<MainContainer ><Results /></MainContainer>} />
              <Route path="/completed" element={<MainContainer ><Completed /></MainContainer>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </EnvProvider.Provider>
  );
};

export default App;
export type IEnv = typeof ENV