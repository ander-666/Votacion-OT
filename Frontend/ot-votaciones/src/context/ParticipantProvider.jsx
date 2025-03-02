/* eslint-disable react/prop-types */
import { useState } from "react";
import { ParticipantContext } from "./participantContext.js"

export function ParticipantProvider ({ children }) {
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    return (
        <ParticipantContext.Provider value={{ selectedParticipant, setSelectedParticipant }}>
           {children} 
        </ParticipantContext.Provider>
    )
}