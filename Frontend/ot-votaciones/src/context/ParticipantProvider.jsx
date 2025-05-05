/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { ParticipantContext } from "./participantContext.js"
import { fetchData } from "../fetchData";

const participantsData = fetchData(`${import.meta.env.VITE_KONG_ADDRESS}/Participants`);

export function ParticipantProvider ({ children }) {
    const participants = participantsData.read()
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    return (
        <ParticipantContext.Provider value={{ participants, selectedParticipant, setSelectedParticipant }}>
           {children} 
        </ParticipantContext.Provider>
    )

}