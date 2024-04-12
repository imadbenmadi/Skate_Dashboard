import  { useEffect } from "react";
import logo from "../../public/skate_circle.png";
import { TbWorld } from "react-icons/tb";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBook } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar({ Active_nav, setActive_nav }) {
    const Navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[2]);
    }, [location.pathname]);
    return (
        <div className=" w-full h-full overflow-auto custom-overflow">
            <div className=" flex gap-3 items-center text-xl md:text-4xl text-green justify-center pt-4 ">
                <div>
                    <img src={logo} alt="logo" className=" w-8 md:w-12" />
                </div>
                <div>Skate</div>
            </div>
            <div className=" w-full h-[1px] bg-white my-6"></div>
            {/* nav items */}

            <div className=" w-[95%]  md:w-[80%] m-auto text-white text-sm md:text-xl  lg:text-2xl flex flex-col gap-10 mt-8">
                {/* <Link
                    to={"/Dashboard"}
                    className={` flex items-center cursor-pointer ${
                        !location.pathname.split("/")[2] && "text-green "
                    }`}
                >
                    <MdSpaceDashboard />
                    <div>Dashboard</div>
                </Link> */}
                <Link
                    to={"/Dashboard/Users"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Users" && "text-green"
                    }`}
                >
                    <HiMiniUsers />
                    <div>Users</div>
                </Link>
                <Link
                    to={"/Dashboard/Services"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Services" && "text-green"
                    }`}
                >
                    <FaHandshake />
                    <div>Services</div>
                </Link>
                <Link
                    to={"/Dashboard/Courses"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Courses" && "text-green"
                    }`}
                >
                    <FaBook />
                    <div>Courses</div>
                </Link>
                <Link
                    to={"/Dashboard/Events"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Events" && "text-green"
                    }`}
                >
                    <FaCalendarCheck />
                    <div>Events</div>
                </Link>
                <Link
                    to={"/Dashboard/Blogs"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Blogs" && "text-green"
                    }`}
                >
                    <IoIosPaper />
                    <div>Blogs</div>
                </Link>
                <div
                    className={` flex items-center gap-3 cursor-pointer text-xl pt-28 `}
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
                    <div>Go to the Website</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
