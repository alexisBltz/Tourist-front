
import Carousel from "../components/Slide/Slideshow.jsx"


export default function Home() {
    const slides = [
        {
            nombre: "AREQUIPA",
            img:"https://upload.wikimedia.org/wikipedia/commons/a/a3/Volcano_Misti%2C_Peru.jpg",
            descripcion: "bla bla bla bla",
        },
        {
            nombre: "CUZCO",
            img:"https://elperuano.pe/fotografia/thumbnail/2022/07/12/000189059M.jpg",
            descripcion: "bla bla bla bla bla",
        },
        {
            nombre: "AREQUIPA",
            img:"https://upload.wikimedia.org/wikipedia/commons/a/a3/Volcano_Misti%2C_Peru.jpg",
            descripcion: "bla bla bla bla",
        },
        {
            nombre: "CUZCO",
            img:"https://elperuano.pe/fotografia/thumbnail/2022/07/12/000189059M.jpg",
            descripcion: "bla bla bla bla bla",
        },
    ]
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
            HOMEEEEEEEEE
            {/* <ListaServicios/> */}

        </div>
    )
}
