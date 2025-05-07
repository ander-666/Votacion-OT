/* eslint-disable react/prop-types */
import styled from "styled-components";
import { motion } from "framer-motion";

const SummaryContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  width: 80%;
  max-width: 600px;
  color: white;
`;

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function VoteSummary({ totalVotes }) {
  return (
    <SummaryContainer variants={fadeIn} initial="hidden" animate="visible">
      <h2>Total de Votos Registrados</h2>
      <motion.p whileHover={{ scale: 1.1 }} style={{ fontSize: "24px", fontWeight: "bold", color: "#ffcc00" }}>
        {totalVotes}
      </motion.p>
    </SummaryContainer>
  );
}
