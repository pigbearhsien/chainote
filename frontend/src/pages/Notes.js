import React, { useContext } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import { List, Space, Layout, Button, Tabs, Card, Divider } from "antd";
import { useState, useEffect } from "react";
import { useApp } from "../UseApp";

import { WalletContext } from "..";

const { Header, Content } = Layout;

function Notes() {
  const context = useContext(WalletContext);
  console.log(context.mnemonicPhrase);

  return (
    <Layout className="site-layout">
      <Content
        className="site-layout-background"
        style={{
          // margin: '24px 16px',
          padding: 24,
          paddingTop: 40,
          minHeight: 280,
          borderRadius: 20,
          marginTop: 50,
          marginBottom: 50,
          marginRight: "30%",
          //   filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))",
        }}
      >
        <h1>Notes</h1>
      </Content>
    </Layout>
  );
}
export default Notes;
