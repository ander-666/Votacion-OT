import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import TeamSection from "../components/TeamSection";
import styled from "styled-components";
import { motion } from "framer-motion";

// ANIMACIONES
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// CONTENEDOR PRINCIPAL
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #4b6cb7, #182848);
  color: white;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

// SECCIÓN DE INTRODUCCIÓN
const IntroSection = styled(motion.div)`
  max-width: 800px;
  text-align: center;
  margin-bottom: 30px;
`;

const Highlight = styled.span`
  color: #ffcc00;
  font-weight: bold;
`;

export default function SobreNosotros() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeMenuVisibility = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <BackgroundParticles />
      <AboutContainer>
        <button className="mennuButton" onClick={changeMenuVisibility}>☰</button>
        <Sidebar isOpen={isMenuOpen} />

        <IntroSection variants={fadeIn} initial="hidden" animate="visible">
          <motion.h1>Sobre Nosotros</motion.h1>
          <motion.p>
            Somos un equipo de <Highlight>desarrolladores apasionados</Highlight> por la tecnología y la música. 
            Creemos en la importancia de <Highlight>crear experiencias digitales innovadoras</Highlight> 
            que conecten a los fans con el mundo de <b>Operación Triunfo</b>.
          </motion.p>
        </IntroSection>

        <TeamSection />
      </AboutContainer>
    </>
  );
}
