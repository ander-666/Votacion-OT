/* eslint-disable react/prop-types */
import { useState } from "react";
import { SessionContext } from "./sessionContext.js"

export function SessionProvider ({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
           {children} 
        </SessionContext.Provider>
    )
}
