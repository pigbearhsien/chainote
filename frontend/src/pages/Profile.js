import React, { useState, useContext, useEffect } from "react";
import { Layout, Input, Button } from "antd";
import usericon from "../img/usericon.png";
import { EditOutlined } from "@ant-design/icons";
import { Web3Context } from "..";
import { useMetaMask } from "metamask-react";

const { Header, Content } = Layout;

function Profile() {

  const { alchemy } = useContext(Web3Context);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const { account, ethereum } = useMetaMask();

  const editState = async (state) => {
    if (state === "edit") {
      setEditMode(true);
    } else if (state === "done") {
      await alchemy.setName(ethereum, account, value);
      setName(value);
      setEditMode(false);
    } else if (state === "cancel") {
      setValue("");
      setEditMode(false);
    }
  };

  useEffect(() => {
    alchemy.getName(ethereum, account).then((result) => setName(result[0]));
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
        <h1>Profile</h1>
        <div className="Info">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>
              <img
                src={usericon}
                style={{ height: 100, marginLeft: 20, borderRadius: 50 }}
                alt=""
              />
            </span>
            {editMode ? (
              <>
                <Input
                  placeholder={name}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{ width: 100, marginLeft: 20 }}
                />
                <Button
                  disabled={value === name}
                  onClick={() => editState("done")}
                  style={{ marginLeft: 10 }}
                >
                  Ok
                </Button>
                <Button
                  onClick={() => editState("cancel")}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 30,
                    marginLeft: 20,
                  }}
                >
                  {name}
                </span>
                <EditOutlined
                  style={{ color: "white", marginLeft: 10 }}
                  onClick={() => editState("edit")}
                />
              </>
            )}
          </div>
          <div></div>
        </div>
      </Content>
    </Layout>
  );
}
export default Profile;
