import ParticipantsGrid from "./ParticipantsGrid";

const participantsMock = [
  { id: 1, name: "Naiara Moreno Aznar", image: "/imagenes/1.jpg" },
  { id: 2, name: "Pablo Suárez", image: "/imagenes/2.jpg" },
  { id: 3, name: "Ruslana Panchyshyna", image: "/imagenes/3.jpg" },
  { id: 4, name: "Juanjo Bona", image: "/imagenes/4.png" },
  { id: 5, name: "Lucas Curotto", image: "/imagenes/5.jpg" },
  { id: 6, name: "Martin Urrutia", image: "/imagenes/6.jpg" },
  { id: 7, name: "Bea Fernández", image: "/imagenes/7.jpg" },
  { id: 8, name: "Chiara Oliver", image: "/imagenes/8.jpg" },
  { id: 9, name: "Álvaro Gutiérrez", image: "/imagenes/9.jpg" },
  { id: 10, name: "Cristian Bartolomé", image: "/imagenes/10.jpg" },
  { id: 11, name: "Violeta Hódar", image: "/imagenes/11.jpg" },
  { id: 12, name: "Alex Márquez", image: "/imagenes/12.jpg" },
];

export function Participants() {
  return <ParticipantsGrid participants={participantsMock} />;
}
