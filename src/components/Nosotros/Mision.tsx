

export default function Mision() {
    return(
        <>
            <div className="container-section pt-14">
                <div className="transform container-vision-mision flex flex-col md:flex-row items-center justify-center
                 rounded-3xl border-4 border-indigo-500/100 transition duration-500 hover:scale-105  p-6 mx-16 mb-16">
                    <div className="container-text md:w-1/2 md:pr-8">
                        <h3 className="text-2xl font-bold mb-4">Misión</h3>
                        <p className="text-lg">
                            Ofrecer un servicio personalizado e innovador de calidad, seguridad, confiabilidad, y
                            experiencia que le brindamos a nuestros clientes a través de la buena atención de nuestro
                            personal altamente capacitado, diseñando viajes únicos, a precios accesibles, logrando
                            superar las expectativas de nuestros clientes.
                        </p>
                    </div>

                    <figure className="max-w-lg">
                        <img className="h-auto max-w-full rounded-lg" src="https://maria-belen.s3.amazonaws.com/img/image+12.png"
                             alt="image description"/>
                    </figure>
                </div>
            </div>
        </>

    );
}