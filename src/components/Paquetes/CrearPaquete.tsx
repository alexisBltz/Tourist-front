import React, { useState, useEffect } from 'react';
import { createPaquete } from '../../service/paqueteService';
import {getServiciosActivos, listarServicios} from "../../service/servicioService.ts";
import useAuthToken from "../../service/useAuthToken.ts"; // Ajusta la ruta según sea necesario

interface Servicio {
    id: number;
    nombre: string;
}

const CrearPaquete: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [paqEstReg, setPaqEstReg] = useState('A'); // Valor por defecto, ajusta según sea necesario
    const [paqImg, setPaqImg] = useState('');
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState<number[]>([]);
    const [loadingServicios, setLoadingServicios] = useState(true);
    const token = useAuthToken();
    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const data = await getServiciosActivos(); // Implementa esta función en tu servicio
                setServicios(data);
            } catch (error) {
                console.error('Error al obtener servicios:', error);
            } finally {
                setLoadingServicios(false);
            }
        };

        fetchServicios();
    }, []);

    const handleServicioChange = (id: number) => {
        setServiciosSeleccionados(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const paqueteServicio = {
            paqEstReg,
            paqImg,
            nombre,
            serviciosCodigos: serviciosSeleccionados
        };

        try {
            await createPaquete(paqueteServicio, token);
            // Manejar el éxito (por ejemplo, redirigir o mostrar un mensaje de éxito)
            alert('Paquete creado exitosamente!');
            // Limpiar formulario si es necesario
            setNombre('');
            setPaqImg('');
            setServiciosSeleccionados([]);
        } catch (error) {
            console.error('Error al crear el paquete:', error);
            alert('Error al crear el paquete.');
        }
    };

    if (loadingServicios) return <div className="text-center py-4">Cargando servicios...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Crear Paquete</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre del Paquete</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Estado de Registro</label>
                <select
                    value={paqEstReg}
                    onChange={e => setPaqEstReg(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="A">Activo</option>
                    <option value="I">Inactivo</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Imagen del Paquete (URL)</label>
                <input
                    type="text"
                    value={paqImg}
                    onChange={e => setPaqImg(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Selecciona Servicios</label>
                {servicios.length > 0 ? (
                    <div className="flex flex-col">
                        {servicios.map(servicio => (
                            <div key={servicio.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`servicio-${servicio.id}`}
                                    checked={serviciosSeleccionados.includes(servicio.id)}
                                    onChange={() => handleServicioChange(servicio.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`servicio-${servicio.id}`} className="text-sm">
                                    {servicio.nombre}
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No hay servicios disponibles.</div>
                )}
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Crear Paquete
                </button>
            </div>
        </form>
    );
};

export default CrearPaquete;
