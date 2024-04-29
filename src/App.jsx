import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { useAppContext } from "./Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";
function App() {
    const navigate = useNavigate();
    // const { set_Auth, isAuth } = useAppContext();
    // const [Active_nav, setActive_nav] = useState("Home");
    // const [loading, setLoading] = useState(false);
    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(
    //             "https://backend.skate.dz/Dashboard/check_Auth",
    //             {
    //                 withCredentials: true,
    //                 validateStatus: () => true,
    //             }
    //         );
    //         if (response.status == 200 && response.data.userData._id == null) {
    //             set_Auth(false);
    //         } else if (response.status == 200) {
    //             set_Auth(true);
    //         } else {
    //             set_Auth(false);
    //         }
    //     } catch (error) {
    //         set_Auth(false);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    useEffect(() => {
        navigate("/Dashboard");
    }, []);

    return null;
}

export default App;
