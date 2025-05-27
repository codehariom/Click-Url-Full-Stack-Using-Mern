import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { instance } from "../services/axiosApi";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [url, setUrl] = useState([]);
    // fetch the user name

    const fetchName = async () => {
        try {
            const response = await instance.get("api/user/profile");
            setUser(response.data);
        } catch (error) {
            console.log("Error fetching user name ", error);
        }
    };
    // fecthing the all url details from backend

    const fetchUrl = async () => {
        try {
            const response = await instance.get("api/links");
            console.log(response.data.links);
            
            setUrl(response.data.links);
        } catch (error) {
            console.log("Error Fetching Url", error);
        }
    };

    // delete the url

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this URL?"
        );
        if (!confirmDelete) return;

        try {
            console.log(id);
            await instance.delete(`delete-url/${id}`);

            setUrl((prev) => prev.filter((url) => url._id !== id));

            alert("URL deleted successfully!");
        } catch (error) {
            console.error("Error deleting URL:", error);
            alert("Failed to delete URL.");
        }
    };

    useEffect(() => {
        fetchName();
        fetchUrl();
    }, []);

    return (
        <>
            <div className=" space-y-15 ml-12 pb-10">
                <div className="text-left my-15">
                    <h2 className="mb-10 text-4xl font-bold">
                        Hello! {user?.username}
                    </h2>
                </div>
                <div className=" flex flex-wrap gap-10 columns-2">
                    <div className="bg-black text-white rounded-[6px]  place-items-center border border-gray-600 px-40  py-5 text-center space-y-2 ">
                        <h2 className="text-2xl">Total Links</h2>
                        <p className="text-3xl font-bold">{url.length}</p>
                    </div>
                    <div className="bg-black text-white text-3xl rounded-[6px] border border-gray-600 px-40 py-5 text-center space-y-2">
                        <h2 className="text-2xl">Total Views</h2>
                        <p className="text-3xl font-bold">
                            {url?.reduce(
                                (sum, url) => sum + (url.click || 0),
                                0
                            )}
                        </p>
                    </div>
                    <div className="bg-black text-white w-fit items-center rounded-[6px] cursor-auto border border-gray-600 px-17 py-4">
                        <Link to="/short-url">
                            <button
                                onClick={() => navigate("/short-url")}
                                className="text-3xl flex items-center gap-10 place-item-center "
                            >
                                Create New URL <FaPlusCircle />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="">
                <div className=" grid justify-center place-content-start  px-12  ">
                    <div className=" relative overflow-x-auto shadow-md rounded-lg ">
                        <table className=" text-center  text-white w-full break-normal">
                            <thead className="text-lg  text-white  bg-black">
                                <tr>
                                    <th scope="col" className="px-6  py-3">
                                        Sr.no
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 break-all py-3"
                                    >
                                        Original URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Short URL
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Click
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {url.map((url, index) => {
                                    // console.log(url);
                                    return(
                                    <tr key={url._id || index} className="bg-white border-2 border-gray-300 text-black hover:bg-gray-800 hover:text-white ">
                                        <td
                                            scope="row"
                                            className="px-6 min-w-max py-4  text-gray-900 "
                                        >
                                            {index + 1}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 break-all font py-4"
                                        >
                                            {url.original_url}
                                        </td>
                                        <td scope="row" className="px-6 py-4">
                                            {url.short_url}
                                        </td>
                                        <td scope="row" className="px-6 py-4">
                                            {url.click}
                                        </td>
                                        <td scope="row" className="px-6 py-4">
                                            {new Date(
                                                url.date
                                            ).toLocaleDateString()}
                                        </td>

                                        <td
                                            scope="row"
                                            className="px-10 py-6 items-center "
                                        >
                                            <button
                                                onClick={() => {
                                                    handleDelete(url._id);
                                                }}
                                            >
                                                <MdDeleteForever
                                                    size={30}
                                                    hover:color="black"
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
