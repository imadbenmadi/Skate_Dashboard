import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
import img from "../../../public/wallpaper.jpg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Current_Services_Card({ item, onDelete }) {
    const [showDescription, setShowDescription] = useState(false);
    const Navigate = useNavigate();
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    async function handle_delete_Service(Service) {
        try {
            const response = await axios.delete(
                `http://localhost:3000/Dashboard/Services/${Service._id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                onDelete();
                swal.fire("Service Deleted Successfully", "", "success");
            } else if (response.status == 404) {
                swal.fire(
                    " Service Not found ",
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
                    "Could not delete Service",
                    `${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            swal.fire(
                "Could not delete Service",
                "Please Try again Latter",
                "error"
            );
        }
    }

    return (
        <div className="w-full flex  justify-between border-b-4 border-b-gray_white">
            <div className=" w-full">
                <div className="relative overflow-hidden break-words pt-5 px-5 flex flex-col md:flex-row shrink-0 justify-start h-fit">
                    <img
                        className="md:w-[30%]  md:h-[200px] object-cover"
                        src={`http://localhost:3000/Services/${item.Image}`}
                        alt={item.Title}
                    />
                    <div className="md:w-[70%] md:pl-6 py-4 flex justify-between">
                        <div className="">
                            {item.Title && (
                                <p className="font-bold text-xl mb-2 overflow-hidden">
                                    {item.Title ? item.Title : "No Title"}
                                </p>
                            )}
                            {item.Text && (
                                <p className="text-gray text-base">
                                    {item.Text ? item.Text : "No Text"}
                                </p>
                            )}
                            <p className="text-gray font-semibold text-xl pt-4">
                                {item.Category ? item.Category : "No Category"}
                            </p>
                            {/* {item.Price && (
                                <div className="text-gray pt-2 text-xl font-semibold top-10 right-5 ">
                                    {item.Price} DA
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6 md:hidden">
                    <Link
                        to={`/Dashboard/Services/${item._id}/Edit`}
                        className="select-none flex items-center justify-start md:gap-2 text-white text-xl bg-green px-1 md:px-2  py-1 rounded md:w-[100px]"
                    >
                        <MdEdit /> Edit
                    </Link>
                    <div
                        className="flex items-center justify-start md:gap-2 cursor-pointer text-white bg-red-600 text-xl px-1 md:px-2 py-1 rounded md:w-[100px]"
                        onClick={() => {
                            swal.fire({
                                title: "Are you sure you want to delete this Service ?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "red",
                                cancelButtonColor: "green",
                                confirmButtonText: "Yes Delete it",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handle_delete_Service(item);
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
            <div className="w-[10%] hidden md:flex flex-col items-center justify-start pt-6 gap-4 pr-5">
                <Link
                    to={`/Dashboard/Services/${item._id}/Edit`}
                    className="select-none flex items-center justify-start md:gap-2 text-white text-xl bg-green px-1 md:px-2  py-1 rounded md:w-[100px]"
                >
                    <MdEdit /> Edit
                </Link>
                <div
                    className="flex items-center justify-start md:gap-2 cursor-pointer text-white bg-red-600 text-xl px-1 md:px-2 py-1 rounded md:w-[100px]"
                    onClick={() => {
                        swal.fire({
                            title: "Are you sure you want to delete this Service ?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "red",
                            cancelButtonColor: "green",
                            confirmButtonText: "Yes Delete it",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handle_delete_Service(item);
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

export default Current_Services_Card;
