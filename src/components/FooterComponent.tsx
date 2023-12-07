import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', width: '100vw' }}>
      Ant Design ©{new Date().getFullYear()} Created by Your Name
    </Footer>
  );
};

export default FooterComponent;
