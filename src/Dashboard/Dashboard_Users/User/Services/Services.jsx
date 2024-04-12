
import { useOutletContext } from "react-router";
import { IoWarning } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Card from "./Card";
function Services() {
    const [user, setUser] = useOutletContext();
    if (!user) return null;
    const userId = user._id;

    if (user.Services && Array.isArray(user.Services)) {
        if (user.Services.length === 0)
            return (
                <div className="pt-4 ">
                    <Link
                        to={`/Dashboard/Users/${userId}`}
                        className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
                    >
                        <IoMdArrowRoundBack />
                        <div>Back to user</div>
                    </Link>
                    <div className=" flex text-gray items-center justify-center text-2xl pt-4 gap-2  ">
                        <IoWarning className=" text-2xl" />
                        <div className="text-center text-gray">
                            No Services Owned by this user
                        </div>
                    </div>
                </div>
            );
        else {
            return (
                <div className=" pt-4 ">
                    <Link
                        to={`/Dashboard/Users/${userId}`}
                        className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
                    >
                        <IoMdArrowRoundBack />
                        <div>Back to user</div>
                    </Link>
                    <div className=" text-2xl pl-4 text-gray underline">
                        Enrolled Services
                    </div>
                    {user.Services.map((Service, index) => (
                        <Card Service={Service} index={index} />
                    ))}
                </div>
            );
        }
    }
    return (
        <>
            <Link
                to={`/Dashboard/Users/${userId}`}
                className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
            >
                <IoMdArrowRoundBack />
                <div>Back to user</div>
            </Link>
            <div className=" flex text-gray items-center gap-2 pt-4 ">
                <IoWarning className=" text-2xl" />
                <div className="text-center text-gray">
                    No Services Owned by this user
                </div>
            </div>
        </>
    );
}

export default Services;
