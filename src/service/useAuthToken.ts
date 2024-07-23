import { useAuth } from "./authContext";

// Hook personalizado para obtener el token
const useAuthToken = (): string | null => {
    const { user } = useAuth();
    return user?.token ?? null;
};

export default useAuthToken;
