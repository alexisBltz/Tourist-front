import {NavBar} from "../components/NavBar.jsx";
import Footer from "../components/Footer.tsx"
import {Outlet} from "react-router-dom";

const initialNavigation= [
    { name: 'Usuarios', to: '/admin/usuarios', current: false },
    { name: 'Servicios', to: '/admin/servicios', current: false },
    { name: 'Paquetes', to: '/admin/paquetes', current: false },
    { name: 'Ventas', to: '/admin/ventas', current: false },
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