import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import Forum from "../components/Forum";

export default function Foro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BackgroundParticles />
      <div className="pageContainer">
        <button className="menuButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        <Sidebar isopen={isMenuOpen} />
        <h1>Foro de Fans</h1>
        <Forum />
      </div>
    </>
  );
}
