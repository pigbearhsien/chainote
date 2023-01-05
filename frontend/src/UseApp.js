import React, { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const AppContext = createContext({
  status: {},
  me: "",
  signIn: false,
});

const AppProvider = (props) => {
  const [status, setStatus] = useState([]);
  const [signIn, setSignIn] = useState(false);
  const [id, setId] = useState("");
  const [me, setMe] = useState("");
  const [key, setKey] = useState("1");

  useEffect(() => {
    displayStatus(status);
  }, [status]);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const status = {
        content: msg,
        duration: 1,
      };
      switch (type) {
        case "success":
          message.success(status);
          break;
        case "error":
        default:
          message.error(status);
          break;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        me,
        setMe,
        id,
        setId,
        signIn,
        setSignIn,
        status,
        setStatus,
        key,
        setKey,
      }}
      {...props}
    />
  );
};

const useApp = () => useContext(AppContext);
export { AppProvider, useApp };
