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
  const alchemy = useContext(AlchemyContext);

  // console.log(arweave.mnemonicPhrase);

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [content, setContent] = useState();
  // console.log(arweave.mnemonicPhrase);

  const [showNote, setShowNote] = useState([]);

  // useEffect(() => {
  //   console.log(upload);
  // }, [upload]);

  // useEffect(() => {
  //   console.log(showNote);
  // }, [showNote]);

  const getNote_arweave = async (date, txId) => {
    console.log(date);
    const transaction = await arweave.arweave.transactions.getData(txId);
    console.log(transaction);
    const decrypted = await arweave.decryptByPrivateKey(transaction);
    setShowNote((prev) => [...prev, [date, decrypted]]);
  };

  const getNotes = async () => {
    await alchemy.getNotes(ethereum, account, 20).then((encodedResult) => {
      const arr = alchemy.interface.decodeFunctionResult(
        alchemy.interface.functions["getNotes(uint256)"],
        encodedResult
      );
      // console.log(arr);
      arr.map((element) => {
        element.map((item) => {
          getNote_arweave(item[0], item[1]);
        });
      });
      // for (const i of arr) {
      //   console.log(i, i[0][1]);
      //   getNote_arweave(i[0][1]);
      // }
      // alchemy.alchemy.ws.once(txHash, (tx) => console.log(tx));
      // setContent(txHash);
    });
  };

  // useEffect(() => {
  // console.log(content);
  // }, [content]);

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
              <Card title={upload.noteDate} bordered={false} size="small">
                <p>{upload.content}</p>
              </Card>
            </div>
            {/* <List>
              <List.Item style={{ color: "white" }}>
                <List.Item.Meta title={upload.noteDate} />
                <div>{upload.content}</div>
              </List.Item>
            </List> */}
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
          {showNote.map(([date, note], i) => {
            // console.log(note);
            return (
              <Card
                bordered={false}
                style={{ marginBottom: "5%" }}
                key={i}
                title={date}
              >
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
