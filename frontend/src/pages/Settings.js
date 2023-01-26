import React from "react";
import { Layout } from "antd";
import { useMetaMask } from "metamask-react";
import * as ethers from "ethers";
import { Web3Context } from "..";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

function Settings({ setLogin }) {
  const navigate = useNavigate();
  const { status, account } = useMetaMask();
  const { database, alchemy } = useContext(Web3Context);

  const [value, setValue] = useState(Number(window.ethereum.networkVersion));
  const [fund, setFund] = useState(0);
  const [warning, setWarning] = useState("  ");
  const [balance, setBalance] = useState("");
  const [metaBalance, setMetaBalance] = useState("");
  const [rerender, setRerender] = useState(false);

  const onChange = (e) => {
    changeNetwork(e.target.value);
  };

  const changeNetwork = async (id) => {
    if (Number(window.ethereum.networkVersion) !== id) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(id) }],
        });
        setValue(id);
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: chain[id].chainName,
                chainId: ethers.utils.hexValue(chain[id].chainId),
                nativeCurrency: chain[id].nativeCurrency,
                rpcUrls: chain[id].rpcUrls,
              },
            ],
          });
          setValue(id);
        }
      }
    }
  };

  const handleFund = async (fund) => {
    alchemy.getBalance(account).then((result) => {
      setMetaBalance(result.div(1e15).toNumber() / 1000);
      console.log(metaBalance);
    });
    if (fund === null) {
      setWarning("The amount cannot be empty.");
      // 從 Add 變成 Proceed，整個 button trigger 的 function 會是一個 call back
      return;
    }
    if (fund <= 0) {
      setWarning("The amount must be higher than 0.");
      return;
    }
    if (fund > metaBalance) {
      setWarning("Insufficient balance in your metamask.");
    }
    await database.fund(fund);
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    setWarning("  ");
  }, [fund]);

  useEffect(() => {
    database.getBundlrBalance().then((result) => {
      setBalance(result.div(1e18).toNumber());
    });
  }, [rerender]);

  const handleLogOut = () => {
    if (status === "connected")
      message.error({
        content: "You haven't disconnect your MeatMask.",
        duration: 2,
      });
    else if (status === "notConnected") {
      message.success({ content: "Logout successfully!", duration: 2 });
      setLogin(false);
      navigate("/login");
    }
  };

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
        <h1>Settings</h1>
        <Divider
          orientation="left"
          style={{ color: "white", borderTop: "3px white" }}
          plain
        >
          Choose Chain
        </Divider>
        <Radio.Group
          onChange={onChange}
          value={value}
          defaultValue={Number(window.ethereum.networkVersion)}
          style={{
            marginBottom: "10px",
          }}
        >
          {/* <Radio value={5} style={{ color: "#ffffff" }}>
            Goerli Testnet
          </Radio> */}
          <Radio value={80001} style={{ color: "#ffffff" }}>
            Mumbai Testnet
          </Radio>
          <Radio value={137} style={{ color: "#ffffff" }}>
            Polygon
          </Radio>
        </Radio.Group>
        <Divider
          orientation="left"
          style={{ color: "white", borderTop: "3px white" }}
          plain
        >
          Fund your database
        </Divider>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Space>
            <InputNumber min={0} value={fund} onChange={setFund} />
            <Button type="primary" onClick={() => handleFund(fund)}>
              Fund
            </Button>
          </Space>
          <div style={{ display: "flex", color: "white", marginLeft: "20px" }}>
            Your bundlr balance: {balance}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "white",
            margin: "10px 0 10px 0",
            fontSize: "15px",
          }}
        >
          {warning}
        </div>
        <Button
          onClick={() => handleLogOut()}
          style={{
            borderRadius: "50px",
            width: "100%",
            height: "50px",
            marginTop: "40%",
          }}
        >
          Disconnect
        </Button>
      </Content>
    </Layout>
  );
}
export default Settings;
