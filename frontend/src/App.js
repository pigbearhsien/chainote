import React, { useState } from "react";
import "./index.css";
import Login from "./pages/Login";
// import Chat from "./pages/Chat";
// import Transfer from "./pages/Transfer";
// import Account from "./pages/Account";
// import MainPage from "./pages/MainPage";
// import Register from "./pages/Register";
import NavBar from "./components/NavBar";
// import { Route, Routes, useLocation } from "react-router-dom";
// import MyTasks from "./pages/MyTasks";
// import { useApp } from "./UseApp";
import { Layout } from "antd";
import { useEffect } from "react";

function App() {
  const [login, setLogin] = useState(false);
  if (login) {
    return;
  }
  // const { pathname } = useLocation();
  // const { me, id, setStatus, client, key, setKey } = useApp();

  return (
    <Layout>
      {/* {pathname !== "/login" && pathname !== "/register" && (
        <NavBar setKey={setKey} collapsed={collapsed} />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setLogin={setLogin} setCollapsed={setCollapsed} />}
        />
        <Route
          path="/"
          element={
            <MainPage
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              login={login}
              me={me}
              setStatus={setStatus}
            ></MainPage>
          }
        />

        <Route path="/register" element={<Register setLogin={setLogin} />} />
        <Route
          path="/mytasks"
          element={
            <MyTasks collapsed={collapsed} setCollapsed={setCollapsed} />
          }
        />
        <Route
          path="/chat"
          element={
            <Chat
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              c={client}
            />
          }
        />
        <Route
          path="/transfer"
          element={
            <Transfer collapsed={collapsed} setCollapsed={setCollapsed} />
          }
        />
        <Route
          path="/account"
          element={
            <Account
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              me={me}
              id={id}
            />
          }
        />
      </Routes> */}
      <NavBar></NavBar>
    </Layout>
  );
}

export default App;
