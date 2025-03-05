/* eslint-disable react/prop-types */
import { LoginPopup } from "../components/LoginPopup";
import { useSession } from "../hooks/useSession";
import { useParticipant } from "../hooks/useParticipant";
import { fetchData } from "../fetchData";
import configData from "../config.json";

export function Participant() {
  const {isLoggedIn} = useSession();
  const {selectedParticipant, setSelectedParticipant} = useParticipant();

  const handleVote = () => {
    if (!isLoggedIn) {
      setSelectedParticipant(null);
    } else {
      const voteRegistered = fetchData(configData.API_URL+"/vote").read();
      if(voteRegistered)
        alert(`Has votado por ${selectedParticipant.name}`);
      setSelectedParticipant(null);
    }
  };
  
  return (
    <div className="popup">
      <h2>{selectedParticipant.name}</h2>
      <div className="imageContainer">
        <img
          src={selectedParticipant.image}
          alt={selectedParticipant.name}
          width="100%"
          height="100%" />
      </div>
      <p>{selectedParticipant.description}</p>
      <button onClick={handleVote}>Votar</button>
      <button onClick={() => setSelectedParticipant(null)}>
        Cerrar
      </button>
    </div>
  );
}

export function ParticipantCard({ participant }) {
  const { setSelectedParticipant} = useParticipant();

  return (
    <div className="card" onClick={() => setSelectedParticipant(participant)}>
      <div className="imageContainer">
        <img
          src={participant.image}
          alt={participant.name}
          width="100%"
          height="100%"
        />
      </div>
      <h3>{participant.name}</h3>
    </div>
  );
}

export function ParticipantsGrid() {
  
  const participants2 = [
    {
      id: 1,
      name: "Naiara Moreno Aznar",
      image: "/imagenes/1.jpg",
      description:
        "Nació en Zaragoza el 29 de abril de 1997 y es la mayor de 6 hermanos. Fue cantante de la orquesta aragonesa Nueva Alaska hasta su paso por Operación Triunfo 2023.",
    },
    {
      id: 2,
      name: "Pablo (Paul Thin) Suárez Delgado",
      image: "/imagenes/2.jpg",
      description: "Armilla, Granada, 14 de diciembre de 2002",
    },
    {
      id: 3,
      name: "Ruslana Panchyshyna Lapets",
      image: "/imagenes/3.jpg",
      description: "Tenerife, 10 de septiembre de 2005",
    },
    {
      id: 4,
      name: "Juanjo Bona Arregui",
      image: "/imagenes/4.png",
      description:
        "Nació en Magallón, Zaragoza, el 10 de noviembre de 2003. Tiene un hermano 3 años menor que él. Recibió clases de canto, solfeo y jota desde muy pequeño, al mismo tiempo que aprendía a tocar el clarinete en la Escuela de Música de Magall",
    },
    {
      id: 5,
      name: "Lucas Curotto",
      image: "/imagenes/5.jpg",
      description:
        "Desde muy temprana edad Curotto fue diagnosticado con TDAH y dislexia,1​ lo que dificultó su desempeño académico. Debido a estas dificultades, decidió dejar la escuela en su adolescencia para enfocarse en su pasión por la música.",
    },
    {
      id: 6,
      name: "Martin Urrutia Horas",
      image: "/imagenes/6.jpg",
      description:
        "Nació en Guecho el 30 de marzo de 20051​ y es el mayor de tres hermanos.2​ Martin mostró interés por las artes escénicas desde muy pequeño, lo que le llevó a estudiar danza en la Escuela de Ballet Roser Carrés. Tras cursar el bachillerato de artes escénicas en Bilbao, ingresó en Dantzerti, la Escuela Superior de Arte Dramático y Danza del País Vasco.",
    },
    {
      id: 7,
      name: "Bea Fernández Soto",
      image: "/imagenes/7.jpg",
      description:
        " Nació en 2004 en San Fernando de Henares y es la menor de dos hermanas.​Desde muy pequeña recibió clases de música y movimiento. Antes de entrar a Operación Triunfo 2023, estudiaba el grado de Magisterio en Educación Primaria en la Universidad Complutense de Madrid y daba clases de iniciación de música y piano a niños.",
    },
    {
      id: 8,
      name: "Chiara Oliver Williams",
      image: "/imagenes/8.jpg",
      description:
        "De ascendencia menorquina por parte de padre y británica por parte de madre, mostró interés por la música desde sus primeros años. Su primer contacto con un escenario fue a los seis años, cuando participó como candidata en un concurso de talento organizado por un hotel.",
    },
    {
      id: 9,
      name: "Álvaro Gutiérrez Mayo",
      image: "/imagenes/9.jpg",
      description: "Sevilla, 4 de marzo de 2002",
    },
    {
      id: 10,
      name: "Cristian (Cris) Bartolomé Botau",
      image: "/imagenes/10.jpg",
      description:
        "(San Cristóbal de La Laguna, Tenerife, 20 de septiembre de 1999",
    },
    {
      id: 11,
      name: "Violeta Hódar Feixas",
      image: "/imagenes/11.jpg",
      description: "Motril, Granada, 23 de enero de 2001",
    },
    {
      id: 12,
      name: "Alex Márquez Angorilla",
      image: "/imagenes/12.jpg",
      description: "Córdoba, 24 de noviembre de 1998",
    },
    {
      id: 13,
      name: "Salma Díaz Picón",
      image: "/imagenes/13.jpg",
      description: "Mijas, Málaga, 4 de octubre de 2002",
    },
    {
      id: 14,
      name: "Almudena (Denna) Ruiz Vilchez",
      image: "/imagenes/14.jpg",
      description: "Ogíjares, Granada, 30 de marzo de 2001",
    },
    {
      id: 15,
      name: "Omar Samba Castro",
      image: "/imagenes/15.jpg",
      description: "Yunquera de Henares, Guadalajara, 9 de mayo de 1997",
    },
    {
      id: 16,
      name: "Suzete Correia Ramos",
      image: "/imagenes/16.jpg",
      description: "Santa Cruz de Tenerife, 21 de abril de 2001",
    },
  ];
  //const { participants } = useParticipant();
  
  return (
    <div className="participantsGrid">
      {participants2?.map((participant) => (
        <ParticipantCard
          key={participant.id}
          participant={participant}
        ></ParticipantCard>
      ))}
    </div>
  );
}

export function Participants() {
  const {selectedParticipant} = useParticipant();
  const {isLoggedIn} = useSession();
  return (
    <div className="content">
      <h1>Votaciones de OT</h1>
      {!isLoggedIn && (
        <LoginPopup/>
      )}
      {selectedParticipant ? (
        <Participant/>
      ) : (
        <ParticipantsGrid/>
      )}
    </div>
  );
}