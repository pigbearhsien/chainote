import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./UseApp";
import { BrowserRouter as Router } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import ArweaveInterface from "./wallet/arweave";
// import AlchemyInterface from "./wallet/alchemy";

const arweave = new ArweaveInterface();
export const WalletContext = createContext(arweave);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WalletContext.Provider value={arweave}>
    <MetaMaskProvider>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </MetaMaskProvider>
  </WalletContext.Provider>
);
