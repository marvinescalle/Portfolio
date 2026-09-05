/**
 * Fabrique src/data/worldMap.js à partir des données Natural Earth.
 *
 *   node scripts/build-world-map.mjs
 *
 * SOURCE
 * Natural Earth, jeu « Admin 0 - Countries » à l'échelle 1:110m, récupéré
 * depuis le dépôt natural-earth-vector de Nathaniel Vaughn Kelso.
 * https://github.com/nvkelso/natural-earth-vector
 *
 * LICENCE
 * Natural Earth est dans le domaine public. Aucune attribution n'est exigée,
 * elle est mentionnée ici par correction.
 * https://www.naturalearthdata.com/about/terms-of-use/
 *
 * POURQUOI UNE ÉTAPE HORS LIGNE
 * Le portfolio ne télécharge rien au chargement et n'embarque aucune
 * bibliothèque cartographique. Le fichier produit ne contient que des tracés
 * SVG déjà projetés, prêts à être peints. La conversion, la projection et la
 * simplification se font ici, une fois pour toutes.
 */

import { mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SOURCE =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

/* Projection équirectangulaire, la plus lisible pour une carte de repérage :
   chaque degré de longitude vaut partout la même largeur, et l'oeil retrouve
   les pays où il les attend. Les latitudes extrêmes sont coupées, comme sur
   toutes les cartes murales : au-delà, l'étirement devient absurde et
   l'Antarctique occuperait le quart de l'image. */
const WIDTH = 1000;
const LAT_MAX = 84;
const LAT_MIN = -56;
const SCALE = WIDTH / 360;
const HEIGHT = Math.round((LAT_MAX - LAT_MIN) * SCALE);

const project = ([lon, lat]) => [
  (lon + 180) * SCALE,
  (LAT_MAX - lat) * SCALE,
];

/** Distance d'un point au segment ab, au carré. */
const distanceCarree = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax;
  const dy = by - ay;
  const longueur = dx * dx + dy * dy;
  let t = longueur ? ((px - ax) * dx + (py - ay) * dy) / longueur : 0;
  t = Math.max(0, Math.min(1, t));
  const ex = ax + t * dx - px;
  const ey = ay + t * dy - py;
  return ex * ex + ey * ey;
};

/** Simplification de Douglas et Peucker, en pixels projetés. */
const simplifier = (points, tolerance) => {
  if (points.length < 3) return points;

  const garde = new Uint8Array(points.length);
  garde[0] = 1;
  garde[points.length - 1] = 1;
  const seuil = tolerance * tolerance;
  const pile = [[0, points.length - 1]];

  while (pile.length) {
    const [debut, fin] = pile.pop();
    let pire = 0;
    let index = -1;

    for (let i = debut + 1; i < fin; i += 1) {
      const d = distanceCarree(points[i], points[debut], points[fin]);
      if (d > pire) {
        pire = d;
        index = i;
      }
    }

    if (index !== -1 && pire > seuil) {
      garde[index] = 1;
      pile.push([debut, index], [index, fin]);
    }
  }

  return points.filter((_, i) => garde[i]);
};

/** Aire d'un anneau, en pixels carrés. Sert à écarter les îlots invisibles. */
const aire = (points) => {
  let somme = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    somme += points[j][0] * points[i][1] - points[i][0] * points[j][1];
  }
  return Math.abs(somme) / 2;
};

const TOLERANCE = 0.5;
const AIRE_MINIMALE = 0.6;

const traceDe = (geometry) => {
  const polygones =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

  const anneaux = [];
  for (const polygone of polygones) {
    /* Seul l'anneau extérieur est conservé. Les trous, comme le Lesotho dans
       l'Afrique du Sud, ne se voient pas à cette échelle et doubleraient le
       poids du fichier. */
    const projete = polygone[0].map(project);
    const reduit = simplifier(projete, TOLERANCE);
    if (reduit.length >= 4) anneaux.push(reduit);
  }

  if (!anneaux.length) return null;

  /* Le plus grand morceau est toujours gardé, même sous le seuil : un pays
     entièrement composé de petites îles doit rester visible. */
  anneaux.sort((a, b) => aire(b) - aire(a));
  const retenus = anneaux.filter((r, i) => i === 0 || aire(r) >= AIRE_MINIMALE);

  return retenus
    .map(
      (anneau) =>
        `M${anneau
          .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
          .join("L")}Z`
    )
    .join("");
};

const main = async () => {
  const dossier = mkdtempSync(join(tmpdir(), "worldmap-"));
  const brut = join(dossier, "ne110m.geojson");

  process.stdout.write(`Téléchargement depuis ${SOURCE}\n`);
  const reponse = await fetch(SOURCE);
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
  writeFileSync(brut, Buffer.from(await reponse.arrayBuffer()));

  const geo = JSON.parse(readFileSync(brut, "utf8"));
  const pays = [];

  for (const feature of geo.features) {
    const p = feature.properties;
    const code = p.ISO_A2_EH && p.ISO_A2_EH !== "-99" ? p.ISO_A2_EH : null;

    /* L'Antarctique est écarté : la projection l'étire sur toute la largeur
       et il n'apporte rien à une carte de pays visités. */
    if (code === "AQ") continue;

    const d = traceDe(feature.geometry);
    if (!d) continue;

    pays.push({ code, name: p.NAME, d });
  }

  pays.sort((a, b) => (a.code ?? "ZZ").localeCompare(b.code ?? "ZZ"));

  const contenu = `/**
 * Tracés du planisphère, un par pays, déjà projetés.
 *
 * FICHIER GÉNÉRÉ. Ne pas modifier à la main :
 *   node scripts/build-world-map.mjs
 *
 * Source : Natural Earth, « Admin 0 - Countries » au 1:110m, domaine public.
 * https://www.naturalearthdata.com/about/terms-of-use/
 *
 * Projection équirectangulaire, latitudes coupées à ${LAT_MAX} et ${LAT_MIN} degrés,
 * Antarctique écarté. Le repère de dessin est donc ${WIDTH} sur ${HEIGHT}.
 *
 * \`code\` est le code ISO 3166-1 alpha-2, ou \`null\` pour les quelques
 * territoires que Natural Earth ne code pas. Ceux-là ne sont jamais que du
 * décor : rien ne peut les désigner comme visités.
 */

export const MAP_VIEWBOX = "0 0 ${WIDTH} ${HEIGHT}";

export const countryPaths = ${JSON.stringify(pays, null, 0)
    .replace(/\},\{/g, "},\n  {")
    .replace(/^\[/, "[\n  ")
    .replace(/\]$/, ",\n]")};

export default countryPaths;
`;

  const sortie = new URL("../src/data/worldMap.js", import.meta.url);
  writeFileSync(sortie, contenu);

  const poids = Buffer.byteLength(contenu) / 1024;
  process.stdout.write(
    `${pays.length} pays écrits dans src/data/worldMap.js (${poids.toFixed(1)} Ko)\n`
  );
};

main().catch((erreur) => {
  process.stderr.write(`${erreur.message}\n`);
  process.exit(1);
});
