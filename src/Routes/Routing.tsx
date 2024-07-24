import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from '../pages/notFound.tsx'

import HomeUser from '../pages/user/homeUser.tsx'
import LoginPage from "../pages/loginPage.tsx"
import Registrarse from "../pages/register.tsx"
import Servicios from "../pages/user/servicios.tsx"
import Paquetes from "../pages/user/paquetes.tsx"
import Nosotros from "../pages/user/nosotros.tsx";

import LayoutUser from "../layouts/UserLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Usuarios from "../pages/admin/usuarios.tsx";
import HomeAdmin from "../pages/admin/homeAdmin.tsx";
import PaquetesAdmin from "../pages/admin/paquetesAdmin.tsx";
import ServiciosAdmin from "../pages/admin/serviciosAdmin.tsx";
import Ventas from "../pages/admin/ventas.tsx";
import UnitService from "../pages/user/UnitService.tsx";

import RegistrarServicio from "../components/Servicios/CrearServicio.tsx";

import ServiciosDelPaquete from "../components/Paquetes/ServiciosDelPaquete.tsx";
import ServiciosDelPaqueteAdmin from "../components/Paquetes/ServiciosDelPaqueteAdmin.tsx";
import CrearPaquete from "../components/Paquetes/CrearPaquete.tsx";


import {AuthProvider} from "../service/authContext.tsx";
import UsuariosActive from "../pages/admin/usuariosTables/UsuariosActive.tsx";
import UsuariosInactive from "../pages/admin/usuariosTables/UsuariosInactive.tsx";


function UsuariosAdmins() {
    return null;
}

export default function Routing() {


    const route = createBrowserRouter([

        {
            path: "login",
            element: <LoginPage />
        },
        {
            path: "registrarse",
            element: <Registrarse />
        },
        {
            path: "/",
            element: <LayoutUser/>,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: < HomeUser />
                },
                {
                    path: "servicios",
                    element: <Servicios />

                },

                {
                    path:"/servicios/:id",
                    element: <UnitService/>
                },
                {
                    path: "paquetes",
                    element: <Paquetes />
                },
                {
                    path: "nosotros",
                    element: <Nosotros />
                },
                {
                    path: "*",
                    element: <NotFound/>
                },
                {
                    path: "paquete/:id/servicios",
                    element: <ServiciosDelPaquete/>
                }
            ],

        },
        {
            path: "/admin",
            element: (
                <ProtectedRoutes requiredRole='ADMIN'>
                    <AdminLayout/>
                </ProtectedRoutes>
            ),
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <HomeAdmin />
                },
                {
                    path: "/admin/usuarios",
                    element: <Usuarios />,
                    children: [
                        {
                            path: "active",
                            element: <UsuariosActive />
                        },
                        {
                            path: "inactive",
                            element: <UsuariosInactive />
                        },
                        {
                            path: "admins",
                            element: <UsuariosAdmins />
                        },
                    ]
                },
                {
                    path: "servicios/crear",
                    element: <RegistrarServicio/>
                },
                {
                    path: "/admin/servicios",
                    element: <ServiciosAdmin />
                },
                {
                    path: "/admin/paquetes/crear",
                    element: <CrearPaquete/>
                },
                {
                    path: "/admin/paquete/:id/servicios/",
                    element: <ServiciosDelPaqueteAdmin/>
                },
                {
                    path: "/admin/paquetes",
                    element: <PaquetesAdmin />
                },
                {
                    path: "/admin/ventas",
                    element: <Ventas />
                },
                {
                    path: "*",
                    element: <NotFound/>
                },

            ],
        },

    ]);


    return (
        <AuthProvider>
            <RouterProvider router={route} />
        </AuthProvider>
    )
}
