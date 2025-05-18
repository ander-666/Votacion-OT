/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import styled from "styled-components";

const COLORS = [
  "#ff4500", "#ff8c00", "#ffcc00", "#00c6ff", "#0072ff",
  "#ff69b4", "#00ffcc", "#ff3399", "#9966ff", "#ff3333"
];

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 700px;
`;

export default function VoteResultsChart({ chartType }) {
  const [voteData, setVoteData] = useState([]);

  useEffect(() => {
    const fetchVotesAndParticipants = async () => {
      try {
        const [votesRes, participantsRes] = await Promise.all([
          fetch(`${window.env?.VITE_KONG_ADDRESS}/alsofree`),
          fetch(`${window.env?.VITE_KONG_ADDRESS}/free`)
        ]);

        const votes = await votesRes.json();
        const participants = await participantsRes.json();

        const galaIdFiltrar = 1;
        const voteCountMap = {};

        votes
          .filter(v => v.galaId === galaIdFiltrar)
          .forEach(v => {
            voteCountMap[v.participantId] = (voteCountMap[v.participantId] || 0) + 1;
          });

        const combinedData = Object.entries(voteCountMap).map(([participantId, count]) => {
          const participant = participants.find(p => p.participantId === parseInt(participantId));
          return {
            name: participant?.name || `Participante ${participantId}`,
            value: count,
          };
        });

        setVoteData(combinedData);
      } catch (err) {
        console.error("Error loading votes or participants", err);
      }
    };

    fetchVotesAndParticipants();
  }, []);

  return (
    <ChartContainer>
      {chartType === "pie" ? (
        <>
          <h2>Distribución de Votos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={voteData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {voteData.map((_, index) => (
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
            <BarChart data={voteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ff4500" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </ChartContainer>
  );
}
