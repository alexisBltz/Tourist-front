import { Navigate } from 'react-router-dom';
import { useAuth } from '../service/authContext';
import { ReactNode, useEffect, useState } from 'react';

interface ProtectedRoutesProps {
    children: React.ReactNode;
    requiredRole?: string;
}

function ProtectedRoutes({ children, requiredRole }: ProtectedRoutesProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Considera que la carga se ha completado si hay un usuario o no
        setLoading(false);
    }, [user]);
    console.log(user);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // Redirige si no hay usuario autenticado
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.rol !== requiredRole) {
        // Redirige si el rol del usuario no coincide con el requerido
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default ProtectedRoutes;
