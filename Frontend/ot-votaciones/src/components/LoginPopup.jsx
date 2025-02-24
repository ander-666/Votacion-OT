import { useNavigate } from "react-router-dom";

export function LoginPopup() {
  const navigate = useNavigate();

  return(
    <div className="popup">
      <p>Para votar necesitas iniciar sesión o registrarte.</p>
      <button className="sidebarButton" onClick={() => navigate("/login")}>
        Iniciar Sesión
      </button>
      <button className="sidebarButton" onClick={() => navigate("/register")}>
        Registrarse
      </button>
    </div>
  )
}