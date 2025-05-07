import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import EventCalendar from "../components/EventCalendar";

export default function Calendario() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BackgroundParticles />
      <div className="pageContainer">
        <button className="menuButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        <Sidebar isopen={isMenuOpen} />
        <h1>Calendario de Galas</h1>
        <EventCalendar />
      </div>
    </>
  );
}
