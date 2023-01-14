import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./UseApp";
import { BrowserRouter as Router } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import DatabaseInterface from "./wallet/bundlr";
import AlchemyInterface from "./wallet/alchemy";
import { abi, contract_addr } from "./contract/contract";
// import AlchemyInterface from "./wallet/alchemy";

console.log(abi);
const database = new DatabaseInterface();
const alchemy = new AlchemyInterface(contract_addr, abi);

export const Web3Context = createContext({
  database: database,
  alchemy: alchemy,
});

/*
  我們現在要做的事情：先用 moralis 接上 metamask，
  拿到 ethereum 之後，再拿這個 ethereum 包進 Web3Provider
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3Context.Provider value={{ database: database, alchemy: alchemy }}>
    <MetaMaskProvider>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </MetaMaskProvider>
  </Web3Context.Provider>
);
