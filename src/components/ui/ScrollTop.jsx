import { useEffect, useState } from "react";
import styled from "styled-components";
import { useReducedMotion } from "framer-motion";

import { ArrowUp } from "../icons";
import { useTranslation } from "../../i18n";

/* Le bouton n'apparaît qu'une fois la première hauteur d'écran franchie :
   plus tôt, il ferait doublon avec la navigation encore visible en haut. */
const SEUIL = 1.2;

const Button = styled.button`
  position: fixed;
  right: clamp(1rem, 4vw, 2.5rem);
  bottom: clamp(1rem, 4vw, 2.5rem);
  z-index: 50;

  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid ${(props) => props.theme.line};
  border-radius: 50%;
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  /* Masqué sans être retiré du flux : la transition d'apparition a besoin
     d'un état de départ, et le bouton reste hors du parcours de tabulation
     tant qu'il est invisible. */
  opacity: ${(props) => (props.$shown ? 1 : 0)};
  transform: translateY(${(props) => (props.$shown ? "0" : "0.75rem")});
  pointer-events: ${(props) => (props.$shown ? "auto" : "none")};
  transition: opacity 0.28s ease, transform 0.28s ease,
    background 0.25s ease, color 0.25s ease, border-color 0.25s ease;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    border-color: ${(props) => props.theme.text};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.28s ease;
    transform: none;
  }
`;

/**
 * Retour en haut de page. Apparaît au delà d'un écran et demi de défilement,
 * disparaît dès qu'on remonte.
 *
 * Le défilement est écouté en mode passif et l'état ne change que lorsque le
 * seuil est franchi, pas à chaque pixel : inutile de rendre le composant
 * soixante fois par seconde pour un booléen.
 */
const ScrollTop = () => {
  const [shown, setShown] = useState(false);
  const t = useTranslation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const passe = window.scrollY > window.innerHeight * SEUIL;
      setShown((actuel) => (actuel === passe ? actuel : passe));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      type="button"
      $shown={shown}
      aria-hidden={shown ? undefined : "true"}
      tabIndex={shown ? undefined : -1}
      aria-label={t.common.backToTop}
      title={t.common.backToTop}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }
    >
      <ArrowUp />
    </Button>
  );
};

export default ScrollTop;
