import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { IoCloseSharp } from "react-icons/io5";
import { baseUrl } from "../assets/constants";

const Gallery = ({limit,title,align}) => {
  const [dLoading, setDLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getLists = async (np) => {
    try {
      const apiUrl = `http://${baseUrl}:5000/Books/1/${limit}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setItems(data.results);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getDetails = async (id) => {
    setIsOpen(true);
    setDLoading(true);
    try {
      const apiUrl = `http://${baseUrl}:5000/get/Books/${id}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setDetails(data.results[0]);
      setDLoading(false);
    } catch (err) {
      console.log(err);
      setDLoading(false);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <section className="bg-white flex flex-col items-center">
    <div className="flex flex-col items-center justify-center gap-5">
      <p className={`text-4xl font-bold ${align}`}>{title}</p>
      <span className="text-md text-slate-500 tracking-wider">
        Your next great read is here.
      </span>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16 relative">
      {items.map((e) => (
        <div className="flex flex-col items-center justify-center group relative overflow-hidden">
          <div className="relative rounded-lg ">
            <img src={e.image} className="h-80 w-56 object-cover rounded-md" />
            <button className="absolute duration-200 transition-all group-hover:bottom-0 bottom-[-100px] left-0 right-0 p-2 pt-4 bg-white">
              <span
                onClick={() => getDetails(e.id)}
                className="p-1 border-2 hover:text-white hover:bg-blue-600 duration-200 transition-colors border-blue-500 tracking-wider font-medium text-blue-500"
              >
                QUICK ADD
              </span>
            </button>
          </div>
          <span className="text-center p-3">
            {e.title.slice(0, 20)}
            {e.title.length > 20 ? "..." : ""}
          </span>
        </div>
      ))}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white w-full m-5 sm:w-[700px] shadow-xl rounded-lg p-10 relative flex flex-row items-center justify-center">
          {dLoading ? (
            <ScaleLoader color="black" />
          ) : (
            <div className="relative flex flex-col justify-center items-center sm:flex-row gap-4">
              <img src={details.image} className="rounded-lg shadow-2xl w-36" />
              <div className="flex flex-col gap-1">
                <p>{details.title}</p>
                <p>₱{details.price}</p>
                <p>{details.author}</p>
                <p>{details.genre}</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
                  dolorem itaque dolor quaerat aspernatur cum! Cum unde autem
                  ipsum quidem officia recusandae architecto, repellat quisquam
                  possimus quaerat, praesentium iusto accusamus?
                </p>
                <div className="flex flex-row gap-4 mt-7">
                  <button className="bg-blue-500 text-white p-2 rounded-md">
                    Add to Cart
                  </button>
                  <button className="bg-blue-500 text-white p-2 rounded-md">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            className="absolute top-5 right-5 cursor-pointer rounded-full hover:bg-blue-600 duration-200 transition-all hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseSharp />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Gallery;
