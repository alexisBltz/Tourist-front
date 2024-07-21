import {NavBar} from "../components/NavBar.jsx";
import Footer from "../components/Footer.tsx"
import {Outlet} from "react-router-dom";
export default function AdminLayout() {
    return (
        <>

            <NavBar />

            <Outlet />

            <Footer />

        </>
    )
}