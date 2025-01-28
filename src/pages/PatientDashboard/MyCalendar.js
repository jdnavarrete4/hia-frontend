import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { parse, format } from 'date-fns';

function MyCalendar({ availableDates, handleSelectDate, handleSearchAvailability, handleBack }) {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date()); // Controla el mes visible

    const today = new Date(); // Fecha actual

    const handleMonthChange = ({ activeStartDate }) => {
        setActiveStartDate(activeStartDate); // Actualiza el mes visible
        const startDate = format(activeStartDate, 'yyyy-MM-dd');
        const endDate = format(
            new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0),
            'yyyy-MM-dd'
        );
        handleSearchAvailability(startDate, endDate);
    };

    const handleChange = (selectedDate) => {
        setFechaSeleccionada(selectedDate);

        const dayStr = format(selectedDate, 'yyyy-MM-dd');
        const matchedDate = availableDates.find((obj) => {
            const objDayStr = format(parse(obj.fecha, 'dd-MMMM-yyyy', new Date()), 'yyyy-MM-dd');
            return objDayStr === dayStr;
        });

        handleSelectDate(
            matchedDate || {
                fecha: dayStr,
                horarios: [],
                medico: 'Sin asignar',
                medico_id: null,
            }
        );
    };

    return (
        <div className="p-0` md:p-3 rounded-lg w-full bg-transparent">

            {/* Encabezado en una fila */}
            <div className="flex md:items-center items-start justify-between mb-4">
                {/* Flecha y texto "Fechas Disponibles" */}
                <div className="flex flex-col md:flex-row  md:items-center items-start  space-x-2">

                    <h2 className="text-lg font-bold mt-8 md:mt-0">Selecciona una fecha disponible</h2>
                </div>

                {/* Mes y flechas de navegación */}

            </div>
            <div className="flex-col md:justify-between justify-between mt-12 md:mt-0 md:flex-row flex gap-8 ">
                {/* Indicadores de Disponibilidad */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Disponible</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Ocupado</span>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                </div>

                <div className="flex items-center w-full justify-between md:justify-end gap-4">
                    {/* Flecha de retroceso */}
                    <button
                        onClick={() => {
                            if (
                                activeStartDate.getFullYear() > today.getFullYear() ||
                                (activeStartDate.getFullYear() === today.getFullYear() &&
                                    activeStartDate.getMonth() > today.getMonth())
                            ) {
                                const newStartDate = new Date(
                                    activeStartDate.getFullYear(),
                                    activeStartDate.getMonth() - 1,
                                    1
                                );
                                setActiveStartDate(newStartDate);
                                handleMonthChange({ activeStartDate: newStartDate });
                            }
                        }}
                        className={`${activeStartDate.getFullYear() === today.getFullYear() &&
                            activeStartDate.getMonth() === today.getMonth()
                            ? 'text-gray-400 cursor-not-allowed text-lg'
                            : 'text-blue-500 text-lg'
                            }`}
                        disabled={
                            activeStartDate.getFullYear() === today.getFullYear() &&
                            activeStartDate.getMonth() === today.getMonth()
                        }
                    >
                        &lt;
                    </button>

                    {/* Mes y año */}
                    <span className="md:text-sm text-lg font-normal text-center">
                        {activeStartDate
                            .toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                            })
                            .charAt(0)
                            .toUpperCase() +
                            activeStartDate
                                .toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                })
                                .slice(1)}
                    </span>

                    {/* Flecha de avance */}
                    <button
                        onClick={() => {
                            const newStartDate = new Date(
                                activeStartDate.getFullYear(),
                                activeStartDate.getMonth() + 1,
                                1
                            );
                            setActiveStartDate(newStartDate);
                            handleMonthChange({ activeStartDate: newStartDate });
                        }}
                        className="text-blue-500 text-lg"
                    >
                        &gt;
                    </button>
                </div>
            </div>




            {/* Calendario */}
            {availableDates && availableDates.length > 0 ? (
                <Calendar
                    locale="es-ES"
                    formatShortWeekday={(locale, date) => {
                        const shortDay = date.toLocaleDateString(locale, { weekday: 'short' });
                        return shortDay.charAt(0).toUpperCase() + shortDay.slice(1).toLowerCase();
                    }}
                    formatMonthYear={(locale, date) => {
                        const monthYear = date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
                        return monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
                    }}
                    onActiveStartDateChange={handleMonthChange}
                    activeStartDate={activeStartDate} // Sincroniza con el estado
                    onChange={handleChange}
                    tileDisabled={({ date }) => {
                        if (date < today.setHours(0, 0, 0, 0)) {
                            return true;
                        }
                        return !availableDates.some((d) => {
                            const parsedDate = parse(d.fecha, 'dd-MMMM-yyyy', new Date());
                            return format(parsedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                        });
                    }}
                    showNavigation={false} // Oculta el encabezado de navegación

                    next2Label={null}
                    prev2Label={null}
                    tileContent={({ date }) => {
                        const isAvailable = availableDates.some((d) => {
                            const parsedDate = parse(d.fecha, 'dd-MMMM-yyyy', new Date());
                            return format(parsedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                        });

                        return (
                            <div
                                className={`flex items-center justify-between w-full h-full rounded-sm 
        ${isAvailable ? 'border-t-4 border-blue-500 bg-white hover:bg-blue-100' : 'bg-gray-50'}`}
                                style={{
                                    padding: '8px',
                                    boxShadow: isAvailable ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                                }}
                            >
                                {/* Número del día */}
                                <span className={`text-sm ${isAvailable ? 'text-gray-700' : 'text-gray-400'}`}>
                                    {date.getDate()}
                                </span>

                                {/* Círculo */}
                                {isAvailable && (
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                )}
                            </div>


                        );
                    }}
                    className="react-calendar w-full mt-8"
                />
            ) : (
                <p className="text-gray-500">No hay fechas disponibles.</p>
            )}

            <button onClick={handleBack}
                className="bg-white border border-gray-300 
                        rounded-lg px-6 py-3 md:py-2 text-black 
                        font-normal text-[14px] order-2 md:order-1 
                        w-fit mt-8 flex justify-start gap-4 items-center">
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 "
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg> */}
                <p>
                    Regresar
                </p>
            </button>
        </div>

    );
}

export default MyCalendar;
