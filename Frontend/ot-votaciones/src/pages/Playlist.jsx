import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import OTPlaylist from "../components/OTPlaylist";

export default function Playlist() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BackgroundParticles />
      <div className="pageContainer">
        <button className="menuButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        <Sidebar isopen={isMenuOpen} />
        <h1>Playlist de OT</h1>
        <OTPlaylist />
      </div>
    </>
  );
}
