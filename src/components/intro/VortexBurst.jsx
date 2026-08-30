import { useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";

import { createVortex } from "./vortexRenderer";

/* ────────────────────────────────────────────────────────────────────────
   Expulsion du noir à l'ouverture de la présentation.

   Même rendu que le rideau d'introduction, en sens inverse : le symbole
   relâche la matière qu'il avait avalée à l'arrivée sur le site. Elle
   jaillit en tournant, se tord, puis se range dans la grande zone sombre
   de la composition.

   Le contexte WebGL est préparé dès que la page d'accueil est prête, et
   non au moment du clic : sa création coûte plusieurs dizaines de
   millisecondes, ce qui se voyait comme un accroc au démarrage de l'effet.

   Découpage temporel, en secondes :
     0.00 - 0.12 les gouttes accélèrent, rien n'est encore sorti
     0.10 - 0.72 expulsion et torsion
     0.40 - 0.95 la matière prend la géométrie du panneau
     0.58        le texte et le portrait commencent à se découvrir
     0.86        passage de relais aux vrais éléments
     1.15        la page est rendue interactive
   ──────────────────────────────────────────────────────────────────────── */

const TOTAL = 1.15;
const START = 0.1;
const REVEAL = 0.58;
const SETTLE = 0.86;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* Au-dessus des zones sombres, sous le symbole qui doit rester visible. */
  z-index: 4;
  pointer-events: none;
  opacity: ${(props) => (props.$fading ? 0 : 1)};
  transition: opacity 0.16s linear;
`;

/**
 * @param {object|null} props.emission null tant que rien n'est expulsé, sinon
 *        { center, rect } en coordonnées du document
 * @param {Function} props.onReveal appelé quand le contenu peut apparaître
 * @param {Function} props.onSettle appelé quand la matière a pris sa forme
 * @param {Function} props.onDone appelé à la fin
 */
const VortexBurst = ({ emission, onReveal, onSettle, onDone }) => {
  const canvasRef = useRef(null);
  const vortexRef = useRef(null);
  const frameRef = useRef(0);
  const guardRef = useRef(0);
  const fadingRef = useRef(false);
  const callbacks = useRef({ onReveal, onSettle, onDone });
  callbacks.current = { onReveal, onSettle, onDone };

  // Contexte préparé à l'avance, une seule fois.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const vortex = createVortex(canvas);
    vortexRef.current = vortex;
    // Une première image transparente, qui force aussi la compilation du
    // programme avant qu'on en ait besoin.
    vortex?.render(0, 0);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(guardRef.current);
      vortex?.destroy();
      vortexRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!emission) return undefined;

    const vortex = vortexRef.current;
    const canvas = canvasRef.current;

    let revealed = false;
    let settled = false;
    let done = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      callbacks.current.onReveal();
    };
    const settle = () => {
      if (settled) return;
      settled = true;
      if (canvas) canvas.style.opacity = "0";
      callbacks.current.onSettle();
    };
    const finish = () => {
      if (done) return;
      done = true;
      callbacks.current.onDone();
    };

    // Sans WebGL, la présentation s'ouvre directement.
    if (!vortex) {
      reveal();
      settle();
      finish();
      return undefined;
    }

    if (canvas) canvas.style.opacity = "1";
    fadingRef.current = false;
    vortex.setEmission(emission);

    let start = 0;

    const loop = (now) => {
      if (!start) start = now;
      const t = (now - start) / 1000;

      vortex.render(
        Math.min(Math.max((t - START) / (SETTLE - START), 0), 1),
        t
      );

      if (t >= REVEAL) reveal();
      if (t >= SETTLE) settle();

      if (t < TOTAL) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        finish();
      }
    };

    frameRef.current = requestAnimationFrame(loop);

    /* Filet de sécurité : si le navigateur suspend le rendu, la
       présentation ne doit pas rester invisible derrière un canvas figé. */
    guardRef.current = window.setTimeout(() => {
      reveal();
      settle();
      finish();
    }, TOTAL * 1000 + 500);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(guardRef.current);
      // Retour à l'état transparent pour la prochaine ouverture.
      vortex.render(0, 0);
      if (canvas) canvas.style.opacity = "0";
    };
  }, [emission]);

  return <Canvas ref={canvasRef} aria-hidden="true" $fading />;
};

export default VortexBurst;
