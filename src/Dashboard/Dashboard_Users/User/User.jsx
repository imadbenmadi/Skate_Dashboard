
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import ErrorPage from "../../../Components/ErrorPage";

function User() {
    const location = useLocation();
    const Navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = location.pathname.split("/")[3];

    const fetchUser = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:3000/Dashboard/Users/${userId}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                setUser(response.data);
                setUser(response.data);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return error ? (
        <ErrorPage />
    ) : loading ? (
        <div className="w-[100%] h-[200px] flex items-center justify-center">
            <span className="loader"></span>
        </div>
    ) : (
        <Outlet context={[user, setUser]} />
    );

    // const [user, setUser] = useState(null);  
}

export default User;
