import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import OTPlaylist from "../components/OTPlaylist";
import styled from "styled-components";

const PageContainer = styled.div`
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

const MenuButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  z-index: 1101;
`;

export default function Playlist() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BackgroundParticles />
      <PageContainer>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</MenuButton>
        <Sidebar isOpen={isMenuOpen} />
        <h1>Playlist de OT</h1>
        <OTPlaylist />
      </PageContainer>
    </>
  );
}
