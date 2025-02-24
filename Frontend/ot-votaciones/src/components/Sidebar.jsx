/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export function Sidebar ({ isOpen }) {
    const navigate = useNavigate();
    return <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebarButton" onClick={() => navigate("/")}>Votaciones</button>
      <button className="sidebarButton" onClick={() => navigate("/login")}>Login</button>
      <button className="sidebarButton" onClick={() => navigate("/about")}>
        Sobre Nosotros
      </button>
    </div>;
  };