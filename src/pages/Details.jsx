import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { baseUrl, getID, isAuthenticated } from "../assets/constants";
import axios from "axios";
import Gallery from "../components/Gallery";
import toast, {Toaster}from "react-hot-toast";
const Details = ({ getItems,getDetails,details,dLoading,setOk}) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
 console.log(details)

  const addToCart = async () => {
    if (isAuthenticated()) {
      const formData = {
        book_id: details[0].id,
        c_id: getID(),
        qty: qty,
      };

      const apiUrl = `http://${baseUrl}:5000/cart`;

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const msg = response.data.message
        if(msg.includes("Stocks"))
          toast.error(msg)
        else toast.success(msg)
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
  useEffect(() => {
    setOk(id)
    getDetails(id);
  }, [id]);

  return (
    <>
      <section className="  bg-white flex flex-col items-center justify-center ">
      <Toaster
        toastOptions={{
          className:
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
        }}
      />
        {dLoading ? (
          <div className="bg-white h-screen flex justify-center">
            <ScaleLoader className="self-center" />
          </div>
        ) : details.length === 0 ? (
<div className="bg-white h-screen flex items-center">
<p className="text-4xl font-semibold">NO RESULTS FOUND</p>

</div>        ) : (
          <>
          <div className="p-10  bg-white  m-5 mt-20 max-w-[850px]  gap-5 items-center sm:items-start sm:gap-10 flex-col flex sm:flex-row">
            <img
              src={details[0].image}
              className="w-64 h-96 rounded-md shadow-2xl"
            />
            <div className="flex flex-col gap-4">
              <p className="font-bold text-6xl">{details[0].title}</p>
              <p>
                by{" "}
                <span className="text-green-500 text-2xl font-semibold">
                  {details[0].author}
                </span>
              </p>
              <p className="text-2xl font-semibold">₱ {details[0].price.toLocaleString()}.00</p>
              <p className="text-slate-700">Stocks left: ( <span className="text-red-600">{details[0].stock}</span> )</p>
              <h3 className="text-xl font-medium text-slate-700">Description</h3>
              <p className="text-xl font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                eligendi iusto hic tempora quam ullam ab animi repellat a id.
                Maxime, sapiente eos? Libero at atque ratione dolore vel sit!
              </p>

              <div className="flex flex-row gap-10 bg-slate-200 rounded-lg shadow-xl self-start p-2 items-center justify-center">
                <span
                  className="text-xl cursor-pointer select-none"
                  onClick={() => setQty((prev) => {
                    if(prev === details[0].stock || details[0].stock === 0) 
                      return prev
                    return prev + 1
                  })}
                >
                  +
                </span>
                <span>{qty}</span>
                <span
                  className="text-xl cursor-pointer select-none"
                  onClick={() => setQty((prev) => prev === 1 ? 1 : prev - 1)}
                >
                  -
                </span>
              </div>
              <div className="flex flex-row gap-3 mt-4">
                <button
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 duration-200"
                  onClick={details[0].stock === 0 ? ()=>toast.error("Out of Stocks") :addToCart}
                >
                  Add to Cart
                </button>
                {/* <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-800 duration-200">
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>
          <Gallery limit={20} title="You may also like"/>
          </>
        )}
        
      </section>
     
        
       

    </>
  );
};

export default Details;
