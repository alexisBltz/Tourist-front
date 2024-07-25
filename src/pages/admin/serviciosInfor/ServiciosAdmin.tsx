import ListaServiciosAdmin from "./ListaServiciosAdmin.tsx";
import {Outlet, useLocation} from "react-router-dom";
import UserList from "../usuariosTables/UserList.tsx";
export default function ServiciosAdmin (){
    const location = useLocation();

    // Define the paths where you want to show UserList
    const showUserList = location.pathname === '/admin/servicios';

    return(
        <div className="">
            {showUserList && (
                <div className="">
                    <ListaServiciosAdmin />
                </div>
            )}
            <div className="">
                <div className="">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}