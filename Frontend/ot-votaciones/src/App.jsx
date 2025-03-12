import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inicio from "./pages/Inicio";
import Resultados from "./pages/Resultados";
import SobreNosotros from "./pages/SobreNosotros";
import Ranking from "./pages/Ranking";
import Calendario from "./pages/Calendario";
import Foro from "./pages/Foro";
import Playlist from "./pages/Playlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobreNosotros" element={<SobreNosotros />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/foro" element={<Foro />} />
      <Route path="/playlist" element={<Playlist />} />
    </Routes>
  );
}
