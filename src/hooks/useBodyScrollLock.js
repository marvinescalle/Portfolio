import { useEffect } from "react";

/**
 * Neutralise la page tant qu'une couche est ouverte : plus de défilement,
 * plus rien d'atteignable derrière.
 *
 * La largeur de la barre de défilement qui disparaît est compensée par une
 * marge équivalente, sinon toute la mise en page se décale de quelques
 * pixels à l'ouverture.
 *
 * L'attribut inert retire l'application du parcours clavier, des clics et de
 * l'arbre d'accessibilité. Il complète le piège à focus de la fiche : même si
 * le focus atterrissait derrière, il n'y trouverait plus rien.
 *
 * Volontairement piloté par l'état d'ouverture et non par le montage du
 * composant : l'animation de sortie retarderait la libération, et la page
 * resterait bloquée, voire inerte, après la fermeture.
 */
const useBodyScrollLock = (active) => {
  useEffect(() => {
    if (!active) return undefined;

    const { body, documentElement } = document;
    const app = document.getElementById("root");
    const gap = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    app?.setAttribute("inert", "");

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      app?.removeAttribute("inert");
    };
  }, [active]);
};

export default useBodyScrollLock;
