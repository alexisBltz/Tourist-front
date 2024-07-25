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
import Usuarios from "../pages/admin/usuariosTables/usuarios.tsx";
import HomeAdmin from "../pages/admin/homeAdmin.tsx";
import PaquetesAdmin from "../pages/admin/paquetesInfor/paquetesAdmin.tsx";

import Ventas from "../pages/admin/ventas.tsx";
import UnitService from "../pages/user/UnitService.tsx";


import RegistrarServicio from "../components/Servicios/CrearServicio.tsx";
import ServiciosDelPaquete from "../components/Paquetes/ServiciosDelPaquete.tsx";
import ServiciosDelPaqueteAdmin from "../pages/admin/paquetesInfor/ServiciosDelPaqueteAdmin.tsx";
import CrearPaquete from "../components/Paquetes/CrearPaquete.tsx";


import {AuthProvider} from "../service/authContext.tsx";

//usuarios
import UsuariosActive from "../pages/admin/usuariosTables/UsuariosActive.tsx";
import UsuariosInactive from "../pages/admin/usuariosTables/UsuariosInactive.tsx";
import UsuariosAdmin from "../pages/admin/usuariosTables/UsuariosAdmin.tsx";
import UsuariosNormales from "../pages/admin/usuariosTables/UsuariosNormales.tsx";
import ServiciosAdmin from "../pages/admin/serviciosInfor/ServiciosAdmin.tsx";
import ServiceActive from "../pages/admin/serviciosInfor/ServiciosActive.tsx";
import ServiceInactive from "../pages/admin/serviciosInfor/ServiceInactive.tsx";


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
                            element: <UsuariosAdmin />
                        },
                        {
                          path: "onlyUsers",
                          element: <UsuariosNormales/>
                        },
                    ]
                },
                {
                    path: "/admin/servicios",
                    element: <ServiciosAdmin/>,
                    children: [
                        {
                            path: "crear",
                            element: <RegistrarServicio/>
                        },
                        {
                            path: "active",
                            element: <ServiceActive/>
                        },
                        {
                            path: "inactive",
                            element: <ServiceInactive/>
                        },
                    ]
                },
                {
                    path: "/admin/paquetes",
                    element: <PaquetesAdmin/>,
                    children:[
                        {
                            path: "crear",
                            element: <CrearPaquete/>
                        },
                        {
                            path: ":id/servicios/",
                            element: <ServiciosDelPaqueteAdmin/>
                        },
                        /*
                        {
                            path: "active",
                            //element: <PaqueteActive/>
                        },
                        {
                            path: "inactive",
                            //element: <PaqueteInactive/>
                        },
                        */
                    ]
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
