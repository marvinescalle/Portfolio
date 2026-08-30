/**
 * Parcours de formation, affiché en timeline du plus récent au plus ancien.
 *
 * POUR AJOUTER UNE FORMATION : copier un objet et le placer dans le tableau,
 * l'ordre du tableau étant l'ordre d'affichage. Les champs `period`,
 * `grade`, `description` et `skills` peuvent rester vides : la ligne
 * correspondante est simplement masquée, plutôt que d'afficher une valeur
 * approximative.
 *
 * `gradeLabel` précise ce que recouvre la note quand il ne s'agit pas de la
 * moyenne du diplôme. Laissé vide, la mention « Note » est utilisée.
 */

export const education = [
  {
    id: "master-devops",
    degree: "Master 2 DevOps",
    school: "Paris Ynov Campus, Paris",
    period: "2025",
    grade: "17,20/20",
    gradeLabel: null,
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
  {
    id: "bachelor",
    degree: "Bachelor 3 Développement Web",
    school: "Ynov Campus, Aix-en-Provence",
    period: "2023",
    // TODO à compléter : note obtenue, si tu souhaites l'afficher.
    grade: null,
    gradeLabel: null,
    // TODO à compléter : deux ou trois phrases sur cette année, ainsi que
    // les technologies travaillées dans `skills`.
    description: null,
    skills: [],
  },
  {
    id: "bts-sio",
    degree: "BTS SIO",
    school: "Lycée Charles Péguy, Marseille",
    period: "2022",
    // TODO à compléter : note obtenue, si tu souhaites l'afficher.
    grade: null,
    gradeLabel: null,
    description:
      "Services informatiques aux organisations. Formation apportant les fondamentaux du développement, des bases de données, des systèmes d'information et de la gestion de projet.",
    skills: [
      "SQL",
      "JavaScript",
      "Web",
      "Bases de données",
      "Développement applicatif",
    ],
  },
  {
    id: "bac-stmg",
    degree: "Baccalauréat STMG",
    school: "Sciences et technologies du management et de la gestion",
    period: "2020",
    grade: "17,72/20",
    gradeLabel: "Épreuve anticipée de français",
    description: null,
    skills: [],
  },
];

export default education;
