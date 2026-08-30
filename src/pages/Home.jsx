import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { useReducedMotion } from "framer-motion";

import portrait from "../assets/optimized/portrait.jpg";
import { profile } from "../data/profile";
import { LANGUAGES, pick, useLanguage, useTranslation } from "../i18n";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { darkTheme, layout, lightTheme, media } from "../styles/theme";
import SoundToggle from "../components/ui/SoundToggle";
import { ArrowUpRight } from "../components/icons";
import BrandMark from "../components/brand/BrandMark";
import VortexIntro from "../components/intro/VortexIntro";
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

/* Cadence de l'ouverture, en secondes. Tout est enchaîné par des délais de
   transition CSS : aucune boucle JavaScript, donc aucun risque de saccade si
   le navigateur suspend le rendu, et rien à remettre en état si l'ouverture
   est interrompue.

     0.08 - 1.02 le symbole roule vers le coin bas droit et reprend sa taille
     0.14 - 0.76 le panneau noir se déploie de la gauche vers la droite
     0.36 - 0.96 le texte se découvre du haut vers le bas
     0.50 - 1.12 le portrait se découvre de la gauche vers la droite
   ──────────────────────────────────────────────────────────────────────── */
const swift = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const motionSpec = {
  focal: `0.94s ${swift} 0.08s`,
  panel: `0.62s ${swift} 0.14s`,
  text: `0.6s ${swift} 0.36s`,
  photo: `0.62s ${swift} 0.5s`,
  // Les libellés basculent en clair au moment où le noir passe sous eux.
  tint: "0.42s ease 0.24s",
  /* Repli : les délais qui étagent l'ouverture n'ont pas de sens à l'envers,
     ils laisseraient le portrait seul sur le fond clair. Tout se referme
     ensemble et plus vite. */
  focalBack: `0.82s ${swift}`,
  back: `0.34s ${swift}`,
  /* Le panneau se retire un cheveu après le texte : sinon la bande de texte
     encore en train de se refermer se retrouve seule sur le fond clair. */
  panelBack: `0.44s ${swift} 0.05s`,
  tintBack: "0.3s ease",
};

/* Le symbole roule sur la distance qu'il parcourt. Un roulement strict, où
   l'angle vaut la distance divisée par le rayon, donnerait plus de deux tours
   entiers sur la diagonale : les trois formes ne seraient plus lisibles. Ce
   coefficient garde le rapport entre trajet et rotation, en le ramenant à un
   tour et demi environ. */
const ROLL_RATIO = 0.6;

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: ${(props) => props.theme.body};

  /* La règle globale ramène les durées à zéro mais laisse les délais : sans
     cela, l'ouverture se ferait encore en trois temps, en trois à-coups. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-delay: 0s !important;
    }
  }
`;

/** Grande zone noire révélée à l'ouverture : le contraste est l'identité. */
const DarkGroup = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

/* Le panneau se déploie latéralement, dans l'axe de la colonne qu'il occupe.
   Un scaleX depuis le bord gauche plutôt qu'une forme qui s'étend depuis le
   centre : le geste suit la géométrie de la page, ne déborde jamais de
   l'écran, et reste entièrement pris en charge par le compositeur. */
const DarkPanel = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: 50%;
  background: ${(props) => props.theme.text};
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform ${motionSpec.panelBack};
  z-index: 1;

  &[data-visible="true"] {
    transform: scaleX(1);
    transition: transform ${motionSpec.panel};
  }

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
  transition: color
    ${(props) => (props.$onDark ? motionSpec.tint : motionSpec.tintBack)};
