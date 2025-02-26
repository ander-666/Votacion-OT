import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";

// ANIMACIONES
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { left: -250px; }
  to { left: 0; }
`;

const slideOut = keyframes`
  from { left: 0; }
  to { left: -250px; }
`;

// CONTENEDOR PRINCIPAL
const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #4b6cb7, #182848);
  color: white;
  position: relative;
  overflow: hidden;
`;

// MENÚ LATERAL
const Sidebar = styled(motion.div)`
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  padding: 20px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 20px;
  position: absolute;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

// BOTONES DEL MENÚ
const SidebarButton = styled.button`
  background: #ff4500;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #ff8c00;
  }
`;

// CONTENIDO PRINCIPAL
const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  max-width: 800px;
  margin: auto;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 40px;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

export default function Inicio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <HomeContainer>
      {/* Fondo Animado */}
      <Particles options={{ particles: { number: { value: 50 }, move: { speed: 2 } } }} />

      {/* Botón de menú */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ position: "absolute", top: "10px", left: "10px", background: "transparent", border: "none", color: "white", fontSize: "24px", cursor: "pointer", zIndex: "1100" }}>
        ☰
      </button>

      {/* Menú lateral */}
      <Sidebar isOpen={isMenuOpen}>
        <SidebarButton onClick={() => navigate("/")}>Inicio</SidebarButton>
        <SidebarButton onClick={() => navigate("/home")}>Votación</SidebarButton>
        <SidebarButton onClick={() => navigate("/resultados")}>Resultados</SidebarButton>
        <SidebarButton onClick={() => navigate("/about")}>Sobre Nosotros</SidebarButton>
      </Sidebar>

      {/* Contenido Principal */}
      <Content>
        <Title>Bienvenido a Operación Triunfo</Title>
        <Description>
          Operación Triunfo es un programa de televisión musical que ha revolucionado el mundo del entretenimiento en España desde su estreno en 2001.
          Se ha convertido en un fenómeno cultural, lanzando las carreras de artistas icónicos como David Bisbal, Aitana y Pablo Alborán.
        </Description>
        <Description>
          En esta plataforma, podrás seguir la competencia, votar por tus favoritos y ver los resultados en tiempo real.
          ¡Siente la emoción de cada gala y apoya a tu concursante favorito!
        </Description>
      </Content>
    </HomeContainer>
  );
}
