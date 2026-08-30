import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

import { createBurst } from "./burstRenderer";

/* ────────────────────────────────────────────────────────────────────────
   Le noir jaillit du symbole et vient remplir la grande zone sombre de la
   présentation. C'est le geste inverse de l'intro.

   Découpage temporel, en secondes :
     0.00 - 0.55 éruption en spirale depuis le centre
     0.40 - 0.85 la spirale se range dans le rectangle visé
     0.85 - 0.95 le rendu s'efface, les vrais éléments prennent le relais
   ──────────────────────────────────────────────────────────────────────── */

const TOTAL = 0.95;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* Au-dessus des zones sombres, mais sous le symbole, qui doit rester
     visible et tourner pendant que la matière se libère. */
  z-index: 4;
  pointer-events: none;
`;

/**
 * @param {object} props
 * @param {{x: number, y: number}} props.center point d'où part le noir
 * @param {DOMRect|object} props.rect zone sombre à remplir
 * @param {Function} props.onDone appelé une fois la matière en place
 */
const RevealBurst = ({ center, rect, onDone }) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const doneRef = useRef(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const burst = canvas ? createBurst(canvas) : null;

    // Sans WebGL, la présentation s'ouvre simplement, sans effet.
    if (!burst) {
      onDone();
      return undefined;
    }

    burst.setGeometry({ center, rect });
    burst.render(0, 0);

    let start = 0;

    const loop = (now) => {
      if (!start) start = now;
      const t = (now - start) / 1000;

      burst.render(Math.min(t / TOTAL, 1), t);

      if (t < TOTAL) {
        frameRef.current = requestAnimationFrame(loop);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
    };

    frameRef.current = requestAnimationFrame(loop);

    // Filet de sécurité : si le navigateur suspend le rendu, la présentation
    // ne doit pas rester invisible derrière un canvas figé.
    const guard = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    }, TOTAL * 1000 + 400);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(guard);
      burst.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Canvas ref={canvasRef} aria-hidden="true" />;
};

export default RevealBurst;
