import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";


export default function Carousel({ slides, autoSlide, autoSlideInterval = 3000 }) {
    const [curr, setCurr] = useState(0);

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    //Efecto para que pasen las imagenes del slide
    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval]);

    return (
        <div className="overflow-hidden relative w-full h-screen">
            <div
                className="flex transition-transform ease-out duration-500 w-full h-full "
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >

                {slides.map((slide, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 relative">
                        <img
                            className="w-full h-full object-cover"
                            src={slide.img}
                            alt={`Slide ${i}`}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center truncate">

                            <h1 className="sm:text-9xl font-bold text-white p-4 text-5xl">{slide.nombre}</h1>
                            <h1 className="sm:text-6xl text-white p-4 text-3xl">{slide.descripcion}</h1>

                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronLeft size={40} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronRight size={40} />
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`
                                transition-all w-3 h-3 bg-white rounded-full
                                ${curr === i ? "p-2" : "bg-opacity-50"}
                            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
