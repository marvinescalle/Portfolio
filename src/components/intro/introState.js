/**
 * L'intro ne se joue qu'une fois par session : un nouvel onglet la rejoue,
 * une navigation interne non. sessionStorage peut être indisponible (mode
 * privé strict, navigateur verrouillé) : dans ce cas on ne joue pas l'intro
 * plutôt que de la rejouer à chaque page.
 */
const KEY = "portfolio-intro";

export const shouldPlayIntro = () => {
  try {
    return window.sessionStorage.getItem(KEY) !== "done";
  } catch {
    return false;
  }
};

export const markIntroPlayed = () => {
  try {
    window.sessionStorage.setItem(KEY, "done");
  } catch {
    /* sans stockage, l'intro sera simplement rejouée au rechargement */
  }
};
