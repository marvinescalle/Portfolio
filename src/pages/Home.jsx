import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import portrait from "../assets/optimized/portrait.jpg";
import { profile } from "../data/profile";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { darkTheme, layout, lightTheme, media } from "../styles/theme";
import SoundToggle from "../components/ui/SoundToggle";
import { ArrowUpRight, YinYang } from "../components/icons";

/* ────────────────────────────────────────────────────────────────────────
   La page d'accueil est volontairement à part : pas de barre de navigation,
   pas de défilement. C'est une couverture. Les sections sont disposées sur
   les bords, le centre sert de point focal, et l'activation de ce point
   révèle la présentation.
   ──────────────────────────────────────────────────────────────────────── */

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: ${(props) => props.theme.body};
`;

/** Grande zone noire révélée à l'ouverture : le contraste est l'identité. */
const DarkPanel = styled(motion.div)`
  position: absolute;
  inset: 0 auto 0 0;
  width: 50%;
  background: ${(props) => props.theme.text};
  transform-origin: left;
  z-index: 1;

  ${media.md`
    width: 100%;
  `}
`;

const edge = `
  position: absolute;
  z-index: 3;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
`;

const Wordmark = styled.span`
  ${edge};
  top: ${layout.gutter};
  left: ${layout.gutter};
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-family: ${(props) => props.theme.fontDisplay};
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(props) => (props.$onDark ? props.theme.body : props.theme.text)};
  transition: color 0.6s ease;
