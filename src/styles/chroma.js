/**
 * CHROMA : la seconde peau du portfolio.
 *
 * Même site, même structure, même contenu. Ce fichier ne décrit qu'une chose,
 * la matière : une palette, un fond en couches, et un accent par page.
 *
 * L'inspiration est celle des affiches de JoJo's Bizarre Adventure, prise par
 * son versant graphique et non narratif : des aplats colorés inattendus posés
 * côte à côte, une énergie d'affiche sérigraphiée, des motifs abstraits en
 * arrière-plan. Aucun personnage, aucun visuel emprunté, rien de figuratif.
 */

/* ────────────────────────────────────────────────────────────────────────
   1. PALETTE

   Cinq teintes, pas une de plus, chacune déclinée en deux valeurs : celle
   qui tient sur l'ivoire, celle qui tient sur l'encre. Une page n'en montre
   jamais plus de deux à la fois.
   ──────────────────────────────────────────────────────────────────────── */

/*
 * Quatre valeurs par teinte, et chacune a son emploi.
 *
 *   light / dark  Le décor : filets, bordures, puces, motif, masses de fond.
 *                 Ce sont des aplats et des traits, jamais du texte.
 *   deep / pale   Le texte. Une même teinte posée en petit corps sur un fond
 *                 qu'elle a elle-même coloré ne se détache plus : au coeur
 *                 d'une masse, le fuchsia sur fuchsia tombait à 2,1 pour 1.
 *                 Ces deux variantes sont calculées pour tenir 4,5 pour 1
 *                 dans ce pire cas, et dépassent 9 pour 1 sur le papier nu.
 */
export const hues = {
  cobalt: {
    light: "#2438C8",
    dark: "#8496FF",
    deep: "#162278",
    pale: "#B5C0FF",
  },
  fuchsia: {
    light: "#BE1668",
    dark: "#FF74B4",
    deep: "#630B36",
    pale: "#FFAED4",
  },
  turquoise: {
    light: "#0A7F7B",
    dark: "#45DCD2",
    deep: "#054542",
    pale: "#9BECE7",
  },
  violet: {
    light: "#6231C4",
    dark: "#B394FF",
    deep: "#391C72",
    pale: "#D1BFFF",
  },
  gold: {
    light: "#8F5D00",
    dark: "#F2C468",
    deep: "#533600",
    pale: "#F8DEAA",
  },
};

/** Fonds et encres des deux ambiances. */
export const ground = {
  light: { canvas: "#F6F1EA", ink: "#14101E" },
  dark: { canvas: "#0B0A14", ink: "#F6F1EA" },
};

/* ────────────────────────────────────────────────────────────────────────
   2. MOTIFS

   Une seule famille : des traits fins de même épaisseur, posés de façon
   irrégulière sur une tuile large, à opacité très basse. Chaque page reçoit
   sa variante, mais toutes se lisent comme un même dessin.

   Le motif est dessiné à la couleur d'accent de la page : il n'a donc jamais
   besoin d'être opaque pour exister.
   ──────────────────────────────────────────────────────────────────────── */

const TILE = 260;

/* Le contenu de chaque tuile, sans l'enveloppe SVG qui est commune. Les
   coordonnées sont volontairement irrégulières : une trame régulière se
   verrait immédiatement comme un papier peint. */
