import ListaDePaquetesAdmin from "./ListaDePaquetesAdmin.tsx";
import React from "react";
import {Outlet, useLocation} from "react-router-dom";




export default function PaquetesAdmin (){
    const location = useLocation();

    // Define the paths where you want to show UserList
    const showUserList = location.pathname === '/admin/paquetes';
    return (
        <div className="">
            {showUserList && (
                <div className="">
                    <ListaDePaquetesAdmin/>
                </div>
            )}
            <div className="">
                <div className="">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}