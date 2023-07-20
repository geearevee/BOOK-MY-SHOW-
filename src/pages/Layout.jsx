import { Outlet } from "react-router-dom";
import Navbar from "./home/Navbar";
const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;
