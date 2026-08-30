import { motion, useReducedMotion } from "framer-motion";
import styled, { keyframes } from "styled-components";

import { BRAND_SHAPES } from "./shapes";

/* ────────────────────────────────────────────────────────────────────────
   Signature graphique du portfolio : les trois formes héritées de la
   première version du site. Composant unique, pour éviter que l'animation
   soit dupliquée entre l'intro, la page d'accueil et les états de
   chargement.

   États :
     idle       rotation lente permanente
     hover      les formes s'écartent, petite accélération
     loading    rotation continue plus rapide
     intro      rotation pilotée de l'extérieur par une valeur de mouvement
   ──────────────────────────────────────────────────────────────────────── */

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrap = styled.span`
  position: relative;
  display: inline-grid;
  place-items: center;
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  color: ${(props) => props.$color ?? "currentColor"};
`;

/* La rotation de fond est confiée au CSS : elle tourne en permanence, et
   n'a donc aucune raison de passer par une boucle JavaScript. */
const Idle = styled.div`
  width: 100%;
  height: 100%;
  animation: ${spin} ${(props) => props.$duration}s linear infinite;
  animation-play-state: ${(props) => (props.$paused ? "paused" : "running")};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Svg = styled(motion.svg)`
  width: 100%;
  height: 100%;
  display: block;
`;

const SPREAD = 4.5; // en unités du repère 100x100

const BrandMark = ({
  size = "8rem",
  state = "idle",
  color,
  rotate,
  paused = false,
  className,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const hovered = state === "hover";
  const loading = state === "loading";
  const controlled = state === "intro";

  const spread = hovered && !reduce ? 1 : 0;
  const duration = loading ? 1.6 : 24;

  const shapes = (
    <Svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      animate={controlled ? undefined : { rotate: hovered && !reduce ? 26 : 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
    >
      {BRAND_SHAPES.map((shape) => (
        <motion.path
          key={shape.d.slice(0, 12)}
          d={shape.d}
          fill="currentColor"
          animate={{ x: shape.dx * SPREAD * spread, y: shape.dy * SPREAD * spread }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        />
      ))}
    </Svg>
  );

  return (
    <Wrap $size={size} $color={color} className={className} {...rest}>
      {controlled ? (
        <motion.div style={{ width: "100%", height: "100%", rotate }}>
          {shapes}
        </motion.div>
      ) : (
        <Idle $duration={duration} $paused={reduce || paused}>
          {shapes}
        </Idle>
      )}
    </Wrap>
  );
};

export default BrandMark;
