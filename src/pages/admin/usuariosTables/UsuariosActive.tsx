import React, { useEffect, useState } from 'react';
import { inactivarUsuario, getUsuariosActive, updateUsuarioRol } from "../../../service/usuarioService.ts";
import useAuthToken from "../../../service/useAuthToken.ts";

interface DatosListadoDatosUsuario {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    celular: string;
}

interface DatosListadoUsuario {
    id: number;
    login: string;
    estadoRegistro: string;
    rol: string;
    datosUsuarios: DatosListadoDatosUsuario[];
}

const UsuariosActive: React.FC = () => {
    const [usuarios, setUsuarios] = useState<DatosListadoUsuario[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const token = useAuthToken(); // Obtener el token usando el hook

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null); // Resetear el error al iniciar la carga
            try {
                if (token) {
                    const data = await getUsuariosActive(page, 15, token);
                    setUsuarios(data);
                } else {
                    setError('No se ha encontrado el token de autenticación');
                }
            } catch (err) {
                setError('Error fetching users: ' + (err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, token]);

    const handleDelete = async (id: number) => {
        if (token) {
            try {
                await inactivarUsuario(id, token);
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            } catch (err) {
                setError('Error deleting user: ' + (err as Error).message);
            }
        } else {
            setError('No se ha encontrado el token de autenticación');
        }
    };

    const handleRoleChange = async (id: number, nuevoRol: string) => {
        if (token) {
            try {
                await updateUsuarioRol(id, nuevoRol, token);
                setUsuarios(usuarios.map(usuario =>
                    usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
                ));
            } catch (err) {
                setError('Error updating user role: ' + (err as Error).message);
            }
        } else {
            setError('No se ha encontrado el token de autenticación');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios Activos</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200">
                        <thead>
                        <tr className="w-full bg-gray-80 border-b">
                            <th className="py-3 px-6 text-center">Email</th>
                            <th className="py-3 px-6 text-center">Rol</th>
                            <th className="py-3 px-6 text-center">Nombre</th>
                            <th className="py-3 px-6 text-center">Apellido Paterno</th>
                            <th className="py-3 px-6 text-center">Celular</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="border-b">
                                <td className="py-4 px-6">{usuario.login}</td>
                                <td className="py-4 px-6">
                                    <select
                                        value={usuario.rol}
                                        onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="USER">Usuario</option>
                                        <option value="ADMIN">Administrador</option>
                                        <option value="EMPLEADO">Empleado</option>
                                    </select>
                                </td>
                                <td className="py-4 px-6">{usuario.datosUsuarios[0]?.nombre}</td>
                                <td className="py-4 px-6">{usuario.datosUsuarios[0]?.apellidoPaterno}</td>
                                <td className="py-4 px-6">{usuario.datosUsuarios[0]?.celular}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Anterior
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default UsuariosActive;
