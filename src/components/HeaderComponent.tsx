import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const selectedMap = {
  "/": 2,
  "/vote": 2,
  "/mail": 3,
  "/profile": 4,
};

const CustomHeader: React.FC = () => {
  const location = useLocation();

  const url = location.pathname as keyof typeof selectedMap;
  const key = selectedMap[url] ?? 1;
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[key.toString() || "2"]}
      >
        <Menu.Item key="">
          <Link to="/">Aikido</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/vote">Страница голосования</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/mail">Почта</Link>
        </Menu.Item>
        <Menu.Item key="4" style={{ float: "right" }}>
          <Link to="/profile">
            <Avatar icon={<UserOutlined />} />
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
