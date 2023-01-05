import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import { List, Space, Layout, Button, Tabs, Card, Divider } from "antd";
import { useState, useEffect } from "react";
import { useApp } from "../UseApp";
import { Input } from "antd";
const { TextArea } = Input;

const { Header, Content } = Layout;

function AddNote() {
  return (
    <Layout className="site-layout">
      <Content
        className="site-layout-background"
        style={{
          // margin: '24px 16px',
          padding: 24,
          paddingTop: 50,
          minHeight: 280,
          borderRadius: 20,
          marginTop: 50,
          marginBottom: 50,
          marginRight: "30%",
          //   filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))",
        }}
      >
        <h1>Add Note</h1>
        <TextArea
          rows={15}
          style={{
            backgroundColor: "black",
            color: "white",
            borderColor: "white",
            fontSize: "18px",
            fontFamily: "Iceberg",
            // boxShadow: "0 0 0 2px #828384",
          }}
        />
        <Button
          style={{
            borderRadius: "50px",
            marginTop: "14px",
            width: "100%",
          }}
        >
          Add
        </Button>
      </Content>
    </Layout>
  );
}
export default AddNote;
