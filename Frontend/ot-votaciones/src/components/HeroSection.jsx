import styled from "styled-components";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Title = styled(motion.h1)`
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const Description = styled(motion.p)`
  font-size: 20px;
  line-height: 1.6;
  max-width: 700px;
  margin-bottom: 30px;
  color: white;
`;

export default function HeroSection() {
  return (
    <>
      <Title variants={fadeIn} initial="hidden" animate="visible">
        Bienvenido a Operación Triunfo
      </Title>
      <Description variants={fadeIn} initial="hidden" animate="visible">
        La competición musical que ha revolucionado el mundo del entretenimiento en España.
        Apoya a tu concursante favorito y vive la emoción de cada gala en tiempo real.
      </Description>
    </>
  );
}
