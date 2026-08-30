import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

import { createVortex } from "./vortexRenderer";

/* ────────────────────────────────────────────────────────────────────────
   Expulsion du noir à l'ouverture de la présentation.

   Même rendu que le rideau d'introduction, en sens inverse : le symbole
   relâche la matière qu'il avait avalée à l'arrivée sur le site. Elle
   jaillit en tournant, se tord, puis se range dans la grande zone sombre
   de la composition.

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
  transition: opacity 0.18s linear;
`;

/**
 * @param {{x: number, y: number}} props.center point d'expulsion
 * @param {object} props.rect zone sombre visée, en coordonnées du document
 * @param {Function} props.onReveal appelé quand le contenu peut apparaître
 * @param {Function} props.onSettle appelé quand la matière a pris sa forme
 * @param {Function} props.onDone appelé à la fin
 */
const VortexBurst = ({ center, rect, onReveal, onSettle, onDone }) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const revealedRef = useRef(false);
  const settledRef = useRef(false);
  const doneRef = useRef(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const vortex = canvas ? createVortex(canvas) : null;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      onReveal();
    };

    const settle = () => {
      if (settledRef.current) return;
      settledRef.current = true;
      onSettle();
    };

    // Sans WebGL, la présentation s'ouvre directement.
    if (!vortex) {
      reveal();
      settle();
      finish();
      return undefined;
    }

    vortex.setEmission({ center, rect });
    vortex.render(0, 0);

    let start = 0;

    const loop = (now) => {
      if (!start) start = now;
      const t = (now - start) / 1000;

      const p = Math.min(Math.max((t - START) / (SETTLE - START), 0), 1);
      vortex.render(p, t);

      // Le contenu commence à se découvrir pendant que la matière se range.
      if (t >= REVEAL) reveal();

      if (t >= SETTLE) {
        settle();
        // Le canvas s'efface pendant que les vrais éléments prennent le
        // relais : les deux montrent alors exactement la même forme.
        if (canvas) canvas.style.opacity = "0";
      }

      if (t < TOTAL) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        finish();
      }
    };

    frameRef.current = requestAnimationFrame(loop);

    /* Filet de sécurité : si le navigateur suspend le rendu, la présentation
       ne doit pas rester invisible derrière un canvas figé. */
    const guard = window.setTimeout(() => {
      reveal();
      settle();
      finish();
    }, TOTAL * 1000 + 500);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(guard);
      vortex.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default VortexBurst;
