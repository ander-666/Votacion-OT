import { useState } from "react";
import ParticipantCard from "./ParticipantCard";
import ParticipantModal from "./ParticipantModal";
import styled from "styled-components";
import { LoginPopup } from "./LoginPopup";
import { useParticipant } from "../hooks/useParticipant";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

export default function ParticipantsGrid() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const {participants, selectedParticipant, setSelectedParticipant} = useParticipant()

  return (
    <Wrapper>
      <Title>Participantes OT</Title>
        <GridContainer>
          {participants.map((participant) => (
            <ParticipantCard key={participant.participantId} participant={participant} onClick={() => setSelectedParticipant(participant)} />
          ))}
        </GridContainer>
      {selectedParticipant && (
        <ParticipantModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
          setShowLoginPopup={setShowLoginPopup}
        />
      )}

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </Wrapper>
  );
}
