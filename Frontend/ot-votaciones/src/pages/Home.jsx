import { useState } from "react";
import "../styles/home.css";
import { Participant, ParticipantsGrid } from "../components/Participant";
import { Sidebar } from "../components/Sidebar";
import { LoginPopup } from "../components/LoginPopup";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleVote = () => {
    if (!isLoggedIn) {
      setSelectedParticipant(null);
      setShowLoginPrompt(true);
    } else {
      alert(`Has votado por ${selectedParticipant.name}`);
      setSelectedParticipant(null);
    }
  };

  const changeMenuVisibility = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="homeContainer">
      <button
        className="menuButton"
        onClick={changeMenuVisibility}
      >
        ☰
      </button>
      <Sidebar isOpen={isMenuOpen}/>
      <div className="content">
        <h1>Votaciones de OT</h1>
        {showLoginPrompt && (
          <LoginPopup/>
        )}
        {selectedParticipant ? (
          <Participant
            selectedParticipant={selectedParticipant}
            setSelectedParticipant={setSelectedParticipant}
            handleVote={handleVote}
          ></Participant>
        ) : (
          <ParticipantsGrid
            setSelectedParticipant={setSelectedParticipant}
          ></ParticipantsGrid>
        )}
      </div>
    </div>
  );
}
