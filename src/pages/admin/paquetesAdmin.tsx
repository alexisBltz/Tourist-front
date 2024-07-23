import ListaDePaquetesAdmin from "../../components/Paquetes/ListaDePaquetesAdmin.tsx";
import React, {useState} from "react";
import SearchForm from "../../components/SearchForm.tsx";
import {useNavigate} from "react-router-dom";


export default function PaquetesAdmin (){
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [submittedTerm, setSubmittedTerm] = useState<string>('');
    const navigate = useNavigate();
    const handleCrearPaquete = () => {

        navigate('/admin/paquetes/crear');
    };
    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        setSubmittedTerm(searchTerm.trim()); // Establece el término enviado
    };

    return (
        <div>
            <div className="">
                <div className="p-14">
                    <button
                        onClick={handleCrearPaquete}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Crear Nuevo Paquete
                    </button>
                    <SearchForm
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        placeholder="Busca paquetes, ofertas, destinos..."
                    />
                </div>
            </div>

            <div className="flex">

                <div className="mx-10 flex-row justify-center items-center">
                    <ListaDePaquetesAdmin searchTerm={submittedTerm}/>
                </div>
            </div>
        </div>
    );
}