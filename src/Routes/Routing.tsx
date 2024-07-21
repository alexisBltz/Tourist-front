import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from '../pages/notFound.tsx'

import Home from '../pages/Home.jsx'
import Login from "../pages/login.tsx"
import Registrarse from "../pages/Register.jsx"
import Servicios from "../pages/servicios.tsx"
import Paquetes from "../pages/paquetes.tsx"
import Nosotros from "../pages/nosotros.tsx";

import LayoutUser from "../layouts/UserLayout.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";

export default function Routing() {


    const route = createBrowserRouter([

        {
            path: "/",
            element: <LayoutUser />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: < Home />
                },

                {
                    path: "login",
                    element: <Login />
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
                    path: "registrarse",
                    element: <Registrarse />
                },

                {

                    path: "administrar",
                    element: <AdminLayout/>,
                },
                {
                    path: "*",
                    element: <NotFound/>
                }


            ]

        },


    ]);

    return (
        <RouterProvider router={route} />
    )
}
