import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { useMetaMask } from "metamask-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space, Layout, Button, message, Input } from "antd";
import { Web3Context } from "..";
import { UploadContext } from "../App";

dayjs.extend(customParseFormat);

const { Header, Content } = Layout;
const { TextArea } = Input;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf("day");
};

let ws;

function AddNote() {
  const { database, alchemy } = useContext(Web3Context);
  const { upload, setUpload } = useContext(UploadContext);

  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [content, setContent] = useState("");

  const onChange = (date, dateString) => {
    setPickDate(dateString);
  };

  const handleUpload = async () => {
    const encrypted = await database.encryptByPrivateKey(
      content,
      JSON.parse(localStorage.getItem("mnemonicPhrase"))
    );
    console.log("encrypted:", encrypted);
    const transaction = await database.uploadOntoChain(
      encrypted,
      JSON.parse(localStorage.getItem("mnemonicPhrase"))
    );
    message.loading({
      content: "Pending...please wait for 2-5 minutes.",
      duration: 3,
    });

    console.log(transaction);

    // setUpload({
    //   id: transaction.id,
    //   status: "pending",
    //   content: content,
    //   noteDate: pickDate,
    //   uploadTime: dayjs().format("YYYY-MM-DDT HH:mm"),
    // });

    // await alchemy.uploadNote(
    //   ethereum,
    //   account,
    //   pickDate.split("-").join(""),
    //   transaction.id
    // );
  };

  useEffect(() => {
    // console.log("!", upload);
    if (upload.status === "pending") {
      clearInterval(ws);
      ws = setInterval(() => {
        database.pollStatus(upload.id).then((response) => {
          // console.log(response);
          // console.log(response.status === 200);
          if (response.status === 200) {
            setUpload({
              ...upload,
              status: "complete",
            });
          }
          // 200: ok! 202: pending
        });
      }, 10000);
    } else if (upload.status === "complete") {
      message.success({ content: "This note is on chain now!", duration: 2 });
      clearInterval(ws);
      setUpload({
        ...upload,
        status: "",
      });
    }
  }, [upload]);

  useEffect(() => {
    if (upload.status === "pending")
      message.loading({
        content: "Pending...please wait for 2-5 minutes.",
        duration: 3,
      });
  }, []);

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
          <h2 style={{ marginBottom: 0 }}>
            {pickDate === dayjs().format("YYYY-MM-DD")
              ? "Today"
              : `${pickDate}`}
          </h2>
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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          style={{
            borderRadius: "50px",
            marginTop: "5%",
            width: "100%",
          }}
          disabled={upload.status === "pending"}
          onClick={() => handleUpload()}
        >
          {upload.status === "pending" ? "Uploading..." : "Add"}
        </Button>
      </Content>
    </Layout>
  );
}
export default AddNote;
