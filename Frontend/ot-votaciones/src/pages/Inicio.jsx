import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";
import ParticipantCarousel from "../components/ParticipantCarousel";
import styled from "styled-components";
import { ParticipantProvider } from "../context/ParticipantProvider";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #4b6cb7, #182848);
  color: white;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

export default function Inicio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeMenuVisibility = () => setIsMenuOpen(!isMenuOpen)
  return (
    <>
      <BackgroundParticles />
      <HomeContainer>
      <button
        className="menuButton"
        onClick={changeMenuVisibility}
      >
        ☰
      </button>
        <Sidebar isOpen={isMenuOpen} />
        <HeroSection />
        <CTAButton />
        <ParticipantProvider>
          <ParticipantCarousel/>
        </ParticipantProvider>
      </HomeContainer>
    </>
  );
}
