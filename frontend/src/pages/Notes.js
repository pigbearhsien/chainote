import React, { useContext } from "react";
import { useMetaMask } from "metamask-react";
import { Layout, Button, Card, Divider } from "antd";
import { useState, useEffect } from "react";
import { AddNoteContext } from "../App";
import { Web3Context } from "..";
import { useApp } from "../UseApp";
// import * as ethers from "ethers";

const { Content } = Layout;

function Notes() {
  const { database, alchemy } = useContext(Web3Context);
  const { upload } = useContext(AddNoteContext);

  const { account, ethereum } = useMetaMask();
  const { cacheNote, setCacheNote, recoveryPhrase } = useApp();

  const [showNote, setShowNote] = useState({});
  const [noteList, setNoteList] = useState([])

  const getNote_bundlr = async (date, txId) => {
    const transaction = await database.getData(txId)
    const _date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`

    // console.log('handling:', txId)
    let resolved; 
    if (transaction) {
      const decrypted = await database.decryptByPrivateKey(
        transaction,
        recoveryPhrase
      );
      resolved = [_date, decrypted]
    } else {
      resolved = [_date, "<Now pending...>"]
    }
    setShowNote((prev) => {
      const _new = Object.assign(new Object(), prev)
      _new[txId] = resolved
      return _new
    })
  };

  const getNotes = async () => {
    const encodedResult = await alchemy.getNotes(ethereum, account, 20)
    const localCache = Object.assign(new Object(), cacheNote)

    const arr = alchemy.interface.decodeFunctionResult(
      alchemy.interface.functions["getNotes(uint256)"],
      encodedResult
    );

    arr.map(element => (
      element.map(item => {
        // 有找到 txId (item[1]) 的從 local cache 中 pop 掉
        getNote_bundlr(item[0], item[1])
        delete localCache[item[1]];
      })
    ));

    const keys = Object.keys(localCache)
    console.log('keys', keys)
    keys.map(item => {
      getNote_bundlr(localCache[item].date, item);
    })
    // should look up on txId to see if there is cache.
    setCacheNote(localCache);
  };

  useEffect(() => {
    const _noteList = []
    for(const key in showNote) {
      _noteList.push(showNote[key])
    }
    const sortedNote = Array.from(
      _noteList.sort((a, b) => new Date(b[0]) - new Date(a[0]))
    );
    setNoteList(sortedNote);
  }, [showNote])
  
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
          {noteList.map(([date, note], i) => {
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
