import "./App.css";
import { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { WalletContext } from ".";
import ArweaveInterface from "./wallet/arweave";
import { useMetaMask } from "metamask-react";
import { mnemonicPhrase } from "./wallet/utils";
import { parseTime } from "./wallet/utils";


function App() {
  const [content, setContent] = useState("");
  const [privateKey, setPrivateKey] = useState(mnemonicPhrase);
  const [publicKey, setPublicKey] = useState("");
  const [encryptedContent, setEncryptedContent] = useState("");
  const [decryptedContent, setDecryptedContent] = useState("");
  const arweave = useContext(WalletContext);
  const {account, chainId, addChain, connect, ethereum, status} = useMetaMask()
  
  const [pendingTransaction, setPendingTransaction] = useState([])
  const [finishedTransaction, setFinishedTransaction] = useState([])
  const [transactions, setTransactions] = useState(['T4pWRBFBfR4l9z527DkNkTz3tFpSMqetQ-s5x7zI_qo', '7omMDzTYrZllaDqc6be0sZvWOfVWh1m8oFpcYWHIm1Q'])

  const disconnectWallet = async () => {
    ethereum._handleDisconnect()
  }

  const checkEthereum = () => {
    console.log(ethereum)
  }

  const connectWallet = async () => {
    const response = await connect()
    console.log(response)
  }

  const addGoerliChain = async () => {
    await addChain({
      chainId: 5,
      chainName: 'Chain-Note-Goerli',
      nativeCurrency: {
        name: 'GoerliETH',
        symbol: 'GoerliETH',
        decimals: 18,
      },
      rpcUrls: ['https://eth-goerli.g.alchemy.com/v2/gX8oD6a1FQzKHWOHC5CYpAjpRhajTcrE']
    })
  }

  const handleClick = async (event) => {
    switch (event) {
      case "upload": {
        const response = await arweave.uploadOntoChain(encryptedContent, privateKey);
        console.log(response)
        setTransactions([...transactions, response.id])
        break;
      }
      case "get_private_key": {
        const response = await arweave.generateArweaveWallet();
        console.log(response);
        setPrivateKey(response);
        break;
      }
      case "generate_public_key": {
        const response = await arweave.walletToPublicKey(privateKey);
        console.log(response);
        setPublicKey(response);
        break;
      }
      case "get_balance": {
        const response = await arweave.getBalance(publicKey);
        console.log(response);
        break;
      }
      case "encrypt": {
        // const response = await ArweaveInterface.encrypt(content, publicKey);
        const response = await ArweaveInterface.encryptByPrivateKey(
          content,
          privateKey
        );
        setEncryptedContent(response);
        break;
      }
      case "decrypt": {
        const response = await ArweaveInterface.decryptByPrivateKey(
          encryptedContent,
          privateKey
        );
        setDecryptedContent(response);
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    setContent(default_text);
  }, []);

  return (
    <div className="App">
      <Button onClick={checkEthereum}>CLICK TO TAKE LOOK AT METAMASK</Button>
      <Button onClick={async () => console.log(await arweave.pollListStatus(transactions))}>here!</Button>
      <TextField
        className="TextField"
        variant="outlined"
        multiline
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></TextField>
      <Button onClick={() => handleClick('upload')} variant="text">上傳</Button>
      <Button onClick={() => handleClick("get_private_key")}>取得公私鑰</Button>
      <Button onClick={() => handleClick("crypto_generate_private_key")}>
        Crypto 取得私鑰
      </Button>
      <Button onClick={() => handleClick("generate_public_key")}>
        私鑰轉公鑰
      </Button>
      <Button onClick={() => handleClick("get_balance")}>查詢餘額</Button>
      <Button onClick={() => handleClick("encrypt")}>加密上述</Button>
      <TextField
        className="TextField"
        variant="outlined"
        multiline
        value={encryptedContent}
      ></TextField>
      <Button onClick={() => handleClick("decrypt")}>解密上述</Button>
      <TextField
        className="TextField"
        variant="outlined"
        multiline
        value={decryptedContent}
      ></TextField>
      <Button onClick={async () => {await connectWallet()}}>連接錢包</Button>
      <Button onClick={async () => {await disconnectWallet()}}>登出錢包</Button>
      <Button>{account}</Button>
      <Button>{chainId}</Button>
      <Button>{Date.now().toString(10)}</Button>
      {/* <Button>{new Date(Date.now())}</Button> */}
    </div>
  );
}

const default_text =
  "〈與妻訣別書〉吾今以此書與汝永別矣！吾作此書時，尚是世中一人；汝看此書時，吾已成為陰間一鬼。吾作此書，淚珠和筆墨齊下，不能竟書而欲擱筆。又恐汝不察吾衷，謂吾忍捨汝而死也，謂吾不知汝之不欲吾死也，故遂忍悲為汝言之。";

export default App;
