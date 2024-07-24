// src/components/ListaDeVentas.tsx
import React, { useState, useEffect } from 'react';
import {DatosListadoVenta, getVentas} from "../../service/ventaService.ts";
import useAuthToken from "../../service/useAuthToken.ts";


const ListaDeVentas: React.FC = () => {
    const [ventas, setVentas] = useState<DatosListadoVenta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(10); // Número de elementos por página
    const token = useAuthToken();
    useEffect(() => {
        const loadVentas = async () => {
            try {
                const data = await getVentas(page, size,token);
                setVentas(data);
            } catch (err) {
                setError('Error al cargar las ventas');
            } finally {
                setLoading(false);
            }
        };

        loadVentas();
    }, [page, size]);

    if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Ventas</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="w-full bg-gray-100 border-b border-gray-300">
                            <th className="py-2 px-4 text-left text-gray-600">ID</th>
                            <th className="py-2 px-4 text-left text-gray-600">Fecha</th>
                            <th className="py-2 px-4 text-left text-gray-600">Medio de Pago</th>
                            <th className="py-2 px-4 text-left text-gray-600">Estado</th>
                            <th className="py-2 px-4 text-left text-gray-600">Monto Total</th>
                            <th className="py-2 px-4 text-left text-gray-600">Nombre del Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => (
                            <tr key={venta.id} className="border-b border-gray-300">
                                <td className="py-2 px-4">{venta.id}</td>
                                <td className="py-2 px-4">{venta.fecha}</td>
                                <td className="py-2 px-4">{venta.medioPago}</td>
                                <td className="py-2 px-4">{venta.estadoRegistro}</td>
                                <td className="py-2 px-4">{venta.montoTotal}</td>
                                <td className="py-2 px-4">{venta.nombreUsuario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                >
                    Anterior
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ListaDeVentas;
