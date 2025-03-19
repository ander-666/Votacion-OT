/* eslint-disable react/prop-types */
import { useState } from "react";
import { ParticipantContext } from "./participantContext.js"
import { fetchData } from "../fetchData";
import configData from "../config.json";

const participantsData = fetchData(configData.API_URL+"/free");

export function ParticipantProvider ({ children }) {
    const participants = participantsData.read()
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    console.log(participants);
    return (
        <ParticipantContext.Provider value={{ participants, selectedParticipant, setSelectedParticipant }}>
           {children} 
        </ParticipantContext.Provider>
    )

}