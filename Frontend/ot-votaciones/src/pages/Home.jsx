import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const participants = [
  { id: 1, name: "Naiara Moreno Aznar", image: "/imagenes/1.jpg", description: "Nació en Zaragoza el 29 de abril de 1997 y es la mayor de 6 hermanos. Fue cantante de la orquesta aragonesa Nueva Alaska hasta su paso por Operación Triunfo 2023." },
  { id: 2, name: "Pablo (Paul Thin) Suárez Delgado", image: "/imagenes/2.jpg", description: "Armilla, Granada, 14 de diciembre de 2002" },
  { id: 3, name: "Ruslana Panchyshyna Lapets", image: "/imagenes/3.jpg", description: "Tenerife, 10 de septiembre de 2005" },
  { id: 4, name: "Juanjo Bona Arregui", image: "/imagenes/4.png", description: "Nació en Magallón, Zaragoza, el 10 de noviembre de 2003. Tiene un hermano 3 años menor que él. Recibió clases de canto, solfeo y jota desde muy pequeño, al mismo tiempo que aprendía a tocar el clarinete en la Escuela de Música de Magall" },
  { id: 5, name: "Lucas Curotto", image: "/imagenes/5.jpg", description: "Desde muy temprana edad Curotto fue diagnosticado con TDAH y dislexia,1​ lo que dificultó su desempeño académico. Debido a estas dificultades, decidió dejar la escuela en su adolescencia para enfocarse en su pasión por la música." },
  { id: 6, name: "Martin Urrutia Horas", image: "/imagenes/6.jpg", description: "Nació en Guecho el 30 de marzo de 20051​ y es el mayor de tres hermanos.2​ Martin mostró interés por las artes escénicas desde muy pequeño, lo que le llevó a estudiar danza en la Escuela de Ballet Roser Carrés. Tras cursar el bachillerato de artes escénicas en Bilbao, ingresó en Dantzerti, la Escuela Superior de Arte Dramático y Danza del País Vasco." },
  { id: 7, name: "Bea Fernández Soto", image: "/imagenes/7.jpg", description: " Nació en 2004 en San Fernando de Henares y es la menor de dos hermanas.​Desde muy pequeña recibió clases de música y movimiento. Antes de entrar a Operación Triunfo 2023, estudiaba el grado de Magisterio en Educación Primaria en la Universidad Complutense de Madrid y daba clases de iniciación de música y piano a niños." },
  { id: 8, name: "Chiara Oliver Williams", image: "/imagenes/8.jpg", description: "De ascendencia menorquina por parte de padre y británica por parte de madre, mostró interés por la música desde sus primeros años. Su primer contacto con un escenario fue a los seis años, cuando participó como candidata en un concurso de talento organizado por un hotel." },
  { id: 9, name: "Álvaro Gutiérrez Mayo", image: "/imagenes/9.jpg", description: "Sevilla, 4 de marzo de 2002" },
  { id: 10, name: "Cristian (Cris) Bartolomé Botau", image: "/imagenes/10.jpg", description: "(San Cristóbal de La Laguna, Tenerife, 20 de septiembre de 1999" },
  { id: 11, name: "Violeta Hódar Feixas", image: "/imagenes/11.jpg", description: "Motril, Granada, 23 de enero de 2001" },
  { id: 12, name: "Alex Márquez Angorilla", image: "/imagenes/12.jpg", description: "Córdoba, 24 de noviembre de 1998" },
  { id: 13, name: "Salma Díaz Picón", image: "/imagenes/13.jpg", description: "Mijas, Málaga, 4 de octubre de 2002" },
  { id: 14, name: "Almudena (Denna) Ruiz Vilchez", image: "/imagenes/14.jpg", description: "Ogíjares, Granada, 30 de marzo de 2001" },
  { id: 15, name: "Omar Samba Castro", image: "/imagenes/15.jpg", description: "Yunquera de Henares, Guadalajara, 9 de mayo de 1997" },
  { id: 16, name: "Suzete Correia Ramos", image: "/imagenes/16.jpg", description: "Santa Cruz de Tenerife, 21 de abril de 2001" }
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
  grid-template-columns: repeat(4, 1fr);
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
        <SidebarButton onClick={() => navigate("/")}>Inicio</SidebarButton>
        <SidebarButton onClick={() => navigate("/login")}>Login</SidebarButton>
        <SidebarButton onClick={() => navigate("/about")}>Sobre Nosotros</SidebarButton>
        <SidebarButton onClick={() => navigate("/resultados")}>Resultados</SidebarButton>
        <SidebarButton onClick={() => navigate("/home")}>Votación</SidebarButton>
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


/*const participants = [
  { id: 1, name: "Naiara Moreno Aznar", image: "/imagenes/1.jpg", description: "Nació en Zaragoza el 29 de abril de 1997 y es la mayor de 6 hermanos. Fue cantante de la orquesta aragonesa Nueva Alaska hasta su paso por Operación Triunfo 2023." },
  { id: 2, name: "Pablo (Paul Thin) Suárez Delgado", image: "/imagenes/2.jpg", description: "Armilla, Granada, 14 de diciembre de 2002" },
  { id: 3, name: "Ruslana Panchyshyna Lapets", image: "/imagenes/3.jpg", description: "Tenerife, 10 de septiembre de 2005" },
  { id: 4, name: "Juanjo Bona Arregui", image: "/imagenes/4.png", description: "Nació en Magallón, Zaragoza, el 10 de noviembre de 2003. Tiene un hermano 3 años menor que él. Recibió clases de canto, solfeo y jota desde muy pequeño, al mismo tiempo que aprendía a tocar el clarinete en la Escuela de Música de Magall" },
  { id: 5, name: "Lucas Curotto", image: "/imagenes/5.jpg", description: "Desde muy temprana edad Curotto fue diagnosticado con TDAH y dislexia,1​ lo que dificultó su desempeño académico. Debido a estas dificultades, decidió dejar la escuela en su adolescencia para enfocarse en su pasión por la música." },
  { id: 6, name: "Martin Urrutia Horas", image: "/imagenes/6.jpg", description: "Nació en Guecho el 30 de marzo de 20051​ y es el mayor de tres hermanos.2​ Martin mostró interés por las artes escénicas desde muy pequeño, lo que le llevó a estudiar danza en la Escuela de Ballet Roser Carrés. Tras cursar el bachillerato de artes escénicas en Bilbao, ingresó en Dantzerti, la Escuela Superior de Arte Dramático y Danza del País Vasco." },
  { id: 7, name: "Bea Fernández Soto", image: "/imagenes/7.jpg", description: " Nació en 2004 en San Fernando de Henares y es la menor de dos hermanas.​Desde muy pequeña recibió clases de música y movimiento. Antes de entrar a Operación Triunfo 2023, estudiaba el grado de Magisterio en Educación Primaria en la Universidad Complutense de Madrid y daba clases de iniciación de música y piano a niños." },
  { id: 8, name: "Chiara Oliver Williams", image: "/imagenes/8.jpg", description: "De ascendencia menorquina por parte de padre y británica por parte de madre, mostró interés por la música desde sus primeros años. Su primer contacto con un escenario fue a los seis años, cuando participó como candidata en un concurso de talento organizado por un hotel." },
  { id: 9, name: "Álvaro Gutiérrez Mayo", image: "/imagenes/9.jpg", description: "Sevilla, 4 de marzo de 2002" },
  { id: 10, name: "Cristian (Cris) Bartolomé Botau", image: "/imagenes/10.jpg", description: "(San Cristóbal de La Laguna, Tenerife, 20 de septiembre de 1999" },
  { id: 11, name: "Violeta Hódar Feixas", image: "/imagenes/11.jpg", description: "Motril, Granada, 23 de enero de 2001" },
  { id: 12, name: "Alex Márquez Angorilla", image: "/imagenes/12.jpg", description: "Córdoba, 24 de noviembre de 1998" },
  { id: 13, name: "Salma Díaz Picón", image: "/imagenes/13.jpg", description: "Mijas, Málaga, 4 de octubre de 2002" },
  { id: 14, name: "Almudena (Denna) Ruiz Vilchez", image: "/imagenes/14.jpg", description: "Ogíjares, Granada, 30 de marzo de 2001" },
  { id: 15, name: "Omar Samba Castro", image: "/imagenes/15.jpg", description: "Yunquera de Henares, Guadalajara, 9 de mayo de 1997" },
  { id: 16, name: "Suzete Correia Ramos", image: "/imagenes/16.jpg", description: "Santa Cruz de Tenerife, 21 de abril de 2001" }
];*/