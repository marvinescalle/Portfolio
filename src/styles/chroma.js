/**
 * CHROMA : la seconde peau du portfolio.
 *
 * Même site, même structure, même contenu. Ce fichier ne décrit qu'une chose,
 * la matière : une palette, deux champs de couleur, et une composition de
 * signes par rubrique.
 *
 * L'inspiration est celle des affiches de JoJo's Bizarre Adventure, prise par
 * son versant graphique et non narratif : des encres franches posées côte à
 * côte, une énergie de sérigraphie, de grands signes abstraits qui sortent du
 * cadre. Aucun personnage, aucun visuel emprunté, rien de figuratif.
 *
 * La première version répétait de petits motifs en tuile. C'était du papier
 * peint : une texture uniforme, sans intention, que l'oeil finit par lire
 * comme une trame. Ici les signes sont comptés, posés grand, recadrés par les
 * bords et parfois superposés. Ce sont des éléments de composition.
 */

/* ────────────────────────────────────────────────────────────────────────
   1. PALETTE

   Six teintes, pas une de plus, chacune en quatre valeurs.

     light / dark  Le décor : filets, bordures, puces, signes, champs de
                   couleur. Ce sont des aplats et des traits, jamais du texte.
     deep / pale   Le texte. Une même teinte posée en petit corps sur un fond
                   qu'elle a elle-même coloré ne se détache plus : au coeur
                   d'un champ, le fuchsia sur fuchsia tombait à 2,1 pour 1.
                   Ces deux variantes tiennent 4,5 pour 1 dans ce pire cas, et
                   dépassent 9 pour 1 sur le papier nu.
   ──────────────────────────────────────────────────────────────────────── */

export const hues = {
  cobalt: { light: "#2438C8", dark: "#8496FF", deep: "#162278", pale: "#B5C0FF" },
  fuchsia: { light: "#BE1668", dark: "#FF74B4", deep: "#630B36", pale: "#FFAED4" },
  turquoise: { light: "#0A7F7B", dark: "#45DCD2", deep: "#054542", pale: "#9BECE7" },
  violet: { light: "#6231C4", dark: "#B394FF", deep: "#391C72", pale: "#D1BFFF" },
  gold: { light: "#8F5D00", dark: "#F2C468", deep: "#533600", pale: "#F8DEAA" },
  /* Le vert est la teinte la plus lumineuse du jeu : sa valeur sombre a été
     rabattue de 4 % pour qu'un libellé posé au coeur de son champ tienne le
     seuil de 4,5 pour 1, qu'il manquait de peu. */
  lime: { light: "#4C7A0B", dark: "#AFDF66", deep: "#2C4706", pale: "#DAF5B0" },
};

/** Fonds et encres des deux ambiances. */
export const ground = {
  light: { canvas: "#F6F1EA", ink: "#14101E" },
  dark: { canvas: "#0B0A14", ink: "#F6F1EA" },
};

/* ────────────────────────────────────────────────────────────────────────
   2. COMPOSITION PAR RUBRIQUE

   Chaque page reçoit une paire de teintes et un seul signe.

   Une version précédente en posait quatre par page, avec l'idée qu'une
   composition riche vaudrait mieux qu'une trame. C'était une erreur du même
   ordre : quatre formes qui se disputent l'écran ne composent pas, elles
   habillent. Un signe unique, choisi pour la rubrique et posé à sa place, se
   remarque et se retient. Le reste du caractère vient de la couleur, qui
   n'occupe aucune surface de lecture.

     m     Nom du signe, dans la bibliothèque de motifs.
     x, y  Centre du signe, en pourcentage de la fenêtre.
     size  Diamètre, en vmin.
     rot   Rotation, en degrés.
     ink   "accent" ou "second".
     op    Opacité. Un tracé filaire couvre très peu de pixels.
     w     Épaisseur du trait, en pixels réels, indépendante de la taille.
   ──────────────────────────────────────────────────────────────────────── */

