/**
 * Projets du portfolio.
 *
 * POUR AJOUTER UN PROJET : copier un objet ci-dessous, le placer n'importe
 * où dans le tableau `projects` et renseigner les champs. L'affichage trie
 * automatiquement du plus récent au plus ancien d'après le champ `year`.
 * Rien d'autre à modifier : la page /projets se construit entièrement à
 * partir de ce fichier.
 *
 * L'identifiant `id` sert aussi d'adresse : le projet « monscan » s'ouvre
 * sur /projets/monscan. Le garder court, en minuscules, sans accent.
 *
 * Champs disponibles
 * ------------------
 * title        Titre court. Sert aussi de texte du lien.
 * year         Année ou période, affichée en petit.
 * description  Deux ou trois phrases maximum.
 * context      Optionnel. Cadre du projet (diplôme, entreprise, perso).
 * stack        Tableau de technologies.
 * image        URL ou import d'image. `null` affiche un aplat typographique.
 * github       URL du dépôt. `null` si le projet n'a pas de dépôt public.
 * demo         URL de démonstration en ligne. `null` sinon.
 * category     "devops" | "web" | "school" : sert au regroupement.
 * featured     `true` place le projet en grande carte, en haut de page.
 * published    `false` masque le projet du site sans supprimer ses données.
 *
 * Champs de la fiche détaillée, tous facultatifs
 * ---------------------------------------------
 * Ils n'apparaissent que s'ils sont renseignés : une rubrique vide n'est
 * jamais affichée avec un titre orphelin.
 *
 * type             Nature du projet, par exemple "Application web".
 * longDescription  Présentation développée, en un ou plusieurs paragraphes.
 * context          Cadre du projet, déjà utilisé sur la carte.
 * objective        Ce que le projet devait résoudre.
 * role             Ce que vous avez personnellement réalisé.
 * challenges       Tableau de difficultés rencontrées.
 * solutions        Tableau de réponses apportées.
 * results          Tableau de résultats ou d'enseignements.
 * gallery          Tableau de { src, alt } pour les captures.
 *
 * Exemple d'un projet complet :
 *
 *   {
 *     id: "supervision",
 *     title: "Plateforme de supervision",
 *     year: "2025",
 *     type: "Infrastructure",
 *     context: "Projet de fin de formation",
 *     objective: "Centraliser la surveillance de plusieurs services.",
 *     role: "Conception de l'architecture, mise en place du CI/CD.",
 *     longDescription: "Deux ou trois paragraphes.",
 *     challenges: ["Première difficulté.", "Deuxième difficulté."],
 *     solutions: ["Première réponse.", "Deuxième réponse."],
 *     results: ["Ce que le projet a permis."],
 *     gallery: [{ src: "/images/projects/supervision-1.png", alt: "Tableau de bord" }],
 *     stack: ["Docker", "Kubernetes"],
 *     github: "https://github.com/...",
 *     demo: null,
 *     category: "devops",
 *     featured: true,
 *     published: true,
 *   }
 */

