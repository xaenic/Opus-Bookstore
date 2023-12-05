import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white w-full p-7 border-2 flex items-center justify-between">
      <div className="flex flex-row items-center gap-10">
        <h2 className="text-xl font-bold">Opus</h2>
        <ul className="flex flex-row gap-10">
          <li>Home</li>
          <li>Genre</li>
          <li>Browse</li>
        </ul>
      </div>
      <div className="flex flex-row gap-2">
        <input
          type="text"
          className="outline-none border-2 rounded-md p-1"
          placeholder="Search books..."
        />

        <a className="bg-black text-white rounded-md p-1">Cart</a>
        <a className="bg-black text-white rounded-md p-1">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;
