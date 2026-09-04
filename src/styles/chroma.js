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

   Chaque page reçoit une paire de teintes et une poignée de signes. Un signe
   se décrit par sa forme, sa place et sa taille, toutes exprimées en unités
   de fenêtre : la composition tient donc à toutes les tailles d'écran sans
   qu'aucune valeur soit à reprendre.

     m     Nom du signe, dans la bibliothèque de motifs.
     x, y  Centre du signe, en pourcentage de la fenêtre. Volontairement
           au-delà de 0 et 100 pour la plupart : un signe recadré par le bord
           se lit comme une composition, un signe entier posé au milieu se lit
           comme un logo.
     size  Diamètre, en vmin.
     rot   Rotation, en degrés.
     ink   "accent" ou "second".
     op    Opacité. Un tracé filaire couvre très peu de pixels : il peut
           monter bien plus haut qu'un aplat sans jamais gêner la lecture.
     w     Épaisseur du trait, en pixels réels, indépendante de la taille.
   ──────────────────────────────────────────────────────────────────────── */

const pageDesign = {
  /* Un portail : un grand anneau derrière le symbole, deux trajectoires qui
     le traversent, une étoile en écho. */
  "/": {
    accent: "cobalt",
    second: "fuchsia",
    decor: [
      /* Assez large pour sortir par le haut et par le bas : il n'en reste
         que deux arcs de part et d'autre du symbole. Un cercle entier posé
         au milieu se serait lu comme une cible, et aurait pris le pas sur la
         marque qu'il est censé entourer. */
      { m: "bubble", x: 50, y: 54, size: 138, rot: 0, ink: "accent", op: 0.15, w: 1.1 },
      { m: "strings", x: 4, y: 90, size: 66, rot: -8, ink: "accent", op: 0.28, w: 1.2 },
      { m: "star", x: 95, y: 17, size: 30, rot: 14, ink: "second", op: 0.26, w: 1.3 },
      { m: "marker", x: 88, y: 90, size: 12, rot: 0, ink: "accent", op: 0.26, w: 1.1 },
    ],
  },

  /* Le fer à cheval en héros, sorti par la droite, et une orbite à gauche. */
  "/a-propos": {
    accent: "cobalt",
    second: "violet",
    decor: [
      { m: "horseshoe", x: 96, y: 34, size: 72, rot: 12, ink: "accent", op: 0.26, w: 1.4 },
      { m: "bubble", x: -14, y: 62, size: 66, rot: 0, ink: "second", op: 0.22, w: 1.2 },
      { m: "star", x: 72, y: 84, size: 22, rot: -8, ink: "second", op: 0.32, w: 1.3 },
      { m: "star", x: 14, y: 12, size: 13, rot: 18, ink: "accent", op: 0.3, w: 1.2 },
    ],
  },

  /* Une chaîne : deux maillons accrochés, sortis par la droite. */
  "/experiences": {
    accent: "cobalt",
    second: "gold",
    decor: [
      { m: "link", x: 90, y: 22, size: 56, rot: 34, ink: "accent", op: 0.28, w: 1.4 },
      { m: "link", x: 104, y: 44, size: 56, rot: 34, ink: "accent", op: 0.22, w: 1.4 },
      { m: "marker", x: 8, y: 78, size: 16, rot: 0, ink: "second", op: 0.34, w: 1.2 },
      { m: "burst", x: 26, y: 8, size: 24, rot: 0, ink: "second", op: 0.24, w: 1.1 },
    ],
  },

  /* Des bulles qui se recouvrent, de tailles franchement différentes. */
  "/projets": {
    accent: "fuchsia",
    second: "turquoise",
    decor: [
      { m: "bubble", x: -10, y: 20, size: 76, rot: 0, ink: "accent", op: 0.26, w: 1.3 },
      { m: "bubble", x: 22, y: 46, size: 40, rot: 0, ink: "second", op: 0.24, w: 1.2 },
      { m: "bubble", x: 98, y: 76, size: 92, rot: 0, ink: "second", op: 0.2, w: 1.3 },
      { m: "burst", x: 84, y: 14, size: 26, rot: 0, ink: "accent", op: 0.3, w: 1.1 },
    ],
  },

  /* Deux pétales opposés, l'un montant, l'autre retombant. */
  "/formation": {
    accent: "violet",
    second: "gold",
    decor: [
      { m: "petal", x: -6, y: 30, size: 78, rot: -26, ink: "accent", op: 0.26, w: 1.4 },
      { m: "petal", x: 98, y: 82, size: 62, rot: 152, ink: "second", op: 0.24, w: 1.3 },
      { m: "bubble", x: 74, y: 16, size: 28, rot: 0, ink: "accent", op: 0.24, w: 1.2 },
      { m: "star", x: 40, y: 94, size: 15, rot: 0, ink: "second", op: 0.3, w: 1.2 },
    ],
  },

  /* La page la plus libre : une étoile pleine en masse, un éclat, un écho. */
  "/passions": {
    accent: "fuchsia",
    second: "lime",
    tone: "dark",
    decor: [
      { m: "starSolid", x: 94, y: 26, size: 66, rot: 12, ink: "accent", op: 0.16 },
      { m: "burst", x: 6, y: 70, size: 62, rot: 0, ink: "second", op: 0.26, w: 1.2 },
      { m: "star", x: 62, y: 90, size: 26, rot: -14, ink: "second", op: 0.3, w: 1.3 },
      { m: "star", x: 28, y: 12, size: 16, rot: 8, ink: "accent", op: 0.34, w: 1.2 },
    ],
  },

  /* La plus construite : des filaments et des repères de calage. */
  "/cv": {
    accent: "turquoise",
    second: "cobalt",
    decor: [
      { m: "strings", x: 94, y: 44, size: 96, rot: 6, ink: "accent", op: 0.3, w: 1.2 },
      { m: "marker", x: 5, y: 40, size: 14, rot: 0, ink: "second", op: 0.34, w: 1.1 },
      { m: "marker", x: 5, y: 78, size: 14, rot: 0, ink: "second", op: 0.26, w: 1.1 },
      { m: "link", x: 40, y: 104, size: 40, rot: 90, ink: "accent", op: 0.22, w: 1.3 },
    ],
  },

  /* Une source de lumière hors champ, et le fer à cheval en contre-jour. */
  "/contact": {
    accent: "turquoise",
    second: "fuchsia",
    tone: "dark",
    decor: [
      { m: "burst", x: 94, y: 30, size: 108, rot: 0, ink: "accent", op: 0.2, w: 1.2 },
      { m: "horseshoe", x: -8, y: 76, size: 72, rot: -16, ink: "second", op: 0.24, w: 1.4 },
      { m: "star", x: 54, y: 12, size: 20, rot: 10, ink: "second", op: 0.3, w: 1.3 },
      { m: "marker", x: 78, y: 90, size: 13, rot: 0, ink: "accent", op: 0.3, w: 1.1 },
    ],
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
