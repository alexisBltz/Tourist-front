import React, { useEffect, useState } from 'react';
import {deleteUsuario, getUsuarios} from "../../service/usuarioService.ts";

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
    datosUsuarios: DatosListadoDatosUsuario[];
}

const UserList: React.FC = () => {
    const [usuarios, setUsuarios] = useState<DatosListadoUsuario[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsuarios(page, 15);
                setUsuarios(data);
            } catch (err) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]);

    const handleDelete = async (id: number) => {
        try {
            await deleteUsuario(id);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (err) {
            setError('Error deleting user');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr className="w-full bg-gray-100 border-b">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Login</th>
                        <th className="py-3 px-6 text-left">Estado</th>
                        <th className="py-3 px-6 text-left">Nombre</th>
                        <th className="py-3 px-6 text-left">Apellido Paterno</th>
                        <th className="py-3 px-6 text-left">Celular</th>
                        <th className="py-3 px-6 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id} className="border-b">
                            <td className="py-4 px-6">{usuario.id}</td>
                            <td className="py-4 px-6">{usuario.login}</td>
                            <td className="py-4 px-6">{usuario.estadoRegistro}</td>
                            <td className="py-4 px-6">{usuario.datosUsuarios[0]?.nombre}</td>
                            <td className="py-4 px-6">{usuario.datosUsuarios[0]?.apellidoPaterno}</td>
                            <td className="py-4 px-6">{usuario.datosUsuarios[0]?.celular}</td>
                            <td className="py-4 px-6">
                                <button
                                    onClick={() => handleDelete(usuario.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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

export default UserList;

