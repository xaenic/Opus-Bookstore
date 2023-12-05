import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import banner from "../assets/banner.jpg";
import shield from "../assets/shield.jpg";
import card from "../assets/card.jpg";
import customer from "../assets/customer.jpg";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLists = async (np) => {
    try {
      const apiUrl = `http://localhost:5000/Books/1/8`;
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

  useEffect(() => {
    getLists();
  }, []);
  const cards = [
    {
      image: shield,
      title: "Money back guarantee",
      desc: "We offer a 100% money back guarantee.",
      id: 1,
    },
    {
      image: card,
      title: "Extensive payment options",
      desc: "PayPal, BPI, credit or debit card, GCash, and BillEase",
      id: 2,
    },
    {
      image: customer,
      title: "We're happy to help!",
      desc: "Contact us anytime at hello@bookshelf.com.ph",
      id: 3,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="bg-white h-screen">
        <section>
          <img src={banner} />
        </section>
        <section className="bg-slate-900  text-white p-10 flex items-center justify-center  flex-col md:flex-row gap-3">
          {cards.map((e) => (
            <div
              key={e.id}
              className="bg-slate-700 w-80 h-80 rounded-md p-2 flex flex-col items-center justify-center gap-3"
            >
              <img src={e.image} className="rounded-full w-28" />
              <p className="text-center text-xl font-semibold">{e.title}</p>
              <span className="text-center text-md text-slate-400">
                {e.desc}
              </span>
            </div>
          ))}
        </section>
        <section className="bg-white flex flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-5 mt-10">
            <p className="text-4xl font-bold">Featured Books</p>
            <span className="text-md text-slate-500 tracking-wider">
              Your next great read is here.
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16">
            {items.map((e) => (
              <div className="flex flex-col items-center justify-center group relative overflow-hidden">
                <div className="relative bg-black">
                <img src={e.image} className=" h-80 w-56 object-cover rounded-md" />
                <button className=" absolute duration-200  transition-all group-hover:bottom-0 bottom-[-100px] left-0 right-0 p-2 pt-4 bg-white "><span className="p-1 border-2 hover:text-white hover:bg-blue-600 duration-200 transition-colors border-blue-500 tracking-wider font-medium text-blue-500">QUICK ADD</span></button>
                </div>
                <span className="text-center p-3">
                  {e.title.slice(0, 20)}
                  {e.title.length > 20 ? "..." : ""}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
