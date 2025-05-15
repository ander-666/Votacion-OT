/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useSession } from "../hooks/useSession";
import configData from "../config.json";

import keycloak from "../hooks/keycloak";
import { useState } from "react";
import { fetchData } from "../fetchData";

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

export default function ParticipantModal({ participant, onClose }) {
  const { isLoggedIn } = useSession();
  const [voteDone, setVoteDone] = useState(false);
  const [voteText, setVoteText] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    console.log("Votación iniciada");

    if (!keycloak.token) {
      console.log("Votacion: no estas logeado");
      onClose();
      keycloak.login();
      return;
    }

    try {
      // Asegurar que el token esté actualizado
      await keycloak.updateToken(30);

      console.log("Votacion: llamando a API");

      console.log("Token actual", keycloak.token);

      const response = await fetch(`${window.env?.VITE_KONG_ADDRESS}/protected/votar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${keycloak.token}`,
          "X-Id-Token": keycloak.idToken
        },
        body: JSON.stringify({
          galaId: configData.GALA_ID,
          participantId: participant.participantId
        })
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      const resultText = await response.text();
      console.log("Response body:", resultText);
      if (!response.ok) {
        if (resultText.includes("Ya has votado")) {
          setHasVoted(true);
          setVoteText("Ya has votado en esta gala.");
        } else {
          setVoteText("Error al votar.");
        }
      } else {
        setVoteText(resultText);
        setHasVoted(true);
      }

      console.log("Voto registrado");

    } catch (error) {
      console.error("Error al votar:", error);
      setVoteText("Error al votar.");
    } finally {
      setVoteDone(true);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {voteDone ? (
          <>
            <p>{voteText}</p>
            <Button onClick={onClose}>Cerrar</Button>
          </>
        ) : (
          <>
            <h2>{participant.name}</h2>
            <ImageContainer>
              <img
                src={`data:image/jpeg;base64,${participant.image}`}
                alt={participant.name}
                width="100%"
                height="100%"
              />
            </ImageContainer>
            <p>{participant.description}</p>
            <Button onClick={handleVote} disabled={hasVoted}>Votar</Button>
            <Button onClick={onClose}>Cerrar</Button>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}
