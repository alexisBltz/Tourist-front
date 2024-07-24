import ListaServiciosAdmin from "../../components/Servicios/ListaServiciosAdmin.tsx";
import { useNavigate } from 'react-router-dom';
export default function ServiciosAdmin (){
    const navigate = useNavigate();
    const handleCrearServicio = () => {

        navigate('/admin/servicios/crear');
    };
    return(
        <div>
            <button
                onClick={handleCrearServicio}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Crear Nuevo Servicio
            </button>
            <ListaServiciosAdmin/>
        </div>
    )
}