import styled from "styled-components";

import { passions } from "../data/passions";
import { darkTheme, media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { ArrowUpRight } from "../components/icons";

/* Composition asymétrique : une grande vignette d'ouverture, une colonne
   verticale, un bandeau horizontal. Volontairement pas quatre cartes
   identiques. */
const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(0.75rem, 1.6vw, 1.25rem);

  ${media.md`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.sm`
    grid-template-columns: 1fr;
  `}
`;

const spans = {
  large: "grid-column: span 4; aspect-ratio: 4 / 3;",
  tall: "grid-column: span 2; aspect-ratio: 3 / 4;",
  wide: "grid-column: span 4; aspect-ratio: 16 / 9;",
};

/* La cellule porte la géométrie ; le wrapper d'animation ne doit pas
   s'intercaler entre la grille et son élément. */
const Cell = styled(Reveal)`
  position: relative;
  ${(props) => spans[props.$span] ?? spans.tall};

  ${media.md`
    grid-column: span 2;
  `}

  ${media.sm`
    grid-column: span 1;
    aspect-ratio: 4 / 3;
  `}
`;

const Tile = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.05);
    transform: scale(1.01);
    transition: filter 0.8s ease, transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover img {
    filter: grayscale(0) contrast(1);
    transform: scale(1.05);
  }

  /* Voile assurant la lisibilité de la légende par-dessus la photo. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.85) 0%,
      rgba(10, 10, 10, 0.15) 45%,
      rgba(10, 10, 10, 0) 70%
    );
    opacity: ${(props) => (props.$hasImage ? 1 : 0)};
  }

`;

const Caption = styled.figcaption`
  position: absolute;
  inset: auto 0 0 0;
  z-index: 2;
  padding: clamp(1rem, 2.2vw, 1.75rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    font-size: clamp(1.1rem, 2.4vw, 1.75rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  p {
    font-size: clamp(0.82rem, 1.1vw, 0.92rem);
    line-height: 1.55;
    color: ${(props) => props.theme.textSoft};
    max-width: 44ch;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    align-self: flex-start;
    border-bottom: 1px solid ${(props) => props.theme.lineStrong};
    padding-bottom: 0.1rem;
    transition: border-color 0.3s ease;
  }

  a:hover {
    border-color: ${(props) => props.theme.text};
  }

  a svg {
    width: 13px;
    height: 13px;
  }
`;

/* Repère discret indiquant qu'une photo reste à déposer. Il n'apparaît que
   tant que le champ `image` du fichier de données vaut null. */
const Awaiting = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
  border: 1px dashed ${(props) => props.theme.line};
  padding: 0.3rem 0.5rem;
`;

const Passions = () => (
  <PageShell
    theme={darkTheme}
    title="Passions"
    description="Sport, dessin, voyage et expérimentations autour de la tech, de l'IA et de la 3D."
  >
    <SectionHeader
      index="05"
      title="Passions"
      lead="Ce qui occupe le temps passé loin des serveurs."
    />

    <Mosaic>
      {passions.map((item, i) => (
        <Cell
          key={item.id}
          $span={item.span}
          delay={Math.min(i * 0.07, 0.25)}
        >
          <Tile $hasImage={Boolean(item.image)}>
            {item.image ? (
              <img src={item.image} alt={item.alt} loading="lazy" />
            ) : (
              <Awaiting aria-hidden="true">Photo à venir</Awaiting>
            )}

            <Caption>
              <h2>{item.label}</h2>
              <p>{item.text}</p>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.linkLabel}
                  <ArrowUpRight />
                </a>
              ) : null}
            </Caption>
          </Tile>
        </Cell>
      ))}
    </Mosaic>
  </PageShell>
);

export default Passions;
