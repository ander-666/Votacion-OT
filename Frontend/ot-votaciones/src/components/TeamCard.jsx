/* eslint-disable react/prop-types */
import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  background: #2c3e50;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  width: 250px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  &:hover {
    transform: scale(1.1);
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #ff4500;
`;

const Name = styled.h3`
  color: #ffcc00;
  margin-bottom: 5px;
`;

const Role = styled.p`
  color: white;
`;

export default function TeamCard({ member }) {
  return (
    <Card whileHover={{ scale: 1.1 }}>
      <Avatar src={member.image} alt={member.name} />
      <Name>{member.name}</Name>
      <Role>{member.role}</Role>
    </Card>
  );
}
