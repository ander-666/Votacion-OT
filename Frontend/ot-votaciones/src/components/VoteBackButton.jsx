import styled from "styled-components";
import { motion } from "framer-motion";

const VoteButton = styled(motion.button)`
  background: #ff4500;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 20px;
  &:hover {
    background: #ff8c00;
  }
`;

export default function VoteBackButton() {
  return (
    <VoteButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.href = "/home"}
    >
      ¡Volver a Votar!
    </VoteButton>
  );
}
