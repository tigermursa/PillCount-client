"use client";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link"; // Import Next.js Link component

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="h-screen">
        <div className="p-4">
          <div className="text-2xl font-bold text-white">
            <Link href="/">
              Plugin UI <ApiOutlined /> {/* Logo text with icon */}
            </Link>
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link href="/">Home</Link>, // Adding Next.js Link for Home
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link href="/login">Login</Link>, // Adding Next.js Link for Login
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link href="/register">Register</Link>, // Adding Next.js Link for Register
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Dashboard home ! feel safe haha
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
