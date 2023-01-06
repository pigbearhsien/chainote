import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  Calendar,
  List,
  Input,
  Space,
  Layout,
  Button,
  Tabs,
  Card,
  Divider,
  Badge,
} from "antd";
import { useApp } from "../UseApp";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

dayjs.extend(customParseFormat);

const { Header, Content } = Layout;
const { TextArea } = Input;

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          // type: "success",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "error",
        },
      ];
      break;
    case 16:
      listData = [{ type: "error" }];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return "  ";
  } else {
    return "  ";
  }
};

function CalendarView() {
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const onChange = (date, dateString) => {
    setPickDate(dateString);
    console.log(pickDate);
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    console.log("num:", num);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const num = getListData(value);
    console.log(num);
    return num.length !== 0 ? (
      <div className="notes-month">
        <div style={{ fontSize: 25 }}>・</div>
      </div>
    ) : (
      <div className="notes-month">
        <div style={{ fontSize: 25, color: "#ffffff" }}>・</div>
      </div>
    );
  };
  return (
    <Layout className="site-layout">
      <div
        className="site-calendar-demo-card"
        style={{
          padding: 24,
          marginTop: 50,
          marginRight: "10%",
        }}
      >
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          fullscreen={false}
          onChange={onChange}
          onPanelChange={onPanelChange}
        />
      </div>
      <Content
        className="site-layout-background"
        style={{
          // margin: '24px 16px',
          padding: 24,
          paddingTop: 50,
          minHeight: 280,
          borderRadius: 20,
          marginTop: 10,
          marginBottom: 50,
          marginLeft: "5%",
          marginRight: "15%",
          //   filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))",
        }}
      ></Content>
    </Layout>
  );
}
export default CalendarView;

// return (
//   <Layout className="site-layout">
//     <Content
//       className="site-layout-background"
//       style={{
//         // margin: '24px 16px',
//         padding: 24,
//         paddingTop: 50,
//         minHeight: 280,
//         borderRadius: 20,
//         marginTop: 50,
//         marginBottom: 50,
//         marginRight: "30%",
//         //   filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))",
//       }}
//     >
//       <h1>Calendar</h1>
//     </Content>
//   </Layout>
// );
