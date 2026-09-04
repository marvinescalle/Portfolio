import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import navItems from "../../data/navigation";
import { profile } from "../../data/profile";
import { layout, media } from "../../styles/theme";
import { Close, Menu } from "../icons";
import SkinToggle from "../ui/SkinToggle";
import SoundToggle from "../ui/SoundToggle";
import { LANGUAGES, useLanguage, useTranslation } from "../../i18n";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  /* Un voile plutôt qu'un aplat : en CHROMA le fond coloré continue de
     transparaître sous la barre, qui cesse d'être une bande rapportée. En
     MONO le jeton vaut la couleur de page, et rien ne change. */
  background: ${(props) => props.theme.veil};
  backdrop-filter: blur(14px) saturate(1.2);

  /* Sans flou disponible, le voile doit redevenir opaque, sinon le contenu
     défilerait visiblement sous la barre. */
  @supports not (backdrop-filter: blur(1px)) {
    background: ${(props) => props.theme.body};
  }
  border-bottom: 1px solid
    ${(props) => (props.$scrolled ? props.theme.line : "transparent")};
  transition: border-color 0.3s ease;
`;

const Inner = styled.div`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${layout.gutter};
  height: ${(props) =>
    props.$scrolled ? `calc(${layout.navHeight} - 1.25rem)` : layout.navHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  transition: height 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);

  ${media.md`
    height: 4.5rem;
  `}
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
`;

const Wordmark = styled(NavLink)`
  font-family: ${(props) => props.theme.fontDisplay};
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: letter-spacing 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);

  /* Le point marque le retour possible vers la page d'accueil. */
  &::after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-left: 0.5rem;
    vertical-align: 0.15em;
    background: ${(props) => props.theme.accent};
    transition: transform 0.3s ease;
  }

  &:hover {
    letter-spacing: 0.19em;
  }

  &:hover::after {
    transform: scale(2.2);
  }

  ${media.xs`
    font-size: 0.8rem;
    letter-spacing: 0.1em;
  `}
`;

const DesktopList = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.4vw, 2.25rem);

  ${media.lg`
    display: none;
  `}
`;

const Item = styled(NavLink)`
  position: relative;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  color: ${(props) => props.theme.textSoft};
  padding: 0.35rem 0;
  transition: color 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: ${(props) => props.theme.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover {
    color: ${(props) => props.theme.text};
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &[aria-current="page"] {
    color: ${(props) => props.theme.text};
    font-weight: 500;
  }

`;

/* Sélecteur de langue : deux libellés séparés d'une barre, sans drapeau ni
   bouton dessiné, pour rester dans le registre typographique du site. */
const Languages = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  /* La bascule de peau ferme le groupe, un peu détachée des deux libellés
     de langue avec lesquels elle ne se confond pas. */
  > button:last-child {
    margin-left: 0.55rem;
  }
  margin-left: clamp(0.75rem, 1.5vw, 1.5rem);
  padding-left: clamp(0.75rem, 1.5vw, 1.5rem);
  border-left: 1px solid ${(props) => props.theme.line};

  ${media.lg`
    display: none;
  `}

  > span {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.68rem;
    color: ${(props) => props.theme.textFaint};
  }
`;

const LanguageButton = styled.button`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) =>
    props.$active ? props.theme.text : props.theme.textFaint};
  transition: color 0.25s ease;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

/* Une seule barre pour toute la navigation : elle se déplace vers la
   rubrique active au lieu d'apparaître et disparaître sous chacune. */
const Indicator = styled(motion.span)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  background: ${(props) => props.theme.accent};
  pointer-events: none;
`;

const Burger = styled.button`
  display: none;
  align-items: center;
  gap: 0.55rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  ${media.lg`
    display: inline-flex;
  `}
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  padding: ${layout.gutter};
  display: flex;
  flex-direction: column;
`;

const OverlayTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 3rem;
`;

const OverlayClose = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  :focus-visible {
    outline-color: ${(props) => props.theme.body};
  }
`;

const OverlayList = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 0.35rem;
`;

