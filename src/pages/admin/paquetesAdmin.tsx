import ListaDePaquetesAdmin from "../../components/Paquetes/ListaDePaquetesAdmin.tsx";
import React, {useState} from "react";
import SearchForm from "../../components/SearchForm.tsx";


export default function PaquetesAdmin (){
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [submittedTerm, setSubmittedTerm] = useState<string>('');

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        setSubmittedTerm(searchTerm.trim()); // Establece el término enviado
    };

    return (
        <div>
            <div className="">
                <div className="p-14">
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
                    <ListaDePaquetesAdmin searchTerm={submittedTerm} />
                </div>
            </div>
        </div>
    );
}