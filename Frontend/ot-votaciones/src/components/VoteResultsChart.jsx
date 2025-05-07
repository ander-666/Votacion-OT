/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const COLORS = ["#ff4500", "#ff8c00", "#ffcc00", "#00c6ff", "#0072ff", "#ff69b4", "#00ffcc", "#ff3399", "#9966ff", "#ff3333"];

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
`;

export default function VoteResultsChart({ voteCounts, chartType }) {
  const data = Object.entries(voteCounts).map(([id, count]) => ({
    name: `Participante ${id}`,
    value: count,
  }));

  return (
    <ChartContainer>
      {chartType === "pie" ? (
        <>
          <h2>Distribución de Votos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      ) : (
        <>
          <h2>Votos por Participante</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ff4500" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartContainer>
  );
}
