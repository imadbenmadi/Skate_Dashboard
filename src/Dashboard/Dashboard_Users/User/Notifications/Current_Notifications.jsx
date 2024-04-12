import { useOutletContext } from "react-router-dom";
import { PiWarningCircleBold } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Formate_Date } from "../../../../Logic/Formate_Date";
// import logo from "../../../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { LuMailOpen } from "react-icons/lu";
import { useLocation } from "react-router-dom";
function Current_Notifications() {
    const location = useLocation();
    const [user, setUser] = useOutletContext();
    if (!user) return null;
    const Notifications = user.Notifications;
    const userId = location.pathname.split("/")[3];
    const [showDescription, setShowDescription] = useState(false);
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    if (!Notifications) return (
        <div className="pt-4">
            <Link
                to={`/Dashboard/Users/${userId}`}
                className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1"
            >
                <IoMdArrowRoundBack />
                <div>Back to user</div>
            </Link>
            <div className="text-center text-gray font-semibold text-2xl">
                Current User Notifications:
            </div>
            <div className="text-center text-gray font-semibold text-2xl flex items-center gap-4">
                <LuMailOpen />
                No Notifications
            </div>
        </div>
    );
    return (
        <div className="pt-4">
            <Link
                to={`/Dashboard/Users/${userId}`}
                className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1"
            >
                <IoMdArrowRoundBack />
                <div>Back to user</div>
            </Link>
            <div className="text-center text-gray font-semibold text-2xl">
                Current User Notifications:
            </div>
            <div>
                {Notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`notification flex items-center justify-start gap-2 px-2 py-5 border-b border-gray`}
                    >
                        <div className="text-5xl text-gray">
                            {notification.Type === "verify" ? (
                                <PiWarningCircleBold />
                            ) : notification.Type === "contact" ? (
                                <MdOutlineMailOutline />
                            ) : notification.Type === "event" ? (
                                <RiCalendarEventLine />
                            ) : notification.Type === "course" ? (
                                <FaBookOpen />
                            ) : notification.Type === "service" ? (
                                <FaRegHandshake />
                            ) : (
                                // <img src={logo} alt="logo" className="w-14" />
                                <span></span>
                            )}
                        </div>
                        <div className="flex flex-col w-full relative">
                            <h3 className="font-bold mb-1">
                                {notification.Title}
                            </h3>
                            <p className="mb-4">{notification.Text}</p>
                            {notification.Type !== "verify" &&
                                notification.Date && (
                                    <p className="text-xs absolute bottom-0 right-0">
                                        {Formate_Date(notification.Date)}
                                    </p>
                                )}
                        </div>
                        {notification.Description && (
                            <div>{notification.Description}</div>
                        )}
                        {showDescription ? (
                            <div className="w-[80%] pl-8 py-4">
                                <div
                                    className="flex gap-2 items-center justify-start underlined pb-4 cursor-pointer"
                                    onClick={toggleDescription}
                                >
                                    Hide Description <FaArrowUp />
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
                ))}
            </div>
        </div>
    );
}

export default Current_Notifications;
