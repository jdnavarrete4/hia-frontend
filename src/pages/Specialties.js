import React, { useEffect, useRef } from 'react';

const Carrusel = ({ items }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const cloneItems = [...items, ...items]; // Duplicar 
        cloneItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "bg-[#ffffff] rounded-3xl p-6 flex flex-row gap-6 items-center justify-start shadow-custom min-w-[650px] max-w-[900px] ";
            card.innerHTML = `
          <img class="w-[165px] h-[152px] object-cover rounded-3xl" src="${item.image}" alt="${item.title}" />
          <div class="flex flex-col gap-4 items-start">
            <div class="text-black font-medium text-left text-2xl">${item.title}</div>
            <div class="text-black font-light text-left text-base">${item.description}</div>
          </div>`;
            container.appendChild(card);
        });
    }, [items]);

    return (
        <div className="relative mt-8 flex flex-col gap-6 items-start w-full h-[262px] overflow-x-hidden">
            <div className="flex flex-row gap-8 items-start justify-start animate-scroll" ref={containerRef}></div>
        </div>
    );
};


export default Carrusel;
