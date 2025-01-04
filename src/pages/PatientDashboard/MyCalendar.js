import { useState } from 'react';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { parse, format } from 'date-fns';

function MyCalendar({ availableDates, handleSelectDate }) {


    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    console.log(
        'availableDates',
        availableDates.map((obj) => obj.fecha)
    );
    // 1. Convierte tu lista de fechas disponibles en un Set para acceso rápido.
    //    Suponiendo que `availableDates` es un array de objetos tipo { fecha: 'YYYY-MM-DD', medico: '...' }
    const availableSet = new Set(
        availableDates.map((obj) => {
            // parse(str, 'dd-MMMM-yyyy', new Date()) => Date
            // format(..., 'yyyy-MM-dd') => "2025-01-08"
            const fecha = parse(obj.fecha, 'dd-MMMM-yyyy', new Date());
            return format(fecha, 'yyyy-MM-dd');
        })
    );


    // 2. Esta función le dice al Calendar qué fechas están deshabilitadas.
    //    Si devuelves "true", la fecha se deshabilita.
    const disabledDate = (date) => {
        const dayStr = format(date, 'yyyy-MM-dd');
        return !availableSet.has(dayStr);
    };

    // 3. Manejo de la selección de una fecha.
    const handleChange = (selectedDate) => {
        setFechaSeleccionada(selectedDate);

        // 1. Conviertes la fecha seleccionada a "YYYY-MM-DD"
        const dayStr = format(selectedDate, 'yyyy-MM-dd');

        // 2. BUSCAS en 'availableDates' el objeto completo con esa fecha
        //    y lo guardas en 'matchedDate'
        const matchedDate = availableDates.find((obj) => {
            // Convertimos "08-January-2025" a "2025-01-08" para comparar
            const objDayStr = format(parse(obj.fecha, 'dd-MMMM-yyyy', new Date()), 'yyyy-MM-dd');
            return objDayStr === dayStr;
        });

        // 3. Si lo encuentras, llamas a handleSelectDate con ese objeto que ya contiene "horarios"
        if (matchedDate) {
            handleSelectDate(matchedDate);
        } else {
            // Si no está, puedes pasar un objeto básico sin horarios
            handleSelectDate({
                fecha: dayStr,
                horarios: [],
                medico: 'Sin asignar',
                medico_id: null
            });
        }
    };


    // 4. Personalizar la forma en que se muestra cada día. 
    //    Aquí resaltamos los días disponibles con un color de fondo.
    const renderCell = (date) => {
        const dayStr = format(date, 'yyyy-MM-dd');
        const dayNumber = date.getDate();

        if (availableSet.has(dayStr)) {
            return (
                <div
                    style={{
                        background: '#E0F7FA',
                        borderRadius: '50%',
                        width: '2em',
                        height: '2em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {dayNumber}
                </div>
            );
        }
        return <div>{dayNumber}</div>;
    };
    return (
        <div className="bg-white rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-4">Fechas Disponibles</h2>
            {availableDates && availableDates.length > 0 ? (
                <Calendar
                    // Valor actual del calendario
                    value={fechaSeleccionada}
                    // Evento al cambiar la fecha seleccionada
                    onChange={handleChange}
                    // Lógica para deshabilitar días no disponibles
                    disabledDate={disabledDate}
                    // Personaliza la celda de cada día
                    renderCell={renderCell}
                />
            ) : (
                <p className="text-gray-500">No hay fechas disponibles.</p>
            )}
        </div>
    );
}

export default MyCalendar;
