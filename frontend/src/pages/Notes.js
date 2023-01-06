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

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [content, setContent] = useState();
  // console.log(arweave.mnemonicPhrase);

  const [showNote, setShowNote] = useState([]);

  const getNote_arweave = async (txId) => {
    const transaction = await arweave.arweave.transactions.getData(txId);
    const decrypted = await arweave.decryptByPrivateKey(transaction);
    setShowNote([...showNote, decrypted]);
  };

  const getNotes = () => {
    alchemy.getNotes(ethereum, account, 5).then((encodedResult) => {
      const arr = alchemy.interface.decodeFunctionResult(
        alchemy.interface.functions["getNotes(uint256)"],
        encodedResult
      );
      console.log(arr);
      for (const i of arr) {
        console.log(i, i[0][1]);
        getNote_arweave(i[0][1]);
      }
      // alchemy.alchemy.ws.once(txHash, (tx) => console.log(tx));
      // setContent(txHash);
    });
  };

  useEffect(() => {
    // console.log(content);
  }, [content]);

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
          January
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
