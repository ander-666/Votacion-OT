import Particles from "react-tsparticles";

export default function BackgroundParticles() {
  return (
    <Particles options={{ particles: { number: { value: 50 }, move: { speed: 2 } } }} />
  );
}
