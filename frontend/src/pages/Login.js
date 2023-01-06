import React, { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { Button, Checkbox, Form, Input, Layout, Upload, message } from "antd";
import logo from "../img/ChainNote_white.png";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const props: UploadProps = {
  // name: "file",
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  // headers: {
  //   authorization: "authorization-text",
  // },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Login = ({ setLogin }) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  console.log(status);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "connected") {
      setLogin(true);
      navigate("/");
    }
  }, [status]);

  return (
    <Content
      className="site-layout-background"
      style={{
        // padding: 100,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="logo"
        style={{
          display: "flex",
          justifyContent: "Center",
          // marginTop: 30,
          // marginBottom: 20,
          marginBottom: "-50px",
        }}
      >
        <img
          src={logo}
          style={{
            height: "70%",
          }}
        ></img>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          // marginTop: "10%",
        }}
      >
        <Button
          onClick={() => connect()}
          style={{
            borderRadius: "50px",
            width: "330px",
            height: "50px",
            marginBottom: "8%",
          }}
        >
          Connect
        </Button>
        <Upload {...props}>
          <Button
            icon={<UploadOutlined />}
            // onClick={() => connect()}
            style={{
              borderRadius: "50px",
              width: "330px",
              height: "50px",
            }}
          >
            Arweave Recovery Phrase Upload
          </Button>
        </Upload>
      </div>
    </Content>
  );
};

export default Login;
