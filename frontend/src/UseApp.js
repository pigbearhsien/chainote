import React, { createContext, useContext, useState, useEffect } from "react";
import { useMetaMask } from "metamask-react";
import { Web3Context } from ".";

const AppContext = createContext({
  login: false,
  setLogin: () => {},
  content: "",
  setContent: () => {},
  signed: false,
  setSigned: () => {},
  recoveryPhrase: false,
  setRecoveryPhrase: () => {},
  cacheNote: {},
  setCacheNote: () => {}
});

const AppProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [key, setKey] = useState("1")
  const [content, setContent] = useState("")
  const [signed, setSigned] = useState(false)
  const [cacheNote, setCacheNote] = useState(new Object())

  const { database } = useContext(Web3Context);

  // Metamask connection and have it signed.

  const { status, ethereum } = useMetaMask();

  useEffect(() => {
    if (status === "connected") {
      database.plugWeb3Provider(ethereum, () => setSigned(true));
    }
  }, [ethereum]);

  // Set up recovery phrase.

  const [recoveryPhrase, setRecoveryPhrase] = useState("");

  useEffect(() => {
    if (typeof recoveryPhrase === "object")
      localStorage.setItem("mnemonicPhrase", JSON.stringify(recoveryPhrase));
  }, [recoveryPhrase]);

  useEffect(() => {
    setRecoveryPhrase(JSON.parse(localStorage.getItem("mnemonicPhrase")));
  }, []);

  // Set up local cache.

  useEffect(() => {
    const cache = JSON.parse(localStorage.getItem("chain-note-local-cache"))
    if (cache !== null) {
      setCacheNote(cache);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chain-note-local-cache', cacheNote)
  }, [cacheNote])

  return (
    <AppContext.Provider
      value={{
        login,
        setLogin,
        content,
        setContent,
        signed,
        setSigned,
        recoveryPhrase,
        setRecoveryPhrase,
        cacheNote,
        setCacheNote,
        key,
        setKey
      }}
      {...props}
    />
  );
};

const useApp = () => useContext(AppContext);
export { AppProvider, useApp };
