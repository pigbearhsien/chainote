import React, { useContext } from "react";
import { useMetaMask } from "metamask-react";
import { List, Space, Layout, Button, Tabs, Card, Divider } from "antd";
import { useState, useEffect } from "react";
import { UploadContext } from "../App";
import { WalletContext, AlchemyContext } from "..";
// import * as ethers from "ethers";

const { Header, Content } = Layout;

function Notes({ login, setLogin }) {
  const arweave = useContext(WalletContext);
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
    if (transaction) {
      const decrypted = await arweave.decryptByPrivateKey(transaction);
      setShowNote((prev) => [
        ...prev,
        [`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`, decrypted],
      ]);
    } else {
      setShowNote((prev) => [
        ...prev,
        [
          `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`,
          "<Now pending...>",
        ],
      ]);
    }
  };

  useEffect(() => {
    // console.log(showNote[0][0]);
    let sortNote = Array.from(
      showNote.sort((a, b) => new Date(b[0]) - new Date(a[0]))
    );
    console.log("sorted", sortNote);
    setShowNote(() => sortNote);
  }, [showNote.length]);

  const getNotes = async () => {
    await alchemy.getNotes(ethereum, account, 20).then((encodedResult) => {
      const arr = alchemy.interface.decodeFunctionResult(
        alchemy.interface.functions["getNotes(uint256)"],
        encodedResult
      );
      console.log(arr);
      arr.map((element) => {
        element.map((item) => {
          getNote_arweave(item[0], item[1]);
        });
      });
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
        <Button
          style={{
            borderRadius: "50px",
            marginTop: "5%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={getNotes}
        >
          Fetch Notes
        </Button>
      </Content>
    </Layout>
  );
}
export default Notes;
