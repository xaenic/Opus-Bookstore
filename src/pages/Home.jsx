import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import banner from "../assets/banner.jpg";
import { baseUrl, cards } from "../assets/constants.jsx";
import Gallery from "../components/Gallery.jsx";

const Home = () => {
  const [data, setData] = useState([]);
  const [bookId, setBookId] = useState(-1);

  return (
    <>
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
        <Gallery limit={8} title="Featured Books" align="self-start" />
      </div>
    </>
  );
};

export default Home;
