// src/hooks/keycloak.js
import Keycloak from "keycloak-js";

let keycloak = null;

export function getKeycloak() {
  if (!keycloak) {
    keycloak = new Keycloak({
      url: `${window.env?.VITE_KONG_ADDRESS}/auth`,
      realm: "votacion_ot",
      clientId: "web-client",
      enableInsecureHTTPS: true
    });
  }
  return keycloak;
}

export async function ensureKeycloakInit() {
  const kc = getKeycloak();

  // Solo inicializa si no lo ha hecho antes
  if (!kc.token) {
    try {
      await kc.init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        pkceMethod: false,
        flow: "implicit"
      });
    } catch (err) {
      console.error("Keycloak init error:", err);
    }
  }

  return kc;
}
