import styled from "styled-components";
import { motion } from "framer-motion";
import { useParticipant } from "../hooks/useParticipant";
import { useEffect, useState } from "react";

const RankingContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const Participant = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  background: #34495e;
  border-radius: 10px;
  overflow: hidden;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  color: #ecf0f1;
  font-weight: bold;
`;

const ProgressBar = styled.div`
  height: 10px;
  background: #2c3e50;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: ${({ percentage }) => percentage}%;
    background: linear-gradient(to right, #ff6f61, #ffa07a);
    transition: width 0.5s ease-in-out;
  }
`;

export default function RankingList() {
  const { participants } = useParticipant();
  const [votesMap, setVotesMap] = useState({});

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch(`${window.env?.VITE_KONG_ADDRESS}/alsofree`);
        const votes = await res.json();

        const galaId = 1;
        const counts = {};

        votes
          .filter((v) => v.galaId === galaId)
          .forEach((v) => {
            counts[v.participantId] = (counts[v.participantId] || 0) + 1;
          });

        setVotesMap(counts);
      } catch (err) {
        console.error("Error al cargar votos", err);
      }
    };

    fetchVotes();
  }, []);

  const totalVotes = Object.values(votesMap).reduce((acc, v) => acc + v, 0);

  const sortedParticipants = [...participants].sort((a, b) => {
    const votesA = votesMap[a.participantId] || 0;
    const votesB = votesMap[b.participantId] || 0;
    return votesB - votesA;
  });

  return (
    <RankingContainer>
      <Title>Ranking en Tiempo Real</Title>
      {sortedParticipants.map((p, index) => {
        const votes = votesMap[p.participantId] || 0;
        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

        return (
          <Participant key={p.participantId} whileHover={{ scale: 1.02 }}>
            <InfoRow>
              <span>{index + 1}. {p.name}</span>
              <span>{votes} voto{votes !== 1 ? "s" : ""}</span>
            </InfoRow>
            <ProgressBar percentage={percentage} />
          </Participant>
        );
      })}
    </RankingContainer>
  );
}