const motifShapes = {
  /* Petites étoiles à quatre branches, très espacées. */
  stars:
    "<path d='M40 18c1.4 11 4.6 14.2 15.6 15.6C44.6 35 41.4 38.2 40 49.2c-1.4-11-4.6-14.2-15.6-15.6C35.4 32.2 38.6 29 40 18z'/>" +
    "<path d='M186 96c1 7.6 3.2 9.8 10.8 10.8-7.6 1-9.8 3.2-10.8 10.8-1-7.6-3.2-9.8-10.8-10.8 7.6-1 9.8-3.2 10.8-10.8z'/>" +
    "<path d='M104 198c1.2 9.4 4 12.2 13.4 13.4-9.4 1.2-12.2 4-13.4 13.4-1.2-9.4-4-12.2-13.4-13.4 9.4-1.2 12.2-4 13.4-13.4z'/>",

  /* Cercles filaires, comme des bulles qui remontent. */
  bubbles:
    "<circle cx='54' cy='46' r='17' fill='none' stroke-width='1.1'/>" +
    "<circle cx='196' cy='84' r='9' fill='none' stroke-width='1.1'/>" +
    "<circle cx='128' cy='176' r='24' fill='none' stroke-width='1.1'/>" +
    "<circle cx='38' cy='206' r='6' fill='none' stroke-width='1.1'/>",

  /* Anneaux concentriques, plus calmes. */
  rings:
    "<circle cx='62' cy='62' r='30' fill='none' stroke-width='1.1'/>" +
    "<circle cx='62' cy='62' r='16' fill='none' stroke-width='1.1'/>" +
    "<circle cx='188' cy='178' r='21' fill='none' stroke-width='1.1'/>" +
    "<circle cx='188' cy='178' r='9' fill='none' stroke-width='1.1'/>",

  /* Pétales : deux arcs qui se referment. */
  petals:
    "<path d='M46 34c17 3 26 14 24 31-17-3-26-14-24-31z' fill='none' stroke-width='1.1'/>" +
    "<path d='M182 112c-16 6-27 1-32-14 16-6 27-1 32 14z' fill='none' stroke-width='1.1'/>" +
    "<path d='M96 190c14 9 17 21 9 34-14-9-17-21-9-34z' fill='none' stroke-width='1.1'/>",

  /* Maillons : deux boucles qui s'accrochent. */
  chain:
    "<rect x='40' y='44' width='34' height='19' rx='9.5' fill='none' stroke-width='1.1'/>" +
    "<rect x='64' y='44' width='34' height='19' rx='9.5' fill='none' stroke-width='1.1'/>" +
    "<rect x='168' y='166' width='19' height='34' rx='9.5' fill='none' stroke-width='1.1'/>" +
    "<rect x='168' y='190' width='19' height='34' rx='9.5' fill='none' stroke-width='1.1'/>",

  /* Lignes rayonnantes, la variante la plus discrète. */
  rays:
    "<path d='M18 8 62 52M40 4 68 32M6 32 40 66' fill='none' stroke-width='1.1'/>" +
    "<path d='M242 128 198 172M254 152 226 180' fill='none' stroke-width='1.1'/>" +
    "<path d='M120 232 152 200M96 246 140 202' fill='none' stroke-width='1.1'/>",

  /* Croisillons fins, pour les pages les plus structurées. */
  grid:
    "<path d='M52 44v18M43 53h18M180 92v14M173 99h14M108 188v20M98 198h20M214 208v12M208 214h12' fill='none' stroke-width='1.1'/>",
};

/**
 * Fabrique l'adresse d'un motif, dessiné à la couleur demandée.
 *
 * Encodé à la main plutôt qu'en base64 : le SVG reste lisible dans
 * l'inspecteur, et la chaîne est plus courte.
 */
export const motifUrl = (name, color) => {
  const shapes = motifShapes[name] ?? motifShapes.rays;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}' ` +
    `viewBox='0 0 ${TILE} ${TILE}' fill='${color}' stroke='${color}'>` +
    shapes +
    "</svg>";

  return `url("data:image/svg+xml,${svg
    .replace(/#/g, "%23")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/"/g, "'")}")`;
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

/* ────────────────────────────────────────────────────────────────────────
   3. ACCENTS PAR PAGE

   Le fond est le même partout. Seules changent la paire de teintes et la
   variante de motif, ce qui donne à chaque rubrique sa température sans
   jamais donner l'impression de changer de site.
   ──────────────────────────────────────────────────────────────────────── */

const DEFAULT_ACCENT = {
  accent: "cobalt",
  second: "fuchsia",
  motif: "rays",
  tone: "light",
};

const pageAccents = {
  "/": { accent: "cobalt", second: "fuchsia", motif: "rays" },
  "/a-propos": { accent: "cobalt", second: "fuchsia", motif: "rings" },
  "/experiences": { accent: "cobalt", second: "gold", motif: "chain" },
  "/projets": { accent: "fuchsia", second: "turquoise", motif: "bubbles" },
  "/formation": { accent: "violet", second: "turquoise", motif: "petals" },
  "/passions": { accent: "fuchsia", second: "gold", motif: "stars", tone: "dark" },
  "/cv": { accent: "cobalt", second: "violet", motif: "grid" },
  "/contact": { accent: "turquoise", second: "violet", motif: "rays", tone: "dark" },
};

/** Première partie du chemin, qui identifie la rubrique. */
const sectionOf = (pathname) =>
  pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;

/** Accent de la rubrique en cours, replis compris. */
export const accentFor = (pathname) => ({
  ...DEFAULT_ACCENT,
  ...(pageAccents[sectionOf(pathname)] ?? {}),
});

/**
 * Variables CSS d'une page : la teinte principale, la secondaire, celle du
 * texte, et le motif. Tout le reste du fond s'en déduit, ce qui évite d'avoir
 * à décliner une feuille de style par rubrique.
 */
export const chromaVars = (pathname, tone) => {
  const page = accentFor(pathname);
  const key = tone === "dark" ? "dark" : "light";
  const accent = hues[page.accent][key];
  const second = hues[page.second][key];
  /* Le texte prend la variante contrastée de la même teinte, jamais celle du
     décor : elle s'effondrerait sur le fond qu'elle a servi à teinter. */
  const label = hues[page.accent][tone === "dark" ? "pale" : "deep"];

  return {
    "--chroma-accent": accent,
    "--chroma-second": second,
    "--chroma-label": label,
    "--chroma-motif": motifUrl(page.motif, accent),
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

export default chromaVars;
