import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PopupContainer = styled.div`
  background: #333; /* ✅ Cambio a un gris más oscuro para mejor contraste */
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
  width: 280px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2); /* ✅ Se añade un efecto de sombra para más visibilidad */
`;

const Button = styled.button`
  background: #ff4500;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background: #ff8c00;
  }
`;

export function LoginPopup({ onClose }) {
  const navigate = useNavigate();

  return (
    <PopupContainer>
      <p>Para votar necesitas iniciar sesión o registrarte.</p>
      <Button onClick={() => navigate("/login")}>Iniciar Sesión</Button>
      <Button onClick={() => navigate("/register")}>Registrarse</Button>
      <Button onClick={onClose}>Cerrar</Button>
    </PopupContainer>
  );
}
