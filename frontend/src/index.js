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
export const WalletContext = createContext(arweave);

const abi = _abi;
const alchemy = new AlchemyInterface(
  "0x1f41e5deeDA912B03eC8A3b2b7a131F0B2d3Da9A",
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
