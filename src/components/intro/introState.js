/**
 * L'intro se rejoue à chaque chargement de la page d'accueil : un visiteur
 * qui l'a manquée n'a qu'à recharger. En revanche elle ne se relance pas
 * lors d'une navigation interne, sans quoi le moindre retour à l'accueil
 * rejouerait le rideau.
 *
 * Un simple drapeau en mémoire suffit : il disparaît au rechargement, ce qui
 * est exactement le comportement recherché.
 */
let consumed = false;

export const shouldPlayIntro = () => !consumed;

export const markIntroPlayed = () => {
  consumed = true;
};
