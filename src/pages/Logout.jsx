import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.clear();
  useEffect(()=> {
    navigate("/");
  })
  return <div>Logout</div>;
};

export default Logout;