const OverlayItem = styled(NavLink)`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.5rem 0;
  font-family: ${(props) => props.theme.fontDisplay};
  font-weight: 700;
  font-size: clamp(2rem, 9vw, 3rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  opacity: 0.55;
  transition: opacity 0.25s ease;

  &[aria-current="page"] {
    opacity: 1;
  }

  span {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.16em;
  }

  :focus-visible {
    outline-color: ${(props) => props.theme.body};
  }
`;

const OverlayBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const OverlayLanguages = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Enfants directs seulement : la bascule de peau porte son propre span. */
  > span {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.75rem;
    opacity: 0.5;
  }

  > button {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  > button[aria-pressed="false"]:not(:last-child) {
    opacity: 0.45;
  }

  > button:last-child {
    margin-left: 0.4rem;
  }

  :focus-visible {
    outline-color: ${(props) => props.theme.body};
  }
`;

const OverlayFoot = styled.a`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.78rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid currentColor;
  align-self: flex-start;

  :focus-visible {
    outline-color: ${(props) => props.theme.body};
  }
`;

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState(null);
  const location = useLocation();
  const t = useTranslation();
  const { language, setLanguage } = useLanguage();
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  const listRef = useRef(null);

  // Position de la barre active, mesurée sur le lien correspondant.
  const measure = useCallback(() => {
    const list = listRef.current;
    const active = list?.querySelector('[aria-current="page"]');
    if (!list || !active) {
      setIndicator(null);
      return;
    }
    const listBox = list.getBoundingClientRect();
    const box = active.getBoundingClientRect();
    setIndicator({ x: box.left - listBox.left, width: box.width });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, location.pathname, language]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    // Les polices d'affichage changent la largeur des libellés une fois
    // chargées : sans cette seconde mesure la barre reste décalée.
    document.fonts?.ready?.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Le menu se referme dès qu'on change de page.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu ouvert : on bloque le défilement de la page et on écoute Échap.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <Bar $scrolled={scrolled}>
        <Inner $scrolled={scrolled}>
          <Brand>
            <Wordmark to="/" aria-label={t.nav.backHome}>
              {profile.fullName}
            </Wordmark>
            <SoundToggle />
          </Brand>

          <DesktopList ref={listRef} aria-label={t.nav.main}>
            {navItems.map((item) => (
              <Item key={item.path} to={item.path}>
                {t.nav.items[item.path]}
              </Item>
            ))}

            {indicator ? (
              <Indicator
                aria-hidden="true"
                initial={false}
                animate={{ x: indicator.x, width: indicator.width }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 38 }
                }
              />
            ) : null}
          </DesktopList>

          <Languages role="group" aria-label={t.nav.language}>
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
            <SkinToggle />
          </Languages>

          <Burger
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            {t.nav.menu}
            <Menu width={18} height={18} />
          </Burger>
        </Inner>
      </Bar>

      <AnimatePresence>
        {open ? (
          <Overlay
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.main}
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <OverlayTop>
              <OverlayClose
                type="button"
                onClick={() => setOpen(false)}
                ref={closeRef}
              >
                {t.nav.close}
                <Close width={18} height={18} />
              </OverlayClose>
            </OverlayTop>

            <OverlayList aria-label={t.nav.main}>
              <OverlayItem to="/" end>
                <span aria-hidden="true">00</span>
                {t.nav.home}
              </OverlayItem>
              {navItems.map((item) => (
                <OverlayItem key={item.path} to={item.path}>
                  <span aria-hidden="true">{item.index}</span>
                  {t.nav.items[item.path]}
                </OverlayItem>
              ))}
            </OverlayList>

            <OverlayBottom>
              <OverlayFoot href={`mailto:${profile.email}`}>
                {profile.email}
              </OverlayFoot>

              <OverlayLanguages role="group" aria-label={t.nav.language}>
                {LANGUAGES.map((code, i) => (
                  <Fragment key={code}>
                    {i > 0 ? <span aria-hidden="true">/</span> : null}
                    <button
                      type="button"
                      aria-pressed={language === code}
                      onClick={() => setLanguage(code)}
                    >
                      {code}
                    </button>
                  </Fragment>
                ))}
                <SkinToggle onDark />
              </OverlayLanguages>
            </OverlayBottom>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Nav;
