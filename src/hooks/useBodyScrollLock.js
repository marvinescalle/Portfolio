import { useEffect } from "react";

/**
 * Bloque le défilement de la page tant qu'une couche est ouverte.
 *
 * La largeur de la barre de défilement qui disparaît est compensée par une
 * marge équivalente, sinon toute la mise en page se décale de quelques
 * pixels à l'ouverture.
 *
 * Volontairement piloté par l'état d'ouverture et non par le montage du
 * composant : une animation de sortie retarderait la libération, et la page
 * resterait bloquée après la fermeture.
 */
const useBodyScrollLock = (active) => {
  useEffect(() => {
    if (!active) return undefined;

    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [active]);
};

export default useBodyScrollLock;
