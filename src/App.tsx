import React, { useContext } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainContainer from './components/MainContainer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VotePage from './pages/Vote/Vote';
import VotesPage from './pages/VotesList';
import VoteCreate from './pages/VoteCreate/VoteCreate';
import { VoteProgress } from './pages/VoteProgress/VoteProgress';
import { API } from './api/axios';
import { logger } from './api/tools';
import { Mail } from './pages/Mail/Mail';
import { CreateRootStore, StoreType } from './models/voteCreate';
import { MainPage } from './pages/Main';


const { Content } = Layout;
const ENV = {
  API: API,
  logger: logger,
  rootStore: {} as StoreType
}
const rootStore = CreateRootStore(ENV)
ENV.rootStore = rootStore
const EnvProvider = React.createContext(ENV);

export const useEnv = () => {
  const env = useContext(EnvProvider)
  return env
}

ENV.rootStore.selfUser.getMySelf()

//@ts-ignore
window.env = ENV
const App: React.FC = () => {
  return (
    <EnvProvider.Provider value={ENV}>
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
              {/* Add more routes for your other components */}
              {/* <Route path="/about" element={<AboutComponent />} /> */}
              {/* <Route path="/contact" element={<ContactComponent />} /> */}
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