import styled from "styled-components";

const Button = styled.button`
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #3700b3;
  }
`;

export default Button;
