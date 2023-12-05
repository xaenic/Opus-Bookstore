import React, { useState } from "react";
import { menuItems } from "../assets/constants";
import { SiBookstack } from "react-icons/si";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";
const Sidebar = ({ collapse, setCollapse, setBreadcrumb }) => {
  const [active, setActive] = useState(menuItems);

  return (
    <>
      <div
        className={`${
          collapse ? " lg:col-span-1" : " lg:col-span-3 xl:col-span-2"
        }  transition-all duration-200 relative hidden lg:block `}
      ></div>
      <div
        className={` transition-all duration-200 top-0 lg:top-5 fixed left-[-300px] lg:left-5 h-[95%] bg-gradient-to-t to-slate-800 from-gray-900 rounded-lg   flex flex-col ${
          collapse ? "left-[-5px] lg:w-[90px]" : ""
        } w-[210px] gap-6 text-white z-[10] `}
      >
        <div className="border-b-2 border-gray-700 w-full pb-5 pt-5 flex flex-row items-center lg:justify-center justify-around">
          <div className="flex flex-row  gap-3 ">
            <SiBookstack size={25} />
            <span
              className={`${
                collapse ? "lg:absolute lg:ml-[-200px]" : ""
              }  font-bold capitalize duration-200 transition-all`}
            >
              Opus
            </span>
          </div>
          <BiMenuAltLeft
            onClick={() => setCollapse((prev) => !prev)}
            className="lg:hidden"
          />
        </div>
        <div className="ml-5">
          <ul className="flex flex-col gap-6">
            {active.map((e, index) => (
              <Link
                to={"/admin" + e.url}
                key={e.id}
                className={`${
                  e.name === document.title
                    ? "bg-gray-900"
                    : "hover:bg-slate-900"
                } pl-5  p-3 cursor-pointer  rounded-l-full pr-0 flex flex-row gap-2 items-center `}
              >
                {e.icon}
                <span
                  className={`duration-200 transition-all ${
                    collapse ? "lg:ml-[-200px] lg:opacity-0" : "lg:opacity-2"
                  }`}
                >
                  {e.name}{" "}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

{
  /* <div
        className={` transition-all duration-200 fixed left-[-300px] md:left-5 h-[95%] bg-gradient-to-t to-slate-800 from-gray-900 rounded-lg   flex flex-col ${
          collapse ? "left-0 md:w-[90px]" : ""
        } w-[210px] gap-6 text-white z-[10] `}
      >
        <div className="border-b-2 border-gray-700 w-full pb-5 pt-5 flex flex-row items-center md:justify-center justify-around">
          <div className="flex flex-row  gap-3 ">
            <SiBookstack size={25} />
            <span
              className={`${
                collapse ? "absolute ml-[-200px]" : ""
              }  font-bold capitalize duration-200 transition-all`}
            >
              Opus
            </span>
          </div>
          <BiMenuAltLeft onClick={()=> setCollapse(prev => !prev)} className="md:hidden"/>
        </div>
        <div className="ml-5">
          <ul className="flex flex-col gap-6">
            {active.map((e, index) => (

              <Link
               to={"/admin"+e.url}
                key={e.id}
              
                className={`${
                  e.name === document.title ? "bg-gray-900" : "hover:bg-slate-900"
                } pl-5  p-3 cursor-pointer  rounded-l-full pr-0 flex flex-row gap-2 items-center `}
              >
                {e.icon}
                <span className={`duration-200 transition-all ${collapse ? "md:ml-[-200px] md:opacity-0" : "md:opacity-2"}`}>{e.name } </span>
              </Link>
            ))}
          </ul>
        </div>
      </div> */
}
