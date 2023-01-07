import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import {
  List,
  Space,
  Layout,
  Button,
  Tabs,
  Card,
  Divider,
  message,
} from "antd";
import { useState, useEffect, useContext } from "react";
import { WalletContext } from "..";
import { UploadContext } from "../App";

const { Header, Content } = Layout;

function Notes() {
  const test = "XNqurUPOUgdBU2wnTvQgvWhkeO3icONiamWoqDiWGS0";
  const walletContext = useContext(WalletContext);

  const { upload } = useContext(UploadContext);
  const [showNote, setShowNote] = useState([]);

  const getNote = async (txId) => {
    const transaction = await walletContext.arweave.transactions.getData(txId);
    const decrypted = await walletContext.decryptByPrivateKey(transaction);
    setShowNote([...showNote, decrypted]);
  };

  useEffect(() => {
    getNote(test);
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
        <h1>Notes</h1>
        {upload.status === "pending" ? (
          <>
            <Divider
              orientation="left"
              style={{ color: "white", borderTop: "3px white" }}
              plain
            >
              Pending
            </Divider>
            <div className="site-card-border-less-wrapper">
              <Card title={upload.noteDate} bordered={false} style={{}}>
                <p>{upload.content}</p>
              </Card>
            </div>
          </>
        ) : (
          <></>
        )}

        <Divider
          orientation="left"
          style={{ color: "white", borderTop: "3px white" }}
          plain
        >
          Latest 20 notes
        </Divider>
        <div className="site-card-border-less-wrapper">
          {showNote.map((note) => {
            return (
              <Card title={0} bordered={false} style={{ marginBottom: "5%" }}>
                <p>{note}</p>
              </Card>
            );
          })}
        </div>
      </Content>
    </Layout>
  );
}
export default Notes;
