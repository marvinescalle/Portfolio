import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import portrait from "../assets/optimized/portrait.jpg";
import { profile } from "../data/profile";
import { LANGUAGES, pick, useLanguage, useTranslation } from "../i18n";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { darkTheme, layout, lightTheme, media } from "../styles/theme";
import SoundToggle from "../components/ui/SoundToggle";
import { ArrowUpRight } from "../components/icons";
import BrandMark from "../components/brand/BrandMark";
import VortexIntro from "../components/intro/VortexIntro";
import RevealBurst from "../components/intro/RevealBurst";
import {
  markIntroPlayed,
  shouldPlayIntro,
} from "../components/intro/introState";

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

const linkVisual = `
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  padding: 0.5rem 0;
  transition: color 0.6s ease, opacity 0.3s ease;

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

const EdgeLink = styled(Link)`
  ${edge};
  ${linkVisual};
  color: ${(props) => (props.$onDark ? props.theme.body : props.theme.text)};
`;

/* Le coin haut droit accueille désormais le choix de la langue : Contact
   descend dans la colonne de gauche, aux côtés d'À propos. */
const TopRight = styled.div`
  ${edge};
  top: ${layout.gutter};
  right: ${layout.gutter};
  display: flex;
  align-items: center;
  gap: 0.45rem;

  span {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.68rem;
    color: ${(props) => props.theme.textFaint};
  }
`;

const LanguageButton = styled.button`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) =>
    props.$active ? props.theme.text : props.theme.textFaint};
  transition: color 0.25s ease;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

/* Deux libellés par côté, plus deux au centre en bas : trois groupes
   équilibrés autour du point focal. La position verticale est passée en
   style en ligne, pour ne pas transmettre une prop inconnue au lien de
   React Router. */
/* Rotation et translation dans une seule déclaration transform : la
   propriété `rotate` s'applique avant `transform`, si bien que le décalage
   vertical partait dans le mauvais sens et désalignait la colonne de gauche
   d'une centaine de pixels par rapport à celle de droite. */
const RailLeft = styled(EdgeLink)`
  left: ${layout.gutter};
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl;
`;

const RailRight = styled(EdgeLink)`
  right: ${layout.gutter};
  transform: translateY(-50%);
  writing-mode: vertical-rl;
`;

/* Le groupe du bas glisse vers la moitié claire à l'ouverture : centré, il
   se retrouverait à cheval sur la grande zone noire, illisible d'un côté. */
const BottomGroup = styled.div`
  ${edge};
  bottom: ${layout.gutter};
  left: ${(props) => (props.$open ? "74%" : "50%")};
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: clamp(3rem, 7vw, 6rem);
  transition: left 0.8s ease;
`;

const BottomLink = styled(Link)`
  ${linkVisual};
  color: ${(props) => props.theme.text};
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
    opacity: ${(props) => (props.$open || !props.$ready ? 0 : 1)};
    transition: opacity 0.6s ease;
    animation: ${halo} 3.4s ease-out infinite;
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
    opacity: ${(props) => (props.$open || !props.$ready ? 0 : 1)};
    transition: opacity 0.4s ease, color 0.3s ease;
    white-space: nowrap;
  }

  &:hover .hint,
  &:focus-visible .hint {
    color: ${(props) => props.theme.text};
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
  }

  ${media.md`
    min-height: 0;
    max-height: 42vh;

    img { max-width: 15rem; }
  `}
`;

