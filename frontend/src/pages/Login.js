import React, { useContext, useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { Button, Checkbox, Form, Input, Layout, Upload, message } from "antd";
import logo from "../img/ChainNote_white.png";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { WalletContext } from "..";
import { mnemonicPhrase } from "../wallet/utils";

const { Header, Content } = Layout;

const Login = ({ setLogin }) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [recoveryPhrase, setRecoveryPhrase] = useState("");

  // const context = useContext(WalletContext);

  useEffect(() => {
    if (typeof recoveryPhrase === "object")
      localStorage.setItem("mnemonicPhrase", JSON.stringify(recoveryPhrase));
  }, [recoveryPhrase]);

  // console.log(status);

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
        <Upload
          style={{
            border: "none",
          }}
          accept=".json"
          showUploadList={false}
          beforeUpload={(file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
              // console.log(e.target.result);
              setRecoveryPhrase(e.target.result);
            };
            reader.readAsText(file);

            // Prevent upload
            return false;
          }}
        >
          <Button
            icon={<UploadOutlined />}
            style={{
              borderRadius: "50px",
              width: "330px",
              height: "50px",
              marginBottom: "10px",
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
