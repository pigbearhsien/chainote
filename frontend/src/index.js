import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./UseApp";
import { BrowserRouter as Router } from "react-router-dom";
import ArweaveInterface from "./wallet/arweave";
import { MetaMaskProvider } from "metamask-react";
import { mnemonicPhrase } from "./wallet/utils";

const arweave = new ArweaveInterface({ recoveryPhrase: mnemonicPhrase });
export const WalletContext = createContext(arweave);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetaMaskProvider>
    <WalletContext.Provider value={arweave}>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </WalletContext.Provider>
  </MetaMaskProvider>
);
