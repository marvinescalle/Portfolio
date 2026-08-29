import styled from "styled-components";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ConfigDark from "../config/particlesjs-config.json";
import ConfigLight from "../config/particlesjs-config-light.json";

// Doit rester une référence stable : tsParticles n'initialise le moteur qu'une fois
// pour toute la durée de vie de l'application.
const initParticles = async (engine) => {
  await loadSlim(engine);
};

const Box = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;

const ParticlesComponent = (props) => {
  return (
    <Box>
      <ParticlesProvider init={initParticles}>
        <Particles
          style={{ position: "absolute", top: 0 }}
          options={props.theme === "light" ? ConfigLight : ConfigDark}
        />
      </ParticlesProvider>
    </Box>
  );
};

export default ParticlesComponent;
