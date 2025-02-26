import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styled from "styled-components";

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #4b6cb7, #182848);
  color: white;
`;

export default function Resultados() {
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    const votes = JSON.parse(localStorage.getItem("votes")) || {};
    const count = {};
    Object.values(votes).forEach(vote => {
      count[vote] = (count[vote] || 0) + 1;
    });
    setVoteCounts(count);
  }, []);

  const data = Object.entries(voteCounts).map(([id, count]) => ({
    name: `Participante ${id}`,
    value: count,
  }));

  const COLORS = ["#ff4500", "#ff8c00", "#ffcc00", "#00c6ff", "#0072ff", "#ff69b4"];

  return (
    <ResultContainer>
      <h1>Resultados de Votación</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResultContainer>
  );
}
