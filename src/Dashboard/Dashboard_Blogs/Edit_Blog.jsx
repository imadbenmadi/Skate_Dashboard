import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import ErrorPage from "../../Components/ErrorPage";
import axios from "axios";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
function Edit_Blog() {
    const Navigate = useNavigate();
    const location = useLocation();
    const [Blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Blog_id = location.pathname.split("/")[3];
    const [imageUrl, setImageUrl] = useState(null);

    const fetch_Blog = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/Blogs/${Blog_id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                setBlog(response.data);
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
        fetch_Blog();
    }, []);
    if (loading)
        return (
            <div className=" w-[100%] h-[200px] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    else if (error) {
        return <ErrorPage />;
    }
    if (!Blog)
        return (
            <>
                <Link
                    className="select-none bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 w-fit m-auto"
                    to={"/Dashboard/Blogs"}
                >
                    <>
                        <FaArrowLeft />
                        <div>Go back</div>
                    </>
                </Link>
                <div
                    className="flex items-center justify-center text-gray font-bold p-8 w-fit
                     m-auto mt-10 bg-white rounded-md shadow-lg text-center"
                >
                    <IoWarning className="text-red-500 text-4xl " />
                    <p className="text-xl text-gray">Blog Not Found</p>
                </div>
            </>
        );
    else
        return (
            <div className=" ">
                <Link
                    className="select-none bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 w-fit m-auto"
                    to={"/Dashboard/Blogs"}
                >
                    <>
                        <FaArrowLeft />
                        <div>Go back</div>
                    </>
                </Link>
                {/* Input fields */}
                <div className="border border-gray_white text-black_text shadow-md w-[80%] md:w-[98%] m-auto mt-3 p-5 rounded-lg">
                    <Formik
                        initialValues={{
                            Title: Blog.Title || "",
                            Text: Blog.Text || "",
                            Description: Blog.Description || "",
                            image:
                                `http://localhost:3000/Blogs/${Blog.Image}` ||
                                null,
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.Title) {
                                errors.Title = "Title is required.";
                            }
                            if (!values.Text) {
                                errors.Text = "Text is required.";
                            }
                            if (!values.Description) {
                                errors.Description = "Description is required.";
                            }
                            return errors;
                        }}
                        onSubmit={async (
                            values,
                            { setSubmitting, resetForm }
                        ) => {
                            try {
                                setSubmitting(true);
                                const formData = new FormData();
                                formData.append("Title", values.Title);
                                formData.append("Text", values.Text);
                                formData.append(
                                    "Description",
                                    values.Description
                                );
                                formData.append("image", values.image);
                                let response = await Axios.put(
                                    `http://localhost:3000/Dashboard/Blogs/${Blog_id}`,
                                    formData,
                                    {
                                        withCredentials: true,
                                        validateStatus: () => true,
                                    }
                                );
                                setSubmitting(false);
                                if (response.status == 404) {
                                    Swal.fire(
                                        "Error",
                                        `${response.data.message}`,
                                        "error"
                                    );
                                } else if (response.status == 200) {
                                    Swal.fire(
                                        "Done!",
                                        "Blog has been Modified Successfully",
                                        "success"
                                    );
                                } else if (response.status == 400) {
                                    Swal.fire(
                                        "Error!",
                                        `Internal server error : ${response.data.message}`,
                                        "error"
                                    );
                                } else if (response.status == 401) {
                                    Swal.fire({
                                        title: "Unauthorised Action",
                                        text: "You should login again ",
                                        icon: "error",
                                        confirmButtonColor: "#3085d6",

                                        confirmButtonText:
                                            "Go to Admin login Page",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Navigate("/Dashboard_login");
                                        }
                                    });
                                } else if (response.status == 409) {
                                    Swal.fire(
                                        "Error!",
                                        `${response.data.message}`,
                                        "error"
                                    );
                                } else if (response.status == 429) {
                                    Swal.fire(
                                        "Error!",
                                        `Too many Requests , ${response.data.message}`,
                                        "error"
                                    );
                                } else if (response.status == 500) {
                                    Swal.fire(
                                        "Error!",
                                        `Internal server error : ${response.data.message}`,
                                        "error"
                                    );
                                } else {
                                    Swal.fire(
                                        "Error!",
                                        `Something Went Wrong. Please try again , ${response.data.message}`,
                                        "error"
                                    );
                                }
                            } catch (error) {
                                Swal.fire(
                                    "Error!",
                                    `Something Went Wrong. Please try again , ${error.message}`,
                                    "error"
                                );
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form className="flex flex-col text-sm md:text-lg  gap-4 items-center justify-center flex-wrap">
                                <div className="w-full">
                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const selectedFile =
                                                event.currentTarget.files[0];
                                            if (selectedFile) {
                                                // Set the value of the image field in Formik to the selected file
                                                setFieldValue(
                                                    "image",
                                                    selectedFile
                                                );
                                                setImageUrl(
                                                    URL.createObjectURL(
                                                        selectedFile
                                                    )
                                                );
                                            } else {
                                                // Clear the image field if no file is selected
                                                setFieldValue("image", null);
                                                setImageUrl(null);
                                            }
                                        }}
                                        disabled={isSubmitting}
                                        className="hidden" // Hide the default file input button
                                    />

                                    <div className="flex flex-col items-center gap-1">
                                        <button
                                            type="button"
                                            className="bg-blue-500  px-4 py-2 rounded font-semibold"
                                            onClick={() =>
                                                document
                                                    .getElementById("image")
                                                    .click()
                                            }
                                            disabled={isSubmitting}
                                        >
                                            Choose an image
                                        </button>
                                        {imageUrl ? (
                                            <div
                                                className=" relative "
                                                onClick={() =>
                                                    document
                                                        .getElementById("image")
                                                        .click()
                                                }
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt="Selected image"
                                                    className=" w-full h-[200px] md:w-80 md:h-80 object-cover rounded"
                                                />
                                                <div className="  absolute top-0 w-full h-full bg-black opacity-55 z-50  flex items-center justify-center cursor-pointer">
                                                    <MdEdit className="text-white text-4xl" />
                                                </div>
                                            </div>
                                        ) : (
                                            setImageUrl(values.image)
                                            // <div
                                            //     className="w-full h-[200px] md:w-80 md:h-80 bg-gray_white text-gray rounded flex items-center justify-center cursor-pointer"
                                            //     onClick={() =>
                                            //         document
                                            //             .getElementById("image")
                                            //             .click()
                                            //     }
                                            // >
                                            //     <FaRegImage />
                                            // </div>
                                        )}{" "}
                                        <div
                                            className="flex items-center justify-start md:gap-2 cursor-pointer text-white bg-red-600  text-lg md:text-xl px-1 md:px-2 py-1 rounded "
                                            onClick={() =>
                                                setFieldValue("image", null)
                                            }
                                        >
                                            <MdDelete />
                                            Delete image
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        name="image"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" w-full ">
                                    <div>
                                        Title{" "}
                                        <span className="text-red-600 font-semibold">
                                            *
                                        </span>
                                    </div>
                                    <Field
                                        as="textarea"
                                        name="Title"
                                        className="border border-gray_white px-2 py-1 rounded shadow w-full overflow-auto custom-overflow "
                                        disabled={isSubmitting}
                                    />
                                    <ErrorMessage
                                        name="Title"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" w-full ">
                                    <div>
                                        Text{" "}
                                        <span className="text-red-600 font-semibold">
                                            *
                                        </span>
                                    </div>
                                    <Field
                                        as="textarea"
                                        name="Text"
                                        className="border border-gray_white px-2 py-1 rounded shadow w-full overflow-auto custom-overflow"
                                        disabled={isSubmitting}
                                        rows={4}
                                    />
                                    <ErrorMessage
                                        name="Text"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" w-full h-fit ">
                                    <div>
                                        Description{" "}
                                        <span className="text-red-600 font-semibold">
                                            *
                                        </span>
                                    </div>
                                    <Field
                                        as="textarea"
                                        name="Description"
                                        className="border border-gray_white px-2 py-1 rounded shadow w-full overflow-auto custom-overflow"
                                        disabled={isSubmitting}
                                        rows={10}
                                    />
                                    <ErrorMessage
                                        name="Description"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={` ${
                                        isSubmitting
                                            ? "bg-gray_white text-gray"
                                            : " bg-green text-white"
                                    } w-fit m-auto px-4 py-2 rounded font-semibold `}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div>loading</div>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};

export default Edit_Blog;
