import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import axios from 'axios';

const EnfermedadStats = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/enfermedades-mas-comunes/');
                setData(response.data.datos);
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

    const COLORS = ['#7d1cfb', '#9e9e9e', '#bdbdbd', '#e0e0e0'];

    return (
        <div className="bg-white rounded-3xl p-8 w-full  ">
            <h2 className="text-[#0080c8] font-extralight text-lg mb-4">Enfermedades más comunes</h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart layout="vertical" data={data} margin={{ left: 50 }}>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="enfermedad" />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" name="Casos">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EnfermedadStats;
