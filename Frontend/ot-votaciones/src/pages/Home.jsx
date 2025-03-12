import { useState } from "react";
import "../styles/home.css";
import Sidebar from "../components/Sidebar";
import { Participants } from "../components/Participant";
import { ParticipantProvider } from "../context/ParticipantProvider";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeMenuVisibility = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="homeContainer">
      <button
        className="menuButton"
        onClick={changeMenuVisibility}
      >
        ☰
      </button>
      <Sidebar isOpen={isMenuOpen} />
      <ParticipantProvider>
        <Participants/>
      </ParticipantProvider>
      
    </div>
  );
}
