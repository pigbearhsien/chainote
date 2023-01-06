import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Layout } from "antd";
import { useApp } from "../UseApp";

dayjs.extend(customParseFormat);

const { Header, Content } = Layout;

function Calendar() {
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
        <h1>Calendar</h1>
      </Content>
    </Layout>
  );
}
export default Calendar;
