import React, { useEffect, useRef } from 'react';

const Carrusel = ({ items }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const cloneItems = [...items, ...items]; // Duplicar 
        cloneItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className =
                "bg-white rounded-3xl p-6 flex flex-row gap-6 items-center justify-start shadow-custom flex-shrink-0 w-[90%] sm:w-[75%] md:w-[60%] max-w-[650px]";
            card.innerHTML = `
             <img class="w-[120px] md:w-[165px] h-[120px] md:h-[152px] object-cover rounded-3xl" src="${item.image}" alt="${item.title}" />
                <div class="flex flex-col gap-4 items-start">
                    <div class="text-black font-medium text-left text-sm md:text-lg">${item.title}</div>
                    <div class="text-black font-light text-left text-xs md:text-base">${item.description}</div>
                </div>`;
            container.appendChild(card);
        });
    }, [items]);

    return (
        // <div className="relative mt-8 flex flex-col gap-6 items-start w-full h-[262px] overflow-x-hidden">
        //     <div className="flex flex-row gap-8 items-start justify-start animate-scroll" ref={containerRef}></div>
        // </div>

        <div className=" mt-10 flex flex-col gap-6 items-start max-w-screen-2xl h-[262px] overflow-x-hidden">
            <div
                className="flex flex-row gap-8 items-start justify-start animate-scroll"
                ref={containerRef}
            ></div>
        </div>
    );
};


export default Carrusel;