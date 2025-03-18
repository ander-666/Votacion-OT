import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8180/realms/myrealm/protocol/openid-connect/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "32",
            redirect_uri: "http://localhost:8002/login/callback",
            code,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        navigate("/");
      } catch (error) {
        console.error("Error fetching token:", error);
        navigate("/login");
      }
    };

    fetchToken();
  }, [navigate]);

  return <p>Verificando autenticación...</p>;
}
