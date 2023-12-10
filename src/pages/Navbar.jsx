import React, { useState, useEffect, useRef } from "react";
import { FaCartArrowDown, FaSignOutAlt, FaCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { baseUrl, getID, isAuthenticated } from "../assets/constants";
import { Link } from "react-router-dom";
const Navbar = ({ cart,setCartAc }) => {
  let searched = false;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState({ results: [] });
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click target is not inside the dropdown

      if (
        !e.target.closest(".yawaka") &&
        e.target !== document.querySelector(".atay")
      ) {
        setActive(false); // Reset the active state
      }
    };

    // Attach the event listener
    document.body.addEventListener("click", handleDocumentClick);

    // Cleanup: remove the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const handleFocus = (e) => setActive(e !== "");
  const searchHandle = (search) => {
    setActive(true);
    setLoading(true);
    clearTimeout(searchHandle.timeoutId);
    if (search === "") {
      setActive(false);
      setData({ results: [] });
      return;
    }

    const fetchWithDelay = async () => {
      setActive(true);
      const apiUrl = `http://${baseUrl}:5000/search/books/${search}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    searchHandle.timeoutId = setTimeout(fetchWithDelay, 500);
  };

  const [isScrollDisabled, setScrollDisabled] = useState(false);

  const handleDisableScroll = () => {
    setScrollDisabled(!isScrollDisabled);
  };

  // Apply the scroll-disabled class to the body based on the state
  document.body.classList.toggle("scroll-disabled", isScrollDisabled);

  return (
    <nav className="bg-white w-full p-7 border-2 flex items-center gap-3 justify-between">
      
      <div className="flex flex-row items-center gap-10">
        <Link to='/' className="text-xl font-bold">Opus</Link>
        <ul className="hidden flex-row gap-10 sm:flex">
          <Link to='/'>Home</Link>
          <li>Browse</li>
          

        </ul>
      </div>
      <div className="w-1/2 relative">
        <input
          onFocus={(e) => handleFocus(e.target.value)}
          onChange={(e) => searchHandle(e.target.value)}
          type="text"
          className="outline-none border-2 rounded-md p-1 w-full atay"
          placeholder="Search books..."
        />
        <div
          className={`${
            active ? "" : "hidden"
          } max-h-96 overflow-auto flex flex-col gap-4 absolute w-full mt-1 yawaka p-5 bg-white shadow-2xl  rounded-lg`}
        >
          {loading ? (
            <p className="text-center text-xs font-semibold text-slate-500 tracking-wider">
              Searching...
            </p>
          ) : data.results.length == 0 ? (
            <p className="text-center text-xs font-semibold text-slate-500 tracking-wider">
              NO RESULTS
            </p>
          ) : (
            data.results.map((e,index) => (
              <Link 
                onClick={()=> setActive(false)}
                key={index}
                to={`/details/${e.id}`}
                className="p-2 cursor-pointer flex flex-row items-center gap-3 hover:bg-slate-500 rounded-lg duration-200 transition-colors hover:text-white"
              >
                <img src={e.image} className="w-16 h-16 rounded-full" />
                <div className="flex flex-col">
                  <span>{e.title}</span>
                  <span>{e.author}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-row gap-3 sm:gap-10  select-none items-center">
        {isAuthenticated() ? (
          <>
            <div className="relative inline-block cursor-pointer" onClick={()=>setCartAc(true)}>
              <FaCartArrowDown size={24} />
              <span
                className={`absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-rose-600 rounded-full w-4 h-4 text-sm text-white flex items-center justify-center `}
              >
                {cart.results.length}
              </span>
            </div>
           
            <div className="relative inline-block">
              <FaUser
                size={24}
                onClick={toggleDropdown}
                className="cursor-pointer"
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-2 ">
                 
                  <Link
                   onClick={()=>setIsDropdownOpen(false)}
                    to="/profile"
                    className="text-sm flex flex-row items-center justify-start px-4 gap-2 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FaCog className="" /> Profile
                  </Link>
                  <Link
                   onClick={()=>setIsDropdownOpen(false)}
                    to="/orders"
                    className="text-sm flex flex-row items-center justify-start px-4 gap-2 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FaCog className="" /> Orders
                  </Link>
                  <Link
                    to="/logout"
                    className="text-sm  flex flex-row items-center justify-start px-4 gap-2 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FaSignOutAlt className="" /> Logout
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link className="p-2 bg-blue-600 text-white rounded-md" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
