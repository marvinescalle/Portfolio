import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

import { media } from "../../styles/theme";
import { Close } from "../icons";
import { useTranslation } from "../../i18n";

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
  background: ${(props) => props.theme.scrim};
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
  /* Opaque, contrairement aux cartes : une fiche se détache de la page, elle
     ne la laisse pas transparaître derrière son texte. */
  background: ${(props) => props.theme.sheet};
  /* Couleur de texte posée sur la feuille elle-même : sans elle, tout élément
     qui n'en déclare pas hérite de celle de la page, restée sombre. Le bouton
     de fermeture se retrouvait ainsi en noir sur le fond noir des fiches de
     passion, donc invisible. */
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.rule};
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
    color: ${(props) => props.theme.accentLabel};
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

/* Volontairement sans `iframe` : l'aperçu de CV en contient un, et le
   document PDF qu'il affiche est un sous-document dont les événements
   clavier ne remontent pas jusqu'ici. Y laisser entrer le focus reviendrait
   à l'y abandonner, hors de portée du piège comme de la touche Échap. Les
   actions de téléchargement et d'ouverture, elles, restent dans la fiche. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const OverlaySheet = ({ label, meta, onClose, children }) => {
  const t = useTranslation();
  const titleId = useId();
  const sheetRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    /* Les éléments réellement atteignables, relevés à chaque frappe : le
       contenu d'une fiche peut changer pendant qu'elle est ouverte. Un
       élément masqué ne rend aucun rectangle et se voit donc écarté. */
    const reachable = () =>
      Array.from(sheetRef.current?.querySelectorAll(FOCUSABLE) ?? []).filter(
        (element) => element.getClientRects().length > 0
      );

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      /* Le déplacement est calculé et appliqué ici, jamais laissé au
         navigateur. Se contenter de rattraper les deux extrémités ne suffit
         pas : Safari ne donne pas le focus aux liens par défaut, si bien que
         le dernier élément de la liste n'était jamais atteint, la condition
         de bouclage jamais remplie, et la tabulation finissait par sortir du
         document pour aller dans la barre d'adresse. */
      event.preventDefault();

      const items = reachable();
      if (!items.length) return;

      const current = items.indexOf(document.activeElement);
      const step = event.shiftKey ? -1 : 1;
      const next =
        current === -1
          ? (event.shiftKey ? items.length - 1 : 0)
          : (current + step + items.length) % items.length;

      items[next].focus();
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
        aria-labelledby={titleId}
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
          {/* Porte le nom accessible de la fiche : un intitulé visible à
              l'écran vaut mieux qu'un aria-label dupliqué à côté. */}
          <span className="meta" id={titleId}>
            {meta ?? label}
          </span>
          <CloseButton type="button" onClick={onClose} ref={closeRef}>
            {t.common.close}
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
