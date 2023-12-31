import { Outlet } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";


const Layout = () => {
    return (
        <div>
            <div   className="max-w-6xl mx-auto">
            <Navbar/>
            <Outlet/>
            </div>
            <Footer/>
            
        </div>
    );
};

export default Layout;