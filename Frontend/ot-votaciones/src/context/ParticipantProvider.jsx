/* eslint-disable react/prop-types */
import { useState } from "react";
import { ParticipantContext } from "./participantContext.js"
//import { fetchData } from "../fetchData";
//import configData from "../config.json";

export function ParticipantProvider ({ children }) {
    const participants = useState({}) //fetchData(configData.API_URL+"/participants").read();
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    return (
        <ParticipantContext.Provider value={{ participants, selectedParticipant, setSelectedParticipant }}>
           {children} 
        </ParticipantContext.Provider>
    )
}