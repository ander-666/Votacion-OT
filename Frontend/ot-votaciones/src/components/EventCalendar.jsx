import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CalendarContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
`;

const events = [
  { date: "2025-03-01", name: "Gala 1 - Presentación" },
  { date: "2025-03-15", name: "Gala 3 - Segunda Ronda" },
  { date: "2025-03-08", name: "Gala 2 - Eliminación" },
];

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <CalendarContainer>
      <h2>Calendario de Galas y Eventos</h2>
      {events.map((event, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} onClick={() => setSelectedDate(event)}>
          <p>{event.date} - {event.name}</p>
        </motion.div>
      ))}
      {selectedDate && <p>Próximo Evento: {selectedDate.name}</p>}
    </CalendarContainer>
  );
}
