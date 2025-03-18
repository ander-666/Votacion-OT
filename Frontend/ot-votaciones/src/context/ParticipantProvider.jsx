/* eslint-disable react/prop-types */
import { useState } from "react";
import { ParticipantContext } from "./participantContext.js"
import { fetchData } from "../fetchData";
import configData from "../config.json";

export function ParticipantProvider ({ children }) {
const participants = fetchData(configData.API_URL+"/Participants").read();
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    console.log(participants);
    return (
        <ParticipantContext.Provider value={{ participants, selectedParticipant, setSelectedParticipant }}>
           {children} 
        </ParticipantContext.Provider>
    )

}