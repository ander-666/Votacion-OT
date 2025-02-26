import styled from "styled-components";
import { motion } from "framer-motion";

const RankingContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
`;

const Participant = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 0;
  background: #2c3e50;
  border-radius: 8px;
  color: white;
`;

const participants = [
  { name: "Participante 1", votes: 250 },
  { name: "Participante 2", votes: 200 },
  { name: "Participante 3", votes: 180 },
];

export default function RankingList() {
  return (
    <RankingContainer>
      <h2>Ranking en Tiempo Real</h2>
      {participants.map((p, index) => (
        <Participant key={index} whileHover={{ scale: 1.05 }}>
          <span>{p.name}</span>
          <span>{p.votes} votos</span>
        </Participant>
      ))}
    </RankingContainer>
  );
}
