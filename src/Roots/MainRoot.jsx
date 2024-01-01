import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";


const MainRoot = () => {
    const location = useLocation()
    console.log(location)
    return (
        <div>
            <div className={`${location?.pathname.includes("edit") || location?.pathname.includes("add") || location?.pathname.includes("details") ? "hidden" : "block sticky top-0 z-50"}`}>
            <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainRoot;