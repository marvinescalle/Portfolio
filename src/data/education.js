/**
 * Parcours de formation, affiché en timeline du plus récent au plus ancien.
 *
 * Les champs traduisibles prennent la forme { fr, en }. Les champs simples
 * (année, note) sont identiques dans les deux langues.
 *
 * POUR AJOUTER UNE FORMATION : copier un objet et le placer dans le tableau,
 * l'ordre du tableau étant l'ordre d'affichage. Un champ vide masque
 * simplement la ligne correspondante.
 */

export const education = [
  {
    id: "master-devops",
    degree: { fr: "Master 2 DevOps", en: "Master's Degree (M2) in DevOps" },
    school: { fr: "Paris Ynov Campus, Paris", en: "Paris Ynov Campus, Paris" },
    period: "2025",
    grade: "17,20/20",
    gradeLabel: null,
    description: {
      fr: "Formation spécialisée dans l'automatisation, le cloud, l'administration des systèmes, la conteneurisation, le CI/CD et le pilotage des infrastructures modernes. Elle s'est conclue par la réalisation d'un projet DevOps complet mobilisant plusieurs compétences techniques et organisationnelles.",
      en: "A programme focused on automation, cloud, systems administration, containerisation, CI/CD and the management of modern infrastructures. It concluded with a full DevOps project drawing on a broad set of technical and organisational skills.",
    },
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
    degree: {
      fr: "Bachelor 3 Développement Web",
      en: "Bachelor's Degree in Web Development",
    },
    school: {
      fr: "Ynov Campus, Aix-en-Provence",
      en: "Ynov Campus, Aix-en-Provence",
    },
    period: "2023",
    grade: "14,00/20",
    gradeLabel: null,
    description: {
      fr: "Approfondissement du développement web full-stack, des bases de données et de la conception d'applications, avec des projets techniques menés en équipe sur plusieurs frameworks.",
      en: "A deeper dive into full-stack web development, databases and application design, through team projects built on several web frameworks.",
    },
    skills: [],
  },
  {
    id: "bts-sio",
    degree: {
      fr: "BTS SIO",
      en: "BTS SIO",
    },
    school: {
      fr: "Lycée Charles Péguy, Marseille",
      en: "Lycée Charles Péguy, Marseille",
    },
    period: "2022",
    grade: "13,40/20",
    gradeLabel: null,
    description: {
      fr: "Services informatiques aux organisations. Formation apportant les fondamentaux du développement, des bases de données, des systèmes d'information et de la gestion de projet.",
      en: "IT services for organisations. A course covering the fundamentals of development, databases, information systems and project management.",
    },
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
    degree: {
      fr: "Baccalauréat STMG",
      en: "French Baccalauréat, STMG",
    },
    school: {
      fr: "Sciences et technologies du management et de la gestion",
      en: "Management and business sciences",
    },
    period: "2020",
    grade: "17,72/20",
    gradeLabel: {
      fr: "Épreuve anticipée de français",
      en: "French language exam",
    },
    description: {
      fr: "Filière orientée gestion, économie et systèmes d'information, à l'origine de mon passage vers l'informatique.",
      en: "A track built around management, economics and information systems, and the starting point of my move into IT.",
    },
    skills: [],
  },
];

export default education;
