/**
 * Jetons de design du portfolio.
 *
 * Le site existe en deux peaux, MONO et CHROMA, qui partagent exactement la
 * même structure et le même contenu. Chacune fournit deux ambiances, claire
 * et sombre, l'une l'exact négatif de l'autre : les sections sombres
 * (Passions, Contact) demandent `tone="dark"`, le reste la claire.
 *
 * Les composants ne connaissent jamais la peau active. Ils demandent des
 * jetons, et la peau décide de ce qu'ils valent. C'est ce qui permet à
 * CHROMA d'exister sans dupliquer une seule page :
 *
 *   accent   Teinte de la rubrique. En MONO, c'est l'encre : le composant
 *            qui s'en sert reste sobre au lieu de disparaître.
 *   rule     Filet fort d'une section. Encre en MONO, accent en CHROMA.
 *   canvas   Ce que peint la page. En CHROMA elle ne peint rien, le fond
 *            en couches se trouvant derrière elle.
 *   veil     Fond des surfaces posées par-dessus le contenu, barre de
 *            navigation et fiches en surimpression.
 *   card     Fond d'une carte. Identique au fond de page en MONO. En CHROMA
 *            légèrement plus clair que le sol teinté, pour que la carte se
 *            lise comme une feuille posée dessus.
 *   band     Dégradé entre les deux teintes de la rubrique.
 *   accentBar  Le même dégradé, mais transparent en MONO. Sert aux repères
 *            décoratifs propres à CHROMA : MONO ne les peint simplement pas,
 *            ce qui évite d'avoir à écrire la moindre condition.
 *   accentLabel  Couleur des micro-libellés. Le gris discret de MONO, la
 *            teinte de la rubrique en CHROMA.
 */

import { ground } from "./chroma";

const shared = {
  fontDisplay: "'Syne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontBody: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontMono: "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
};

/* ── MONO ────────────────────────────────────────────────────────────────
   Les trois niveaux de gris tiennent le contraste minimum de 4,5 pour 1
   exigé par le WCAG sur du texte courant. Le plus clair était descendu à
   0,42 dans le thème clair, soit 2,85 pour 1 : les micro-libellés en
   capitales, déjà petits et espacés, y étaient à la limite du lisible.
   ──────────────────────────────────────────────────────────────────────── */

export const lightTheme = {
  ...shared,
  skin: "mono",
  name: "light",
  body: "#FCF6F4",
  canvas: "#FCF6F4",
  veil: "#FCF6F4",
  card: "#FCF6F4",
  band: "#0A0A0A",
  accentBar: "transparent",
  accentLabel: "rgba(10, 10, 10, 0.58)",
  text: "#0A0A0A",
  textSoft: "rgba(10, 10, 10, 0.66)",
  textFaint: "rgba(10, 10, 10, 0.58)",
  line: "rgba(10, 10, 10, 0.14)",
  lineStrong: "rgba(10, 10, 10, 0.3)",
  rule: "#0A0A0A",
  accent: "#0A0A0A",
  surface: "rgba(10, 10, 10, 0.035)",
  scrim: "rgba(10, 10, 10, 0.55)",
  inverseBody: "#0A0A0A",
  inverseText: "#FCF6F4",
};

export const darkTheme = {
  ...shared,
  skin: "mono",
  name: "dark",
  body: "#0A0A0A",
  canvas: "#0A0A0A",
  veil: "#0A0A0A",
  card: "#0A0A0A",
  band: "#FCF6F4",
  accentBar: "transparent",
  accentLabel: "rgba(252, 246, 244, 0.48)",
  text: "#FCF6F4",
  textSoft: "rgba(252, 246, 244, 0.68)",
  textFaint: "rgba(252, 246, 244, 0.48)",
  line: "rgba(252, 246, 244, 0.16)",
  lineStrong: "rgba(252, 246, 244, 0.34)",
  rule: "#FCF6F4",
  accent: "#FCF6F4",
  surface: "rgba(252, 246, 244, 0.05)",
  scrim: "rgba(10, 10, 10, 0.55)",
  inverseBody: "#FCF6F4",
  inverseText: "#0A0A0A",
};

/* ── CHROMA ──────────────────────────────────────────────────────────────
   Mêmes jetons, autres valeurs. L'accent est une variable CSS posée par la
   page : un seul jeu d'objets sert donc les sept rubriques, et la teinte
   change sans qu'aucun composant soit remonté.
   ──────────────────────────────────────────────────────────────────────── */

