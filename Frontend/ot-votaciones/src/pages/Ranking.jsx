import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import RankingList from "../components/RankingList";



export default function Ranking() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BackgroundParticles />
      <div className="pageContainer">
        <button className="menuButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        <Sidebar isOpen={isMenuOpen} />
        <h1>Ranking en Tiempo Real</h1>
        <RankingList />
      </div>
    </>
  );
}
