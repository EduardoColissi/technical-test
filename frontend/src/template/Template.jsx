/* eslint-disable react/prop-types */
import {
  ArrowLeftOutlined,
  HeartFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space } from "antd";
import { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const { Header, Sider, Content, Footer } = Layout;

const Template = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const backToLastPage = useNavigate(-1);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        minWidth: "100vw",
        maxWidth: "100vw",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={190}
        style={{
          backgroundColor: "#949391",
          height: "auto",
        }}
      >
        {collapsed ? (
          <Space className="trigger">
            <MenuUnfoldOutlined
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: "#fff",
                marginBottom: 0,
                padingBottom: 0,
                marginLeft: 5,
              }}
            />
          </Space>
        ) : (
          <Space className="trigger">
            <MenuFoldOutlined
              className="trigger"
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: "#fff",
                marginBottom: 0,
                padingBottom: 0,
                marginLeft: 5,
              }}
            />
          </Space>
        )}
        <Menu
          theme="dark"
          mode="inline"
          style={{
            backgroundColor: "#f5bb3d",
            color: "#fff",
            height: "auto",
          }}
        >
          <Menu.Item key="1" icon={<CiDeliveryTruck />}>
            <Link to="/">Entregas</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#a1a09f",
          }}
        >
          <Space className="trigger">
            <ArrowLeftOutlined
              className="trigger"
              style={{ color: "#fff", float: "left" }}
              onClick={() => backToLastPage(-1)}
            />
          </Space>
        </Header>
        <Content
          style={{
            margin: 10,
            padding: 15,
            minHeight: 650,
            marginBottom: 0,
            background: "#fff",
            overflowY: "auto",
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            alignSelf: "center",
            justifySelf: "center",
            maxHeight: 30,
            margin: 10,
            padding: 0,
          }}
        >
          Made with <HeartFilled /> by Eduardo Colissi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
