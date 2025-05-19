import { useState } from "react";
import keycloak from "./keycloak";

export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!keycloak.token);
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const authenticated = await keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false,
        pkceMethod: false
      });
      if (authenticated) {
        setIsLoggedIn(true);
        setUser(keycloak.tokenParsed);
      }
    } catch (err) {
      console.error("Keycloak login error:", err);
    }
  };

  const logout = () => {
    keycloak.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, login, logout };
}
