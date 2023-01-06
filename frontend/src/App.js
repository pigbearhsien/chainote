import React, { useState } from "react";
import "./index.css";
import Login from "./pages/Login";
import AddNote from "./pages/AddNote";
import NavBar from "./components/NavBar";
import CalendarView from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import { Route, Routes, useLocation } from "react-router-dom";
import { useApp } from "./UseApp";
import { Layout } from "antd";
import { useEffect } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const { pathname } = useLocation();
  const { setStatus, key, setKey } = useApp();
  if (login) {
    return (
      <Layout>
        <NavBar setKey={setKey} setLogin={setLogin} />
        <Routes>
          <Route
            path="/"
            element={<Notes login={login} setLogin={setLogin}></Notes>}
          />
          <Route path="/addNote" element={<AddNote />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    );
  } else {
    return <Login login={login} setLogin={setLogin} />;
  }
}

export default App;
