import React from 'react';
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

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Content>
          <Routes>
            <Route path="/" element={<MainContainer > </MainContainer>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<MainContainer ><Profile isOwner={true} /></MainContainer>} />
            <Route path="/vote" element={<MainContainer ><VotePage /></MainContainer>} />
            <Route path="/vote-list" element={<MainContainer ><VotesPage /></MainContainer>} />
            <Route path="/voteCreate" element={<MainContainer ><VoteCreate /></MainContainer>} />
            <Route path="/vote-progress" element={<MainContainer ><VoteProgress /></MainContainer>} />
            {/* Add more routes for your other components */}
            {/* <Route path="/about" element={<AboutComponent />} /> */}
            {/* <Route path="/contact" element={<ContactComponent />} /> */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
