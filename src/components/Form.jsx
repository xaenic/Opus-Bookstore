import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const Form = ({title,apiUrl,msg}) => {

    const [loading, setLoading] = useState(msg.includes('Up'));
    const navigate = useNavigate();
    const [status, setStatus] = useState("text-white");
    const fields = {
      books: ["ISBN", "TYPE", "GENRE", "PRICE", "TITLE", "AUTHOR", "IMAGE"],
      customers: ["NAME", "EMAIL", "ADDRESS", "PASSWORD"],
      genre: ["NAME", "DATE"],

    };
  
    const handleFormSubmit = () => {
      setStatus("text-slate-600");
      setLoading(true);
      const formData = {};
      fields[title.toLowerCase()].forEach((e) => {
        const inputElement = document.querySelector(`input[name=${e}]`);
  
        formData[e] = inputElement.value;
      });
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const ok = toast.success(msg);
          // Handle the response from the API
          console.log("API Response:", data);
          navigate(`/admin/${title.toLowerCase()}`);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setLoading(false);
        });
    };
    const fetchDetails = async () => {
        if(!msg.includes('Up')) return;
      try {
        const response = await fetch(apiUrl.replace("edit", "get"));
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.results.length === 0) {
          toast.error(`${id} not found.`);
          navigate("/admin/" + title);
          return;
        }
        fields[title.toLowerCase()].forEach((e) => {
          const inputElement = document.querySelector(`input[name=${e}]`);
          inputElement.value = data.results[0][e.toLowerCase()];
        });
        setLoading(false);
      } catch {
        toast.error(`An error occured.`);
        navigate("/admin/" + title);
      }
    };
    useEffect(() => {
      fetchDetails();
    }, []);
  return (
    <form
    onSubmit={(e) => {
      e.preventDefault(); // Prevent the default form submission
      handleFormSubmit(); // Call your function to send the data to the Python API
    }}
    className="grid grid-cols-2 gap-6 relative bg-gradient-to-r  from-slate-800 to-gray-900 p-10 rounded-lg"
  >
     
    {loading && (
     <ClipLoader
     className="absolute top-0 m-auto left-0 right-0 bottom-0"
     color="#ffff"
   />
    )}
    {fields[title.toLowerCase()].map((e, index) => (
      <div  key={e} className="w-full  gap-3">
        <label className={`${status}`}>{e}</label>
        <input
          required
         
          className={`w-full p-2 border-none outline-none bg-slate-700 ${status} rounded-md`}
          autoComplete="off"
          type="text"
          name={e}
        />
      </div>
    ))}
    <input
      type="submit"
      value="Save"
      className="self-end rounded-md font-bold p-3 text-sm bg-blue-600"
    />
  </form>
  )
}

export default Form