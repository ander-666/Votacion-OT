import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="baseContainer">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={(e) => { e.preventDefault(); navigate("/"); }}>
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
