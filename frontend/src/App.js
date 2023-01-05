import React, { useState } from "react";
import "./index.css";
import AddNote from "./pages/AddNote";
import NavBar from "./components/NavBar";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import { Route, Routes, useLocation } from "react-router-dom";
import { useApp } from "./UseApp";
import { Layout } from "antd";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  const { setStatus, key, setKey } = useApp();

  return (
    <Layout>
      <NavBar setKey={setKey} />
      <Routes>
        <Route path="/" element={<Notes></Notes>} />
        <Route path="/addNote" element={<AddNote />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
