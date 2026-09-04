import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";


/* ────────────────────────────────────────────────────────────────────────
   Rideau de transition entre les rubriques.

   Le principe : un panneau balaie l'écran de gauche à droite pour masquer
   la page en cours, le contenu est remplacé pendant qu'il est couvert, puis
   le panneau se retire dans le même sens et découvre la nouvelle page.

   L'échange se fait donc à l'abri du regard, ce qui évite le fondu croisé
   habituel où l'on voit les deux pages en même temps.

   Rien de tout cela n'attend le chargement : les pages sont déjà en cache
   après la première visite, et le rideau se déroule sur une durée fixe.
   ──────────────────────────────────────────────────────────────────────── */

const COVER = 0.18;
const UNCOVER = 0.24;

const Panel = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: ${(props) => props.theme.text};
  pointer-events: none;
  will-change: clip-path;
`;

/* Fine arête claire en tête du panneau : sur les pages déjà sombres, c'est
   elle qui rend le balayage lisible. */
const Edge = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  z-index: 91;
  background: ${(props) => props.theme.body};
  pointer-events: none;
`;

/**
 * Pilote le rideau et retarde le changement de contenu jusqu'à ce que
 * l'écran soit couvert.
 *
 * @param {string} target  chemin demandé
 * @param {function} onCovered  appelé quand l'écran est masqué
 */
const useCurtain = (target, onCovered) => {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const pending = useRef(null);

  useEffect(() => {
    if (target === null) return;

    if (reduce) {
      onCovered(target);
      return;
    }

    pending.current = target;
    setPhase("cover");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduce]);

  const advance = () => {
    if (phase === "cover") {
      onCovered(pending.current);
      pending.current = null;
      setPhase("uncover");
    } else if (phase === "uncover") {
      setPhase("idle");
    }
  };

  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  /* Filet de sécurité : si l'animation ne se termine pas, par exemple parce
     que l'onglet passe en arrière-plan et que le navigateur suspend le
     rendu, la navigation ne doit pas rester bloquée derrière le rideau. */
  useEffect(() => {
    if (phase === "idle") return undefined;

    const limit = (phase === "cover" ? COVER : UNCOVER) * 1000 + 350;
    const timer = window.setTimeout(() => advanceRef.current(), limit);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return { phase, handleComplete: () => advanceRef.current(), reduce };
};

const RouteCurtain = ({ phase, onComplete }) => {
  if (phase === "idle") return null;

  const covering = phase === "cover";

  return (
    <>
      <Panel
        aria-hidden="true"
        initial={{ clipPath: covering ? "inset(0 100% 0 0)" : "inset(0 0 0 0)" }}
        animate={{ clipPath: covering ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}
        transition={{
          duration: covering ? COVER : UNCOVER,
          ease: covering ? [0.55, 0, 1, 0.45] : [0, 0.55, 0.45, 1],
        }}
        onAnimationComplete={onComplete}
      />
      <Edge
        aria-hidden="true"
        initial={{ x: covering ? "-2px" : "0vw" }}
        animate={{ x: "100vw" }}
        transition={{
          duration: covering ? COVER : UNCOVER,
          ease: covering ? [0.55, 0, 1, 0.45] : [0, 0.55, 0.45, 1],
        }}
      />
    </>
  );
};

export { useCurtain, COVER, UNCOVER };
export default RouteCurtain;
