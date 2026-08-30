import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import BrandMark from "../brand/BrandMark";
import { layout } from "../../styles/theme";
import { createVortex } from "./vortexRenderer";
import { useTranslation } from "../../i18n";

/* ────────────────────────────────────────────────────────────────────────
   Rideau d'ouverture. L'écran est noir, le symbole tourne, puis le noir est
   aspiré vers lui et découvre la page d'accueil déjà rendue derrière.

   Découpage temporel, en secondes :
     0.00        écran noir
     0.06 - 0.30 apparition du symbole
     0.00 - 1.75 rotation, accélération puis décélération
     0.39 - 1.43 aspiration du voile
     1.43 - 1.75 dernières volutes, bascule de couleur du symbole
     1.75        l'intro se retire, la page est interactive
   ──────────────────────────────────────────────────────────────────────── */

/* Durées allongées d'environ un cinquième par rapport au premier réglage,
   en conservant exactement les mêmes proportions entre les phases : la
   distorsion reste identique, elle est simplement plus lisible. */
const TOTAL = 1.75;
const VEIL_START = 0.39;
const VEIL_END = 1.43;
/* Trois tours complets : le symbole a une symétrie d'ordre trois, il
   retombe donc exactement dans l'orientation de repos de la page. */
const TURNS = 1080;

const PAPER = [252, 246, 244];
const INK = [10, 10, 10];

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  /* Le voile est peint par le canvas : le conteneur reste transparent pour
     laisser voir la page d'accueil au fur et à mesure. */
  background: transparent;
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

/* Positionné en dur sur l'emplacement exact du symbole de la page
   d'accueil, mesuré au montage. Un simple centrage ne suffit pas : sur
   l'accueil le symbole est décalé vers le haut par la mention qui le suit,
   et le moindre écart rendrait le raccord visible. */
const Mark = styled(motion.div)`
  position: fixed;
  z-index: 2;
  pointer-events: none;
`;

const Skip = styled.button`
  position: absolute;
  z-index: 3;
  bottom: ${layout.gutter};
  right: ${layout.gutter};
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(252, 246, 244, 0.5);
  transition: color 0.3s ease;

  &:hover {
    color: rgba(252, 246, 244, 0.9);
  }

  :focus-visible {
    outline-color: rgba(252, 246, 244, 0.9);
  }
`;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerpColor = (from, to, amount) => {
  const clamped = Math.min(Math.max(amount, 0), 1);
  const channel = (i) =>
    Math.round(from[i] + (to[i] - from[i]) * clamped);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
};

const VortexIntro = ({ onDone, anchorRef }) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const doneRef = useRef(false);
  const [leaving, setLeaving] = useState(false);
  const t = useTranslation();

  const [anchor, setAnchor] = useState(null);

  const rotate = useMotionValue(0);
  const markOpacity = useMotionValue(0);
  const markColor = useMotionValue(`rgb(${PAPER.join(",")})`);

  // useLayoutEffect et non useEffect : la première image du voile doit être
  // peinte avant que le navigateur n'affiche quoi que ce soit, sinon la page
  // d'accueil apparaît un instant avant le noir.
  useLayoutEffect(() => {
    const target = anchorRef?.current;
    if (target) {
      const box = target.getBoundingClientRect();
      setAnchor({
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
      });
    }
  }, [anchorRef]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const vortex = canvas ? createVortex(canvas) : null;

    // Sans WebGL exploitable, on n'impose pas un écran noir figé.
    if (!vortex) {
      onDone();
      return undefined;
    }

    // Voile opaque dès la première peinture.
    vortex.render(0, 0);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setLeaving(true);
      window.setTimeout(onDone, 160);
    };

    let start = 0;

    const loop = (now) => {
      if (!start) start = now;
      const t = (now - start) / 1000;

      const progress = Math.min(
        Math.max((t - VEIL_START) / (VEIL_END - VEIL_START), 0),
        1
      );

      vortex.render(progress, t);
      rotate.set(TURNS * easeInOutCubic(Math.min(t / TOTAL, 1)));
      markOpacity.set(Math.min(Math.max((t - 0.06) / 0.24, 0), 1));
      // Le symbole passe du clair au sombre quand le noir le quitte.
      markColor.set(lerpColor(PAPER, INK, (progress - 0.86) / 0.14));

      if (t < TOTAL) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        finish();
      }
    };

    frameRef.current = requestAnimationFrame(loop);

    const onKeyDown = (event) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener("keydown", onKeyDown);
      vortex.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 160);
  };

  return (
    <Overlay
      aria-hidden="true"
      onClick={skip}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.16, ease: "linear" }}
    >
      <Canvas ref={canvasRef} />

      <Mark
        style={{
          opacity: markOpacity,
          color: markColor,
          left: anchor?.left ?? 0,
          top: anchor?.top ?? 0,
          width: anchor?.width ?? 0,
          height: anchor?.height ?? 0,
          visibility: anchor ? "visible" : "hidden",
        }}
      >
        <BrandMark size="100%" state="intro" rotate={rotate} />
      </Mark>

      <Skip type="button" onClick={skip}>
        {t.home.skipIntro}
      </Skip>
    </Overlay>
  );
};

export default VortexIntro;
