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
    description:
      "Le site sur lequel vous vous trouvez. Interface sur mesure en React, sans framework de composants ni template : composition typographique, contraste noir et blanc, animations discrètes et contenu entièrement piloté par des fichiers de données.",
    context: "Projet personnel",
    stack: ["React", "Vite", "styled-components", "Framer Motion"],
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
    description:
      "Application de mise en location et de réservation de places de parking et de garages en temps réel.",
    context: "Projet étudiant",
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
    description:
      "Application destinée à améliorer la vie étudiante en facilitant les rencontres au sein du campus.",
    context: "Projet étudiant",
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
    description:
      "Développement d'une API s'appuyant sur les ressources de Spotify.",
    context: "Projet étudiant",
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
    description:
      "Boutique en ligne fictive permettant de commander et de personnaliser des articles.",
    context: "Projet étudiant",
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
    description:
      "Site de jeu à monnaie fictive, accompagné d'une boutique personnalisée.",
    context: "Projet étudiant",
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
    description:
      "Site regroupant divers scans de mangas, réalisé dans le cadre d'un devoir.",
    context: "Projet étudiant",
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
    description:
      "Application reliée à une base de données permettant de répertorier les rendez-vous entre patients et médecins.",
    context: "Projet étudiant",
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
    description: "Outil de gestion de tickets développé en PHP et MySQL.",
    context: "Projet étudiant",
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
    description:
      "Interface de consultation regroupant les clients et le détail de leurs achats.",
    context: "Projet étudiant",
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
