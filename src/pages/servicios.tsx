import ListaServicios from "../components/Servicios/ListaServicios.tsx";
import {useState} from "react";
import {Checkbox} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/16/solid";
import SearchForm from "../components/SearchForm.tsx";

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
                <div className="flex-row">
                    <h1 className="pl-16 pt-8 font-serif text-3xl">Filtros</h1>
                    <div className="flex p-6">

                    <Checkbox
                        checked={enabled}
                        onChange={setEnabled}
                        className=" group size-6 rounded-md bg-black p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                    >
                        <CheckIcon className="hidden size-6 fill-black group-data-[checked]:block" />

                    </Checkbox>
                        <h1 className="text-center ml-2 justify-center">Destino 1</h1>
                    </div>
                </div>

                <div className="flex-row justify-center items-center">
                    <ListaServicios searchTerm={submittedTerm} />
                </div>
            </div>
        </div>

    )
}