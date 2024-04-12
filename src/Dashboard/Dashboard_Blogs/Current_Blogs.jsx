import { IoWarning } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Current_Blogs_Card from "./Current_Blogs_Card";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorPage from "../../Components/ErrorPage";
import Search from "./Search_Blogs";

function Current_Blogs() {
    const [Blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const fetch_Blogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/Blogs", {
                withCredentials: true,
                validateStatus: () => true,
            });
            if (response.status == 200) {
                setBlogs(response.data.blogs);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetch_Blogs();
    }, []);
    const handleDeleteBlog = (BlogId) => {
        setBlogs((prevBlogs) =>
            prevBlogs.filter((Blog) => Blog._id !== BlogId)
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

    if (!Blogs) return null;
    else if (Blogs.length === 0)
        return (
            <div className=" flex flex-wrap items-center justify-center gap-4 flex-col">
                <div className="pl-4 text-gray font-semibold  text-2xl w-full">
                    <span className="text-green">Skate</span> Blogs :
                </div>
                <div className="flex items-center  text-gray text-2xl gap-2 py-8">
                    <IoWarning className="text-2xl" />
                    <div className="text-center text-gray">No Blogs Found</div>
                </div>
                <Link
                    className="select-none bg-green rounded cursor-pointer text-white text-xl
                     flex items-center gap-2 px-3 py-1 w-fit m-auto"
                    to={"/Dashboard/Blogs/Add"}
                >
                    <>
                        <FaPlus />
                        <div>Add Blog</div>
                    </>
                </Link>
            </div>
        );
    else {
        return (
            <div>
                <div className="flex flex-wrap items-center justify-around my-5">
                    <div className="pl-4 text-gray font-semibold text-2xl">
                        <span className="text-green">Skate</span> Blogs :
                    </div>
                    <div className=" flex items-center">
                        <Search setSearch={setSearch} />
                    </div>
                    <Link
                        className="select-none bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1"
                        to={"/Dashboard/Blogs/Add"}
                    >
                        <>
                            <FaPlus />
                            <div>Add Blog</div>
                        </>
                    </Link>
                </div>
                <div>
                    {!search &&
                        Blogs.map((Blog, index) => (
                            <Current_Blogs_Card
                                item={Blog}
                                key={index}
                                onDelete={() => handleDeleteBlog(Blog._id)}
                            />
                        ))}

                    {search &&
                        Blogs.filter((Blog) =>
                            Blog.Title.toLowerCase().includes(
                                search.toLowerCase()
                            )
                        ).map((Blog, index) => (
                            <Current_Blogs_Card
                                item={Blog}
                                key={index}
                                onDelete={() => handleDeleteBlog(Blog._id)}
                            />
                        ))}
                    {search &&
                        Blogs.filter((Blog) =>
                            Blog.Title.toLowerCase().includes(
                                search.toLowerCase()
                            )
                        ).length === 0 && (
                            <div className=" py-2  text-gray text-xl h-[80px] ">
                                <div className="flex justify-center items-center w-full text-center gap-1">
                                    <IoWarning className="text-red-600 text-3xl" />
                                    No Blogs match the search query
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default Current_Blogs;