export const projects = [
  {
    id: "devops-diplome",
    title: "Projet DevOps de fin de formation",
    year: null,
    description: null,
    context: null,
    stack: [],
    image: null,
    github: null,
    demo: null,
    category: "devops",
    featured: true,
    // ────────────────────────────────────────────────────────────────
    // EMPLACEMENT RÉSERVÉ au gros projet DevOps de fin de diplôme.
    // Renseigner title / year / description / stack / github / image,
    // puis passer `published` à true : la grande carte apparaîtra en tête
    // de la page Projets, avant le portfolio.
    // Déposer la capture d'écran dans public/images/projects/ et indiquer
    // image: "/images/projects/nom-du-fichier.png".
    // ────────────────────────────────────────────────────────────────
    published: false,
  },
  {
    id: "portfolio",
    title: "Ce portfolio",
    year: "2026",
    description: {
      fr: "Le site sur lequel vous vous trouvez. Interface sur mesure en React, sans framework de composants ni template : composition typographique, contraste noir et blanc, animations discrètes et contenu entièrement piloté par des fichiers de données.",
      en: "The site you are looking at. A bespoke React interface, with no component framework or template: typographic composition, black and white contrast, restrained motion and content driven entirely by data files.",
    },
    context: { fr: "Projet personnel", en: "Personal project" },
    type: { fr: "Application web", en: "Web application" },
    objective: {
      fr: "Remplacer un portfolio devenu inutilisable, dont la chaîne de build ne démarrait plus, par un site que je puisse faire évoluer seul et dont le contenu se modifie sans toucher au code.",
      en: "Replace a portfolio that had become unusable, its build chain no longer starting, with a site I can maintain alone and whose content changes without touching the code.",
    },
    role: {
      fr: "Conception et développement intégral : migration de la chaîne de build, architecture des données, interface, animations et accessibilité.",
      en: "Design and development throughout: build chain migration, data architecture, interface, motion and accessibility.",
    },
    longDescription: {
      fr: "Le site est entièrement piloté par des fichiers de données. Chaque expérience, projet, diplôme ou passion est un objet dans src/data/, avec ses champs en français et en anglais. Ajouter une entrée ne demande aucune modification de composant, ce qui rend le site maintenable dans le temps sans replonger dans le code.\n\nL'interface est écrite à la main, sans bibliothèque de composants ni thème acheté : composition typographique, contraste noir et blanc, et une page d'accueil traitée comme une couverture plutôt que comme un sommaire. L'animation d'introduction est un shader WebGL écrit en GLSL, qui applique une rotation dont l'intensité dépend de la distance au centre. Un masque CSS ou SVG n'aurait pas permis cette torsion, tous deux appliquant la même transformation à l'ensemble de la forme.\n\nLe reste du mouvement passe volontairement par des transitions CSS plutôt que par des boucles JavaScript : rien ne reste bloqué si le navigateur suspend le rendu, et il n'y a aucun état à remettre en place quand une animation est interrompue.",
      en: "The site is driven entirely by data files. Every role, project, qualification and interest is an object in src/data/, carrying its French and English fields. Adding an entry requires no component change, which keeps the site maintainable over time without diving back into the code.\n\nThe interface is written by hand, with no component library or purchased theme: typographic composition, black and white contrast, and a home page treated as a cover rather than a table of contents. The intro animation is a WebGL shader written in GLSL, applying a rotation whose strength depends on the distance from the centre. A CSS or SVG mask could not produce that torsion, since both apply the same transformation to the whole shape.\n\nThe remaining motion deliberately runs on CSS transitions rather than JavaScript loops: nothing stays stuck if the browser suspends rendering, and there is no state to restore when an animation is interrupted.",
    },
    challenges: {
      fr: [
        "La version précédente reposait sur Create React App, dont la chaîne de build ne fonctionnait plus sur une version récente de Node.",
        "Obtenir une vraie torsion à l'écran, et non une forme qui pivote d'un bloc.",
        "Tenir un site bilingue sans dupliquer les pages ni les composants.",
        "Garder le contenu modifiable par une personne qui ne veut pas relire le code à chaque ajout.",
      ],
      en: [
        "The previous version relied on Create React App, whose build chain no longer worked on a recent Node release.",
        "Producing a genuine torsion on screen rather than a shape rotating as one block.",
        "Running a bilingual site without duplicating pages or components.",
        "Keeping the content editable by someone who does not want to re-read the code for every addition.",
      ],
    },
    solutions: {
      fr: [
        "Migration vers Vite, qui a ramené le démarrage à moins d'une seconde et supprimé la dette de configuration.",
        "Rendu par pixel dans un shader WebGL, seule approche permettant une rotation dont l'intensité varie avec le rayon.",
        "Traductions portées par les données elles-mêmes, chaque champ existant en deux langues, et choix mémorisé d'une visite à l'autre.",
        "Documentation en tête de chaque fichier de données, indiquant quoi renseigner et où déposer les images.",
      ],
      en: [
        "Migration to Vite, which brought start-up under a second and removed the configuration debt.",
        "Per-pixel rendering in a WebGL shader, the only approach allowing a rotation whose strength varies with the radius.",
        "Translations carried by the data itself, every field existing in both languages, with the choice remembered between visits.",
        "Documentation at the top of each data file, stating what to fill in and where to put the images.",
      ],
    },
    results: {
      fr: [
        "Site entièrement bilingue, du contenu éditorial aux libellés d'interface.",
        "Mouvement respectant le réglage système de réduction des animations, sur l'ensemble des pages.",
        "Ajout d'une expérience, d'un projet ou d'une passion sans écrire une ligne de composant.",
      ],
      en: [
        "A fully bilingual site, from editorial content down to interface labels.",
        "Motion that honours the system setting for reduced animation, across every page.",
        "Adding a role, project or interest without writing a line of component code.",
      ],
    },
    stack: [
      "React 19",
      "Vite",
      "React Router",
      "styled-components",
      "Framer Motion",
      "WebGL / GLSL",
      "Netlify",
    ],
    image: null,
    github: "https://github.com/marvinescalle/Portfolio",
    demo: null,
    category: "web",
    featured: true,
    published: true,
  },

  // ── Archives : travaux réalisés pendant les études ───────────────────
  {
    id: "parkacar",
    title: "ParkaCar",
    year: "2020",
    description: {
      fr: "Application de mise en location et de réservation de places de parking et de garages en temps réel.",
      en: "An application for listing and booking parking spaces and garages in real time.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["Vue.js", "JavaScript", "MySQL", "HTML", "CSS"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_316/428928168441237.643a7fac2489c.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "yndr",
    title: "YNDR",
    year: "2020",
    description: {
      fr: "Application destinée à améliorer la vie étudiante en facilitant les rencontres au sein du campus.",
      en: "An application designed to improve student life by making it easier to meet people on campus.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["Vue.js", "NestJS", "JavaScript", "MySQL"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_158/bb642d168441237.643a7fac2353e.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "yspotify",
    title: "Yspotify",
    year: "2020",
    description: {
      fr: "Développement d'une API s'appuyant sur les ressources de Spotify.",
      en: "An API built on top of the Spotify resources.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["PHP", "JavaScript", "Node", "Ruby"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_316/16ab79168441237.643a7fac2402b.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "ypizza",
    title: "Ypizza",
    year: "2020",
    description: {
      fr: "Boutique en ligne fictive permettant de commander et de personnaliser des articles.",
      en: "A fictional online shop for ordering and customising items.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["AngularJS", "JavaScript", "SCSS"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/3211ea168441237.643a7fac25123.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "tbgw",
    title: "TBGW",
    year: "2020",
    description: {
      fr: "Site de jeu à monnaie fictive, accompagné d'une boutique personnalisée.",
      en: "A gaming site using a fictional currency, with its own shop.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["PHP", "JavaScript", "MySQL"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/d8b320168441237.643a7bc41eed4.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "monscan",
    title: "MonScan",
    year: "2021",
    description: {
      fr: "Site regroupant divers scans de mangas, réalisé dans le cadre d'un devoir.",
      en: "A site gathering manga scans, built as a class assignment.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["PHP", "JavaScript", "MySQL"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/e11136168441237.643a7bc41fd08.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "egosoin",
    title: "EgoSoin",
    year: "2021",
    description: {
      fr: "Application reliée à une base de données permettant de répertorier les rendez-vous entre patients et médecins.",
      en: "A database-backed application for recording appointments between patients and doctors.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["PHP", "MySQL"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/bfd8c8168441237.643a7bc41e2d4.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "ticketok",
    title: "TicketOk",
    year: "2021",
    description: {
      fr: "Outil de gestion de tickets développé en PHP et MySQL.",
      en: "A ticket management tool built with PHP and MySQL.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["PHP", "MySQL"],
    // L'ancienne illustration était servie en http:// : elle aurait été
    // bloquée par le navigateur sur un site en https.
    image: null,
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "tableau-clients",
    title: "Tableau clients",
    year: "2022",
    description: {
      fr: "Interface de consultation regroupant les clients et le détail de leurs achats.",
      en: "A dashboard listing clients along with the detail of their purchases.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    stack: ["PHP", "JavaScript", "MySQL"],
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/1532db168441237.643a7bc41cb3b.png",
    github: null,
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
];

/**
 * Tri du plus récent au plus ancien : les projets les plus récents doivent
 * apparaître en premier. À année égale, l'ordre du fichier est conservé, et
 * un projet sans année est renvoyé en fin de liste.
 */
const byYearDesc = (a, b) => {
  const yearA = Number.parseInt(a.year, 10);
  const yearB = Number.parseInt(b.year, 10);

  if (Number.isNaN(yearA) && Number.isNaN(yearB)) return 0;
  if (Number.isNaN(yearA)) return 1;
  if (Number.isNaN(yearB)) return -1;

  return yearB - yearA;
};

/** Projets réellement affichés, du plus récent au plus ancien. */
export const publishedProjects = projects
  .filter((p) => p.published)
  .sort(byYearDesc);

/** Grandes cartes, en tête de page. */
export const featuredProjects = publishedProjects.filter((p) => p.featured);

/** Archives : tout ce qui n'est pas mis en avant. */
export const archivedProjects = publishedProjects.filter((p) => !p.featured);

/** Retrouve un projet depuis son adresse, pour la fiche détaillée. */
export const findProject = (slug) =>
  publishedProjects.find((project) => project.id === slug) ?? null;

export default projects;
