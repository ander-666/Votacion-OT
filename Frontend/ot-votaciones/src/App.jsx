import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Resultados from "./pages/Resultados";
import Inicio from "./pages/Inicio";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
