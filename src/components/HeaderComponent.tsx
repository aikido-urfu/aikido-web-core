import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/vote">Vote</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/vote-list">All votes</Link>
        </Menu.Item>
        <Menu.Item key="4" style={{ float: 'right' }}>
          <Link to="/profile">
            <Avatar icon={<UserOutlined />} />
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
