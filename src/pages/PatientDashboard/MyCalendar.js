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
        <div className="p-6 rounded-lg w-full bg-transparent">

            {/* Encabezado en una fila */}
            <div className="flex items-center justify-between mb-4">
                {/* Flecha y texto "Fechas Disponibles" */}
                <div className="flex items-center space-x-2">
                    <button onClick={handleBack} className="text-black flex items-center focus:outline-none">
                        <svg
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
                        </svg>
                    </button>
                    <h2 className="text-lg font-bold">Fechas Disponibles</h2>
                </div>

                {/* Mes y flechas de navegación */}

            </div>
            <div className='flex justify-end'>
                <div className="flex items-end space-x-2">
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
                                setActiveStartDate(newStartDate); // Actualiza el estado
                                handleMonthChange({ activeStartDate: newStartDate }); // Sincroniza con el calendario
                            }
                        }}
                        className={`${activeStartDate.getFullYear() === today.getFullYear() &&
                            activeStartDate.getMonth() === today.getMonth()
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-500'
                            }`}
                        disabled={
                            activeStartDate.getFullYear() === today.getFullYear() &&
                            activeStartDate.getMonth() === today.getMonth()
                        }
                    >
                        &lt;
                    </button>

                    {/* Mes y año */}
                    <span className="text-sm font-normal">
                        {activeStartDate.toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                        }).charAt(0).toUpperCase() +
                            activeStartDate.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                            }).slice(1)}
                    </span>

                    {/* Flecha de avance */}
                    <button
                        onClick={() => {
                            const newStartDate = new Date(
                                activeStartDate.getFullYear(),
                                activeStartDate.getMonth() + 1,
                                1
                            );
                            setActiveStartDate(newStartDate); // Actualiza el estado
                            handleMonthChange({ activeStartDate: newStartDate }); // Sincroniza con el calendario
                        }}
                        className="text-blue-500"
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
        </div>

    );
}

export default MyCalendar;
