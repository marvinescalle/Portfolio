/**
 * Expériences professionnelles.
 *
 * Deux niveaux volontairement distincts :
 *  - `mainExperiences` : les alternances structurantes, affichées en grandes
 *    cartes détaillées ;
 *  - `secondaryExperiences` : tout le reste, affiché en lignes condensées.
 *
 * Un point de `highlights` est un objet { label, text } : le libellé nomme le
 * domaine d'activité, la phrase le détaille. La carte reste ainsi dense et
 * survolable, sans devenir une suite de paragraphes indistincts. Une chaîne
 * simple reste acceptée et s'affiche comme une puce ordinaire.
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
      fr: "Deux années d'expérience en alternance dans un environnement industriel exigeant, avec des missions mêlant automatisation, systèmes, données, intégration, vérification et validation.",
      en: "Two years of apprenticeship in a demanding industrial environment, on assignments combining automation, systems, data, integration, verification and validation.",
    },
    highlights: {
      fr: [
        {
          label: "Recueil & analyse des besoins",
          text: "Échanges avec les clients et parties prenantes afin de clarifier et reformuler des besoins fonctionnels et techniques.",
        },
        {
          label: "Interface métier / technique",
          text: "Traduction des besoins en problématiques exploitables par les équipes techniques et accompagnement des solutions jusqu'à leur intégration.",
        },
        {
          label: "Automatisation & Data",
          text: "Développement et amélioration de scripts Python et Ansible pour automatiser la collecte, la structuration et le transfert de données techniques.",
        },
        {
          label: "IVVQ",
          text: "Participation aux activités d'intégration, vérification, validation, qualification, tests et suivi d'anomalies sur des systèmes complexes.",
        },
        {
          label: "Systèmes & réseaux",
          text: "Administration d'environnements Active Directory et participation à l'intégration d'équipements dans des environnements Cisco sécurisés.",
        },
        {
          label: "Industrialisation",
          text: "Automatisation de tâches techniques, amélioration de processus existants et contribution à la documentation technique.",
        },
      ],
      en: [
        {
          label: "Requirements gathering & analysis",
          text: "Working with clients and stakeholders to clarify and reformulate functional and technical requirements.",
        },
        {
          label: "Business / technical interface",
          text: "Turning those requirements into problems the technical teams can act on, and following the solutions through to integration.",
        },
        {
          label: "Automation & data",
          text: "Building and improving Python and Ansible scripts to automate the collection, structuring and transfer of technical data.",
        },
        {
          label: "IVVQ",
          text: "Taking part in integration, verification, validation and qualification activities, testing and defect tracking on complex systems.",
        },
        {
          label: "Systems & networks",
          text: "Administering Active Directory environments and helping integrate hardware into secured Cisco environments.",
        },
        {
          label: "Industrialisation",
          text: "Automating technical tasks, improving existing processes and contributing to the technical documentation.",
        },
      ],
    },
    stack: [
      "Python",
      "Ansible",
      "Power BI",
      "Active Directory",
      "Cisco",
      "IVVQ",
      "Tests",
    ],
  },
  {
    id: "fiscalyse-alternance",
    company: "Fiscalyse",
    role: {
      fr: "Développeur web & applications",
      en: "Web & Applications Developer",
    },
    contract: { fr: "Alternance", en: "Apprenticeship" },
    period: "2022 - 2023",
    location: "Marseille",
    website: "https://www.fiscalyse.fr",
    logo: "/images/logos/fiscalyse.png",
    summary: {
      fr: "Développement et évolution des applications internes d'une PME, au contact direct des utilisateurs : recueil des besoins, adaptation d'un CRM open source, données et automatisation.",
      en: "Building and evolving the internal applications of a small company, in direct contact with its users: gathering needs, adapting an open source CRM, data work and automation.",
    },
    highlights: {
      fr: [
        {
          label: "Outils internes & CRM",
          text: "Recueil des besoins utilisateurs, puis évolution des applications internes et adaptation d'un CRM open source aux processus de l'entreprise.",
        },
        {
          label: "Développement",
          text: "Développement de plateformes web en PHP, Symfony et JavaScript, avec intégration et maintenance des bases SQL / MySQL.",
        },
        {
          label: "Données & automatisation",
          text: "Extraction, contrôle, correction et mise à jour de données, scripts d'automatisation des tâches répétitives, suivi et reporting avec Excel et SQL.",
        },
        {
          label: "Qualité & encadrement",
          text: "Participation aux tests et à la qualité des développements, et accompagnement technique de stagiaires.",
        },
      ],
      en: [
        {
          label: "Internal tools & CRM",
          text: "Gathering user needs, then evolving the internal applications and adapting an open source CRM to the company's processes.",
        },
        {
          label: "Development",
          text: "Building web platforms in PHP, Symfony and JavaScript, with SQL / MySQL database integration and maintenance.",
        },
        {
          label: "Data & automation",
          text: "Extracting, checking, correcting and updating data, scripting away repetitive tasks, and handling tracking and reporting with Excel and SQL.",
        },
        {
          label: "Quality & mentoring",
          text: "Contributing to testing and development quality, and supporting interns technically.",
        },
      ],
    },
    stack: ["PHP", "Symfony", "JavaScript", "SQL", "MySQL", "Excel", "Git"],
  },
];

export const secondaryExperiences = [
  {
    id: "fiscalyse-stage-2022",
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
    /* Deux stages distincts chez Fiscalyse, à un an d'intervalle. Le détail
       des missions de 2021 n'est documenté nulle part : la ligne se limite
       donc à ce qui est certain, plutôt que d'inventer un contenu. */
    id: "fiscalyse-stage-2021",
    year: "2021",
    company: "Fiscalyse",
    role: { fr: "Stage développement web", en: "Web development internship" },
    website: "https://www.fiscalyse.fr",
    summary: {
      fr: "Premier stage en développement web au sein de l'entreprise, de mars à juin.",
      en: "A first web development internship with the company, from March to June.",
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
