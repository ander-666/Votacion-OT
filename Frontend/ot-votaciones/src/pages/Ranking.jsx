import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import RankingList from "../components/RankingList";
import { ParticipantProvider } from "../context/ParticipantProvider";

export default function Ranking() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BackgroundParticles />
      <div className="pageContainer">
        <button className="menuButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        <Sidebar isopen={isMenuOpen} />
        <h1>Ranking en Tiempo Real</h1>
        <ParticipantProvider>
          <RankingList />
        </ParticipantProvider>
      </div>
    </>
  );
}
