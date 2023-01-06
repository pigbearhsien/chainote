import React, { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import logo from "../img/ChainNote_white.png";

const { Header, Content } = Layout;

const Login = ({ setLogin }) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  console.log(status);

  useEffect(() => {
    if (status === "connected") setLogin(true);
  }, [status]);
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 100,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <div
        className="logo"
        style={{
          display: "flex",
          justifyContent: "Center",
          height: 200,
          // marginTop: 50,
          marginBottom: 20,
        }}
      >
        <img src={logo}></img>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Button
          className="connect"
          onClick={() => connect()}
          style={{
            borderRadius: "50px",
            width: "30%",
            height: "120%",
          }}
        >
          Cononect
        </Button>
      </div>
    </Content>
  );
};

export default Login;
