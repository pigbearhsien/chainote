import React, { useEffect, useState, useContext } from "react";
import { Layout, message, Button, Divider, Radio } from "antd";
import { useMetaMask } from "metamask-react";
import * as ethers from "ethers";

const { Header, Content } = Layout;

const chain = {
  5: {
    chainName: "Georli Testnet",
    chainId: 5,
    nativeCurrency: { name: "GoerliETH", decimals: 18, symbol: "GoerliETH" },
    rpcUrls: ["https://goerli.infura.io/v3/"],
  },
  80001: {
    chainName: "Mumbai Testnet",
    chainId: 80001,
    nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  },
  137: {
    chainName: "Polygon Mainnet",
    chainId: 137,
    nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
    rpcUrls: ["https://polygon-rpc.com/"],
  },
};

function Settings({ setLogin }) {
  const { status } = useMetaMask();

  const [value, setValue] = useState(Number(window.ethereum.networkVersion));

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

  const handleLogOut = () => {
    if (status === "connected")
      message.error({
        content: "You haven't disconnect your MeatMask.",
        duration: 2,
      });
    else if (status === "notConnected") {
      message.success({ content: "Logout successfully!", duration: 2 });
      setLogin(false);
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
          <Radio value={5} style={{ color: "#ffffff" }}>
            Goerli Testnet
          </Radio>
          <Radio value={80001} style={{ color: "#ffffff" }}>
            Mumbai Testnet
          </Radio>
          <Radio value={137} style={{ color: "#ffffff" }}>
            Polygon
          </Radio>
        </Radio.Group>
        <Button
          onClick={() => handleLogOut()}
          style={{
            borderRadius: "50px",
            width: "100%",
            height: "50px",
          }}
        >
          Disconnect
        </Button>
      </Content>
    </Layout>
  );
}
export default Settings;
