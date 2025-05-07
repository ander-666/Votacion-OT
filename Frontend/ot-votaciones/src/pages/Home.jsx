import { useState } from "react";
import "../styles/home.css";
import Sidebar from "../components/Sidebar";
import ParticipantsGrid from "../components/ParticipantsGrid";
import { ParticipantProvider } from "../context/ParticipantProvider";
import { useSession } from "../hooks/useSession";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, login } = useSession(); // Usa la sesión de Keycloak

  const changeMenuVisibility = () => setIsMenuOpen(!isMenuOpen);

  const handleVote = (participant) => {
    if (!isLoggedIn) {
      login(); // 🔹 Si no está autenticado, redirige al login de Keycloak
    } else {
      alert(`Voto registrado para ${participant.name}!`);
      // Aquí podrías hacer la petición real al backend si es necesario.
    }
  };

  return (
    <div className="homeContainer">
      <button className="menuButton" onClick={changeMenuVisibility}>☰</button>
      <Sidebar isopen={isMenuOpen} />

      <ParticipantProvider>
        <ParticipantsGrid onVote={handleVote} /> {/* 🔹 Pasa `handleVote` */}
      </ParticipantProvider>
    </div>
  );
}
