/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useSession } from "../hooks/useSession";
import { fetchData } from "../fetchData";
import configData from "../config.json";
import { useState } from "react";

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
  width: 280px; /* ✅ Se reduce ligeramente el tamaño */
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

const alreadyVotedData = fetchData(configData.API_URL+"/AlreadyVoted", "POST",
  { headers:
      {
        "Content-Type": "application/json"
      },
    body:
      {
        "userId": 123,
        "timestamp": new Date().toISOString() // definir gala en función de fecha en la que se vota
      }
});

export default function ParticipantModal({ participant, onClose, setShowLoginPopup }) {
  const { isLoggedIn } = useSession()  
  const alreadyVoted = false // votedData.read()
  const [voteDone, setVoteDone] = useState(false)
  const [voteError, setVoteError] = useState(false)

  const handleVote = () => {
    if(isLoggedIn){
      // setVoteDone(true)
      // setVoteError(false)
      try{
        const voteData = fetchData(configData.API_URL+"/Vote", "POST",
          { headers:
              {
                "Content-Type": "application/json"
              },
            body:
              {
                "participantId": participant.participantId
              }
        });
        setVoteDone(voteData.read());
        setVoteError(!voteDone);
      }
      catch{
        setVoteError(true);
        setVoteDone(false);
      }
    }
    else{
      onClose(); // ✅ Cierra el modal del participante antes de abrir el LoginPopup
      setTimeout(() => {
        setShowLoginPopup(!isLoggedIn);
      }, 200);
    }  
    
  };

  return (
    <ModalOverlay>
      <ModalContent>
        { alreadyVoted ?
          <>
            <p>Ya has votado anteriormente</p>
            <Button onClick={onClose}>Cerrar</Button>
          </>
          :
          (voteError ? 
          <>
            <p>Error al votar</p>
            <Button onClick={onClose}>Cerrar</Button>
          </>
          :
          (voteDone ? 
            <>
              <p>Voto registrado correctamente!</p>
              <Button onClick={onClose}>Cerrar</Button>
            </>
            :
            <>
            <h2>{participant.name}</h2>
            <ImageContainer>
              <img src={participant.image} alt={participant.name} width="100%" height="100%" />
            </ImageContainer>
            <p>{participant.description}</p>
            <Button onClick={handleVote}>Votar</Button>
            <Button onClick={onClose}>Cerrar</Button>
          </>
          )
          )
        }
      </ModalContent>
    </ModalOverlay>
  );
}
