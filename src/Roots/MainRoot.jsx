import { Outlet } from "react-router-dom";


const MainRoot = () => {
    return (
        <div>
            this is root
            <Outlet></Outlet>
        </div>
    );
};

export default MainRoot;