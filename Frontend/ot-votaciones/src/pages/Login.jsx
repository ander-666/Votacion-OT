import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, #6a11cb, #2575fc);
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #222;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
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
  &:hover {
    background: #ff8c00;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  

  return (
    <LoginContainer>
      <h1>Iniciar Sesión</h1>
      <Form onSubmit={(e) => { e.preventDefault(); navigate("/"); }}>
        <Input type="email" placeholder="Correo electrónico" required />
        <Input type="password" placeholder="Contraseña" required />
        <Button type="submit">Ingresar</Button>
      </Form>
    </LoginContainer>
  );
}
