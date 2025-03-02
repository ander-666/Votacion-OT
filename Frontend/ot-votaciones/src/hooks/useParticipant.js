import { useContext } from "react";
import { ParticipantContext } from "../context/participantContext.js";

export function useParticipant () {
    const {selectedParticipant, setSelectedParticipant} = useContext(ParticipantContext)
    
    return {selectedParticipant, setSelectedParticipant}
}