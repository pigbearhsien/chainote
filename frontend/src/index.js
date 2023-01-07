import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./UseApp";
import { BrowserRouter as Router } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import ArweaveInterface from "./wallet/arweave";
import AlchemyInterface from "./wallet/alchemy";
import _abi from "./abi.json";
// import AlchemyInterface from "./wallet/alchemy";

const arweave = new ArweaveInterface();
// console.log(arweave.mnemonicPhrase);
export const WalletContext = createContext(arweave);

const abi = _abi;
const alchemy = new AlchemyInterface(
  "0x45dFFf343C2aFC767d8f7bd324068a67471E9aa3",
  abi
);
export const AlchemyContext = createContext(alchemy);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WalletContext.Provider value={arweave}>
    <MetaMaskProvider>
      <AlchemyContext.Provider value={alchemy}>
        <AppProvider>
          <Router>
            <App />
          </Router>
        </AppProvider>
      </AlchemyContext.Provider>
    </MetaMaskProvider>
  </WalletContext.Provider>
);
