import {NavBar} from "../components/NavBar.jsx";
import Footer from "../components/Footer.tsx"
import {Outlet} from "react-router-dom";

const initialNavigation= [
    { name: 'Usuarios', to: '/', current: false },
    { name: 'Servicios', to: '/paquetes', current: false },
    { name: 'Paquetes', to: '/servicios', current: false },
    { name: 'Ventas', to: '/nosotros', current: false },
];
export default function AdminLayout() {
    return (
        <>

            <NavBar initialNavigation={initialNavigation}/>

            <Outlet />

            <Footer />

        </>
    )
}