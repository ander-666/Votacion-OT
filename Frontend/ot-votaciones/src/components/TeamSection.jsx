import styled from "styled-components";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

const team = [
  { name: "Sergio Villain", role: "DevOps", image: "/imagenes/1.jpg" },
  { name: "Samuel Gomez", role: "Desarrollador Backend", image: "/imagenes/2.jpg" },
  { name: "Oti Elcano", role: "Desarrollador Full Stack", image: "/imagenes/3.jpg" },
  { name: "Ander Alonso", role: "Desarrollador Frontend", image: "/imagenes/5.jpg" },
];

const TeamContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TeamSection() {
  return (
    <>
      <motion.h2 variants={fadeIn} initial="hidden" animate="visible">
        Conoce a Nuestro Equipo
      </motion.h2>
      <TeamContainer variants={fadeIn} initial="hidden" animate="visible">
        {team.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </TeamContainer>
    </>
  );
}
