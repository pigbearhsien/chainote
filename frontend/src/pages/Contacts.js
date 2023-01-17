import React, { useState, useContext, useEffect } from "react";
import { Layout, Input, Button } from "antd";
import usericon from "../img/usericon.png";
import { EditOutlined, PlusSquareOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Web3Context } from "..";
import { useMetaMask } from "metamask-react";

const { Header, Content } = Layout;

function Contacts() {

  const [contacts, setContacts] = useState([])
  const [onSave, setOnSave] = useState(false)
  const [mode, setMode] = useState("view");

  const [form, setForm] = useState({
    name: "",
    pk: "",
    revise: -1,
  });

  const clearOut = () => setForm({name: "", pk: "", revise: -1})

  const addContact = () => {
    if(form.name !== "" && form.pk !== "") {
      const newer = [...contacts, {name: form.name, pk: form.pk}]
      setContacts(newer)
      localStorage.setItem("chain-note-contacts", JSON.stringify(newer))
    }
    setMode("view")
  }

  const reviseContact = () => {
    const origin = Array.from(contacts)
    origin[form.revise] = {
      name: form.name,
      pk: form.pk
    };
    setContacts(origin);
    setOnSave(true)
    setMode("view")
  }

  const cancelContact = () => {
    clearOut()
    setMode("view")
  }

  useEffect(() => {
    const resolved = JSON.parse(localStorage.getItem("chain-note-contacts"))
    if(resolved === null) {
      localStorage.setItem('chain-note-contacts', JSON.stringify([]));
      return;
    }
    setContacts(resolved)
  }, [])

  useEffect(() => {
    if(onSave === true) {
      localStorage.setItem('chain-note-contacts', JSON.stringify(contacts))
      clearOut()
      setOnSave(false)
    }
  }, [onSave])

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
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
          {mode !== 'view' ? <Button onClick={cancelContact} style={{backgroundColor: 'black', position: 'absolute', border: '0', left: '10px'}} icon={<ArrowLeftOutlined style={{color: 'white', fontSize: '20px'}} />} />: <></>}
          <div style={{color: 'white', fontSize: '30px', width: '100%', textAlign: 'center'}}>Contacts</div>
        </div>
        <div className="Info">
          { mode === 'view' ?
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              {contacts.map((item, index) => {
                return (
                  <div style={{width: '97%', color: 'white', margin: "10px 0 10px 0", border: "1px solid white", padding: '8px 20px 8px 20px'}}>
                    <div style={{display: 'flex', fontSize: '25px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                      {item.name}
                      <div>
                        <Button onClick={() => {setMode("revise"); setForm({name: contacts[index].name, pk: contacts[index].pk, revise: index}); }} style={{margin: '0 8px 0 0', backgroundColor: 'black', color: 'white'}} icon={<EditOutlined />} />
                        <Button onClick={() => {const spliced = contacts.filter((_, i) => i != index); setContacts(spliced); localStorage.setItem("chain-note-contacts", JSON.stringify(spliced))}} style={{margin: '0 0 0 5px', backgroundColor: 'black', color: 'white'}} icon={<DeleteOutlined />} />
                      </div>
                    </div>
                    <div>
                      {item.pk}
                    </div>
                  </div>
                )
              })}
              <Button
                  onClick={() => {
                    setMode('add')
                    clearOut()
                  }}
                  style={{width: '85%', height: 'fit-content', backgroundColor: 'black',  border: '0', display: 'flex', color: 'white', fontSize: 20, textAlign: 'center', alignItems: 'center', paddingLeft: '35px', marginTop: '20px'}}
              >
                  <PlusSquareOutlined style={{fontSize: '40px', color: 'white', margin: "0 10px 0 10px"}}/>
                  Add Contacts
              </Button>
            </div> : 
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div style={{width: '70%', color: 'white'}}>Username</div>
                <Input
                  placeholder={'Name'}
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  style={{ width: '70%', marginBottom: 30, fontSize: 18 }}
                />
                 <div style={{width: '70%', color: 'white'}}>Address</div>
                <Input
                  placeholder={'Public key'}
                  value={form.pk}
                  onChange={(e) => setForm({...form, pk: e.target.value})}
                  style={{ width: '70%', marginBottom: 30, fontSize: 18  }}
                />
                { mode=== 'add' ?
                <Button
                  title="Add"
                  onClick={addContact}
                  style={{width: '30%', height: 'fit-content', backgroundColor: 'black', color: 'white', fontSize: '20px'}}
                >Add</Button> :
                <Button
                  title="Revise"
                  onClick={reviseContact}
                  style={{width: '30%', height: 'fit-content', backgroundColor: 'black', color: 'white', fontSize: '20px'}}
                >revise</Button>
                }
            </div>
          }
        </div>
      </Content>
    </Layout>
  );
}
export default Contacts;
