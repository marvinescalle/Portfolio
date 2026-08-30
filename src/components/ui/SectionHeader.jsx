import styled from "styled-components";
import { media } from "../../styles/theme";
import Reveal from "./Reveal";

const Wrap = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-bottom: clamp(1.5rem, 3.5vw, 2.5rem);
  border-bottom: 1px solid ${(props) => props.theme.line};
  margin-bottom: clamp(2rem, 5vw, 3.5rem);

  ${media.sm`
    grid-template-columns: 1fr;
    gap: 0.75rem;
  `}
`;

const Index = styled.span`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  color: ${(props) => props.theme.textFaint};
  padding-top: 0.9rem;

  ${media.sm`
    padding-top: 0;
  `}
`;

const Title = styled.h1`
  /* Syne en 800 est très large : environ 1,12em par caractère. Le plancher
     et le facteur vw sont calés sur le titre le plus long (« Expériences »)
     pour qu'il tienne sur une seule ligne jusqu'à 375px de large. */
  font-size: clamp(1.6rem, 7.2vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  text-transform: uppercase;
`;

const Lead = styled.p`
  max-width: min(64ch, 100%);
  margin-top: 1.5rem;
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  color: ${(props) => props.theme.textSoft};
`;

/**
 * En-tête de page : numéro d'ordre en chasse fixe, titre en display, et
 * chapô facultatif. Le titre est le <h1> unique de la page.
 */
const SectionHeader = ({ index, title, lead }) => (
  <Wrap>
    {index ? <Index aria-hidden="true">{index}</Index> : null}
    <div>
      <Reveal as="div">
        <Title>{title}</Title>
      </Reveal>
      {lead ? (
        <Reveal as="div" delay={0.08}>
          <Lead>{lead}</Lead>
        </Reveal>
      ) : null}
    </div>
  </Wrap>
);

export default SectionHeader;
