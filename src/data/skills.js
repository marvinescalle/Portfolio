/**
 * Compétences regroupées par domaine.
 *
 * Volontairement sans niveau ni pourcentage : une jauge « Python 90 % » ne
 * veut rien dire pour un recruteur. L'ordre des catégories est celui de
 * l'affichage.
 */

export const skillGroups = [
  {
    id: "automation",
    label: "Automatisation",
    items: ["Python", "Ansible", "Scripting"],
  },
  {
    id: "systems",
    label: "Systèmes & Infrastructure",
    items: [
      "Linux",
      "Windows",
      "Active Directory",
      "Docker",
      "Kubernetes",
      "Cloud",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: ["SQL", "Power BI", "Traitement de données"],
  },
  {
    id: "dev",
    label: "Développement",
    items: ["JavaScript", "React", "Node.js", "Web"],
  },
  {
    id: "tooling",
    label: "Outils & Méthodes",
    items: ["Git", "CI/CD", "Tests", "Documentation", "Gestion de projet"],
  },
];

export default skillGroups;
