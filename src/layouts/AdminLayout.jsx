import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import Edit from "../pages/Admin/Edit.jsx";
import Create from "../pages/Admin/Create.jsx";
import { Toaster } from "react-hot-toast";
import Admin from "../pages/Admin/Admin.jsx";
import { isAdminAuth, isAuthenticated } from "../assets/constants.jsx";
const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [pageTitle, setPageTitle] = useState("Customer");
  if (!isAuthenticated()) {
    navigate('/login');
  }
  if (!isAdminAuth()) {
    navigate('/');
  }
  return (
    <div
      className={`transition-all duration-200 grid grid-cols-12 p-5 h-screen  bg-gray-900 text-white`}
    >
      <Sidebar
        pageTitle={pageTitle}
        collapse={collapse}
        setCollapse={setCollapse}
      />
      <div
        className={`transition-all duration-200 flex flex-col w-full ${
          collapse ? "lg:col-span-11 " : "lg:col-span-9 xl:col-span-10 "
        } col-span-12`}
      >
        <Navbar
          title={pageTitle}
          collapse={collapse}
          setCollapse={setCollapse}
        />
        <Routes>
          <Route
            path="/"
            element={<Admin setPageTitle={setPageTitle} title="Customers" />}
          />

          <Route
            path="/customers"
            element={<Admin setPageTitle={setPageTitle} title="Customers" />}
          />
          <Route
            path="/customers/edit/:id"
            element={
              <Edit setPageTitle={setPageTitle} title="Customers,Edit" />
            }
          />
          <Route
            path="/customers/create"
            element={
              <Create setPageTitle={setPageTitle} title="Customers,Create" />
            }
          />
          <Route
            path="/books"
            element={<Admin setPageTitle={setPageTitle} title="Books" />}
          />
          <Route
            path="/books/edit/:id"
            element={<Edit setPageTitle={setPageTitle} title="Books,Edit" />}
          />
          <Route
            path="/books/create"
            element={
              <Create setPageTitle={setPageTitle} title="Books,Create" />
            }
          />

          <Route
            path="/genre/edit/:id"
            element={<Edit setPageTitle={setPageTitle} title="Genre" />}
          />

          <Route
            path="/Genre"
            element={<Admin setPageTitle={setPageTitle} title="Genre" />}
          />
          <Route
            path="/Featured"
            element={<Admin setPageTitle={setPageTitle} title="Featured" />}
          />
        </Routes>
      </div>
      <Toaster
        toastOptions={{
          className:
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
        }}
      />
    </div>
  );
};

export default AdminLayout;
