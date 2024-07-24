import React, { useState, useEffect } from 'react';
import { DatosListadoVenta, getVentas, getVentasPorDia, getVentasPorMes, getVentasPorAnio } from "../../service/ventaService";
import useAuthToken from "../../service/useAuthToken";

const ListaDeVentas: React.FC = () => {
    const [ventas, setVentas] = useState<DatosListadoVenta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(10); // Número de elementos por página
    const [totalPages, setTotalPages] = useState<number>(0); // Total de páginas
    const [filter, setFilter] = useState<'all' | 'dia' | 'mes' | 'anio'>('all');
    const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]); // Fecha actual por defecto
    const [mes, setMes] = useState<number>(new Date().getMonth() + 1); // Mes actual por defecto
    const [anio, setAnio] = useState<number>(new Date().getFullYear()); // Año actual por defecto
    const token = useAuthToken();

    useEffect(() => {
        const loadVentas = async () => {
            try {
                let data;
                switch (filter) {
                    case 'dia':
                        data = await getVentasPorDia(fecha, page, size, token);
                        break;
                    case 'mes':
                        data = await getVentasPorMes(mes, anio, page, size, token);
                        break;
                    case 'anio':
                        data = await getVentasPorAnio(anio, page, size, token);
                        break;
                    default:
                        data = await getVentas(page, size, token);
                }
                setVentas(data);
                // Actualiza el total de páginas según la respuesta del servidor
                // Aquí deberías ajustar según cómo el servidor te devuelva el total de páginas
                // setTotalPages(data.totalPages);
            } catch (err) {
                setError('Error al cargar las ventas');
            } finally {
                setLoading(false);
            }
        };

        loadVentas();
    }, [page, size, token, filter, fecha, mes, anio]);

    if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(e.target.value);
    };

    // Meses del año para el combo box
    const meses = [
        { valor: 1, nombre: 'Enero' },
        { valor: 2, nombre: 'Febrero' },
        { valor: 3, nombre: 'Marzo' },
        { valor: 4, nombre: 'Abril' },
        { valor: 5, nombre: 'Mayo' },
        { valor: 6, nombre: 'Junio' },
        { valor: 7, nombre: 'Julio' },
        { valor: 8, nombre: 'Agosto' },
        { valor: 9, nombre: 'Septiembre' },
        { valor: 10, nombre: 'Octubre' },
        { valor: 11, nombre: 'Noviembre' },
        { valor: 12, nombre: 'Diciembre' }
    ];

    // Generar un rango de años para el combo box de años
    const anios = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Ventas</h1>
            {/* Agregar filtros */}
            <div className="mb-4">
                <button onClick={() => setFilter('all')} className="px-4 py-2 bg-green-500 text-white rounded-lg">Todas</button>
                <button onClick={() => setFilter('dia')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Por Día</button>
                <button onClick={() => setFilter('mes')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Por Mes</button>
                <button onClick={() => setFilter('anio')} className="px-4 py-2 bg-red-500 text-white rounded-lg">Por Año</button>
                {/* Agregar campos para filtros */}
                {filter === 'dia' && (
                    <input
                        type="date"
                        value={fecha}
                        onChange={handleFechaChange}
                        className="px-4 py-2 border rounded-lg"
                    />
                )}
                {filter === 'mes' && (
                    <>
                        <select
                            value={mes}
                            onChange={(e) => setMes(parseInt(e.target.value))}
                            className="px-4 py-2 border rounded-lg"
                        >
                            {meses.map((m) => (
                                <option key={m.valor} value={m.valor}>{m.nombre}</option>
                            ))}
                        </select>
                        <select
                            value={anio}
                            onChange={(e) => setAnio(parseInt(e.target.value))}
                            className="px-4 py-2 border rounded-lg"
                        >
                            {anios.map((a) => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </>
                )}
                {filter === 'anio' && (
                    <select
                        value={anio}
                        onChange={(e) => setAnio(parseInt(e.target.value))}
                        className="px-4 py-2 border rounded-lg"
                    >
                        {anios.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                )}
            </div>
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
                            <td className="py-2 px-4">{new Date(venta.fecha).toISOString().split('T')[0]}</td>
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
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ListaDeVentas;
