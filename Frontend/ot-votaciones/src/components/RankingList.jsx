import styled from "styled-components";
import { motion } from "framer-motion";
import { useParticipant } from "../hooks/useParticipant";

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


export default function RankingList() {
  const {participants} = useParticipant();

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
