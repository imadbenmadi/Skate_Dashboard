import { useEffect } from "react";
import { TbWorld } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import swal from "sweetalert2";

function Navbar({ Active_nav, setActive_nav, openNav, SetOpenNav, userId }) {
    const Navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[2]);
    }, [location.pathname]);

    return (
        <div className=" w-full shrink-0 h-full overflow-y-auto custom-overflow">
            {openNav ? (
                <>
                    <IoClose
                        className=" text-4xl text-green  mb-8 cursor-pointer mt-6 text-center m-auto"
                        onClick={() => SetOpenNav(false)}
                    />
                    <div className=" flex flex-col gap-12 ml-4">
                        {/* nav items */}
                        <Link
                            to={`/Dashboard/Users`}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Users" && "text-green"
                            } ${Active_nav !== "Users" ? "text-white" : ""}`}
                        >
                            <HiMiniUsers />
                            <div>Users</div>
                        </Link>
                        <Link
                            to={`/Dashboard/Services`}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Services" && "text-green"
                            } ${Active_nav !== "Services" ? "text-white" : ""}`}
                        >
                            <FaHandshake />
                            <div>Services</div>
                        </Link>
                        <Link
                            to={`/Dashboard/Courses`}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Courses" && "text-green"
                            } ${Active_nav !== "Courses" ? "text-white" : ""}`}
                        >
                            <FaBook />
                            <div>Courses</div>
                        </Link>
                        <Link
                            to={`/Dashboard/Events`}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Events" && "text-green"
                            } ${Active_nav !== "Events" ? "text-white" : ""}`}
                        >
                            <FaCalendarCheck />
                            <div>Events</div>
                        </Link>
                        <Link
                            to={`/Dashboard/Blogs`}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Blogs" && "text-green"
                            } ${Active_nav !== "Blogs" ? "text-white" : ""}`}
                        >
                            <IoIosPaper />
                            <div>Blogs</div>
                        </Link>

                        <div
                            className={` flex items-center gap-1 cursor-pointer text-xl text-white `}
                            onClick={() => {
                                swal.fire({
                                    title: "Leaving the Dashboard ?",
                                    text: "You will be obliged to reLogin to access the Dashboard again",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "red",
                                    cancelButtonColor: "green",
                                    confirmButtonText: "Yes Leave it",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Navigate("/");
                                    }
                                });
                            }}
                        >
                            <TbWorld />
                            <div className="text-sm">Back to the Website</div>
                        </div>
                    </div>
                </>
            ) : (
                <div className=" flex flex-col items-center justify-center gap-10 text-xl">
                    <IoMenu
                        className=" text-4xl text-green  cursor-pointer mt-6"
                        onClick={() => SetOpenNav(true)}
                    />
                    {/* <div className=" w-full h-[1px] bg-white"></div> */}
                    {/* nav items */}

                    <Link
                        to={`/Dashboard/Users`}
                        className={`text-lg select-none flex items-center gap-3 cursor-pointer ${
                            Active_nav === "Users" ? "text-green" : "text-white"
                        }`}
                    >
                        <HiMiniUsers />
                    </Link>
                    <Link
                        to={`/Dashboard/Services`}
                        className={`text-2xl select-none flex items-center gap-3 cursor-pointer ${
                            Active_nav === "Services"
                                ? "text-green"
                                : "text-white"
                        }`}
                    >
                        <FaHandshake />
                    </Link>
                    <Link
                        to={`/Dashboard/Courses`}
                        className={`select-none flex items-center gap-3 cursor-pointer ${
                            Active_nav === "Courses"
                                ? "text-green"
                                : "text-white"
                        }`}
                    >
                        <FaBook />
                    </Link>
                    <Link
                        to={`/Dashboard/Events`}
                        className={`select-none flex items-center gap-3 cursor-pointer ${
                            Active_nav === "Events"
                                ? "text-green"
                                : "text-white"
                        }`}
                    >
                        <FaCalendarCheck />
                    </Link>
                    <Link
                        to={`/Dashboard/Blogs`}
                        className={`select-none flex items-center gap-3 cursor-pointer ${
                            Active_nav === "Blogs"
                                ? "text-green"
                                : "text-white"
                        }`}
                    >
                        <IoIosPaper />
                    </Link>

                    <div
                        className={` flex items-center gap-3 cursor-pointer text-xl pt-4 text-white  `}
                        onClick={() => {
                            swal.fire({
                                title: "Leaving the Dashboard ?",
                                text: "You will be obliged to reLogin to access the Dashboard again",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "red",
                                cancelButtonColor: "green",
                                confirmButtonText: "Yes Leave it",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Navigate("/");
                                }
                            });
                        }}
                    >
                        <TbWorld />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
