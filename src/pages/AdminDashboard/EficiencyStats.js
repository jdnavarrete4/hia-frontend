import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const EfficiencyStats = () => {
    const [data, setData] = useState([]); // Datos para el gráfico
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [error, setError] = useState(null); // Manejo de errores
    const [category, setCategory] = useState("especialidades"); // Categoría seleccionada (por defecto: especialidades)

    // Llamada a la API para obtener las estadísticas
    const fetchEfficiencyData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/estadisticas-eficiencia/",
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Elegir los datos según la categoría seleccionada
            const dataByCategory =
                category === "especialidades"
                    ? response.data.especialidades
                    : response.data.medicos;

            setData(dataByCategory);
        } catch (err) {
            setError("Error al cargar las estadísticas.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEfficiencyData();
    }, [category]); // Se actualiza cada vez que cambia la categoría

    // Manejar cambio de categoría
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setLoading(true);
        setError(null);
        fetchEfficiencyData();
    };

    if (loading) {
        return <p>Cargando estadísticas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-white rounded-3xl p-8 w-full max-w-4xl mx-auto flex flex-col items-start ">
            <h2 className="text-[#0080c8] font-extralight text-lg mb-4">
                Estadísticas de Eficiencia
            </h2>
            {/* Select para cambiar entre categorías */}
            <div className="mb-6 w-full">
                <label className="mr-4 font-light text-gray-600">Categoría:</label>
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="especialidades">Especialidades</option>
                    <option value="medicos">Médicos</option>
                </select>
            </div>
            {/* Gráfico */}
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="nombre"
                        tick={{ fontSize: 12 }}
                        label={{
                            value: category === "especialidades" ? "Especialidades" : "Médicos",
                            position: "insideBottom",
                            offset: -5,
                            fontSize: 14,
                        }}
                    />
                    <YAxis
                        domain={[0, 5]}
                        label={{
                            value: "Eficiencia (1-5)",
                            angle: -90,
                            position: "insideLeft",
                            fontSize: 14,
                        }}
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="eficiencia"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );

};

export default EfficiencyStats;
