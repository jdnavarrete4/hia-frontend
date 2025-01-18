import React, { useEffect, useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const EspecialidadStats = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const COLORS = ['#7d1cfb', '#f4b0b0', '#9bbcff', '#4a3aff'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/estadisticas-por-especialidad/');
                setData(response.data.datos);
                setTotal(response.data.total_global);
            } catch (err) {
                setError('Error al cargar las estadísticas.');
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
        <div className="bg-white rounded-3xl p-8  w-full">
            <h2 className="text-[#0080c8] font-extralight text-lg ">Asistencia por especialidad</h2>
            <div className="flex justify-center items-center flex-col">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="especialidad"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={60}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <p className="text-center text-lg font-semibold mt-4">
                    Total: {total.toLocaleString()}
                </p>
                <ul className="mt-4">
                    {data.map((item, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                            <span
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            {item.especialidad}: {item.total} ({item.porcentaje}%)
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EspecialidadStats;
