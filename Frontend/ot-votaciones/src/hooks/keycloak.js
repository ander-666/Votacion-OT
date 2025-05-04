import Keycloak from "keycloak-js";
import configData from "../config.json";

const keycloak = new Keycloak({
  url: configData.API_URL+"/auth",
  realm: "votacion_ot",
  clientId: "web-client",
});

export default keycloak;
