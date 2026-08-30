/**
 * Parcours de formation, affiché en timeline dans l'ordre chronologique :
 * la plus ancienne en haut, la plus récente en bas.
 *
 * POUR AJOUTER UNE FORMATION : copier un objet et le placer dans le tableau.
 * Les champs `period`, `description` et `skills` peuvent rester vides :
 * la ligne correspondante est simplement masquée, plutôt que d'afficher une
 * valeur approximative.
 */

export const education = [
  {
    id: "bac-stmg",
    degree: "Baccalauréat STMG",
    school: "Sciences et technologies du management et de la gestion",
    // TODO à compléter : année d'obtention.
    period: null,
    description: null,
    skills: [],
  },
  {
    id: "bts-sio",
    degree: "BTS SIO",
    school: "Services informatiques aux organisations",
    // TODO à compléter : période exacte, ex. "2020-2022".
    period: null,
    description:
      "Formation informatique apportant les fondamentaux du développement, des bases de données, des systèmes d'information et de la gestion de projet.",
    skills: [
      "SQL",
      "JavaScript",
      "Web",
      "Bases de données",
      "Développement applicatif",
    ],
  },
  {
    id: "bachelor",
    degree: "Bachelor Informatique",
    school: "Ynov Aix-en-Provence",
    // TODO à compléter : période exacte, ex. "2022-2023".
    period: null,
    // TODO à compléter : deux ou trois phrases sur ce qu'apportait cette
    // année, ainsi que les technologies travaillées dans `skills`.
    description: null,
    skills: [],
  },
  {
    id: "master-devops",
    degree: "Master DevOps",
    school: "Ynov Paris",
    // TODO à compléter : période exacte, ex. "2023-2025".
    period: null,
    description:
      "Formation spécialisée dans l'automatisation, le cloud, l'administration des systèmes, la conteneurisation, le CI/CD et le pilotage des infrastructures modernes. Elle s'est conclue par la réalisation d'un projet DevOps complet mobilisant plusieurs compétences techniques et organisationnelles.",
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Cloud",
      "Linux",
      "Python",
      "Ansible",
      "Infrastructure as Code",
      "Supervision",
      "Sécurité",
      "Gestion de projet",
    ],
  },
];

export default education;
