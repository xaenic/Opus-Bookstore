import React from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import avatar from "../assets/avatar.jpg";
import { Link } from "react-router-dom";
const Navbar = ({ collapse, setCollapse, title }) => {
  console.log(title)
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-gradient-to-r p-3 from-slate-800 to-gray-900 rounded-lg mb-4">
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
          <Link to="/admin">Admin </Link>
         {title.split(',').map((e,index)=>(
          <>
           <MdOutlineArrowForwardIos size={10} className="text-slate-400" />
           { title.split(',').length == 1 || index !== 0 ? <span className="text-slate-500 text-sm">{e}</span> : <Link to={`/admin/${e}`} className="text-white text-sm">{e}</Link>}
          
          </>
         ))}
        </div>
        <div>
          <img src={avatar} alt="" className="w-[40px] rounded-full" />
        </div>
      </div>
     
    </>
  );
};

export default Navbar;
