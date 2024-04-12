import { IoWarning } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "../../../Components/ErrorPage";
import Requests_item from "./Requests_item";
import Search from "./Search_Request";

function Requests() {
    const [Requests, setRequests] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const fetch_Requests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:3000/Dashboard/Courses/Requests",
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                setRequests(response.data.requests);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch_Requests();
    }, []);
    useEffect(() => {}, [Requests]);
    const handleDeleteRequest = (RequestId) => {
        setRequests((prevRequests) =>
            prevRequests.filter((Request) => Request._id !== RequestId)
        );
    };

    if (loading)
        return (
            <div className=" w-[100%] h-[200px] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (error) {
        return <ErrorPage />;
    }
    if (!Requests) return null;
    if (Requests.length === 0)
        return (
            <div className=" flex justify-center items-center gap-1 text-2xl text-gray pt-8">
                <IoWarning />
                No Courses Requests for the moment
            </div>
        );
    return (
        <div className="relative shadow-md mt-[20px]">
            <div className=" flex items-center">
                <Search setSearch={setSearch} />
            </div>
            <table className="w-full text-sm rtl:text-right text-black_text relative  ">
                <thead className="text-xs uppercase text-center h-[40px] sticky top-0 bg-white">
                    <tr className="border-y-2">
                        <th scope="col" className="border">
                            User name
                        </th>
                        <th scope="col" className="border">
                            Telephone
                        </th>
                        <th scope="col" className="border">
                            Email
                        </th>
                        <th scope="col" className="border">
                            Date
                        </th>
                        <th scope="col" className=" border">
                            Course Title
                        </th>
                        <th scope="col" className=" border">
                            Course Price
                        </th>
                        <th scope="col" className="border">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Requests.length == 0 && (
                        <tr className="bg-gray_white  h-[40px] text-center">
                            <td
                                colSpan="8"
                                className="border-y-2 py-2 text-sm text-gray"
                            >
                                <div className="  flex justify-center items-center gap-1">
                                    <IoWarning />
                                    No Request found
                                </div>
                            </td>
                        </tr>
                    )}
                    {!search &&
                        Requests.map((request, index) => (
                            <Requests_item
                                request={request}
                                key={index}
                                onDelete={() =>
                                    handleDeleteRequest(request._id)
                                }
                            />
                        ))}
                    {search &&
                        Requests.filter(
                            (request) =>
                                request.User.FirstName.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.User.LastName.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.User.Email.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.User.Telephone.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.Course.Title.toLowerCase().includes(
                                    search.toLowerCase()
                                )
                        ).map((request, index) => (
                            <Requests_item
                                request={request}
                                key={index}
                                onDelete={() =>
                                    handleDeleteRequest(request._id)
                                }
                            />
                        ))}
                    {search &&
                        Requests.filter(
                            (request) =>
                                request.User.FirstName.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.User.LastName.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.User.Email.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.User.Telephone.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                request.Course.Title.toLowerCase().includes(
                                    search.toLowerCase()
                                )
                        ).length === 0 && (
                            <tr className="  h-[80px] text-center ">
                                <td
                                    colSpan="8"
                                    className=" py-2  text-gray text-xl"
                                >
                                    <div className="flex justify-center items-center gap-1">
                                        <IoWarning className="text-red-600 text-3xl" />
                                        No Requests match the search query
                                    </div>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}

export default Requests;
