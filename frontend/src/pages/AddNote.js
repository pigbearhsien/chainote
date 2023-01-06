import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, List, Space, Layout, Button, message, Input } from "antd";
import { useApp } from "../UseApp";

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

function AddNote() {
  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [upload, setUpload] = useState("open");
  const [uploadStatus, setUploadStatus] = useState(false);

  const onChange = (date, dateString) => {
    setPickDate(dateString);
  };

  const handleUploadStauts = () => {
    if (upload === "uploading" && uploadStatus === true) {
      message.success({ content: "Upload successfully!", duration: 2 });
    }
  };

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
        <h1>Add Note</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <h2 style={{ marginBottom: 0 }}>The date you pick is: {pickDate}</h2>
          <div className="pickDate" style={{}}>
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
        </div>

        <TextArea
          style={{
            backgroundColor: "black",
            color: "white",
            borderColor: "white",
            fontSize: "18px",
            fontFamily: "Iceberg",
            height: "70%",
            // boxShadow: "0 0 0 2px #828384",
          }}
        />
        <Button
          style={{
            borderRadius: "50px",
            marginTop: "5%",
            width: "100%",
          }}
          onClick={() => setUpload("uploading")}
        >
          Add
        </Button>
      </Content>
    </Layout>
  );
}
export default AddNote;
