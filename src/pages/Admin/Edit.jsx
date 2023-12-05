import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Form from "../../components/Form";
import { baseUrl } from "../../assets/constants";
function Edit({ title ,setPageTitle}) {
  const { id } = useParams();
  
  useEffect(() => {
    // Set the page title when the component mounts or when 'title' changes
    setPageTitle(title);
    document.title = title;
  }, [title, setPageTitle]);
  const apiUrl = `http://${baseUrl}:5000/edit/${title.split(',')[0]}/${id}`;
  return (
    <>
      <div className="mb-4 w-full p-3 bg-slate-800 to-gray-900 text-slate-500 rounded-lg">
        <Link to={`/admin/${title.split(',')[0]}/`} className="text-blue-500">
          Back
        </Link>
      </div>
    <Form title={title.split(',')[0]} apiUrl={apiUrl} msg="Updated Successfully!"/>
    </>
  );
}

export default Edit;
