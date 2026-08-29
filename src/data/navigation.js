/**
 * Sections du portfolio. L'ordre est celui de la navigation et des numéros
 * affichés en en-tête de page.
 *
 * Les anciennes URL du site (/Apropos, /Stages…) sont redirigées vers les
 * nouvelles dans App.jsx afin de ne pas casser les liens déjà partagés.
 */
export const navItems = [
  { path: "/a-propos", label: "À propos", index: "01" },
  { path: "/experiences", label: "Expériences", index: "02" },
  { path: "/projets", label: "Projets", index: "03" },
  { path: "/formation", label: "Formation", index: "04" },
  { path: "/passions", label: "Passions", index: "05" },
  { path: "/cv", label: "CV", index: "06" },
  { path: "/contact", label: "Contact", index: "07" },
];

export default navItems;
