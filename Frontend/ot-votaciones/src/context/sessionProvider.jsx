/* eslint-disable react/prop-types */
import { useSession } from "../hooks/useSession";
import { SessionContext } from "./sessionContext.js";

export function SessionProvider({ children }) {
  const { isLoggedIn, login, logout, user } = useSession();

  return (
    <SessionContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </SessionContext.Provider>
  );
}
