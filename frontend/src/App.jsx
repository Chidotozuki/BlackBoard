import React from "react";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { useAuth } from "./context/AuthContext";
const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated:", isAuthenticated);
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateNotePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <AppLayout />
    </div>
  );
};

export default App;
