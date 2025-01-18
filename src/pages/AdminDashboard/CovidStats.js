import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const CovidStats = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [intervalo, setIntervalo] = useState("mes"); // Intervalo seleccionado (por defecto: mes)

    const fetchData = async (intervalo) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/estadisticas-covid/?intervalo=${intervalo}`,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            );
            setData(response.data);
            setError(null);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError(err.response.data.message);
            } else {
                setError("Error al cargar las estadísticas.");
            }
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(intervalo);
    }, [intervalo]);

    if (loading) {
        return <p>Cargando estadísticas...</p>;
    }

    return (
        <div className="bg-white rounded-3xl p-8 ">
            {/* Título */}
            <h2 className=" font-extralight text-lg mb-4">
                Casos reportados por covid
            </h2>

            {/* Fila de controles */}
            <div className="flex justify-between items-center mb-6">
                {/* Leyenda */}
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4A3AFF]"></span>
                        <span className="text-sm text-gray-600">Hombre</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#962DFF]"></span>
                        <span className="text-sm text-gray-600">Mujer</span>
                    </div>
                </div>

                {/* Selector de rango */}
                <div>
                    <select
                        value={intervalo}
                        onChange={(e) => setIntervalo(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="dia">Rango (Día)</option>
                        <option value="semana">Rango (Semana)</option>
                        <option value="mes">Rango (Mes)</option>
                        <option value="anio">Rango (Año)</option>
                    </select>
                </div>
            </div>

            {/* Mensaje de error */}
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        {/* Líneas con colores actualizados */}
                        <Line
                            type="monotone"
                            dataKey="hombres"
                            stroke="#4A3AFF"
                            name="Hombres"
                        />
                        <Line
                            type="monotone"
                            dataKey="mujeres"
                            stroke="#962DFF"
                            name="Mujeres"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default CovidStats;
