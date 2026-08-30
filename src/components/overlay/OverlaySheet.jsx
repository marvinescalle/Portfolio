import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

import { media } from "../../styles/theme";
import { Close } from "../icons";

/* ────────────────────────────────────────────────────────────────────────
   Coquille commune aux fiches en surimpression, projets comme passions.

   Elle prend en charge tout ce qui doit être identique d'une fiche à
   l'autre : rendu dans un portail, fond assombri, défilement interne,
   touche Échap, piège à focus, restitution du focus à la fermeture.

   Le blocage du défilement de la page n'est pas ici : il dépend de l'état
   d'ouverture, pas du montage, sinon l'animation de sortie le retarderait.
   ──────────────────────────────────────────────────────────────────────── */

const Root = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.55);
`;

/* Centrage par marges automatiques : Framer Motion pilote la propriété
   transform pendant l'animation partagée et écraserait un translate CSS. */
const Sheet = styled(motion.div)`
  position: fixed;
  z-index: 101;
  top: 4vh;
  bottom: 4vh;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: min(1100px, 92vw);
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.text};
  overflow: hidden;

  ${media.md`
    top: 0;
    bottom: 0;
    width: 100%;
    border: 0;
  `}
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem clamp(1.25rem, 3vw, 2.5rem);
  border-bottom: 1px solid ${(props) => props.theme.line};
  flex: 0 0 auto;

  .meta {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
  }
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(90deg);
  }
`;

const Scroller = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.5rem)
    clamp(2.5rem, 6vw, 4rem);
`;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

const OverlaySheet = ({ label, meta, onClose, children }) => {
  const sheetRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = sheetRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (returnFocusRef.current instanceof HTMLElement) {
        returnFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  return createPortal(
    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.22 }}
    >
      <Backdrop onClick={onClose} />

      {/* Entrée par une simple mise à l'échelle plutôt qu'une animation
          partagée avec la carte : morpher une vignette large vers un panneau
          haut impose au navigateur une échelle non uniforme, qui écrase le
          contenu pendant toute la transition. Le gain d'illusion ne valait
          pas ce défaut. */}
      <Sheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }
        }
      >
        <Bar>
          <span className="meta">{meta}</span>
          <CloseButton type="button" onClick={onClose} ref={closeRef}>
            Fermer
            <Close />
          </CloseButton>
        </Bar>

        <Scroller>{children}</Scroller>
      </Sheet>
    </Root>,
    document.body
  );
};

export default OverlaySheet;
