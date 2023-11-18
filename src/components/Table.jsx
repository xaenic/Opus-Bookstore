import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CiRead } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import GridLoader from "react-spinners/ScaleLoader";
const Table = ({ title }) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const we = queryParams.get("page");
  const [page, setPage] = useState(we ? parseInt(we) : 1);
  const [toDelete, setDelete] = useState(-1);
  const [active, setActive] = useState(-1);
  const [data, setData] = useState({results:[]});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const toastId = toast.loading("Loading...");
    setDelete(-1);
    const apiUrl = `http://localhost:5000/delete/${title}/${toDelete}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data) {
        toast.remove(toastId);
        toast.success("Successfully deleted!");
        getLists();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click target is not inside the dropdown
      if (!e.target.closest(".yawaka")) {
        setActive(-1); // Reset the active state
      }
    };

    // Attach the event listener
    document.body.addEventListener("click", handleDocumentClick);

    // Cleanup: remove the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const getLists = async (np) => {
    try {
      const apiUrl = `http://localhost:5000/${title}/${np ? np : page}/10`;

      const response = await fetch(apiUrl, { signal });

      if (signal.aborted) {
        // If the request was aborted, exit the function
        console.log("Request was aborted");
        return;
      }
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      navigate(`?page=${page}`);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getLists();
    document.title = title;
    return () => {
      controller.abort();
    };
  }, [page]);
  return (
    <>
    

      {loading ? (
        <p className="text-center">
          <GridLoader color="#Ffff" />{" "}
        </p>
      ) : error ? (
        <p>error </p>
      ) : data.results.length === 0 ? <p className="text-center text-4xl font-bold">
      NO DATA FOUND
    </p> :  (
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
              {data.results.map((e, index) => (
                <tr key={e["id"]} className="odd:bg-gray-800 bg-slate-900">
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

                  <td className="px-6 py-4 relative">
                    <BsThreeDotsVertical
                      onClick={() => setActive(e.id)}
                      className="yawaka cursor-pointer select-none"
                    />
                    <div
                      class={`z-10 absolute left-[-70px] ${
                        index === 9 || index === 8
                          ? "top-[-100px]"
                          : index === 0
                          ? "top-[-30px]"
                          : ""
                      }   rounded-lg shadow w-28 bg-slate-700`}
                    >
                      <ul
                        class={`${
                          active !== e.id ? "hidden" : ""
                        } text-sm text-gray-700 dark:text-gray-200 yawaka p-2`}
                        aria-labelledby="dropdownMenuIconButton"
                      >
                        <li className="text-slate-300 flex flex-col">
                          <div className="flex items-center flex-row gap-2 hover:bg-gray-600 p-2 rounded-md cursor-pointer">
                            <CiRead />
                            <span className="font-semibold">View</span>
                          </div>
                          <div className="flex items-center flex-row gap-2 hover:bg-gray-600 p-2 rounded-md cursor-pointer">
                            <FaEdit />
                            <span className="font-semibold">Edit</span>
                          </div>{" "}
                          <div
                            onClick={() => {
                              setDelete(e.id);
                              setActive(-1);
                            }}
                            className="flex items-center flex-row gap-2 hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                          >
                            <MdDelete />
                            <span className="font-semibold">Delete</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full bg-gradient-to-l p-3 flex flex-row justify-center items-center to-slate-800 gap-3 from-gray-900">
            <span className="rounded-md hover:bg-slate-900 transition-colors duration-200 cursor-pointer p-2 bg-slate-700">
              Prev
            </span>
            <span className="rounded-md hover:bg-slate-900 transition-colors duration-200 cursor-pointer p-2 bg-slate-700">
              Next
            </span>
          </div>

          <div
            className={` ${
              toDelete == -1 ? "hidden" : ""
            } flex items-center  flex-col  absolute text-white top-0  left-0 right-0 m-auto bottom-0 h-48 w-80 shadow-lg  bg-slate-800 rounded-lg p-10`}
          >
            <p className="text-lg"> Are you sure?</p>
            <small className="text-sm text-slate-400">
              If you delete the file you can't recover it.
            </small>
            <div className="mt-4 flex flex-row gap-2">
              <button
                className="p-2 bg-green-500 rounded-md"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="p-2 bg-red-500 rounded-md"
                onClick={() => setDelete(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
