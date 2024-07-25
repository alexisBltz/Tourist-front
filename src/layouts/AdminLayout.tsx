import { NavBar } from "../components/NavBar.jsx";
import Footer from "../components/Footer.tsx";
import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from '../service/authContext.tsx';
import NavBarRight from "../pages/admin/NavBarRight.tsx";
import "../styles/Login.css"
const initialNavigation = [
    { name: 'Usuarios', to: '/admin/usuarios', current: false },
    { name: 'Servicios', to: '/admin/servicios', current: false },
    { name: 'Paquetes', to: '/admin/paquetes', current: false },
    { name: 'Ventas', to: '/admin/ventas', current: false },
];

const navOptions = {
    '/admin/usuarios': [
        { label: 'Listar todos los usuarios', path: '/admin/usuarios' },
        { label: 'Listar Usuarios Activos', path: '/admin/usuarios/active' },
        { label: 'Listar Usuarios Inactivos', path: '/admin/usuarios/inactive' },
        { label: 'Listar Administradores', path: '/admin/usuarios/admins' },
        { label: 'Listar Clientes', path: '/admin/usuarios/onlyUsers' },
    ],
    '/admin/servicios': [
        { label: 'Ver todos los servicios', path: '/admin/servicios' },
        { label: 'Crear Servicio', path: '/admin/servicios/crear' },
        { label: 'Ver Servicios Activos', path: '/admin/servicios/active' },
        { label: 'Ver Servicios Inactivos', path: '/admin/servicios/inactive' },
    ],
    '/admin/paquetes': [
        { label: 'Ver todos los paquetes', path: '/admin/paquetes' },
        { label: 'Crear Paquete', path: '/admin/paquetes/crear' },
    ],
    '/admin/ventas': [
        { label: 'Ver Ventas del Día', path: '/admin/ventas/today' },
        { label: 'Ver Ventas del Mes', path: '/admin/ventas/month' },
        { label: 'Ver Ventas del Año', path: '/admin/ventas/year' },
    ],
};

export default function AdminLayout() {
    const location = useLocation();
    const currentPath = location.pathname;
    const options = Object.keys(navOptions).find(path => currentPath.startsWith(path)) ? navOptions[currentPath.split('/').slice(0, 3).join('/')] : [];

    const showNavBarRight = !(currentPath === '/admin' || currentPath === '/admin/ventas');

    return (
        <AuthProvider>
            <NavBar initialNavigation={initialNavigation} />
            <div className="flex flex-col lg:flex-row min-h-screen p-16 login-page">
                {showNavBarRight && (
                    <div className="lg:w-1/4 w-full bg-gray-100 p-4">
                        <NavBarRight options={options} />
                    </div>
                )}
                <div className={`w-full ${showNavBarRight ? 'lg:w-3/4' : 'lg:w-full'} flex justify-center items-center p-4`}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </AuthProvider>
    );
}
