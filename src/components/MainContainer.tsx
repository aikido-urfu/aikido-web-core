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
      <Content>
        {children}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default MainContainer;
