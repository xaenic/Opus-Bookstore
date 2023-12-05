import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  const [collapse, setCollapse] = useState(false);
  const [pageTitle, setPageTitle] = useState('Customer')
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <div className={`transition-all duration-200 grid grid-cols-12 p-5 h-screen  bg-gray-900 text-white`}>
              <Sidebar
                pageTitle={pageTitle}
                collapse={collapse}
               
                setCollapse={setCollapse}
              />
              <div className={`transition-all duration-200 flex flex-col w-full ${collapse ? 'lg:col-span-11 ' : 'lg:col-span-9 xl:col-span-10 '} col-span-12`}>
                <Navbar
                  title={pageTitle}
                  collapse={collapse}
                  setCollapse={setCollapse}
                />
                <Routes>
                  <Route path="/customers" element={<Admin setPageTitle={setPageTitle}title='Customers' />} />
                  <Route path="/books" element={<Admin setPageTitle={setPageTitle} title='Books' />} />
                  <Route path="/Genre" element={<Admin setPageTitle={setPageTitle} title='Genre' />} />
                  <Route path="/Featured" element={<Admin setPageTitle={setPageTitle} title='Featured' />} />

                </Routes>
              </div>
              <Toaster
        toastOptions={{
          className:
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
        }}
      />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
