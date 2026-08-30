/**
 * Sections du portfolio. L'ordre est celui de la navigation et des numéros
 * affichés en en-tête de page. Les libellés sont dans src/i18n/ui.js, sous
 * nav.items, indexés par ce même chemin.
 *
 * Les anciennes URL du site (/Apropos, /Stages…) sont redirigées vers les
 * nouvelles dans App.jsx afin de ne pas casser les liens déjà partagés.
 */
export const navItems = [
  { path: "/a-propos", index: "01" },
  { path: "/experiences", index: "02" },
  { path: "/projets", index: "03" },
  { path: "/formation", index: "04" },
  { path: "/passions", index: "05" },
  { path: "/cv", index: "06" },
  { path: "/contact", index: "07" },
];

export default navItems;
