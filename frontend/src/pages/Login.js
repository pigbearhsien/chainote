import React, { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";

const Login = ({ setLogin }) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  console.log(status);

  useEffect(() => {
    if (status === "connected") setLogin(true);
  }, [status]);
  return (
    <div className="loginPage" style={{ background: "black", color: "white" }}>
      <button className="connect" onClick={() => connect()}>
        cononect
      </button>
    </div>
  );
};

export default Login;
