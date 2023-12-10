import React, { useState, useEffect } from "react";
import { baseUrl, getID } from "../assets/constants";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOrders = async (id) => {
    setLoading(true);
    const apiUrl = `http://${baseUrl}:5000/orders/${id}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setOrders(data.results);
      setLoading(false);
      console.log(data);
    } catch (err) {
      setLoading(false);

      console.log(err);
      //   navigate("/logout");
    }
  };
  let total = 0;
  useEffect(() => {
    getOrders(getID());
  }, []);
  return (
    <div className="bg-white m-auto flex justify-center">
      <div className=" ">
        {loading ? (
          <p className="h-screen bg-white">
            <ScaleLoader />
          </p>
        ) : orders.length === 0 ? (
          <p>No Orders yet</p>
        ) : (
          orders.map((e) => (
            <>
            {<p className="hidden">{total = 0}</p>}
            <div className="bg-slate-100 mt-4 flex flex-col p-5 w-96 sm:w-[720px] lg:w-[800px] ">
              <p>Date Ordered: {e.date.replace("00:00:00 GMT", "")}</p>
              <hr className="my-5" />
              {e.items.map((j) => (
                <>
                  {<p className="hidden">{total += parseInt(j.price)}</p>}
                  <div className="flex flex-row items-center gap-4">
                    <img src={j.image} className="w-16 h-20 rounded-md" />
                    <div className="w-full">
                      <p>{j.title}</p>
                      <p> by {j.author}</p>
                      <p className="text-right text-red-600">
                        ₱{j.price.toLocaleString()}.00
                      </p>
                      <p>x{j.qty}</p>
                    </div>
                  </div>
                  <hr className="my-5" />
                </>
              ))}
              <div className="w-full flex justify-end">Order Total: <span className="ml-2 text-red-600"> ₱</span> <p className="font-semibold text-red-600">{total.toLocaleString()}.00</p></div>
            </div>
            </>
          ))
        )}
        
      </div>
    </div>
  );
};

export default Orders;
