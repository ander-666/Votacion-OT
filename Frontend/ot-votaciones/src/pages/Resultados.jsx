/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import VoteResultsChart from "../components/VoteResultsChart";
import VoteSummary from "../components/VoteSummary";
import VoteBackButton from "../components/VoteBackButton";
import Sidebar from "../components/Sidebar";
import BackgroundParticles from "../components/BackgroundParticles";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fetchData } from "../fetchData";
import configData from "../config.json";

// ANIMACIONES
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// CONTENEDOR PRINCIPAL AJUSTADO PARA DISTRIBUCIÓN ÓPTIMA
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 100vh; /* Ajuste perfecto a la pantalla */
  width: 100vw;
  background: linear-gradient(180deg, #4b6cb7, #182848);
  color: white;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

// CONTENEDOR CENTRAL PARA GRÁFICOS Y BOTÓN
const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 40px; /* Espacio entre gráficos */
`;

// CONTENEDOR INDIVIDUAL DE LOS GRÁFICOS
const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const VotesData = fetchData(`${window.env?.VITE_KONG_ADDRESS}/votos`);

export default function Resultados() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeMenuVisibility = () => setIsMenuOpen(!isMenuOpen);

  const countVotes = () => {
    const count = {};
    const votes = VotesData.read();
    votes.forEach(vote =>
    {
      if(vote.galaId === configData.GALA_ID)
        count[vote.participantId] = (count[vote.participantId] || 0) + 1;
    });
    return count;
  }

  const voteCounts = countVotes();

  // useEffect(() => {
  //   const votes = JSON.parse(localStorage.getItem("votes")) || {};
  //   const count = {};
  //   Object.values(votes).forEach(vote => {
  //     count[vote] = (count[vote] || 0) + 1;
  //   });
  //   setVoteCounts(count);
  // }, []);

  const totalVotes = Object.values(voteCounts).reduce((acc, count) => acc + count, 0);

  return (
    <>
      <BackgroundParticles />
      <ResultContainer>
        <button className="menuButton" onClick={changeMenuVisibility}>☰</button>
        <Sidebar isopen={isMenuOpen} />

        {/* TÍTULO ARRIBA EN EL CENTRO */}
        <motion.h1 variants={fadeIn} initial="hidden" animate="visible">
          Resultados de Votación
        </motion.h1>

        {/* SECCIÓN CENTRAL: GRÁFICOS IZQUIERDA Y DERECHA */}
        <CenterContainer>
          <ChartWrapper>
            <VoteResultsChart voteCounts={voteCounts} chartType="pie" />
          </ChartWrapper>
          <ChartWrapper>
            <VoteResultsChart voteCounts={voteCounts} chartType="bar" />
          </ChartWrapper>
        </CenterContainer>

        {/* BOTÓN PARA VOLVER A VOTAR EN EL CENTRO ABAJO */}
        <VoteBackButton />
      </ResultContainer>
    </>
  );
}
