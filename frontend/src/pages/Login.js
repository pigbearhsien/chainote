import React, { useEffect, useState, useContext } from "react";
import { useMetaMask } from "metamask-react";

import { Button, Layout, Upload } from "antd";
import logo from "../img/Chainote_white.png";
import invalid_lg from "../img/Login-invalid.png";
import valid_lg from "../img/Login-valid.png";

import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const Login = ({ setLogin, signed }) => {
  const { status, connect } = useMetaMask();
  const [recoveryPhrase, setRecoveryPhrase] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof recoveryPhrase === "object")
      localStorage.setItem("mnemonicPhrase", JSON.stringify(recoveryPhrase));
  }, [recoveryPhrase]);

  useEffect(() => {
    setRecoveryPhrase(JSON.parse(localStorage.getItem("mnemonicPhrase")));
  }, []);

  console.log(signed);

  useEffect(() => {
    if (status === "connected") {
      if (typeof recoveryPhrase === "object" && "n" in recoveryPhrase) {
        if (signed === true) {
          setLogin(true);
          navigate("/");
        }
      }
    }
  }, [status, recoveryPhrase, signed]);

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
          alt=""
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
            marginBottom: "10px",
          }}
        >
          Connect
        </Button>
        <div>
          {status !== "connected" ? (
            <div style={{ color: "#ffffff" }}>
              <img src={invalid_lg} style={{ height: 20 }} alt="" />
              Please connect metamask!
            </div>
          ) : (
            <div style={{ color: "#ffffff" }}>
              <img src={valid_lg} style={{ height: 20 }} alt="" />
              Metamask connected!
            </div>
          )}
        </div>
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
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Arweave Recovery Phrase Upload
          </Button>
        </Upload>
        <div>
          {recoveryPhrase === "" ? (
            <div style={{ color: "#ffffff" }}>
              <img src={invalid_lg} style={{ height: 20 }} alt="" />
              Please upload your recovery phrase!
            </div>
          ) : (
            <div style={{ color: "#ffffff" }}>
              <img src={valid_lg} style={{ height: 20 }} alt="" />
              Recovery phrase detected!
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

export default Login;
