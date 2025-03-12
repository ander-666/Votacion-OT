import { useContext } from "react";
import { SessionContext } from "../context/sessionContext.js";

export function useSession () {
    const {isLoggedIn, setIsLoggedIn} = useContext(SessionContext)
    // TODO: Implementar lógica de session
    return {isLoggedIn, setIsLoggedIn}
}