import { useContext } from "react";
import { ParticipantContext } from "../context/participantContext.js";

export function useParticipant () {
    const {participants, selectedParticipant, setSelectedParticipant} = useContext(ParticipantContext)
    
    return {participants, selectedParticipant, setSelectedParticipant}
}

export function useSelectedParticipant () {
    const { selectedParticipant, setSelectedParticipant } = useContext(ParticipantContext)
    
    return { selectedParticipant, setSelectedParticipant }
}