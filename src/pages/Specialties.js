// import React, { useEffect, useRef } from "react";

// const Carrusel = ({ items }) => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const container = containerRef.current;

//         // Duplicar elementos para crear un efecto infinito
//         const cloneItems = [...items, ...items];
//         container.innerHTML = ""; // Limpia contenido previo para evitar duplicados

//         cloneItems.forEach((item) => {
//             const card = document.createElement("div");
//             card.className =
//                 "bg-white rounded-3xl p-6 flex flex-row gap-4 items-center justify-start shadow-custom flex-shrink-0 w-full sm:w-[85%] md:w-[70%] max-w-[600px]";
//             card.innerHTML = `
//         <img class="w-[100px] md:w-[165px] h-[100px] md:h-[152px] object-cover rounded-3xl" src="${item.image}" alt="${item.title}" />
//         <div class="flex flex-col gap-2 md:gap-4 items-start">
//           <div class="text-black font-medium text-left text-sm md:text-lg">${item.title}</div>
//           <div class="text-black font-light text-left text-xs md:text-base">${item.description}</div>
//         </div>
//       `;
//             container.appendChild(card);
//         });

//         // Configurar desplazamiento
//         let scrollPosition = 0;
//         const scrollSpeed = 1; // Velocidad del scroll

//         const scrollAnimation = () => {
//             scrollPosition += scrollSpeed;
//             if (scrollPosition >= container.scrollWidth / 2) {
//                 scrollPosition = 0; // Reiniciar scroll
//             }
//             container.scrollTo({
//                 left: scrollPosition,
//                 behavior: "smooth",
//             });
//         };

//         const interval = setInterval(scrollAnimation, 30);

//         return () => clearInterval(interval); // Limpiar el intervalo al desmontar
//     }, [items]);

//     return (
//         <div className="mt-10 flex flex-col gap-6 items-center w-full max-w-[350px] md:max-w-screen-2xl md:h-[262px] h-[200px] overflow-x-hidden px-4">
//             <div
//                 className="flex flex-row gap-3 md:gap-8 items-start justify-start animate-scroll"
//                 ref={containerRef}
//             ></div>
//         </div>

//     );
// };

// export default Carrusel;

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

            // Estructura principal de la tarjeta
            card.className =
                "flex flex-col gap-4 bg-white shadow-custom flex-shrink-0 w-full rounded-3xl min-h-[280px] md:min-h-[180px] max-w-[300px] md:max-w-[600px] overflow-x-hidden ";

            card.innerHTML = `
            <!-- Tarjeta para móvil -->
            <div class="flex flex-col gap-4 w-full md:hidden p-8 ">
                <!-- Primera fila: Título, subtítulo e imagen -->
                <div class="flex flex-row items-normal gap-4 w-full ">
                    <!-- Columna 1: Título y subtítulo -->
                    <div class="flex flex-col justify-between w-1/2">
                        <h2 class="text-black font-medium text-left text-lg">${item.title}</h2>
                                  <span class="border border-[#2393E3] text-black font-medium px-2 py-1 rounded-full text-[12px] text-center">
            ACERCA DE
        </span>
                    </div>
                    <!-- Columna 2: Imagen -->
                    <div class="w-1/2 flex justify-center">
                        <img 
                            class="w-full h-auto min-h-[130px] min-w-[60px] object-cover rounded-3xl" 
                            src="${item.image}" 
                            alt="${item.title}" 
                        />
                    </div>
                </div>
                <!-- Segunda fila: Descripción -->
                <div class="text-black font-light text-left text-xs">
                    ${item.description}
                </div>
            </div>
        
            <!-- Tarjeta para web -->
            <div class="hidden md:flex flex-row gap-4 w-full items-center z-99 pt-4 pr-4">
                <!-- Columna 1: Imagen -->
                <div class="w-1/3 flex justify-center items-center">
                    <img 
                        class="w-full md:w-[150px] h-auto md:h-[150px] object-cover rounded-3xl" 
                        src="${item.image}" 
                        alt="${item.title}" 
                    />
                </div>
                <!-- Columna 2: Título, subtítulo y descripción -->
                <div class="flex flex-col justify-between w-2/3">
                    <!-- Primera fila: Título y subtítulo -->
                    <div class="flex flex-row justify-between h-full">
                        <h2 class="text-black font-medium text-left text-lg">${item.title}</h2>
                          <span class="border border-[#2393E3] text-black font-medium px-4 py-1 rounded-full text-[12px]">
            ACERCA DE
        </span>
                    </div>
                    <!-- Segunda fila: Descripción -->
                    <div class="mt-2 text-black font-light text-left text-base">
                        ${item.description}
                    </div>
                </div>
            </div>
            `;

            container.appendChild(card);
        });





        // Configurar desplazamiento
        let scrollPosition = 0;
        const scrollSpeed = 2; // Velocidad del scroll

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
        <div className="mt-10 flex flex-col gap-6 items-center w-full max-w-[300px] md:max-w-screen-2xl md:h-[262px] h-[300px]  px-4">
            <div
                className="flex flex-row gap-3 md:gap-8 items-start justify-start animate-scroll flex-nowrap"
                ref={containerRef}
            ></div>
        </div>
    );
};

export default Carrusel;
