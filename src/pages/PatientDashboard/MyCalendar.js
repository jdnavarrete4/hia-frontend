import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { parse, format } from 'date-fns';

function MyCalendar({ availableDates, handleSelectDate, handleSearchAvailability }) {
    console.log("Props recibidos en MyCalendar:", { availableDates, handleSearchAvailability });
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

    // Convierte la lista de fechas disponibles en un Set para acceso rápido
    const availableSet = new Set(
        availableDates.map((obj) => {
            const fecha = parse(obj.fecha, 'dd-MMMM-yyyy', new Date());
            return format(fecha, 'yyyy-MM-dd');
        })
    );

    // Manejo del cambio de mes
    const handleMonthChange = ({ activeStartDate }) => {
        const startDate = format(activeStartDate, 'yyyy-MM-dd');
        const endDate = format(
            new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0),
            'yyyy-MM-dd'
        );
        console.log("Solicitando fechas para el mes:", { startDate, endDate });
        handleSearchAvailability(startDate, endDate);
    };

    // Manejo de la selección de una fecha
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
        <div className=" p-6 rounded-lg w-full bg-transparent">
            <h2 className="text-xl font-bold mb-4">Fechas Disponibles</h2>
            {availableDates && availableDates.length > 0 ? (
                <Calendar
                    locale="es-ES" // Configura el idioma
                    formatShortWeekday={(locale, date) => {
                        const shortDay = date.toLocaleDateString(locale, { weekday: 'short' });
                        return shortDay.charAt(0).toUpperCase() + shortDay.slice(1).toLowerCase();
                    }}
                    formatMonthYear={(locale, date) => {
                        const monthYear = date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
                        return monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
                    }}


                    onActiveStartDateChange={handleMonthChange}
                    onChange={handleChange}
                    tileDisabled={({ date }) => {
                        const dayStr = format(date, 'yyyy-MM-dd');
                        return !availableDates.some((d) => {
                            const parsedDate = parse(d.fecha, 'dd-MMMM-yyyy', new Date());
                            return format(parsedDate, 'yyyy-MM-dd') === dayStr;
                        });
                    }}




                    tileContent={({ date }) => {
                        const dayStr = format(date, 'yyyy-MM-dd');
                        const isAvailable = availableDates.some((d) => {
                            const parsedDate = parse(d.fecha, 'dd-MMMM-yyyy', new Date());
                            return format(parsedDate, 'yyyy-MM-dd') === dayStr;
                        });

                        return (
                            <div
                                className={`
                                flex flex-col items-center justify-center w-full h-full rounded-sm 
                                ${isAvailable ? 'border-t-4 border-blue-500 bg-white' : 'bg-gray-50'}
                              `}
                                style={{
                                    padding: '8px',
                                    boxShadow: isAvailable
                                        ? '0 4px 6px rgba(0, 0, 0, 0.1)'
                                        : 'none',
                                }}
                            >
                                <div className="flex items-center justify-between w-full mb-2">
                                    <span
                                        className={`text-sm font-normal ${isAvailable ? 'text-gray-700' : 'text-gray-400'
                                            }`}
                                    >
                                        {date.getDate()}
                                    </span>
                                    {isAvailable && (
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <div className="text-xs text-gray-600">
                                    {isAvailable ? '' : ''}
                                </div>
                            </div>
                        );
                    }}
                    className="react-calendar w-full"
                />
            ) : (
                <p className="text-gray-500">No hay fechas disponibles.</p>
            )}
        </div >
    );
}

export default MyCalendar;
