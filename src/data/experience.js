/**
 * Expériences professionnelles.
 *
 * Deux niveaux volontairement distincts :
 *  - `mainExperiences` : les alternances structurantes, affichées en grandes
 *    cartes détaillées ;
 *  - `secondaryExperiences` : tout le reste, affiché en lignes condensées.
 *
 * POUR AJOUTER UNE EXPÉRIENCE : copier un objet du tableau concerné et le
 * placer en tête (l'ordre du tableau est l'ordre d'affichage, du plus récent
 * au plus ancien). Aucun autre fichier n'est à modifier.
 */

export const mainExperiences = [
  {
    id: "thales",
    company: "Thales",
    role: {
      fr: "Ingénieur IVVQ / Automatisation",
      en: "IVVQ / Automation Engineer",
    },
    contract: { fr: "Alternance", en: "Apprenticeship" },
    period: "2023 - 2025",
    location: "Gennevilliers",
    website: null,
    logo: "/images/logos/thales.webp",
    summary: {
      fr: "Plusieurs années d'expérience dans un environnement industriel exigeant, avec des missions mêlant automatisation, systèmes, données et activités d'intégration / vérification / validation.",
      en: "Several years in a demanding industrial environment, on assignments combining automation, systems, data and integration, verification and validation work.",
    },
    highlights: {
      fr: [
        "Développement et amélioration de scripts Python destinés à automatiser la collecte et le traitement de données techniques.",
        "Exploitation et visualisation de données afin de faciliter leur analyse.",
        "Participation aux activités d'intégration, vérification, validation et qualification de systèmes.",
        "Automatisation de tâches techniques et amélioration de processus existants.",
        "Travail dans un environnement informatique et industriel complexe nécessitant rigueur, documentation et fiabilité.",
      ],
      en: [
        "Built and improved Python scripts to automate the collection and processing of technical data.",
        "Prepared and visualised data to make it easier to analyse.",
        "Took part in system integration, verification, validation and qualification activities.",
        "Automated technical tasks and improved existing processes.",
        "Worked in a complex IT and industrial environment demanding rigour, documentation and reliability.",
      ],
    },
    stack: [
      "Python",
      "Ansible",
      "Power BI",
      "Active Directory",
      "Cisco",
      "Tests",
      "Automatisation",
    ],
  },
  {
    id: "fiscalyse-alternance",
    company: "Fiscalyse",
    role: { fr: "Développeur / IT", en: "Developer / IT" },
    contract: { fr: "Alternance", en: "Apprenticeship" },
    period: "2022 - 2023",
    location: null,
    website: "https://www.fiscalyse.fr",
    logo: "/images/logos/fiscalyse.png",
    summary: {
      fr: "Expérience orientée développement et amélioration d'outils internes dans une PME, au plus proche des besoins des utilisateurs et des problématiques métier.",
      en: "A role centred on building and improving internal tools in a small company, close to user needs and business realities.",
    },
    highlights: {
      fr: [
        "Développement et évolution d'outils internes.",
        "Travail sur des applications et données utilisées par l'entreprise.",
        "Manipulation de bases de données SQL.",
        "Développement web et automatisation de certaines tâches.",
        "Analyse des besoins des utilisateurs et adaptation des solutions existantes.",
      ],
      en: [
        "Built and evolved internal tools.",
        "Worked on the applications and data used across the company.",
        "Handled SQL databases.",
        "Web development and automation of recurring tasks.",
        "Gathered user needs and adapted existing solutions accordingly.",
      ],
    },
    stack: ["PHP", "Symfony", "JavaScript", "SQL", "MySQL", "WordPress"],
  },
];

export const secondaryExperiences = [
  {
    id: "fiscalyse-stage",
    year: "2022",
    company: "Fiscalyse",
    role: { fr: "Stage développement web", en: "Web development internship" },
    website: "https://www.fiscalyse.fr",
    summary: {
      fr: "Développement d'une API convertissant les données de la base de l'entreprise en fichiers Excel, puis restitution sous forme de diagrammes PDF.",
      en: "Built an API converting the company database into Excel files, then rendering the results as PDF charts.",
    },
  },
  {
    id: "aphm",
    year: "2022",
    company: { fr: "AP-HM, plateforme logistique", en: "AP-HM, logistics platform" },
    role: { fr: "Emploi saisonnier", en: "Seasonal role" },
    website: null,
    summary: {
      fr: "Préparation des plateaux repas destinés aux personnes hospitalisées dans les hôpitaux de Marseille.",
      en: "Prepared meal trays for patients across the Marseille hospitals.",
    },
  },
  {
    id: "cd13-2021",
    year: "2021",
    company: {
      fr: "Conseil départemental des Bouches-du-Rhône",
      en: "Bouches-du-Rhône departmental council",
    },
    role: { fr: "Emploi saisonnier, gestion", en: "Seasonal role, administration" },
    website: "https://www.departement13.fr",
    summary: {
      fr: "Missions de gestion au sein des équipes forestières du département.",
      en: "Administrative work within the department's forestry teams.",
    },
  },
  {
    id: "cd13-2020",
    year: "2020",
    company: {
      fr: "Conseil départemental des Bouches-du-Rhône",
      en: "Bouches-du-Rhône departmental council",
    },
    role: { fr: "Emploi saisonnier, comptabilité", en: "Seasonal role, accounting" },
    website: "https://www.departement13.fr",
    summary: {
      fr: "Missions de comptabilité au sein des services du département.",
      en: "Accounting work within the department's services.",
    },
  },
  {
    id: "size",
    year: "2019",
    company: "Size?",
    role: { fr: "Stage vente prêt-à-porter", en: "Retail internship" },
    website: "https://www.sizeofficial.fr",
    summary: {
      fr: "Accueil, conseil et encaissement en boutique.",
      en: "Welcoming customers, advising them and handling payments in store.",
    },
  },
];

export default { mainExperiences, secondaryExperiences };
