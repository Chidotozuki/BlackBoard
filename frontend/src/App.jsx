import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";
const App = () => {
  return (
    <div data-theme="forest">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
    </div>
  );
};

export default App;
