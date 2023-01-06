import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./UseApp";
import { BrowserRouter as Router } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetaMaskProvider>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </MetaMaskProvider>
);
