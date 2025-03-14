import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const scaleIn = {
  hidden: { scale: 0.9 },
  visible: { scale: 1, transition: { duration: 0.6 } }
};

const Button = styled(motion.button)`
  background: #ff4500;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #ff8c00;
  }
`;

export default function CTAButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/home")}>¡Votar Ahora!</button>
  );
}