const Home = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const markRef = useRef(null);
  const darkRef = useRef(null);

  // Pendant la libération du noir, les vraies zones sombres restent
  // invisibles : c'est le rendu qui les dessine, avant de leur passer la main.
  const [burst, setBurst] = useState(null);
  const t = useTranslation();
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();

  // Décidé une seule fois, au premier rendu : l'intro ne doit pas réapparaître
  // parce qu'un état a changé plus tard.
  const [intro, setIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return !reduced && shouldPlayIntro();
  });

  useEffect(() => {
    if (!intro) markIntroPlayed();
  }, [intro]);

  // La zone à remplir est mesurée sur l'élément réel plutôt que déduite du
  // format de l'écran : elle suit ainsi la mise en page sans la redire.
  useLayoutEffect(() => {
    if (!burst || burst.rect || !darkRef.current) return;
    const box = darkRef.current.getBoundingClientRect();
    setBurst((current) =>
      current && !current.rect ? { ...current, rect: box } : current
    );
  }, [burst]);

  // L'accueil ne passe pas par PageShell : il pose lui-même la couleur de
  // fond du document, pour éviter un fond hérité de la page précédente.
  useEffect(() => {
    document.body.style.backgroundColor = lightTheme.body;
  }, []);

  useDocumentMeta();

  // Sur petite largeur le coin haut droit ne porte plus que la langue :
  // toutes les rubriques, Contact compris, passent dans cette liste.
  const sections = [
    "/a-propos",
    "/experiences",
    "/projets",
    "/formation",
    "/passions",
    "/cv",
    "/contact",
  ];

  return (
    <ThemeProvider theme={lightTheme}>
      <Screen>
        <h1 className="visually-hidden">
          {profile.fullName}, {pick(profile.role, language)} :{" "}
          {pick(profile.disciplines, language).join(", ")}
        </h1>

        <AnimatePresence>
          {open ? (
            <DarkPanel
              key="dark"
              ref={darkRef}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: burst ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>

        <Wordmark $onDark={open && !burst}>
          {profile.fullName}
          <SoundToggle onDark={open && !burst} />
        </Wordmark>

        <TopRight role="group" aria-label={t.nav.language}>
          {LANGUAGES.map((code, i) => (
            <Fragment key={code}>
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              <LanguageButton
                type="button"
                $active={language === code}
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
              >
                {code}
              </LanguageButton>
            </Fragment>
          ))}
        </TopRight>

        <DesktopOnly>
          <RailLeft to="/a-propos" style={{ top: "36%" }} $onDark={open && !burst}>
            {t.nav.items["/a-propos"]}
          </RailLeft>
          <RailLeft to="/contact" style={{ top: "64%" }} $onDark={open && !burst}>
            {t.nav.items["/contact"]}
          </RailLeft>

          <RailRight to="/passions" style={{ top: "36%" }}>
            {t.nav.items["/passions"]}
          </RailRight>
          <RailRight to="/projets" style={{ top: "64%" }}>
            {t.nav.items["/projets"]}
          </RailRight>

          <BottomGroup $open={open}>
            <BottomLink to="/formation">
              {t.nav.items["/formation"]}
            </BottomLink>
            <BottomLink to="/experiences">
              {t.nav.items["/experiences"]}
            </BottomLink>
            <BottomLink to="/cv">{t.nav.items["/cv"]}</BottomLink>
          </BottomGroup>
        </DesktopOnly>

        {!open ? (
          <MobileRail aria-label={t.home.sections}>
            {sections.map((path) => (
              <Link key={path} to={path}>
                {t.nav.items[path]}
              </Link>
            ))}
          </MobileRail>
        ) : null}

        <Focal
          type="button"
          $open={open}
          $ready={!intro}
          onClick={() => {
            if (open) {
              setOpen(false);
              setBurst(null);
              return;
            }

            const box = markRef.current?.getBoundingClientRect();
            setOpen(true);

            // Sans WebGL ni mouvement réduit, l'ouverture reste immédiate.
            if (!reduce && box) {
              setBurst({
                center: {
                  x: box.left + box.width / 2,
                  y: box.top + box.height / 2,
                },
                rect: null,
              });
            }
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-expanded={open}
          aria-controls="presentation"
          aria-label={open ? t.home.hide : t.home.open}
        >
          <span className="mark" ref={markRef}>
            <BrandMark
              size="100%"
              state={
                burst ? "loading" : hovered && !open ? "hover" : "idle"
              }
              paused={intro}
            />
          </span>
          <span className="hint">{t.home.hint}</span>
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
                  <Hello>{t.home.hello}</Hello>

                <NameBlock>
                  <p>{t.home.iam}</p>
                  <strong>{profile.fullName}</strong>
                </NameBlock>

                <Role>
                  <span className="title">{pick(profile.role, language)}</span>
                  <span className="disciplines">
                    {pick(profile.disciplines, language).join(" · ")}
                  </span>
                </Role>

                <Quote>{pick(profile.tagline, language)}</Quote>

                <Ctas>
                  <Cta to="/a-propos">
                    {t.home.discover}
                    <ArrowUpRight />
                  </Cta>
                  <Cta to="/cv">
                    {t.home.seeCv}
                    <ArrowUpRight />
                  </Cta>
                  </Ctas>
                </TextSide>
              </ThemeProvider>

              <PhotoSide>
                <img
                  src={portrait}
                  alt={`${t.about.portrait} ${profile.fullName}`}
                  width="900"
                  height="980"
                />
              </PhotoSide>
              </Panel>
            ) : null}
          </AnimatePresence>
        </PanelAnchor>
        {burst?.rect ? (
          <RevealBurst
            center={burst.center}
            rect={burst.rect}
            onDone={() => setBurst(null)}
          />
        ) : null}

        {intro ? (
          <VortexIntro
            anchorRef={markRef}
            onDone={() => {
              markIntroPlayed();
              setIntro(false);
            }}
          />
        ) : null}
      </Screen>
    </ThemeProvider>
  );
};

export default Home;
