import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Logout from "./pages/Logout.jsx";
import {  isAdminAuth, isAuthenticated } from "./assets/constants.jsx";
import Register from "./pages/Register.jsx";

import CustomerLayout from "./layouts/CustomerLayout.jsx";

function App() {
  
  return (
    <Router>
      <Routes>
        {isAuthenticated() && isAdminAuth ? (
          <Route path="/admin/*" element={<AdminLayout />} />
        ) : null}
        <Route path="/*" element={<CustomerLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
