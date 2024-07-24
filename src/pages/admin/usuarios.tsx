import { useLocation } from "react-router-dom";
import UserList from "../../components/Usuario/UserList.tsx";
import { Outlet } from "react-router-dom";

export default function Usuarios() {
    const location = useLocation();

    // Define the paths where you want to show UserList
    const showUserList = location.pathname === '/admin/usuarios';

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {showUserList && (
                <div className=" w-full bg-gray-100 p-4">
                    <UserList />
                </div>
            )}
            <div className="lg:w-3/4 w-full flex flex-col p-4">
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
