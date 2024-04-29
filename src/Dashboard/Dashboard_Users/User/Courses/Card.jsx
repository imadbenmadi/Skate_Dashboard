import { useOutletContext } from "react-router";
import { IoWarning } from "react-icons/io5";
import img from "../../../../../public/wallpaper.jpg";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert2";
import axios from "axios";
function Card({ course }) {
    const [user, setUser] = useOutletContext();
    if (!user) return null;
    const userId = user._id;
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const Navigate = useNavigate();
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    async function handle_delete_Course(Course) {
        try {
            setDeleteLoading(true);
            const response = await axios.delete(
                `https://backend.skate.dz/Dashboard/Users/${userId}/Courses/${Course._id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                swal.fire("Course Deleted Successfully", "", "success");
                setUser((prevUser) => ({
                    ...prevUser,
                    Courses: prevUser.Courses.filter(
                        (c) => c._id !== Course._id
                    ),
                }));
            } else if (response.status == 404) {
                swal.fire(
                    " Course Not found ",
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
                    "Could not delete Course",
                    `${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            swal.fire(
                "Could not delete Course",
                "Please Try again Latter",
                "error"
            );
        } finally {
            setDeleteLoading(false);
        }
    }
    return (
        <div className="w-full flex justify-between border-b-4 border-b-gray_white">
            <div className=" w-full">
                <div className="relative overflow-hidden py-5 px-5 flex shrink-0 justify-start h-fit">
                    <img
                        className="w-[30%] h-[200px] object-cover"
                        src={img}
                        alt={course.Title}
                    />
                    <div className="w-[70%] pl-6 py-4 flex justify-between">
                        <div className="">
                            {course.Title && (
                                <p className="font-bold text-xl mb-2 overflow-hidden">
                                    {course.Title}
                                </p>
                            )}
                            {course.Text && (
                                <p className="text-gray text-base">
                                    {course.Text}
                                </p>
                            )}
                            {course.Category && (
                                <p className="text-gray font-semibold text-xl pt-4">
                                    {course.Category}
                                </p>
                            )}
                            {/* {course.Price && (
                                <div className="text-gray pt-4  text-xl font-semibold top-10 right-5 ">
                                    {course.Price} DA
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
                {showDescription ? (
                    <div className="w-[80%] pl-8 pb-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowUp />
                        </div>
                        <div className="pb-4">
                            {course.Description && (
                                <p className="text-gray text-base">
                                    {course.Description}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-[80%] pl-8 pb-4">
                        <div
                            className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            Show Description <FaArrowDown />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-[10%] flex flex-col items-center justify-start pt-6 gap-4 pr-5">
                {deleteLoading ? (
                    <div className="flex items-center justify-start gap-2 cursor-pointer text-white bg-red-600 opacity-50 text-xl px-2 py-1 rounded w-[100px]">
                        Loading
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-start gap-2 cursor-pointer text-white bg-red-600 text-xl px-2 py-1 rounded w-[100px]"
                        onClick={() => {
                            swal.fire({
                                title: "Are you sure you want to delete this Course from this user ?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "red",
                                cancelButtonColor: "green",
                                confirmButtonText: "Yes Delete it",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handle_delete_Course(course);
                                }
                            });
                        }}
                    >
                        <MdDelete />
                        Delete
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
