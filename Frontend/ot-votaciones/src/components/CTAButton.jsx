import { useNavigate } from "react-router-dom";

export default function CTAButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/home")}>¡Votar Ahora!</button>
  );
}
