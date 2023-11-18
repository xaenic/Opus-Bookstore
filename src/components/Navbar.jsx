import React from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import avatar from "../assets/avatar.jpg";
const Navbar = ({ collapse, setCollapse, title }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-gradient-to-r p-3 from-slate-800 to-gray-900 rounded-lg mb-7">
        <div className="text-sm flex flex-row gap-3 items-center justify-center">
          {!collapse ? (
            <BiMenuAltLeft
              className="cursor-pointer"
              onClick={() => setCollapse((prev) => !prev)}
            />
          ) : (
            <BiMenuAltRight
              className="cursor-pointer"
              onClick={() => setCollapse((prev) => !prev)}
            />
          )}
          <span>Admin </span>
          <MdOutlineArrowForwardIos size={10} className="text-slate-400" />
          <span className="text-slate-500 text-sm">{title}</span>
        </div>
        <div>
          <img src={avatar} alt="" className="w-[40px] rounded-full" />
        </div>
      </div>
      <div className="mb-7 w-full p-3 bg-slate-800 to-gray-900 text-slate-500 rounded-lg">
        <span className="text-green-500">Create</span>, <span className="text-slate-300">Read</span>,
        <span className="text-blue-500"> Update</span> and
        <span className="text-rose-500"> Delete</span> {title} data.
      </div>
    </>
  );
};

export default Navbar;
