import styled from "styled-components";

const Card = styled.div`
  background: #222;
  color: white;
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  max-width: 190px;
  height: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ff4500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ParticipantName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const DefaultImage = "/imagenes/default.jpg"; // ✅ Imagen por defecto

export default function ParticipantCard({ participant, onClick }) {
  return (
    <Card onClick={() => onClick(participant)}>
      <ImageContainer>
        <img
          src={participant.image || DefaultImage} // ✅ Si no hay imagen, se usa la por defecto
          alt={participant.name}
          width="100%"
          height="100%"
        />
      </ImageContainer>
      <ParticipantName>{participant.name}</ParticipantName>
    </Card>
  );
}
