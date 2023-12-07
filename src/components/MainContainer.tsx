import React from 'react';
import { Layout } from 'antd';

import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

const { Content } = Layout;

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children}) => {
  return (
    <Layout >
      <HeaderComponent />
      <Content style={{
        minHeight: 'calc(100vh - 134px)',
        backgroundColor: '#f5f5f5'
      }}>
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default MainContainer;
