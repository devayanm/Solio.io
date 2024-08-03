import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SearchPage from "./pages/SearchPage";
import Academic from "./components/academic/Academic";
import Profile from "./components/auth/Profile";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  );
};

export default App;