export const chromaLightTheme = {
  ...shared,
  skin: "chroma",
  name: "light",
  body: ground.light.canvas,
  /* La page ne peint rien : le fond en couches est derrière elle. */
  canvas: "transparent",
  veil: "rgba(246, 241, 234, 0.82)",
  card: "#FDFAF5",
  band:
    "linear-gradient(90deg, var(--chroma-accent) 0%, var(--chroma-second) 100%)",
  accentBar:
    "linear-gradient(90deg, var(--chroma-accent) 0%, var(--chroma-second) 100%)",
  accentLabel: "var(--chroma-label)",
  text: ground.light.ink,
  /* Plus soutenus qu'en MONO : ils ne se posent plus sur un aplat mais sur
     un fond teinté, où un gris trop clair perd son contraste. Mesurés au
     coeur de la masse la plus dense, ils tiennent 4,75 et 4,62 pour 1. */
  textSoft: "rgba(20, 16, 30, 0.8)",
  textFaint: "rgba(20, 16, 30, 0.74)",
  line: "rgba(20, 16, 30, 0.14)",
  lineStrong: "rgba(20, 16, 30, 0.3)",
  rule: "var(--chroma-accent)",
  accent: "var(--chroma-accent)",
  surface: "rgba(20, 16, 30, 0.04)",
  scrim: "rgba(11, 10, 20, 0.62)",
  inverseBody: ground.light.ink,
  inverseText: ground.light.canvas,
};

export const chromaDarkTheme = {
  ...shared,
  skin: "chroma",
  name: "dark",
  body: ground.dark.canvas,
  canvas: "transparent",
  veil: "rgba(11, 10, 20, 0.82)",
  card: "#12101F",
  band:
    "linear-gradient(90deg, var(--chroma-accent) 0%, var(--chroma-second) 100%)",
  accentBar:
    "linear-gradient(90deg, var(--chroma-accent) 0%, var(--chroma-second) 100%)",
  accentLabel: "var(--chroma-label)",
  text: ground.dark.ink,
  textSoft: "rgba(246, 241, 234, 0.8)",
  textFaint: "rgba(246, 241, 234, 0.74)",
  line: "rgba(246, 241, 234, 0.16)",
  lineStrong: "rgba(246, 241, 234, 0.34)",
  rule: "var(--chroma-accent)",
  accent: "var(--chroma-accent)",
  surface: "rgba(246, 241, 234, 0.05)",
  scrim: "rgba(5, 4, 12, 0.66)",
  inverseBody: ground.dark.ink,
  inverseText: ground.dark.canvas,
};

/** Les deux peaux, chacune avec ses deux ambiances. */
export const skins = {
  mono: { id: "mono", label: "Mono", light: lightTheme, dark: darkTheme },
  chroma: {
    id: "chroma",
    label: "Chroma",
    light: chromaLightTheme,
    dark: chromaDarkTheme,
  },
};

export const SKIN_IDS = ["mono", "chroma"];

/** Points de rupture, en pixels. */
export const breakpoints = {
  xs: 400,
  sm: 640,
  md: 860,
  lg: 1100,
  xl: 1400,
};

/**
 * Media queries « jusqu'à » : media.md`...` s'applique sous 860px.
 * Utilisable directement dans un template styled-components.
 *
 * Attention : ce raccourci concatène ses valeurs sans les évaluer. Une
 * fonction de props glissée dedans s'y retrouve insérée sous forme de texte
 * et la règle est silencieusement ignorée. Écrire la media query à la main
 * avec `breakpoints` quand une valeur dépend des props.
 */
export const media = Object.entries(breakpoints).reduce((acc, [key, px]) => {
  acc[key] = (strings, ...values) => {
    const css = strings.reduce(
      (out, chunk, i) => out + chunk + (values[i] ?? ""),
      ""
    );
    return `@media (max-width: ${px}px) { ${css} }`;
  };
  return acc;
}, {});

/** Largeur maximale du contenu et gouttière latérale. */
export const layout = {
  maxWidth: "1240px",
  /* Utilisée par la page CV, qui affiche deux documents côte à côte. */
  wideWidth: "1560px",
  gutter: "clamp(1.25rem, 5vw, 5rem)",
  navHeight: "5.5rem",
};
