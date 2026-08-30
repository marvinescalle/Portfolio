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
    label: { fr: "Automatisation", en: "Automation" },
    items: ["Python", "Ansible", { fr: "Scripting", en: "Scripting" }],
  },
  {
    id: "systems",
    label: { fr: "Systèmes & Infrastructure", en: "Systems & Infrastructure" },
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
    label: { fr: "Data", en: "Data" },
    items: ["SQL", "Power BI", { fr: "Traitement de données", en: "Data processing" }],
  },
  {
    id: "dev",
    label: { fr: "Développement", en: "Development" },
    items: ["JavaScript", "React", "Node.js", "Web"],
  },
  {
    id: "tooling",
    label: { fr: "Outils & Méthodes", en: "Tools & Methods" },
    items: ["Git", "CI/CD", "Tests", { fr: "Documentation", en: "Documentation" }, { fr: "Gestion de projet", en: "Project management" }],
  },
];

export default skillGroups;