`;

const linkVisual = `
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  padding: 0.5rem 0;
  transition: color
      ${(props) => (props.$onDark ? motionSpec.tint : motionSpec.tintBack)},
    opacity 0.3s ease;

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
  /* Le calage se fait par top, left, bottom et right, qui basculent d'un coup
     puisqu'une longueur ne s'interpole pas vers auto. Le trajet visible est
     donc porté par le seul transform, posé au clic par mesure des deux
     positions. Le symbole arrive ainsi exactement sur sa place de repos, sans
     dépendre d'un calcul de distance approché. */
  transition: transform
    ${(props) => (props.$open ? motionSpec.focal : motionSpec.focalBack)};

  .mark {
    position: relative;
    display: grid;
    place-items: center;
    width: ${(props) => (props.$open ? "3rem" : "clamp(6rem, 13vw, 8.5rem)")};
    height: ${(props) => (props.$open ? "3rem" : "clamp(6rem, 13vw, 8.5rem)")};
    transition: width
        ${(props) => (props.$open ? motionSpec.focal : motionSpec.focalBack)},
      height
        ${(props) => (props.$open ? motionSpec.focal : motionSpec.focalBack)},
      transform 0.5s ease;
  }

  /* Roulement du symbole pendant son trajet. L'angle est posé en ligne, avec
     exactement la durée, le délai et la courbe du déplacement : c'est cette
     synchronisation qui fait lire une roue qui roule plutôt qu'une forme qui
     glisse en tournant. La valeur s'accumule et n'est jamais remise à zéro,
     sans quoi la rotation lente de fond sauterait. */
  .spin {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    transition: rotate
      ${(props) => (props.$open ? motionSpec.focal : motionSpec.focalBack)};
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
/* Seconde couche découpée, au-dessus des libellés : le panneau apparaît
   avec le même cercle que la grande zone noire, d'un seul geste. */
const PanelLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
`;

const PanelAnchor = styled.div`
  position: absolute;
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

const Panel = styled.div`
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

/* Le fond du bloc est exactement le noir du grand panneau : le volet ne se
   voit donc pas comme un rectangle qui descend, seules les lignes de texte se
   posent les unes après les autres. Le léger décalage vertical évite le fondu
   générique tout en restant discret. */
const TextSide = styled.div`
  clip-path: inset(0 0 100% 0);
  transform: translateY(10px);
  transition: clip-path ${motionSpec.back}, transform ${motionSpec.back};

  &[data-visible="true"] {
    clip-path: inset(0 0 0 0);
    transform: none;
    transition: clip-path ${motionSpec.text}, transform ${motionSpec.text};
  }

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
  /* Volet horizontal, dans le prolongement du panneau noir : le portrait se
     découvre de la gauche vers la droite, une fois le texte posé. L'axe
     diffère de celui du texte pour que les deux apparitions se distinguent. */
  clip-path: inset(0 100% 0 0);
  transition: clip-path ${motionSpec.back};

  &[data-visible="true"] {
    clip-path: inset(0 0 0 0);
    transition: clip-path ${motionSpec.photo};
  }

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
  const focalRef = useRef(null);
  /* Position du symbole relevée juste avant la bascule, pour rattraper par un
     `transform` le saut d'ancrage qui suit. */
  const flipRef = useRef(null);
  const spinRef = useRef(null);
  // Angle cumulé du roulement, dans un ref : il ne concerne pas le rendu.
  const rollRef = useRef(0);
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

  /* Le symbole change d'ancrage d'un seul coup au moment où la présentation
     s'ouvre ou se referme. On mesure sa place d'arrivée avant le premier
     rendu à l'écran, on le repose sur sa place de départ par un `transform`,
     puis on laisse la transition ramener ce décalage à zéro. Le trajet est
     donc continu et l'arrivée est exacte par construction, quelle que soit la
     taille de la fenêtre. */
  useLayoutEffect(() => {
    const from = flipRef.current;
    flipRef.current = null;

    const focal = focalRef.current;
    const mark = markRef.current;
    const spin = spinRef.current;
    if (!from || !focal || !mark) return;

    const base = open ? "" : "translate(-50%, -50%) ";

    /* Les deux transitions sont suspendues le temps de la mesure : tant
       qu'elles sont actives, la géométrie relevée est celle de l'état qu'on
       vient de quitter, et le décalage calculé serait faux. */
    focal.style.transition = "none";
    mark.style.transition = "none";
    focal.style.transform = `${base}translate(0px, 0px)`;
    // Taille d'arrivée, relevée avant de reposer celle du départ.
    const target = mark.getBoundingClientRect();
    /* La taille de départ est reposée avant la mesure : c'est elle qui vaut
       au premier instant du trajet, et elle décale la colonne puisque le
       symbole y est empilé au-dessus du libellé. */
    mark.style.width = `${from.width}px`;
    mark.style.height = `${from.height}px`;

    const now = mark.getBoundingClientRect();
    const dx = from.x - (now.left + now.width / 2);
    const dy = from.y - (now.top + now.height / 2);

    /* Rayon moyen entre les deux tailles, puisque le symbole rétrécit en
       chemin. Le sens suit le déplacement : vers la droite il roule dans le
       sens des aiguilles, vers le centre il déroule en sens inverse. */
    const radius = (from.width + target.width) / 4;
    if (spin && radius > 0) {
      const turn =
        ((Math.hypot(dx, dy) / radius) * 180 * ROLL_RATIO) / Math.PI;
      rollRef.current += dx > 0 ? -turn : turn;
    }

    focal.style.transform = `${base}translate(${dx}px, ${dy}px)`;
    // Fige ce point de départ avant de rendre les transitions à nouveau actives.
    void focal.offsetWidth;

    focal.style.transition = "";
    mark.style.transition = "";
    mark.style.width = "";
    mark.style.height = "";
    focal.style.transform = `${base}translate(0px, 0px)`;
    if (spin) spin.style.rotate = `${rollRef.current}deg`;
  }, [open]);




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

        <DarkGroup>
          <DarkPanel data-visible={open} />
        </DarkGroup>

        <Wordmark $onDark={open}>
          {profile.fullName}
          <SoundToggle onDark={open} />
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
          <RailLeft to="/a-propos" style={{ top: "36%" }} $onDark={open}>
            {t.nav.items["/a-propos"]}
          </RailLeft>
          <RailLeft to="/contact" style={{ top: "64%" }} $onDark={open}>
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
          ref={focalRef}
          type="button"
          $open={open}
          $ready={!intro}
          onClick={() => {
            // Relevé avant la bascule : c'est le point de départ du trajet.
            if (!reduce) {
              const box = markRef.current?.getBoundingClientRect();
              flipRef.current = box
                ? {
                    x: box.left + box.width / 2,
                    y: box.top + box.height / 2,
                    width: box.width,
                    height: box.height,
                  }
                : null;
            }
            setOpen((wasOpen) => !wasOpen);
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
            <span className="spin" ref={spinRef}>
              <BrandMark
                size="100%"
                state={hovered && !open ? "hover" : "idle"}
                paused={intro}
              />
            </span>
          </span>
          <span className="hint">{t.home.hint}</span>
        </Focal>

        <PanelLayer aria-hidden={!open} inert={!open}>
        <PanelAnchor>
          <Panel id="presentation">
              <ThemeProvider theme={darkTheme}>
                <TextSide data-visible={open}>
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

              <PhotoSide data-visible={open}>
                <img
                  src={portrait}
                  alt={`${t.about.portrait} ${profile.fullName}`}
                  width="900"
                  height="980"
                />
              </PhotoSide>
          </Panel>
        </PanelAnchor>
        </PanelLayer>

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
