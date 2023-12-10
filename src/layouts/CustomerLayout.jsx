import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Details from "../pages/Details";
import Home from "../pages/Home";
import {
  baseUrl,
  getAddress,
  getID,
  isAuthenticated,
} from "../assets/constants";
import { useState } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Orders from "../pages/Orders";
import NotFound from "../pages/NotFound";
import AccountLayout from "./AccountLayout";
import { ScaleLoader } from "react-spinners";
const CustomerLayout = () => {
  const [details, setDetails] = useState([]);
  const [ok, setOk] = useState(0)
  const [loading,setLoading] = useState(true)
  const [dLoading, setDLoading] = useState(true);
  const getDetails = async (id) => {
    setDLoading(true);
    try {
      const apiUrl = `http://${baseUrl}:5000/get/Books/${id}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setDetails(data.results);
      console.log("ok");
      setDLoading(false);
    } catch (err) {
      console.log(err);
      setDLoading(false);
    }
  };
  const navigate = useNavigate();
  const [total, setTotal] = useState(1);

  const [cart, setCart] = useState({ results: [] });
  const getItems = async (id) => {
    setLoading(true)
    const apiUrl = `http://${baseUrl}:5000/cartitems/${id}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      let tt = 0;
      data.results.map((e) => {
        tt += parseFloat(e.price * parseInt(e.qty));
      });
      setTotal(tt);
      setCart(data);
      setLoading(false)
    } catch (err) {
      navigate("/logout");
    }
  };

  const deleteItem = async (id) => {
    const apiUrl = `http://${baseUrl}:5000/deletecart/${id}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("deleted");
      getItems(getID());
    } catch (err) {
      console.log(err);
    }
  };
  if (isAuthenticated()) {
    useEffect(() => {
      const userID = getID();
      getItems(userID);
    }, []);
  }

  const addToCart = async (id, qty, ref, bogo) => {
    if (isAuthenticated()) {
      const formData = {
        book_id: id,
        c_id: getID(),
        qty: qty,
      };
      if (bogo === 1 && ref === "minus") return;
      const apiUrl = `http://${baseUrl}:5000/cart`;

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        if (response.data.status) {
          getItems(getID());
          return;
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    } else {
      navigate("/login");
    }
  };
  const checkout = async () => {
    if (isAuthenticated()) {
      const formData = {
        items: cart.results,
        c_id: getID(),
        address: getAddress(),
      };

      console.log(formData);
      const apiUrl = `http://${baseUrl}:5000/placeorder`;

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.status) {
          toast.success("Order Successfully Placed!");
          getDetails(ok)
          getItems(getID());
          return;
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const [cartAc, setCartAc] = useState(false);
  return (
    <>
      {isAuthenticated() ? (
        <div
          className={`h-full bg-white shadow-2xl fixed top-0 w-[280px] z-10 rounded-lg  flex-col flex gap-6 duration-200 transition-transform right-0 ${
            cartAc ? "" : "hidden"
          }`}
        >
          <span
            className="absolute right-0 top-0 cursor-pointer"
            onClick={() => setCartAc(false)}
          >
            x
          </span>
          <p className="text-center mt-10">Shopping Cart</p>
          <p className="text-xs p-1 bg-slate-500 text-center text-white font-semibold tracking-wider">
            YOUR ORDER QUALIFIES FOR FREE STANDARD SHIPPING -SEE DETAILS
          </p>
          <div className="h-[530px]  overflow-y-auto">
            {loading ?  <div className="w-full flex items-center justify-center"><ScaleLoader className="self-center" /></div> : cart.results.length == 0 ? (
              <p className="text-center text-xl font-semibold text-slate-800">
                {" "}
                NO ITEMS FOUND
              </p>
            ) : (
              cart.results.map((e) => (
                <div className="ml-5 flex flex-row gap-5 border-b-2 pb-4 border-slate-100">
                  <img src={e.image} className="w-24 h-32 rounded-lg" />
                  <div className="flex flex-col gap-2">
                    <p className="text-md font-medium">{e.title}</p>
                    <p className="text-md font-medium">{e.author}</p>
                    <p className="text-md font-medium">₱ {e.price}.00</p>
                    <span className="text-slate-600">
                      {e.stock} Stocks Available
                    </span>
                    <div className="flex flex-row gap-10 bg-slate-200 rounded-lg shadow-xl self-start p-2 items-center justify-center">
                      <span
                        className="text-xl cursor-pointer select-none"
                        onClick={() => {
                          addToCart(e.book_id, +1);
                        }}
                      >
                        +
                      </span>
                      <span>{e.qty}</span>
                      <span
                        className="text-xl cursor-pointer select-none"
                        onClick={() => {
                          addToCart(e.book_id, -1, "minus", e.qty);
                        }}
                      >
                        -
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        deleteItem(e.book_id);
                      }}
                      className="bg-red-600 text-center self-start p-1 px-2 rounded-md text-white cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <hr className="" />
          <div className="flex flex-col gap-3">
            <div className="ml-5 mr-5 flex flex-row justify-between">
              <p className="font-bold text-lg">ORDER TOTAL</p>
              <p className="font-medium text-md">₱{total.toLocaleString()}</p>
            </div>
            {cart.results.length === 0 ? (
              <button
                disabled
                onClick={checkout}
                className="bg-slate-400
                } mx-5 py-4 text-center  text-white font-semibold p-1 rounded-md"
              >
                PROCEED CHECKOUT
              </button>
            ) : (
              <button
                onClick={checkout}
                className="bg-slate-900
                } mx-5 py-4 text-center  text-white font-semibold p-1 rounded-md"
              >
                PROCEED CHECKOUT
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <Navbar cart={cart} setCartAc={setCartAc} />
      <Routes>
        <Route
          path="/details/:id"
          element={
            <Details
              getItems={getItems}
              details={details}
              getDetails={getDetails}
              setOk={setOk}
              dLoading={dLoading}
            />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        {isAuthenticated() ? (
          <>
            {" "}
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Orders />} />
          </>
        ) : null}
      </Routes>
    </>
  );
};

export default CustomerLayout;
