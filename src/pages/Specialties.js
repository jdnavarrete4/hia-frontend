import React, { useEffect, useRef } from "react";

const Carrusel = ({ items }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        // Duplicar elementos para crear un efecto infinito
        const cloneItems = [...items, ...items];
        container.innerHTML = ""; // Limpia contenido previo para evitar duplicados

        cloneItems.forEach((item) => {
            const card = document.createElement("div");
            card.className =
                "bg-white rounded-3xl p-6 flex flex-row gap-4 items-center justify-start shadow-custom flex-shrink-0 w-full sm:w-[85%] md:w-[70%] max-w-[600px]";
            card.innerHTML = `
        <img class="w-[100px] md:w-[165px] h-[100px] md:h-[152px] object-cover rounded-3xl" src="${item.image}" alt="${item.title}" />
        <div class="flex flex-col gap-2 md:gap-4 items-start">
          <div class="text-black font-medium text-left text-sm md:text-lg">${item.title}</div>
          <div class="text-black font-light text-left text-xs md:text-base">${item.description}</div>
        </div>
      `;
            container.appendChild(card);
        });

        // Configurar desplazamiento
        let scrollPosition = 0;
        const scrollSpeed = 1; // Velocidad del scroll

        const scrollAnimation = () => {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= container.scrollWidth / 2) {
                scrollPosition = 0; // Reiniciar scroll
            }
            container.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        };

        const interval = setInterval(scrollAnimation, 30);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [items]);

    return (
        <div className="mt-10 flex flex-col gap-6 items-center w-full max-w-[350px] md:max-w-screen-2xl md:h-[262px] h-[200px] overflow-x-hidden px-4">
            <div
                className="flex flex-row gap-3 md:gap-8 items-start justify-start animate-scroll"
                ref={containerRef}
            ></div>
        </div>

    );
};

export default Carrusel;
