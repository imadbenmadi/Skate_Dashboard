import { IoWarning } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Current_Courses_Card from "./Current_Courses_Card";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "../../Components/ErrorPage";
import Search from "./Search_Courses";
function Current_Courses() {
    const [Courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const fetch_Courses = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/Courses", {
                withCredentials: true,
                validateStatus: () => true,
            });
            if (response.status == 200) {
                setCourses(response.data.courses);
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
        fetch_Courses();
    }, []);
    const handleDeleteCourse = (CourseId) => {
        setCourses((prevCourses) =>
            prevCourses.filter((Course) => Course._id !== CourseId)
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
    if (!Courses) return null;
    else if (Courses.length === 0)
        return (
            <div className=" flex items-center justify-center gap-4 flex-col">
                <div className="pl-4 text-gray font-semibold  text-2xl w-full">
                    <span className="text-green">Skate</span> Courses :
                </div>
                <div className="flex items-center  text-gray text-2xl gap-2 py-8">
                    <IoWarning className="text-2xl" />
                    <div className="text-center text-gray">
                        No courses Found
                    </div>
                </div>
                <Link
                    className="select-none bg-green rounded cursor-pointer text-white text-xl
                     flex items-center gap-2 px-3 py-1 w-fit m-auto"
                    to={"/Dashboard/Courses/Add"}
                >
                    <>
                        <FaPlus />
                        <div>Add Course</div>
                    </>
                </Link>
            </div>
        );
    else {
        return (
            <div>
                <div className="flex flex-wrap items-center justify-around my-5">
                    <div className="pl-4 text-gray font-semibold text-2xl">
                        <span className="text-green">Skate</span> Courses :
                    </div>
                    <div className=" flex items-center">
                        <Search setSearch={setSearch} />
                    </div>
                    <Link
                        className="select-none bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1"
                        to={"/Dashboard/Courses/Add"}
                    >
                        <>
                            <FaPlus />
                            <div>Add Course</div>
                        </>
                    </Link>
                </div>
                <div>
                    {!search &&
                        Courses.map((Course, index) => (
                            <Current_Courses_Card
                                item={Course}
                                key={index}
                                onDelete={() => handleDeleteCourse(Course._id)}
                            />
                        ))}

                    {search &&
                        Courses.filter((Course) =>
                            Course.Title.toLowerCase().includes(
                                search.toLowerCase()
                            )
                        ).map((Course, index) => (
                            <Current_Courses_Card
                                item={Course}
                                key={index}
                                onDelete={() => handleDeleteCourse(Course._id)}
                            />
                        ))}
                    {search &&
                        Courses.filter((Course) =>
                            Course.Title.toLowerCase().includes(
                                search.toLowerCase()
                            )
                        ).length === 0 && (
                            <div className=" py-2  text-gray text-xl h-[80px] ">
                                <div className="flex justify-center items-center w-full text-center gap-1">
                                    <IoWarning className="text-red-600 text-3xl" />
                                    No Courses match the search query
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default Current_Courses;
