import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: `${import.meta.env.VITE_KONG_ADDRESS}/auth`,
  realm: "votacion_ot",
  clientId: "web-client",
});

export default keycloak;
