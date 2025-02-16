import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const participants = [
  { id: 1, name: "Participante 1", image: "https://via.placeholder.com/150", description: "Descripción del Participante 1" },
  { id: 2, name: "Participante 2", image: "https://via.placeholder.com/150", description: "Descripción del Participante 2" },
  { id: 3, name: "Participante 3", image: "https://via.placeholder.com/150", description: "Descripción del Participante 3" },
  { id: 4, name: "Participante 4", image: "https://via.placeholder.com/150", description: "Descripción del Participante 4" },
  { id: 5, name: "Participante 5", image: "https://via.placeholder.com/150", description: "Descripción del Participante 5" },
  { id: 6, name: "Participante 6", image: "https://via.placeholder.com/150", description: "Descripción del Participante 6" },
  { id: 7, name: "Participante 7", image: "https://via.placeholder.com/150", description: "Descripción del Participante 7" },
  { id: 8, name: "Participante 8", image: "https://via.placeholder.com/150", description: "Descripción del Participante 8" },
  { id: 9, name: "Participante 9", image: "https://via.placeholder.com/150", description: "Descripción del Participante 9" }
];

const slideIn = keyframes`
  from {
    left: -250px;
  }
  to {
    left: 0;
  }
`;

const slideOut = keyframes`
  from {
    left: 0;
  }
  to {
    left: -250px;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(180deg, #4b6cb7, #182848);
  color: white;
  position: relative;
`;

const Sidebar = styled.div`
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  padding: ${({ isOpen }) => (isOpen ? "20px" : "0")};
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 20px;
  position: absolute;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
  z-index: 1000;

  /* Centrar botones verticalmente */
  justify-content: center;
  align-items: center;
`;

const SidebarButton = styled.button`
  background: #1abc9c;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #ff8c00;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  padding: 15px 30px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: auto;
  max-width: 800px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: #222;
  color: white;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ff4500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(255, 69, 0, 0.3);
  z-index: 1001;
`;

const VoteButton = styled.button`
  background: #ff4500;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 10px;
  &:hover {
    background: #ff8c00;
  }

`;

export default function Home() {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const handleVote = () => {
    if (!isLoggedIn) {
      setSelectedParticipant(null);
      setShowLoginPrompt(true);
    } else {
      alert(`Has votado por ${selectedParticipant.name}`);
      setSelectedParticipant(null);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <HomeContainer>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        style={{ position: 'absolute', top: '10px', left: '10px', background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer', zIndex: '1100' }}>
        ☰
      </button>
      <Sidebar isOpen={isMenuOpen}>
        <SidebarButton onClick={() => navigate("/")}>Votaciones</SidebarButton>
        <SidebarButton onClick={() => navigate("/login")}>Login</SidebarButton>
        <SidebarButton onClick={() => navigate("/about")}>Sobre Nosotros</SidebarButton>
      </Sidebar>
      <Content>
        <Title>Votaciones de OT</Title>
        {showLoginPrompt && (
          <Modal>
            <p>Para votar necesitas iniciar sesión o registrarte.</p>
            <SidebarButton onClick={() => navigate("/login")}>Iniciar Sesión</SidebarButton>
            <SidebarButton onClick={() => navigate("/register")}>Registrarse</SidebarButton>
          </Modal>
        )}
        {selectedParticipant ? (
          <Modal>
            <h2>{selectedParticipant.name}</h2>
            <ImageContainer>
              <img src={selectedParticipant.image} alt={selectedParticipant.name} width="100%" height="100%" />
            </ImageContainer>
            <p>{selectedParticipant.description}</p>
            <VoteButton onClick={handleVote}>Votar</VoteButton>
            <VoteButton onClick={() => setSelectedParticipant(null)}>Cerrar</VoteButton>
          </Modal>
        ) : (
          <ParticipantsGrid>
            {participants.map((participant) => (
              <Card key={participant.id} onClick={() => setSelectedParticipant(participant)}>
                <ImageContainer>
                  <img src={participant.image} alt={participant.name} width="100%" height="100%" />
                </ImageContainer>
                <h3>{participant.name}</h3>
              </Card>
            ))}
          </ParticipantsGrid>
        )}
      </Content>
    </HomeContainer>
  );
}
