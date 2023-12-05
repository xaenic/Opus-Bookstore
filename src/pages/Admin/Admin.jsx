import React, { useEffect } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

function Admin({ title, setPageTitle }) {
  useEffect(() => {
    // Set the page title when the component mounts or when 'title' changes
    setPageTitle(title);
    document.title = title;
  }, [title, setPageTitle]);
  return (
  <>
   <div className="items-center text-sm sm:text-md mb-4 w-full p-3 bg-slate-800 to-gray-900 text-slate-500 rounded-lg flex flex-row justify-between">
       <div>
       <span className="text-green-500">Create</span>, <span className="text-slate-300">Read</span>,
        <span className="text-blue-500"> Update</span> and
        <span className="text-rose-500"> Delete</span> {title} data.
       </div>
       <Link to={`/admin/${title}/create`} className="bg-blue-600 hover:bg-blue-500 p-2 text-white rounded-lg">Create</Link>
  </div>
  <Table key={title.toLowerCase()} title={title} />
  
  </>);
}

export default Admin;
