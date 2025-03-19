import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8000/auth",
  realm: "votacion_ot",
  clientId: "web-client",
});

export default keycloak;
