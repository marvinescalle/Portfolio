/**
 * Compétences regroupées par domaine.
 *
 * Volontairement sans niveau ni pourcentage : une jauge « Python 90 % » ne
 * veut rien dire pour un recruteur. L'ordre des catégories est celui de
 * l'affichage, et il raconte le profil : ce qui vient en premier est ce sur
 * quoi je suis le plus sollicité.
 *
 * Un élément est soit une chaîne, identique dans les deux langues, soit un
 * objet { fr, en } lorsqu'il se traduit.
 */

export const skillGroups = [
  {
    id: "automation",
    label: { fr: "Automatisation", en: "Automation" },
    items: ["Python", "Ansible", { fr: "Bash / Scripting", en: "Bash / Scripting" }],
  },
  {
    id: "systems",
    label: { fr: "Systèmes & Cloud", en: "Systems & Cloud" },
    items: [
      "Linux",
      "Windows",
      "Active Directory",
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: "data",
    label: { fr: "Data", en: "Data" },
    items: [
      "SQL",
      "Power BI",
      "Excel",
      { fr: "Traitement de données", en: "Data processing" },
    ],
  },
  {
    id: "dev",
    label: { fr: "Développement", en: "Development" },
    items: [
      "JavaScript / TypeScript",
      "React / Vue",
      "Node.js",
      "PHP / Symfony",
    ],
  },
  {
    id: "methods",
    label: { fr: "Méthodes & Intégration", en: "Methods & Integration" },
    items: [
      "Git",
      "CI/CD",
      { fr: "IVVQ / Tests", en: "IVVQ / Testing" },
      { fr: "Documentation", en: "Documentation" },
      { fr: "Analyse fonctionnelle", en: "Functional analysis" },
    ],
  },
];

export default skillGroups;