`;

const EdgeLink = styled(Link)`
  ${edge};
  color: ${(props) => (props.$onDark ? props.theme.body : props.theme.text)};
  transition: color 0.6s ease, opacity 0.3s ease;
  padding: 0.5rem 0;

  &::after {
    content: "";
    display: block;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const TopRight = styled(EdgeLink)`
  top: ${layout.gutter};
  right: ${layout.gutter};
`;

const RailLeft = styled(EdgeLink)`
  left: ${layout.gutter};
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  rotate: 180deg;
`;

const RailRight = styled(EdgeLink)`
  right: ${layout.gutter};
  writing-mode: vertical-rl;
`;

const BottomLeft = styled(EdgeLink)`
  bottom: ${layout.gutter};
  left: ${layout.gutter};
`;

const BottomRight = styled(EdgeLink)`
  bottom: ${layout.gutter};
`;

/** Sur mobile, les libellés verticaux deviennent une liste lisible. */
const MobileRail = styled.nav`
  display: none;
  ${media.md`
    display: grid;
  `}
  position: absolute;
  z-index: 3;
  left: ${layout.gutter};
  right: ${layout.gutter};
  bottom: calc(${layout.gutter} + env(safe-area-inset-bottom, 0px));
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem 1rem;

  a {
    font-size: 0.85rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid ${(props) => props.theme.line};
  }
`;

const DesktopOnly = styled.div`
  ${media.md`
    display: none;
  `}
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const halo = keyframes`
  0% { transform: scale(0.92); opacity: 0.55; }
  75% { transform: scale(1.28); opacity: 0; }
  100% { transform: scale(1.28); opacity: 0; }
`;

const Focal = styled.button`
  position: absolute;
  z-index: 5;
  top: ${(props) => (props.$open ? "auto" : "50%")};
  left: ${(props) => (props.$open ? "auto" : "50%")};
  bottom: ${(props) => (props.$open ? layout.gutter : "auto")};
  right: ${(props) => (props.$open ? layout.gutter : "auto")};
  transform: ${(props) => (props.$open ? "none" : "translate(-50%, -50%)")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
  color: ${(props) => props.theme.text};
  transition: top 0.8s ease, left 0.8s ease, bottom 0.8s ease, right 0.8s ease,
    transform 0.8s ease;

  .mark {
    position: relative;
    display: grid;
    place-items: center;
    width: ${(props) => (props.$open ? "3rem" : "clamp(6rem, 13vw, 8.5rem)")};
    height: ${(props) => (props.$open ? "3rem" : "clamp(6rem, 13vw, 8.5rem)")};
    transition: width 0.8s ease, height 0.8s ease, transform 0.5s ease;
  }

  /* Anneau qui respire : la seule indication permanente que l'élément
     est interactif. Il disparaît une fois la présentation ouverte. */
  .mark::before {
    content: "";
    position: absolute;
    inset: -14%;
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 50%;
    opacity: ${(props) => (props.$open ? 0 : 1)};
    animation: ${halo} 3.4s ease-out infinite;
  }

  .mark svg {
    width: 100%;
    height: 100%;
    animation: ${spin} 24s linear infinite;
  }

  &:hover .mark {
    transform: scale(1.06);
  }

  .hint {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textSoft};
    opacity: ${(props) => (props.$open ? 0 : 1)};
    transition: opacity 0.4s ease;
    white-space: nowrap;
  }

  ${media.md`
    .hint { font-size: 0.62rem; }
  `}
`;

/* Le centrage vit sur cette enveloppe : Framer Motion pilote la propriété
   `transform` du panneau animé et écraserait un translate posé en CSS. */
const PanelAnchor = styled.div`
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(1080px, 88vw);
  pointer-events: none;

  ${media.md`
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    height: 100%;
  `}
`;

const Panel = styled(motion.div)`
  pointer-events: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${media.md`
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    border: none;
    overflow-y: auto;
  `}
`;

const TextSide = styled.div`
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  border-top: 1px solid ${(props) => props.theme.line};
  border-bottom: 1px solid ${(props) => props.theme.line};
  padding: clamp(1.75rem, 3.4vw, 3.25rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.9rem;

  ${media.md`
    padding: calc(${layout.gutter} + 3.5rem) ${layout.gutter} 2rem;
    justify-content: flex-end;
  `}
`;

const Hello = styled.p`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
`;

const NameBlock = styled.div`
  p {
    font-size: 0.95rem;
    color: ${(props) => props.theme.textSoft};
    margin-bottom: 0.15rem;
  }

  strong {
    display: block;
    font-family: ${(props) => props.theme.fontDisplay};
    font-weight: 800;
    font-size: clamp(2rem, 4.6vw, 3.4rem);
    line-height: 0.98;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }
`;

const Role = styled.div`
  padding-top: 0.35rem;

  span {
    display: block;
  }

  .title {
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    font-weight: 500;
  }

  .disciplines {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.09em;
    color: ${(props) => props.theme.textSoft};
    margin-top: 0.3rem;
  }
`;

const Quote = styled.p`
  position: relative;
  margin-top: 0.4rem;
  padding-left: 1rem;
  border-left: 1px solid ${(props) => props.theme.lineStrong};
  font-size: clamp(0.85rem, 1.1vw, 0.95rem);
  line-height: 1.6;
  color: ${(props) => props.theme.textSoft};
  max-width: 42ch;
`;

const Ctas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.9rem;
`;

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem;
  border: 1px solid ${(props) => props.theme.lineStrong};
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    border-color: ${(props) => props.theme.text};
  }
`;

const PhotoSide = styled.div`
  position: relative;
  background: ${(props) => props.theme.body};
  border-top: 1px solid ${(props) => props.theme.line};
  border-bottom: 1px solid ${(props) => props.theme.line};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  min-height: 22rem;

  img {
    width: 100%;
    max-width: 26rem;
    height: auto;
    object-fit: contain;
    /* Le portrait est détouré sur fond blanc : le mode multiply fait
       disparaître ce fond sur le papier cassé du site. */
    mix-blend-mode: multiply;
    filter: grayscale(1) contrast(1.06);
    transition: filter 0.7s ease;
  }

  &:hover img {
    filter: grayscale(0) contrast(1);
  }

  ${media.md`
    min-height: 0;
    max-height: 42vh;

    img { max-width: 15rem; }
  `}
`;

const Home = () => {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useDocumentMeta();

  const sections = [
    { to: "/a-propos", label: "À propos" },
    { to: "/experiences", label: "Expériences" },
    { to: "/projets", label: "Projets" },
    { to: "/formation", label: "Formation" },
    { to: "/passions", label: "Passions" },
    { to: "/cv", label: "CV" },
    // Contact n'est pas repris ici : le lien est déjà en haut à droite.
  ];

  return (
    <ThemeProvider theme={lightTheme}>
      <Screen>
        <h1 className="visually-hidden">
          {profile.fullName} — {profile.role}, {profile.disciplines.join(", ")}
        </h1>

        <AnimatePresence>
          {open ? (
            <DarkPanel
              key="dark"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={reduce ? { opacity: 0 } : { scaleX: 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
          ) : null}
        </AnimatePresence>

        <Wordmark $onDark={open}>
          {profile.fullName}
          <SoundToggle onDark={open} />
        </Wordmark>

        <TopRight to="/contact">Contact</TopRight>

        <DesktopOnly>
          <RailLeft to="/passions" $onDark={open}>
            Passions
          </RailLeft>
          <RailRight to="/experiences" style={{ top: "26%" }}>
            Expériences
          </RailRight>
          <RailRight to="/projets" style={{ top: "56%" }}>
            Projets
          </RailRight>
          <BottomLeft to="/a-propos" $onDark={open}>
            À propos
          </BottomLeft>
          <BottomRight to="/formation" style={{ right: "22%" }}>
            Formation
          </BottomRight>
          <BottomRight to="/cv" style={{ right: layout.gutter }}>
            CV
          </BottomRight>
        </DesktopOnly>

        {!open ? (
          <MobileRail aria-label="Sections du portfolio">
            {sections.map((section) => (
              <Link key={section.to} to={section.to}>
                {section.label}
              </Link>
            ))}
          </MobileRail>
        ) : null}

        <Focal
          type="button"
          $open={open}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="presentation"
          aria-label={
            open ? "Masquer la présentation" : "Afficher la présentation"
          }
        >
          <span className="mark">
            <YinYang />
          </span>
          <span className="hint">Cliquez pour découvrir</span>
        </Focal>

        <PanelAnchor>
          <AnimatePresence>
            {open ? (
              <Panel
                id="presentation"
              key="panel"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : 0.35,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <ThemeProvider theme={darkTheme}>
                <TextSide>
                  <Hello>Bonjour,</Hello>

                <NameBlock>
                  <p>Je suis</p>
                  <strong>{profile.fullName}</strong>
                </NameBlock>

                <Role>
                  <span className="title">{profile.role}</span>
                  <span className="disciplines">
                    {profile.disciplines.join(" · ")}
                  </span>
                </Role>

                <Quote>{profile.tagline}</Quote>

                <Ctas>
                  <Cta to="/a-propos">
                    Découvrir mon parcours
                    <ArrowUpRight />
                  </Cta>
                  <Cta to="/cv">
                    Voir mon CV
                    <ArrowUpRight />
                  </Cta>
                  </Ctas>
                </TextSide>
              </ThemeProvider>

              <PhotoSide>
                <img
                  src={portrait}
                  alt={`Portrait de ${profile.fullName}`}
                  width="900"
                  height="980"
                />
              </PhotoSide>
              </Panel>
            ) : null}
          </AnimatePresence>
        </PanelAnchor>
      </Screen>
    </ThemeProvider>
  );
};

export default Home;
