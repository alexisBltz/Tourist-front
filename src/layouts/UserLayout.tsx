import {NavBar} from "../components/NavBar.jsx";
import Footer from "../components/Footer.tsx"
import {Outlet} from "react-router-dom";
export default function LayoutUser() {
    return (
        <>

            <NavBar />

            <Outlet />

            <Footer />

        </>
    )
}