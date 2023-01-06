import React, { useContext } from "react";
import { useMetaMask } from "metamask-react";
import { List, Space, Layout, Button, Tabs, Card, Divider } from "antd";
import { useState, useEffect } from "react";
import { useApp } from "../UseApp";
import { WalletContext, AlchemyContext } from "..";
// import * as ethers from "ethers";

const { Header, Content } = Layout;

function Notes({ login, setLogin }) {
  const arweave = useContext(WalletContext);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [content, setContent] = useState();
  // console.log(arweave.mnemonicPhrase);

  const alchemy = useContext(AlchemyContext);

  const getNotes = () => {
    alchemy.getNotes(ethereum, account, 5).then((txHash) => {
      console.log(txHash);
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
        <div></div>
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
