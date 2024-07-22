import { Navigate } from 'react-router-dom';
import { useEffect, useState, ReactNode } from 'react';

interface ProtectedRoutesProps {
    children: React.ReactNode;
    requiredRole?: string;
}


function ProtectedRoutes({ children, requiredRole }: ProtectedRoutesProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    //solucion de 5 horas de trabajo
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');
        console.log('Token:', token);
        console.log('Rol:', rol);

        if (token) {
            console.log("Token encontrado, actualizando estado...");
            setIsLoggedIn(true);
            setUserRole(rol);
        } else {
            console.log("No se encontró token.");
        }

        setLoading(false);

    }, []);

    // SOLCUON DE 5h de trabajo
    if (loading) {
        return <div>Loading...</div>;
    }

    if (requiredRole && userRole !== requiredRole) {
        console.log("Acceso Denegado, redirigiendo a la página principal");
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default ProtectedRoutes;