const pageDesign = {
  /* L'accueil est presque vide : une seule étoile, entière, suffit à le
     signer. Elle se tient à l'écart du symbole central, qu'elle n'a pas à
     concurrencer. */
  "/": {
    accent: "cobalt",
    second: "fuchsia",
    sign: { m: "star", x: 86, y: 27, size: 26, rot: 12, ink: "second", op: 0.22, w: 1.3 },
  },

  "/a-propos": {
    accent: "cobalt",
    second: "violet",
    sign: { m: "horseshoe", x: 95, y: 30, size: 46, rot: 10, ink: "accent", op: 0.18, w: 1.4 },
  },

  "/experiences": {
    accent: "cobalt",
    second: "gold",
    sign: { m: "link", x: 93, y: 26, size: 40, rot: 32, ink: "accent", op: 0.2, w: 1.4 },
  },

  "/projets": {
    accent: "fuchsia",
    second: "turquoise",
    /* Descendue sous le titre : posée plus haut, elle traversait le seul
       endroit où l'oeil se pose en premier. */
    sign: { m: "bubble", x: -6, y: 52, size: 52, rot: 0, ink: "accent", op: 0.18, w: 1.3 },
  },

  "/formation": {
    accent: "violet",
    second: "gold",
    sign: { m: "petal", x: 94, y: 34, size: 48, rot: 22, ink: "accent", op: 0.18, w: 1.4 },
  },

  "/passions": {
    accent: "fuchsia",
    second: "lime",
    tone: "dark",
    sign: { m: "star", x: 91, y: 24, size: 34, rot: 10, ink: "accent", op: 0.24, w: 1.3 },
  },

  "/cv": {
    accent: "turquoise",
    second: "cobalt",
    sign: { m: "strings", x: 94, y: 40, size: 54, rot: 6, ink: "accent", op: 0.22, w: 1.2 },
  },

  "/contact": {
    accent: "turquoise",
    second: "fuchsia",
    tone: "dark",
    sign: { m: "bubble", x: 92, y: 30, size: 50, rot: 0, ink: "accent", op: 0.22, w: 1.3 },
  },
};

const DEFAULT_DESIGN = { ...pageDesign["/"], tone: "light" };

/** Première partie du chemin, qui identifie la rubrique. */
const sectionOf = (pathname) =>
  pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;

/** Composition de la rubrique en cours, replis compris. */
export const designFor = (pathname) => ({
  tone: "light",
  ...DEFAULT_DESIGN,
  ...(pageDesign[sectionOf(pathname)] ?? {}),
});

/**
 * Variables CSS d'une page : la teinte principale, la secondaire, et celle
 * réservée au texte. Tout le reste du décor s'en déduit, ce qui évite d'avoir
 * à décliner une feuille de style par rubrique.
 */
export const chromaVars = (pathname, tone) => {
  const page = designFor(pathname);
  const key = tone === "dark" ? "dark" : "light";

  return {
    "--chroma-accent": hues[page.accent][key],
    "--chroma-second": hues[page.second][key],
    /* Le texte prend la variante contrastée de la même teinte, jamais celle
       du décor : elle s'effondrerait sur le fond qu'elle a servi à teinter. */
    "--chroma-label": hues[page.accent][tone === "dark" ? "pale" : "deep"],
  };
};

/**
 * Pose ces variables sur la racine du document.
 *
 * Sur la racine et non sur la page : les fiches en surimpression sont rendues
 * dans un portail, donc en dehors de l'arbre de la page. Posées plus bas,
 * les variables ne les atteignaient pas, et leurs filets d'accent retombaient
 * silencieusement sur la couleur du texte.
 */
export const applyChromaVars = (pathname, tone) => {
  const root = document.documentElement;
  Object.entries(chromaVars(pathname, tone)).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
};

/**
 * Grain. Un bruit fractal calculé par le navigateur, donc aucune image à
 * télécharger. Il suffit à retirer au fond son aspect plastique sans jamais
 * salir la page.
 */
export const grainUrl = (() => {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>" +
    "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.8' " +
    "numOctaves='3' stitchTiles='stitch'/>" +
    "<feColorMatrix type='saturate' values='0'/></filter>" +
    "<rect width='180' height='180' filter='url(%23g)'/></svg>";

  return `url("data:image/svg+xml,${svg
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/"/g, "'")}")`;
})();

export default chromaVars;
