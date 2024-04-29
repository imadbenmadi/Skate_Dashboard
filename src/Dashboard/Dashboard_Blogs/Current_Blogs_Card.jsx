import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
import img from "../../../public/wallpaper.jpg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Formate_Date } from "../../Logic/Formate_Date";
function Current_Blogs_Card({ item, onDelete }) {
    const [showDescription, setShowDescription] = useState(false);
    const Navigate = useNavigate();
    function toggleDescription() {
        setShowDescription(!showDescription);
    }

    async function handle_delete_Blog(Blog) {
        try {
            const response = await axios.delete(
                `https://backend.skate.dz/Dashboard/Blogs/${Blog._id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 200) {
                onDelete();
                swal.fire("Blog Deleted Successfully", "", "success");
            } else if (response.status == 404) {
                swal.fire(
                    " Blog Not found ",
                    " Refresh the page please",
                    "info"
                );
            } else if (response.status == 401) {
                swal.fire({
                    title: "Unauthorised Action",
                    text: "You should Login again ",
                    icon: "error",
                    confirmButtonColor: "#3085d6",

                    confirmButtonText: "Go to Admin Login Page",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Navigate("/Dashboard_Login");
                    }
                });
            } else {
                swal.fire(
                    "Could not delete Blog",
                    `${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            swal.fire(
                "Could not delete Blog",
                "Please Try again Latter",
                "error"
            );
        }
    }

    return (
        <div className="w-full flex flex-wrap justify-between border-b-4 border-b-gray_white">
            <div className=" w-full md:w-[90%]">
                <div className="relative overflow-hidden py-5 px-5 flex flex-col md:flex-row shrink-0 justify-start h-fit">
                    <img
                        className="md:w-[30%]  md:h-[200px] object-cover"
                        src={`https://backend.skate.dz/Blogs/${item.Image}`}
                        alt={item.Title}
                    />
                    <div className="md:w-[70%] md:pl-6 py-4 flex break-words">
                        <div className="w-[90%] ">
                            {item.Title && (
                                <p className="font-bold text-xl mb-2 overflow-hidden">
                                    {item.Title}
                                </p>
                            )}
                            {item.Text && (
                                <p className="text-gray text-base">
                                    {item.Text}
                                </p>
                            )}
                            {item.Date && (
                                <p className="text-gray font-semibold text-xl pt-4">
                                    {Formate_Date(item.Date)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center gap-6 md:hidden">
                    <Link
                        to={`/Dashboard/Blogs/${item._id}/Edit`}
                        className="select-none flex items-center justify-start md:gap-2 text-white text-xl bg-green px-1 md:px-2  py-1 rounded md:w-[100px]"
                    >
                        <MdEdit /> Edit
                    </Link>
                    <div
                        className="flex items-center justify-start md:gap-2 cursor-pointer text-white bg-red-600 text-xl px-1 md:px-2 py-1 rounded md:w-[100px]"
                        onClick={() => {
                            swal.fire({
                                title: "Are you sure you want to delete this Blog ?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "red",
                                cancelButtonColor: "green",
                                confirmButtonText: "Yes Delete it",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handle_delete_Blog(item);
                                }
                            });
                        }}
                    >
                        <MdDelete />
                        Delete
                    </div>
                </div>
                {showDescription ? (
                    <div className="w-[80%] pl-8 py-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowUp />
                        </div>
                        <div className="pb-4">
                            {item.Description && (
                                <p className="text-gray text-base">
                                    {item.Description}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-[80%] pl-8 py-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowDown />
                        </div>
                    </div>
                )}
            </div>

            <div className=" hidden  w-[10%] md:flex flex-col items-center justify-start pt-6 gap-4 pr-5">
                <Link
                    to={`/Dashboard/Blogs/${item._id}/Edit`}
                    className="select-none flex items-center justify-start gap-2 text-white text-xl bg-green px-2 py-1 rounded w-[100px]"
                >
                    <MdEdit /> Edit
                </Link>
                <div
                    className="flex items-center justify-start gap-2 cursor-pointer text-white bg-red-600 text-xl px-2 py-1 rounded w-[100px]"
                    onClick={() => {
                        swal.fire({
                            title: "Are you sure you want to delete this Blog ?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "red",
                            cancelButtonColor: "green",
                            confirmButtonText: "Yes Delete it",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handle_delete_Blog(item);
                            }
                        });
                    }}
                >
                    <MdDelete />
                    Delete
                </div>
            </div>
        </div>
    );
}

export default Current_Blogs_Card;
