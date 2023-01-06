import React, { useContext, useState, createContext } from "react";
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

export const UploadContext = createContext({
  upload: {
    id: "",
    status: "",
    content: "",
    noteDate: "",
    uploadTime: "",
  },
  setUpload: () => {},
});

function App() {
  const [login, setLogin] = useState(false);
  const { pathname } = useLocation();
  const { setStatus, key, setKey } = useApp();

  const [upload, setUpload] = useState({
    id: "",
    status: "",
    content: "",
    noteDate: "",
    uploadTime: "",
  });

  if (login) {
    return (
      <UploadContext.Provider
        value={{
          upload: upload,
          setUpload: setUpload,
        }}
      >
        <Layout>
          <NavBar setKey={setKey} setLogin={setLogin} />
          <Routes>
            <Route path="/" element={<Notes></Notes>} />
            <Route path="/addNote" element={<AddNote />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </UploadContext.Provider>
    );
  } else {
    return <Login login={login} setLogin={setLogin} />;
  }
}

export default App;
