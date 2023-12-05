import React, { useEffect, useState } from "react";
import wave from "../assets/wave.png";
import axios from "axios";
import illustration from "../assets/login.png";
import { baseUrl, isAdminAuth, isAuthenticated } from "../assets/constants";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();

  console.log(isAuthenticated())

  useEffect (()=> {
    if(isAuthenticated() && isAdminAuth) return navigate('/admin')
    if(isAuthenticated()) return navigate('/')
  },[])
 
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const apiUrl = `http://${baseUrl}:5000/login`;

  const fields = ["username", "password"];
  const handleFormSubmit = async () => {
    setStatus("text-slate-600");
    setLoading(true);
    const formData = {};

    fields.forEach((e) => {
      const inputElement = document.querySelector(`input[name=${e}]`);
      formData[e] = inputElement.value;
    });

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.access_token);
        toast.success(response.data.message);

        navigate("/admin");
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      // Display error message to the user

      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4  lg:justify-center">
      <Toaster
        toastOptions={{
          className:
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
        }}
      />
      <div className="flex flex-col overflow-hidden  bg-slate-800 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 h-full text-slate-800 bg-white md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Opus</a>
          </div>
          <p className=" font-normal text-center text-gray-600 md:mt-0">
            With the power of K-WD, you can now focus only on functionaries for
            your digital products, while leaving the UI design on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 mb-7 text-center">
            <span>Don't have an account?</span>
            <a href="#" className="underline">
              Get Started!
            </a>
          </p>
        </div>
        <div className="p-5 bg-slate-800 md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-white">
            Account Login
          </h3>
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handleFormSubmit(); // Call your function to send the data to the Python API
            }}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="username"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-white"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
