import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: `${window.env?.VITE_KONG_ADDRESS}/auth`,
  realm: "votacion_ot",
  clientId: "web-client",
  enableInsecureHTTPS: true        // permite HTTP inseguro
});

keycloak.init({
  onLoad: "login-required",
  checkLoginIframe: false,
  pkceMethod: false      // ② usar PKCE “plain” sin Web Crypto API
})
  .catch(err => console.error("Keycloak init error:", err));

export default keycloak;
