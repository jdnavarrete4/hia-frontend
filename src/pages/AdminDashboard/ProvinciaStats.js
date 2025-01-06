import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const ProvinciaStats = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/estadisticas-por-provincia/');
                setData(response.data.datos);
                setTotal(response.data.total_global);
            } catch (err) {
                setError('Error al cargar los datos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Cargando estadísticas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-white rounded-3xl p-8 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#0080c8] font-extralight text-lg">Pacientes por provincia y género</h2>
                <span className="text-gray-500 font-semibold">Total: {total.toLocaleString()}</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical" margin={{ left: 50 }}>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="provincia" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hombres" stackId="a" fill="#7d1cfb" name="Hombres" />
                    <Bar dataKey="mujeres" stackId="a" fill="#a672eb" name="Mujeres" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProvinciaStats;
