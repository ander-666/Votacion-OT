import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #222;
  color: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: 280px;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ff4500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
`;

const Button = styled.button`
  background: #ff4500;
  color: white;
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 8px;
  width: 100%;

  &:hover {
    background: #ff8c00;
  }
`;

export default function ParticipantModal({ participant, onClose, onVote }) { // 🔹 Recibe `onVote`
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{participant.name}</h2>
        <ImageContainer>
          <img src={participant.image} alt={participant.name} width="100%" height="100%" />
        </ImageContainer>
        <p>{participant.description}</p>
        <Button onClick={() => onVote(participant)}>Votar</Button> {/* 🔹 Llama a `onVote` */}
        <Button onClick={onClose}>Cerrar</Button>
      </ModalContent>
    </ModalOverlay>
  );
}
