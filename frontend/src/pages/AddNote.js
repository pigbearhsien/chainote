import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space, Layout, Button, message, Input } from "antd";
import { PlusOutlined, ArrowLeftOutlined, CheckOutlined} from '@ant-design/icons'
import { Web3Context } from "..";
import { useMetaMask } from "metamask-react";
import { useApp } from "../UseApp";

dayjs.extend(customParseFormat);

const { Header, Content } = Layout;
const { TextArea } = Input;

const disabledDate = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf("day");
};

function AddNote() {
  const { database, alchemy } = useContext(Web3Context);
  const { content, setContent } = useApp()
  const { ethereum, account} = useMetaMask()

  const [pickDate, setPickDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [warning, setWarning] = useState(" ");
  const [proceed, setProceed] = useState(false);

  const [mode, setMode] = useState("edit");
  const [contacts, setContacts] = useState({
    list: [],
    chosen: []
  })
  const [_, setRerender] = useState(false)

  const onChange = (date, dateString) => {
    setPickDate(dateString);
  };

  const handleUpload = async () => {
    if (content === "") {
      setWarning("The content is empty. Do you sure you want to upload? 😲");
      // 從 Add 變成 Proceed，整個 button trigger 的 function 會是一個 call back
      setProceed(true);
      return;
    }
    _upload();
  };

  const _upload = async () => {
    if (proceed === true) {
      setProceed(false);
    }
    const encrypted = await database.encryptByPrivateKey(
      content,
      JSON.parse(localStorage.getItem("mnemonicPhrase"))
    );
    const transaction = await database.uploadOntoChain(
      encrypted,
      JSON.parse(localStorage.getItem("mnemonicPhrase"))
    );
    message.loading({
      content: "Pending...please wait for 2-5 minutes.",
      duration: 3,
    });

    const shared = contacts.list.filter((_, index) => contacts.chosen[index] === false)
    if (shared.length === 0) {
      await alchemy.uploadNote(
        ethereum,
        account,
        pickDate.split("-").join(""),
        transaction.id
      );
    } else {
      await alchemy.uploadSharedNote(
        ethereum,
        [account, ...shared],
        pickDate.split("-").join(""),
        transaction.id
      );
    }
  };

  const choose = (index) => {
    const origin = contacts.chosen
    origin[index] = !origin[index]
    setContacts({
      list: contacts.list,
      chosen: origin,
    })
    setRerender(prev => !prev)
  }

  useEffect(() => {
    const resolved = JSON.parse(localStorage.getItem("chain-note-contacts"))
    if(resolved === null) {
      localStorage.setItem('chain-note-contacts', JSON.stringify([]));
      return;
    }
    setContacts({
      list: resolved,
      chosen: new Array(resolved.length).fill(false)
    })
  }, [])

  return (
    <Layout className="site-layout">
      <Content
        className="site-layout-background"
        style={{
          // margin: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
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
        <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
          {mode !== 'edit' ? <Button onClick={() => setMode('edit')} style={{backgroundColor: 'black', position: 'absolute', border: '0', left: '10px'}} icon={<ArrowLeftOutlined style={{color: 'white', fontSize: '20px'}} />} />: <></>} 
          <div style={{color: 'white', fontSize: '28px', width: '100%', textAlign: 'center'}}>Add Note</div>
          {mode === 'edit' ? <Button onClick={() => setMode('add')} style={{backgroundColor: 'black', position: 'absolute', border: '0', left: '90%'}} icon={<PlusOutlined style={{color: 'white', fontSize: '20px'}} />} />: <></>}
        </div>
        { mode === 'edit' ? 
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 30,
            }}
          >
            <h2 style={{ marginBottom: 0 }}>
              {pickDate === dayjs().format("YYYY-MM-DD")
                ? "Today"
                : `${pickDate}`}
            </h2>
            <div className="pickDate" style={{}}>
              <Space direction="vertical">
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                  allowClear={false}
                  showToday={true}
                  onChange={onChange}
                />
              </Space>
            </div>
          </div>
          <TextArea
            style={{
              backgroundColor: "black",
              color: "white",
              borderColor: "white",
              fontSize: "18px",
              fontFamily: "Iceberg",
              height: "60%",
              // boxShadow: "0 0 0 2px #828384",
            }}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div
            style={{ display: "flex", color: "white", margin: "10px 0 10px 0", height: '20px' }}
          >
            {warning}
          </div>
          <Button
            style={{
              borderRadius: "50px",
              marginTop: "15",
              width: "100%",
            }}
            onClick={() => proceed ? _upload(): handleUpload()}
          >
            {proceed ? "Proceed" : "Add"}
          </Button>
          <div style={{color: 'white', marginTop: '15px'}}>
            {"<Also send to: " + 
              contacts.list.map((item, index) => {
                if (contacts.chosen[index] === true) {
                  return item.name + " ";
                } else {
                  return;
                }
              }) +
            ">"}
          </div>
        </> :
        <>
          {contacts.list.map((item, index) => {
            return (
              <Button onClick={() => choose(index)} style={{width: '97%', height: 'fit-content', backgroundColor: 'black', color: contacts.chosen[index]? '#3871e0': 'white', margin: "20px 0 0 0", border: contacts.chosen[index] ? "1px solid #3871e0" : "1px solid white", padding: '8px 20px 8px 20px'}}>
                <div style={{display: 'flex', fontSize: '25px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                  {item.name}
                  <CheckOutlined />
                </div>
                <div>
                  {item.pk}
                </div>
              </Button>
            )
          })}
        </>}
      </Content>
    </Layout>
  );
}
export default AddNote;
