import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createServicio} from "../../service/servicioService.ts";
import useAuthToken from "../../service/useAuthToken.ts";

interface FormData {
    image: string;
    descripcion: string;
    nombre: string;
    fecha: string;
    costo: string;
    tipo: string;
    destino: string;
    estadoRegistro: string;
}

const CrearServicio: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        image: '',
        descripcion: '',
        nombre: '',
        fecha: '',
        costo: '',
        tipo: '',
        destino: '',
        estadoRegistro: 'A'
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = useAuthToken();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createServicio(formData, token);
            navigate('/servicios'); // Redirigir a la lista de servicios después de crear uno nuevo
        } catch (err) {
            setError('Error registrando el servicio');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Registrar Nuevo Servicio</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Imagen</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Descripción</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Costo</label>
                    <input
                        type="number"
                        name="costo"
                        value={formData.costo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tipo</label>
                    <input
                        type="text"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Destino</label>
                    <input
                        type="text"
                        name="destino"
                        value={formData.destino}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Estado de Registro</label>
                    <select
                        name="estadoRegistro"
                        value={formData.estadoRegistro}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
        </div>
    );
};

export default CrearServicio;
