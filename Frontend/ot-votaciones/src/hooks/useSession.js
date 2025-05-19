import { useState, useEffect } from "react";
import keycloak from "./keycloak";

let isKeycloakInitialized = false;

export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isKeycloakInitialized) {
      keycloak
        .then(authenticated => {
          setIsLoggedIn(authenticated);
          if (authenticated) {
            setUser(keycloak.tokenParsed);
          }
        })
        .catch(err => console.error("Keycloak init error:", err));

      isKeycloakInitialized = true;
    }
  }, []);

  return { isLoggedIn, user, login: keycloak.login, logout: keycloak.logout };
}
