import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  padding: 20px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 20px;
  position: absolute;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

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

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarButton onClick={() => navigate("/")}>🏠 Inicio</SidebarButton>
      <SidebarButton onClick={() => navigate("/home")}>🗳️ Votaciones</SidebarButton>
      <SidebarButton onClick={() => navigate("/resultados")}>📊 Resultados</SidebarButton>

      <SidebarButton onClick={() => navigate("/ranking")}>🏆 Ranking en Tiempo Real</SidebarButton>
      <SidebarButton onClick={() => navigate("/calendario")}>📅 Calendario de Galas</SidebarButton>

      <SidebarButton onClick={() => navigate("/foro")}>💬 Foro de Fans</SidebarButton>
      <SidebarButton onClick={() => navigate("/playlist")}>🎵 Playlist de OT</SidebarButton>

      <SidebarButton onClick={() => navigate("/sobreNosotros")}>ℹ️ Sobre Nosotros</SidebarButton>

    </SidebarContainer>
  );
}

export default Sidebar;
