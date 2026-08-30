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
    role: "Ingénieur IVVQ / Automatisation",
    contract: "Alternance",
    // TODO à compléter : période exacte, ex. "2023-2025".
    // Les anciennes données du site indiquaient « 2022-2023 » tout en
    // décrivant le poste comme en cours en 2024 : l'information est
    // contradictoire, elle n'a donc pas été reprise. La ligne reste masquée
    // tant que cette valeur est `null`.
    period: null,
    location: "Gennevilliers",
    website: null,
    // Déposer le fichier dans public/images/logos/ puis indiquer son chemin,
    // par exemple "/images/logos/thales.png". Sans logo, l'initiale de
    // l'entreprise s'affiche dans le cadre.
    logo: null,
    summary:
      "Plusieurs années d'expérience dans un environnement industriel exigeant, avec des missions mêlant automatisation, systèmes, données et activités d'intégration / vérification / validation.",
    highlights: [
      "Développement et amélioration de scripts Python destinés à automatiser la collecte et le traitement de données techniques.",
      "Exploitation et visualisation de données afin de faciliter leur analyse.",
      "Participation aux activités d'intégration, vérification, validation et qualification de systèmes.",
      "Automatisation de tâches techniques et amélioration de processus existants.",
      "Travail dans un environnement informatique et industriel complexe nécessitant rigueur, documentation et fiabilité.",
    ],
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
    role: "Développeur / IT",
    contract: "Alternance",
    // TODO à compléter : période exacte, ex. "2022-2023".
    // Les anciennes données mentionnaient « 12 mois » sans année de début
    // fiable.
    period: null,
    location: null,
    website: "https://www.fiscalyse.fr",
    logo: null, // voir public/images/logos/README.md
    summary:
      "Expérience orientée développement et amélioration d'outils internes dans une PME, au plus proche des besoins des utilisateurs et des problématiques métier.",
    highlights: [
      "Développement et évolution d'outils internes.",
      "Travail sur des applications et données utilisées par l'entreprise.",
      "Manipulation de bases de données SQL.",
      "Développement web et automatisation de certaines tâches.",
      "Analyse des besoins des utilisateurs et adaptation des solutions existantes.",
    ],
    stack: ["PHP", "Symfony", "JavaScript", "SQL", "MySQL", "WordPress"],
  },
];

export const secondaryExperiences = [
  {
    id: "fiscalyse-stage",
    year: "2022",
    company: "Fiscalyse",
    role: "Stage développement web",
    website: "https://www.fiscalyse.fr",
    summary:
      "Développement d'une API convertissant les données de la base de l'entreprise en fichiers Excel, puis restitution sous forme de diagrammes PDF.",
  },
  {
    id: "aphm",
    year: "2022",
    company: "AP-HM, plateforme logistique",
    role: "Emploi saisonnier",
    website: null,
    summary:
      "Préparation des plateaux repas destinés aux personnes hospitalisées dans les hôpitaux de Marseille.",
  },
  {
    id: "cd13-2021",
    year: "2021",
    company: "Conseil départemental des Bouches-du-Rhône",
    role: "Emploi saisonnier, gestion",
    website: "https://www.departement13.fr",
    summary:
      "Missions de gestion au sein des équipes forestières du département.",
  },
  {
    id: "cd13-2020",
    year: "2020",
    company: "Conseil départemental des Bouches-du-Rhône",
    role: "Emploi saisonnier, comptabilité",
    website: "https://www.departement13.fr",
    summary: "Missions de comptabilité au sein des services du département.",
  },
  {
    id: "size",
    year: "2019",
    company: "Size?",
    role: "Stage vente prêt-à-porter",
    website: "https://www.sizeofficial.fr",
    summary: "Accueil, conseil et encaissement en boutique.",
  },
];

export default { mainExperiences, secondaryExperiences };
