import React, { useEffect } from "react";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useApp } from "../UseApp";
import logo from "../img/Chainote_white.png";

import { useMetaMask } from "metamask-react";

const { Sider } = Layout;

function NavBar({ setLogin }) {
  const navigate = useNavigate();
  const { key, setKey, setSignIn, setStatus } = useApp();

  function navigatePage(key) {
    setKey(key);
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/addNote");
        break;
      case "3":
        navigate("/calendar");
        break;
      case "4":
        navigate("/profile");
        break;
      case "5":
        navigate("/settings");
        break;
      // case "4":
      //   handleLogOut();
      //   break;
      default:
        navigate("/");
    }
  }

  return (
    <>
      <Sider
        width={250}
        trigger={null}
        style={{
          overflow: "auto",
          position: "-webkit-sticky",
          position: "sticky",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          marginLeft: "15%",
          borderRadius: 20,
          backgroundColor: "black",
          marginRight: "2%",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "Center",
            height: 130,
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <img src={logo}></img>
        </div>
        <Menu
          className="tabBar"
          style={{
            background: "black",
            color: "white",
          }}
          mode="inline"
          selectedKeys={[key]}
          onClick={(e) => navigatePage(e.key)}
          items={[
            {
              key: "1",
              icon: <FileTextOutlined />,
              label: "Notes",
              style: {
                height: 50,
                fontSize: 16,
                borderRadius: 50,
              },
            },
            {
              key: "2",
              icon: <FileAddOutlined />,
              label: "Add Note",
              style: {
                height: 50,
                fontSize: 16,
                borderRadius: 50,
              },
            },
            {
              key: "3",
              icon: <CalendarOutlined />,
              label: "Calendar",
              style: {
                height: 50,
                fontSize: 16,
                borderRadius: 50,
              },
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Profile",
              style: {
                height: 50,
                fontSize: 16,
                borderRadius: 50,
              },
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: "Settings",
              style: {
                height: 50,
                fontSize: 16,
                borderRadius: 50,
              },
            },
            // {
            //   key: "4",
            //   icon: <LogoutOutlined />,
            //   label: "Disconnect",
            //   style: {
            //     height: 50,
            //     fontSize: 16,
            //     borderRadius: 50,
            //   },
            // },
          ]}
        ></Menu>
      </Sider>
    </>
  );
}

export default NavBar;
