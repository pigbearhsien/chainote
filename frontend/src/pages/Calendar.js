import React from "react";
import { useState, useEffect } from "react";
import { Input } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RiDeleteBin5Fill } from "react-icons/ri";

import {
  DatePicker,
  List,
  Space,
  Layout,
  Button,
  Tabs,
  Card,
  Divider,
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
const { RangePicker } = DatePicker;
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf("day");
};

function Calendar() {
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const onChange = (date, dateString) => {
    setPickDate(dateString);
  };
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
        <h1>{pickDate}</h1>
        <div className="pickDate">
          <Space direction="vertical">
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
              allowClear={false}
              showToday={true}
              onChange={onChange}
            />
          </Space>
        </div>
        <br></br>

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
export default Calendar;

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
