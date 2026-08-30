/**
 * Parcours de formation, affiché en timeline du plus récent au plus ancien.
 *
 * POUR AJOUTER UNE FORMATION : copier un objet et le placer dans le tableau.
 * `period: null` masque simplement la date au lieu d'afficher une valeur
 * approximative.
 */

export const education = [
  {
    id: "mastere-devops",
    degree: "Mastère DevOps",
    school: "Ynov",
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
    primary: true,
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
    primary: true,
  },
  {
    id: "bac-stmg",
    degree: "Baccalauréat STMG",
    school: null,
    period: null,
    description: null,
    skills: [],
    // Affiché en une seule ligne discrète en bas de la timeline.
    primary: false,
  },
];

export default education;
