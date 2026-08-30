import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import { findPassion, passions } from "../data/passions";
import PassionOverlay from "../components/passions/PassionOverlay";
import { pick, useLanguage, useTranslation } from "../i18n";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
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

const Tile = styled(Link)`
  display: block;
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

  &:hover img,
  &:focus-visible img {
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

const Caption = styled.div`
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

  .more {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: ${(props) => props.theme.textSoft};
    transition: color 0.3s ease, transform 0.3s ease;
  }

  ${Tile}:hover .more,
  ${Tile}:focus-visible .more {
    color: ${(props) => props.theme.text};
  }

  ${Tile}:hover .more svg,
  ${Tile}:focus-visible .more svg {
    transform: translate(2px, -2px);
  }

  .more svg {
    width: 13px;
    height: 13px;
    transition: transform 0.3s ease;
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

const Passions = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = useTranslation();
  const { language } = useLanguage();
  const passion = slug ? findPassion(slug) : null;

  useBodyScrollLock(Boolean(passion));

  const close = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/passions", { replace: true });
  };

  return (
  <PageShell
    theme={darkTheme}
    title={t.passions.title}
    description={t.passions.seo}
  >
    <SectionHeader
      index={t.passions.index}
      title={t.passions.title}
      lead={t.passions.lead}
    />

    <Mosaic>
      {passions.map((item, i) => (
        <Cell
          key={item.id}
          $span={item.span}
          delay={Math.min(i * 0.07, 0.25)}
        >
          <Tile
            to={`/passions/${item.id}`}
            aria-label={`${pick(item.label, language)} : ${t.passions.openSheet}`}
            $hasImage={Boolean(item.image)}
          >
            {item.image ? (
              <img src={item.image} alt={pick(item.alt, language)} loading="lazy" />
            ) : (
              <Awaiting aria-hidden="true">{t.passions.awaiting}</Awaiting>
            )}

            <Caption>
              <h2>{pick(item.label, language)}</h2>
              <p>{pick(item.text, language)}</p>
              <span className="more">
                {t.passions.more}
                <ArrowUpRight />
              </span>
            </Caption>
          </Tile>
        </Cell>
      ))}
    </Mosaic>

    <AnimatePresence>
      {passion ? (
        <PassionOverlay
          key={passion.id}
          passion={passion}
          onClose={close}
        />
      ) : null}
    </AnimatePresence>
  </PageShell>
  );
};

export default Passions;
