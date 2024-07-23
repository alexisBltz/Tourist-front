import ListaServicios from "../components/Servicios/ListaServicios.tsx";
import {useState} from "react";
import {Checkbox} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/16/solid";
import SearchForm from "../components/SearchForm.tsx";
import DestinosCheckBox from "../components/DestinosCheckBox.tsx";

export default function Servicios (){
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [submittedTerm, setSubmittedTerm] = useState<string>('');
    const [enabled, setEnabled] = useState(true)

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault(); // Evita el envío del formulario por defecto
        setSubmittedTerm(searchTerm.trim()); // Establece el término enviado
    }

    return(
        <div>
            <div className="" >
                <div className="p-14">
                    <SearchForm
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        placeholder="Busca servicios, experiencias, hoteles..."
                    />
                </div>
            </div>

            <div className="flex">
                <div className="ml-7 flex-row bg-gray-200 rounded-lg">
                    <h1 className="pl-36 pt-16 pr-36 font-serif text-3xl">Destinos</h1>
                    <DestinosCheckBox/>
                </div>

                <div className="flex-row justify-center items-center">
                    <ListaServicios searchTerm={submittedTerm} />
                </div>
            </div>
        </div>

    )
}