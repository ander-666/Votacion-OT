/*import { useContext } from "react";
import { SessionContext } from "../context/sessionContext.js";

export function useSession () {
    const {isLoggedIn, setIsLoggedIn} = useContext(SessionContext)
    // TODO: Implementar lógica de session
    return {isLoggedIn, setIsLoggedIn}
}*/


import { useState, useEffect } from "react";
import keycloak from "./keycloak";

export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html" })
      .then(authenticated => {
        setIsLoggedIn(authenticated);
        if (authenticated) {
          setUser(keycloak.tokenParsed);
        }
      })
      .catch(err => console.error("Keycloak init error:", err));
  }, []);

  return { isLoggedIn, user, login: keycloak.login, logout: keycloak.logout };
}
