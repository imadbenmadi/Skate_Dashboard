
import { useNavigate } from "react-router";
import { useEffect } from "react";
function Dashboard_home() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Dashboard/Users");
    }, []);
    return null;
}

export default Dashboard_home;
