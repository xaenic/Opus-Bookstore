import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Table = ({ title }) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const we = queryParams.get("page");
  const [page, setPage] = useState(we ? parseInt(we) : 1);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getLists = async (np) => {
    console.log("wala");
    try {
      const apiUrl = `http://localhost:5000/${title}/${np ? np : page}/10`;

      const response = await fetch(apiUrl, { signal });

    if (signal.aborted) {
      // If the request was aborted, exit the function
      console.log('Request was aborted');
      return;
    }
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      navigate(`?page=${page}`);
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err)
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("kayat");
    getLists();
    document.title = title;
    return () => {
      controller.abort();
    };
   
  }, [page]);
  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : error ? <p>error </p>: (
        <div className="w-[99%] overflow-x-auto  shadow-md sm:rounded-lg">
          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-gradient-to-l to-slate-800 from-gray-900 uppercase ">
              <tr>
                {data.results.length !== 0 &&
                  Object.keys(data.results[0])
                    .sort((a, b) => a.length - b.length)
                    .map((key, index) => (
                      <th scope="col" key={index} className="px-6 py-3">
                        {key.toUpperCase()}
                      </th>
                    ))}
                {data.results.length !== 0 && (
                  <th scope="col" className="p-4">
                    ACTIONS
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.results.map((e) => (
                <tr key={e['id']} className="odd:bg-gray-800 bg-slate-900">
                  {Object.keys(data.results[0])
                    .sort((a, b) => a.length - b.length)
                    .map((key, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {(e[key] + "").includes("https") ? (
                          <img className="w-10 h-5  rounded-md" src={e[key]} />
                        ) : (
                          e[key]
                        )}
                      </td>
                    ))}

                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
