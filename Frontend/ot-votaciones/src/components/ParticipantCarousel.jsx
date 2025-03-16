import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParticipant } from "../hooks/useParticipant";

const CarouselContainer = styled.div`
  width: 80%;
  max-width: 900px;
  margin: 30px auto;
  padding: 10px;
`;

const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centra la imagen en su slide */
`;

const ParticipantImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
  border: 3px solid #ff4500;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

// const participants = [
//   { id: 1, image: "/imagenes/1.jpg", name: "Participante 1" },
//   { id: 2, image: "/imagenes/2.jpg", name: "Participante 2" },
//   { id: 3, image: "/imagenes/3.jpg", name: "Participante 3" },
//   { id: 4, image: "/imagenes/4.png", name: "Participante 4" },
//   { id: 5, image: "/imagenes/5.jpg", name: "Participante 5" },
//   { id: 6, image: "/imagenes/6.jpg", name: "Participante 6" },
//   { id: 7, image: "/imagenes/7.jpg", name: "Participante 7" },
//   { id: 8, image: "/imagenes/8.jpg", name: "Participante 8" },
//   { id: 9, image: "/imagenes/9.jpg", name: "Participante 9" },
//   { id: 10, image: "/imagenes/10.jpg", name: "Participante 10" },
//   { id: 11, image: "/imagenes/11.jpg", name: "Participante 11" },
//   { id: 12, image: "/imagenes/12.jpg", name: "Participante 12" },
// ];

export default function ParticipantCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // Centra las imágenes
  };

  const {participants} = useParticipant()

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {participants.map((participant) => (
          <ParticipantWrapper key={participant.participantId}>
            <ParticipantImage src={participant.image} alt={participant.name} />
          </ParticipantWrapper>
        ))}
      </Slider>
    </CarouselContainer>
  );
}
