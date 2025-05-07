import { useState } from "react";
import styled from "styled-components";

const ForumContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
`;

const Comment = styled.div`
  background: #2c3e50;
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
  color: white;
`;

export default function Forum() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <ForumContainer>
      <h2>Foro de Fans</h2>
      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Escribe tu comentario..." />
      <button onClick={addComment}>Comentar</button>
      {comments.map((comment, index) => (
        <Comment key={index}>{comment}</Comment>
      ))}
    </ForumContainer>
  );
}
