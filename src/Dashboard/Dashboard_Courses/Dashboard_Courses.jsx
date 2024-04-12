
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Dashboard_Courses() {
    const [active, setActive] = useState("Current");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.split("/")[3] == "Requests")
            setActive("Requests");
        else setActive("Current");
    }, [location.pathname]);

    return (
        <div>
            <div className="select-none flex items-center justify-center gap-2 md:gap-10 py-6 text-lg md:text-2xl">
                <Link
                    to={"/Dashboard/Courses"}
                    className={`${
                        active == "Current"
                            ? "underline text-green"
                            : "text-gray"
                    }`}
                >
                    Current Courses
                </Link>
                <Link
                    to={"/Dashboard/Courses/Requests"}
                    className={`select-none ${
                        active == "Requests"
                            ? "underline text-green"
                            : "text-gray"
                    }`}
                >
                    Courses Requests
                </Link>
            </div>
            <Outlet />
        </div>
    );
}

export default Dashboard_Courses;
