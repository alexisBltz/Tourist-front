
import Carousel from "../../components/Slide/Slideshow.tsx"
import ServicioCard from "../../components/Servicios/Card.tsx";
import {getServicios, ServicioData} from "../../service/servicioService.ts";
import {useEffect, useState} from "react";


export default function HomeUser() {
    const slides = [
        {
            nombre: "AREQUIPA",
            img: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Volcano_Misti%2C_Peru.jpg",
            descripcion: "Explora la belleza colonial de Arequipa",
        },
        {
            nombre: "CUZCO",
            img: "https://elperuano.pe/fotografia/thumbnail/2022/07/12/000189059M.jpg",
            descripcion: "Antigua capital del Imperio Inca.",
        },
        {
            nombre: "AREQUIPA",
            img: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Volcano_Misti%2C_Peru.jpg",
            descripcion: "El majestuoso Volcán Misti como telón de fondo.",
        },
        {
            nombre: "CUZCO",
            img: "https://elperuano.pe/fotografia/thumbnail/2022/07/12/000189059M.jpg",
            descripcion: "Descubre la histórica ciudad de Cuzco.",
        },
    ]
    const [servicios, setServicios] = useState<ServicioData[]>([]);
    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const fetchedServicios = await getServicios(1, 3); // Cambia los parámetros según tu necesidad
                setServicios(fetchedServicios);
            } catch (error) {
                console.error("Error fetching servicios:", error);
            }
        };

        fetchServicios();
    }, []);

    return (
        <div >
            <div className="slides">
                <Carousel slides={slides} autoSlide={true} autoSlideInterval={3000} />
            </div>
            <div>
                <h1 className="text-3xl font-mono text-black text-center p-10">Destinos Populares</h1>
            </div>
            <div className="container mx-auto">
                <h2 className="text-2xl font-sans text-gray-600 text-center p-810 ">
                    ¿Listo para tu próxima gran aventura? En Turismo María Belén, no solo ofrecemos viajes,
                    creamos experiencias inolvidables. Desde Free Walking hasta Trekking en Arequipa, tenemos
                    el destino perfecto para cada tipo de viajero.
                </h2>
            </div>

            <div className="flex flex-wrap justify-center">
                {servicios.map((servicio) => (
                    <ServicioCard
                        key={servicio.id}
                        id={servicio.id}
                        image={servicio.image}
                        nombre={servicio.nombre}
                        descripcion={servicio.descripcion}
                        fecha={servicio.fecha}
                        costo={servicio.costo}
                        destino={servicio.destino}
                    />
                ))}
            </div>

        </div>
    )
}
