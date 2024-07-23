import {NavBar} from "../components/NavBar.jsx";
import Footer from "../components/Footer.tsx"
import {Outlet} from "react-router-dom";

const initialNavigation= [
    { name: 'Inicio', to: '/', current: false },
    { name: 'Paquetes Turísticos', to: '/paquetes', current: false },
    { name: 'Servicios', to: '/servicios/', current: false },
    { name: 'Nosotros', to: '/nosotros', current: false },
    //{name: 'Login', href: 'login', current: false },
];

export default function LayoutUser() {
    return (
        <>


            <NavBar initialNavigation={initialNavigation} />

            <Outlet />

            <Footer />

        </>
    )
}