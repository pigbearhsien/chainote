import React, { useState, createContext, useEffect } from "react";
import "./index.css";
import Login from "./pages/Login";
import AddNote from "./pages/AddNote";
import NavBar from "./components/NavBar";
import CalendarView from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import Contacts from "./pages/Contacts";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { useApp } from "./UseApp";

export const AddNoteContext = createContext({
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
  const navigate = useNavigate();
  const { login, setLogin, signed } = useApp();

  const [upload, setUpload] = useState({
    id: "",
    status: "",
    content: "",
    noteDate: "",
    uploadTime: "",
  });

  useEffect(() => {
    navigate("/login");
  }, []);

  if (login && signed) {
    return (
      <AddNoteContext.Provider
        value={{
          upload: upload,
          setUpload: setUpload,
        }}
      >
        <Layout>
          <NavBar setLogin={setLogin} />
          <Routes>
            <Route path="/" element={<Notes></Notes>} />
            <Route path="/addNote" element={<AddNote />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/settings"
              element={<Settings setLogin={setLogin} />}
            />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Layout>
      </AddNoteContext.Provider>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }
}

export default App;
