/**
 * Parcours de formation, affiché en timeline du plus récent au plus ancien.
 *
 * Les champs traduisibles prennent la forme { fr, en }. Les champs simples
 * (année, note) sont identiques dans les deux langues. Les descriptions sont
 * volontairement courtes, deux à trois lignes : cette page raconte un
 * parcours, elle ne double pas le CV.
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
      fr: "Formation spécialisée dans l'automatisation et l'exploitation d'infrastructures : Linux, conteneurisation, CI/CD, Infrastructure as Code, cloud, supervision et sécurité. Mise en pratique à travers plusieurs projets, dont la conception d'une chaîne de livraison complète sur AWS.",
      en: "A programme built around infrastructure automation and operations: Linux, containerisation, CI/CD, infrastructure as code, cloud, monitoring and security. Put into practice through several projects, including a complete delivery chain on AWS.",
    },
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      { fr: "AWS / Cloud", en: "AWS / Cloud" },
      "Linux",
      "Python",
      "Ansible",
      { fr: "Terraform / Infrastructure as Code", en: "Terraform / Infrastructure as code" },
      { fr: "Supervision", en: "Monitoring" },
      { fr: "Sécurité", en: "Security" },
      { fr: "Gestion de projet", en: "Project management" },
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
      fr: "Conception d'applications web full-stack : architectures front / back, API, bases de données relationnelles et développement d'interfaces modernes. Réalisation de projets individuels et collectifs avec plusieurs frameworks et environnements back-end.",
      en: "Designing full-stack web applications: front and back architectures, APIs, relational databases and modern interface development. Individual and team projects built on several frameworks and back-end environments.",
    },
    skills: [
      "Vue",
      "JavaScript / TypeScript",
      "PHP / Symfony",
      "Node.js",
      "SQL / MySQL",
      "Git",
    ],
  },
  {
    id: "bts-sio",
    degree: {
      fr: "BTS SIO, option SISR",
      en: "BTS SIO, SISR option",
    },
    school: {
      fr: "Lycée Charles Péguy, Marseille",
      en: "Lycée Charles Péguy, Marseille",
    },
    period: "2022",
    grade: "13,40/20",
    gradeLabel: null,
    description: {
      fr: "Acquisition des fondamentaux des systèmes d'information : systèmes et réseaux, développement, bases de données, support utilisateurs et gestion de projets IT.",
      en: "The fundamentals of information systems: systems and networks, development, databases, user support and IT project management.",
    },
    skills: [
      { fr: "Systèmes & réseaux", en: "Systems & networks" },
      "Linux",
      "Windows",
      "SQL",
      { fr: "Support utilisateurs", en: "User support" },
      { fr: "Développement", en: "Development" },
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
    /* Il s'agit bien de la moyenne générale du baccalauréat, et non d'une
       note d'épreuve : le libellé précédent était faux. */
    gradeLabel: {
      fr: "Moyenne générale",
      en: "Overall average",
    },
    description: {
      fr: "Filière orientée gestion, économie et systèmes d'information, à l'origine de mon passage vers l'informatique.",
      en: "A track built around management, economics and information systems, and the starting point of my move into IT.",
    },
    skills: [],
  },
];

export default education;
