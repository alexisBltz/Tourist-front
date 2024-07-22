import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from '../pages/notFound.tsx'

import HomeUser from '../pages/user/homeUser.tsx'
import LoginPage from "../pages/loginPage.tsx"
import Registrarse from "../pages/register.tsx"
import Servicios from "../pages/servicios.tsx"
import Paquetes from "../pages/paquetes.tsx"
import Nosotros from "../pages/nosotros.tsx";

import LayoutUser from "../layouts/UserLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Usuarios from "../pages/admin/usuarios.tsx";
import HomeAdmin from "../pages/admin/homeAdmin.tsx";
import PaquetesAdmin from "../pages/admin/paquetesAdmin.tsx";
import ServiciosAdmin from "../pages/admin/serviciosAdmin.tsx";
import Ventas from "../pages/admin/ventas.tsx";




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
                    element: <Usuarios />
                },
                {
                    path: "/admin/servicios",
                    element: <ServiciosAdmin />
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
        <RouterProvider router={route} />
    )
}
