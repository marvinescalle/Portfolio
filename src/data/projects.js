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
    id: "bloc4",
    title: "Chaîne de livraison sur AWS",
    year: "2025",
    type: {
      fr: "Infrastructure et chaîne de livraison",
      en: "Infrastructure and delivery pipeline",
    },
    description: {
      fr: "Chaîne complète du commit à la production sur AWS : infrastructure décrite en Terraform, image construite et analysée en intégration continue, déploiement derrière un répartiteur de charge, supervision et alertes.",
      en: "A complete chain from commit to production on AWS: infrastructure described in Terraform, image built and scanned in continuous integration, deployment behind a load balancer, monitoring and alerting.",
    },
    context: {
      fr: "Projet de fin de formation, Master 2 DevOps",
      en: "Final project, Master's Degree (M2) in DevOps",
    },
    objective: {
      fr: "Construire une chaîne de livraison de bout en bout, où un commit sur la branche principale mène à une application servie en ligne, sans aucune action manuelle sur l'infrastructure et sans jamais ouvrir d'accès SSH.",
      en: "Build an end-to-end delivery chain where a commit on the main branch leads to an application served online, with no manual action on the infrastructure and without ever opening SSH access.",
    },
    role: {
      fr: "Réalisation intégrale : architecture, écriture de l'infrastructure, conception du pipeline, choix des contrôles de sécurité, supervision et documentation d'exploitation.",
      en: "Built end to end: architecture, infrastructure code, pipeline design, choice of security gates, monitoring and operational documentation.",
    },
    longDescription: {
      fr: "L'application déployée est volontairement minimale, un service Flask exposant une page et une sonde de santé. Ce n'est pas elle le sujet : elle sert de charge utile à la chaîne construite autour, qui est l'objet du projet.\n\nToute l'infrastructure est décrite en Terraform, seize ressources AWS formant une architecture complète. Un registre ECR héberge les images, un groupe d'autoscaling adossé à un modèle de lancement porte les instances, et un répartiteur de charge applicatif les expose avec un groupe cible et sa sonde de santé. Deux groupes de sécurité distincts isolent le répartiteur des instances, seules joignables depuis lui. Un rôle IAM attaché aux instances leur donne la lecture du registre et l'accès à Session Manager, ce qui supprime le besoin d'une paire de clés SSH. La supervision repose sur un tableau de bord CloudWatch et une alarme sur les erreurs 5xx du répartiteur, reliée à un sujet SNS qui notifie par courriel.\n\nLe pipeline GitLab compte treize tâches réparties sur huit étapes. L'analyse de sécurité intervient à trois niveaux distincts : recherche de secrets dans le dépôt, contrôle des mauvaises configurations de l'infrastructure, et analyse de vulnérabilités de l'image construite. Suivent les tests unitaires, la validation puis le plan Terraform, la construction et la publication de l'image sur le registre, l'application du plan, un test de fumée contre le répartiteur, et une tâche de destruction pour rendre l'environnement.\n\nL'exploitation est documentée à part : un protocole décrivant les étapes et les critères de qualité, et un plan de réponse aux alertes précisant les rôles, la détection, le diagnostic et les actions immédiates.",
      en: "The deployed application is deliberately minimal, a Flask service exposing one page and a health probe. It is not the point: it acts as the payload for the chain built around it, which is what the project is about.\n\nThe whole infrastructure is described in Terraform, sixteen AWS resources forming a complete architecture. An ECR registry holds the images, an autoscaling group backed by a launch template carries the instances, and an application load balancer exposes them through a target group and its health probe. Two separate security groups isolate the balancer from the instances, which are reachable only from it. An IAM role attached to the instances grants them registry read access and Session Manager access, removing the need for an SSH key pair. Monitoring rests on a CloudWatch dashboard and an alarm on the balancer's 5xx errors, wired to an SNS topic that notifies by email.\n\nThe GitLab pipeline has thirteen jobs across eight stages. Security scanning happens at three distinct levels: secret detection in the repository, misconfiguration checks on the infrastructure, and vulnerability scanning of the built image. Then come unit tests, Terraform validation and plan, image build and publication to the registry, applying the plan, a smoke test against the balancer, and a teardown job to return the environment.\n\nOperations are documented separately: a protocol setting out the stages and quality criteria, and an alert response plan covering roles, detection, diagnosis and immediate actions.",
    },
    challenges: {
      fr: [
        "Déployer et intervenir sur des instances sans jamais ouvrir le port SSH ni distribuer de clé.",
        "Éviter qu'un simple push applique des changements d'infrastructure sans relecture.",
        "S'assurer que le déploiement fonctionne réellement, et pas seulement que Terraform s'est terminé sans erreur.",
        "Garder la facture d'un projet d'école proche de zéro entre deux sessions de travail.",
      ],
      en: [
        "Deploying to and operating instances without ever opening the SSH port or handing out a key.",
        "Preventing a plain push from applying infrastructure changes without review.",
        "Making sure the deployment actually works, not merely that Terraform finished without error.",
        "Keeping the bill of a school project close to zero between working sessions.",
      ],
    },
    solutions: {
      fr: [
        "Accès par Session Manager via le rôle IAM des instances : aucune paire de clés, aucun port d'administration ouvert, et le répartiteur reste la seule entrée publique.",
        "Application et destruction déclenchées manuellement, le plan étant transmis en artefact d'une étape à l'autre : ce qui est appliqué est exactement ce qui a été relu.",
        "Étape de test de fumée interrogeant le répartiteur après déploiement, qui échoue si le service ne répond pas.",
        "Tâche de destruction dédiée, qui rend l'ensemble de l'infrastructure en une action.",
      ],
      en: [
        "Access through Session Manager via the instances' IAM role: no key pair, no administration port open, and the balancer remains the only public entry point.",
        "Apply and teardown triggered manually, with the plan passed as an artefact between stages: what is applied is exactly what was reviewed.",
        "A smoke test stage querying the balancer after deployment, failing if the service does not answer.",
        "A dedicated teardown job returning the whole infrastructure in a single action.",
      ],
    },
    results: {
      fr: [
        "Chaîne complète du commit à une application servie derrière le répartiteur de charge.",
        "Alarme sur les erreurs 5xx vérifiée en conditions réelles, du passage en alerte jusqu'au retour à la normale notifié par courriel.",
        "Analyse de sécurité systématique à trois niveaux : secrets, configuration de l'infrastructure et image conteneur.",
        "127 commits sur six semaines de travail.",
      ],
      en: [
        "A complete chain from commit to an application served behind the load balancer.",
        "The 5xx alarm verified under real conditions, from raising the alert to the return to normal notified by email.",
        "Systematic security scanning at three levels: secrets, infrastructure configuration and container image.",
        "127 commits over six weeks of work.",
      ],
    },
    stack: [
      "Terraform",
      "AWS ECR",
      "AWS EC2 / Auto Scaling",
      "AWS ALB",
      "AWS IAM",
      "CloudWatch",
      "SNS",
      "Docker",
      "GitLab CI/CD",
      "Python / Flask",
      "pytest",
      "Trivy",
      "TFLint",
      "Gitleaks",
    ],
    image: "/images/projects/bloc4-architecture.svg",
    github: "https://gitlab.com/marvinescalle/bloc4",
    demo: null,
    category: "devops",
    featured: true,
    published: true,
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
    featured: false,
    published: true,
  },

  // ── Projets adossés à un dépôt public ────────────────────────────────
  {
    id: "audit-linux-apache",
    title: "Audit Linux & Apache",
    year: "2025",
    type: { fr: "Outil en ligne de commande", en: "Command line tool" },
    description: {
      fr: "Script Python auditant la configuration d'un système Linux et d'un serveur Apache, puis produisant un rapport horodaté des points de faiblesse relevés.",
      en: "A Python script auditing the configuration of a Linux system and an Apache server, then producing a timestamped report of the weaknesses found.",
    },
    context: { fr: "Projet personnel", en: "Personal project" },
    objective: {
      fr: "Rassembler dans un même passage les vérifications de configuration que l'on fait sinon à la main, commande après commande, et en garder une trace exploitable.",
      en: "Bring together in a single pass the configuration checks otherwise run by hand, command after command, and keep a usable record of them.",
    },
    role: {
      fr: "Conception et développement complets : découpage en modules, écriture des contrôles, format des rapports et environnement de test conteneurisé.",
      en: "Design and development throughout: module structure, the checks themselves, report format and containerised test environment.",
    },
    longDescription: {
      fr: "L'outil se lance depuis un menu et permet d'auditer le système, le serveur web, ou les deux. Le volet système relève la version du noyau et de la distribution, les comptes disposant d'un shell de connexion, les membres du groupe sudo, les comptes sans mot de passe dans /etc/shadow, l'autorisation de connexion SSH en root, les sockets en écoute, l'état du pare-feu UFW avec repli sur iptables, les permissions des fichiers sensibles et les mises à jour en attente.\n\nLe volet Apache relève la version et les chemins d'installation, la liste des modules chargés et analyse les fichiers de configuration.\n\nChaque exécution écrit un rapport JSON horodaté et journalise son déroulement à la fois dans la console et dans un fichier, ce qui permet de comparer deux audits successifs et de conserver une trace pour un suivi.",
      en: "The tool runs from a menu and can audit the system, the web server, or both. The system side reports the kernel and distribution versions, accounts with a login shell, members of the sudo group, passwordless accounts in /etc/shadow, whether root SSH login is permitted, listening sockets, the state of the UFW firewall with a fallback to iptables, the permissions of sensitive files and pending updates.\n\nThe Apache side reports the version and install paths, the list of loaded modules, and parses the configuration files.\n\nEach run writes a timestamped JSON report and logs its progress to both the console and a file, which makes it possible to compare two successive audits and keep a record for follow-up.",
    },
    challenges: {
      fr: [
        "Plusieurs contrôles portent sur des fichiers que seul root peut lire, comme /etc/shadow et /etc/sudoers.",
        "Le pare-feu n'est pas le même d'une machine à l'autre : UFW sur certaines distributions, iptables seul sur d'autres.",
        "Tester un audit de sécurité sans exposer sa propre machine.",
      ],
      en: [
        "Several checks target files only root can read, such as /etc/shadow and /etc/sudoers.",
        "The firewall differs from one machine to the next: UFW on some distributions, bare iptables on others.",
        "Testing a security audit without exposing your own machine.",
      ],
    },
    solutions: {
      fr: [
        "Élévation de privilèges limitée aux seules lectures qui l'exigent, le reste s'exécutant en utilisateur ordinaire.",
        "Détection en cascade : UFW d'abord, repli sur iptables si le premier est absent ou inactif.",
        "Environnement reproductible sous Docker, à partir d'Ubuntu 22.04 avec Apache et un compte de test membre du groupe sudo.",
      ],
      en: [
        "Privilege elevation limited to the reads that require it, everything else running as a normal user.",
        "Cascading detection: UFW first, falling back to iptables when it is absent or inactive.",
        "A reproducible environment under Docker, from Ubuntu 22.04 with Apache and a test account in the sudo group.",
      ],
    },
    results: {
      fr: [
        "Un audit complet en une commande, là où il fallait auparavant enchaîner une dizaine de vérifications manuelles.",
        "Des rapports JSON horodatés, comparables d'une exécution à l'autre.",
        "Un environnement de test que l'on reconstruit à l'identique en deux commandes.",
      ],
      en: [
        "A full audit in one command, where a dozen manual checks were previously needed.",
        "Timestamped JSON reports, comparable from one run to the next.",
        "A test environment rebuilt identically in two commands.",
      ],
    },
    stack: ["Python 3", "Docker", "Ubuntu", "Apache 2", "Bash", "JSON"],
    image: null, // capture à déposer dans public/images/projects/
    github: "https://github.com/marvinescalle/Audit_Config_Linux_Apache",
    demo: null,
    category: "devops",
    featured: false,
    published: true,
  },
  {
    id: "memoriz",
    title: "Memoriz",
    year: "2023",
    type: { fr: "Application web progressive", en: "Progressive web app" },
    description: {
      fr: "Application de révision par répétition espacée : l'utilisateur crée ses cartes, texte ou multimédia, et l'application planifie leur réapparition selon ce qu'il retient.",
      en: "A spaced repetition revision app: users create their own cards, text or multimedia, and the app schedules their reappearance according to what they remember.",
    },
    context: { fr: "Projet étudiant, en binôme", en: "Student project, in a pair" },
    objective: {
      fr: "Mettre en pratique la répétition espacée, qui consiste à revoir une notion juste avant de l'oublier plutôt qu'à intervalles fixes, dans une application utilisable hors connexion.",
      en: "Put spaced repetition into practice, reviewing a notion just before it is forgotten rather than at fixed intervals, in an app usable offline.",
    },
    role: {
      fr: "Développement en binôme avec Valentin Hernandez : modèle de données, écrans de création et de révision, stockage local et mise en place du fonctionnement hors connexion.",
      en: "Built in a pair with Valentin Hernandez: data model, creation and revision screens, local storage and offline support.",
    },
    longDescription: {
      fr: "Le contenu s'organise sur trois niveaux : des catégories, qui contiennent des thèmes, eux-mêmes composés de cartes. Une carte porte un recto et un verso, chacun pouvant mêler du texte et un élément multimédia, image, son ou vidéo. Au lancement d'une révision, l'utilisateur choisit les thèmes à réviser, le nombre de niveaux de mémorisation et le nombre de nouvelles cartes vues par jour.\n\nTout est stocké dans le navigateur, dans une base IndexedDB. L'application n'a donc besoin d'aucun serveur, et un service worker lui permet de fonctionner entièrement hors connexion une fois installée.\n\nLe traitement des médias se fait également côté navigateur, sans envoi de fichier : la conversion s'appuie sur une version WebAssembly de FFmpeg, et la lecture en flux sur hls.js.",
      en: "Content is organised on three levels: categories, which hold themes, themselves made of cards. A card has a front and a back, each able to combine text with a media element, image, sound or video. When starting a revision, the user picks the themes to review, the number of memorisation levels and how many new cards to see each day.\n\nEverything is stored in the browser, in an IndexedDB database. The app therefore needs no server, and a service worker lets it run entirely offline once installed.\n\nMedia handling also happens in the browser, with no file upload: conversion relies on a WebAssembly build of FFmpeg, and streamed playback on hls.js.",
    },
    challenges: {
      fr: [
        "Faire fonctionner l'application sans serveur, tout en gérant des cartes contenant des images, des sons et des vidéos.",
        "Traiter des fichiers multimédias dans le navigateur, où l'on ne dispose d'aucun outil de conversion.",
        "Rendre l'application utilisable hors connexion, y compris pour les médias déjà ajoutés.",
      ],
      en: [
        "Running the app without a server while handling cards containing images, sounds and videos.",
        "Processing media files in the browser, where no conversion tool is available.",
        "Making the app usable offline, including for media already added.",
      ],
    },
    solutions: {
      fr: [
        "Base IndexedDB côté navigateur, pilotée par Dexie, qui stocke aussi bien les cartes que les médias.",
        "Version WebAssembly de FFmpeg, qui apporte la conversion dans le navigateur sans rien envoyer sur un serveur.",
        "Service worker généré à la construction, mettant en cache l'application et ses ressources.",
      ],
      en: [
        "A browser-side IndexedDB database driven by Dexie, storing both cards and media.",
        "A WebAssembly build of FFmpeg, bringing conversion into the browser with nothing sent to a server.",
        "A service worker generated at build time, caching the app and its assets.",
      ],
    },
    results: {
      fr: [
        "Application installable et pleinement fonctionnelle sans connexion.",
        "Aucune donnée personnelle ne quitte le navigateur.",
        "Base de code typée de bout en bout, ce qui a limité les erreurs sur un modèle de données à trois niveaux.",
      ],
      en: [
        "An installable app, fully functional without a connection.",
        "No personal data leaves the browser.",
        "A codebase typed end to end, which limited mistakes on a three-level data model.",
      ],
    },
    stack: [
      "Vue 3",
      "TypeScript",
      "Vuetify",
      "Pinia",
      "Vite",
      "IndexedDB / Dexie",
      "PWA / Workbox",
      "FFmpeg WASM",
    ],
    image: null, // capture à déposer dans public/images/projects/
    github: "https://github.com/marvinescalle/Memoriz",
    demo: null,
    category: "web",
    featured: false,
    published: true,
  },
  {
    id: "weatherreport",
    title: "WeatherReport",
    year: "2022",
    type: { fr: "Application web", en: "Web application" },
    description: {
      fr: "Application météo permettant de suivre plusieurs villes, avec les conditions du moment, les prévisions par heure et par jour.",
      en: "A weather app for following several cities, with current conditions and hourly and daily forecasts.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    objective: {
      fr: "Construire une interface consommant une API météo externe, en découpant l'affichage en composants réutilisables plutôt qu'en une seule page.",
      en: "Build an interface consuming an external weather API, splitting the display into reusable components rather than a single page.",
    },
    role: {
      fr: "Développement de l'application : découpage en composants, routage, intégration de l'API et persistance des villes suivies.",
      en: "Built the application: component structure, routing, API integration and persistence of the followed cities.",
    },
    longDescription: {
      fr: "L'affichage est découpé en composants distincts, chacun responsable d'une lecture : conditions du moment, températures heure par heure, prévisions journalières, et une fiche par ville suivie. Une fenêtre modale sert à l'ajout d'une nouvelle ville.\n\nLa liste des villes suivies est conservée sur Firebase, ce qui permet de la retrouver d'une session à l'autre sans avoir à gérer soi-même un serveur ni une base de données.",
      en: "The display is split into distinct components, each responsible for one reading: current conditions, hour-by-hour temperatures, daily forecasts, and a card per followed city. A modal window handles adding a new city.\n\nThe list of followed cities is kept on Firebase, so it can be found again from one session to the next without running a server or database.",
    },
    challenges: {
      fr: [
        "Une seule réponse de l'API porte les conditions du moment, les températures horaires et les prévisions journalières : tout afficher dans une même vue la rendait illisible.",
        "Conserver la liste des villes suivies d'une visite à l'autre sans monter de serveur pour un projet de cette taille.",
      ],
      en: [
        "A single API response carries current conditions, hourly temperatures and daily forecasts: showing everything in one view made it unreadable.",
        "Keeping the list of followed cities between visits without standing up a server for a project this size.",
      ],
    },
    solutions: {
      fr: [
        "Un composant par lecture, chacun ne recevant que la portion de données qui le concerne.",
        "Persistance déléguée à Firebase, ce qui évite d'écrire et d'héberger une API pour un seul tableau de villes.",
      ],
      en: [
        "One component per reading, each receiving only the slice of data it needs.",
        "Persistence delegated to Firebase, avoiding writing and hosting an API for a single list of cities.",
      ],
    },
    results: {
      fr: [
        "Suivi de plusieurs villes en parallèle, avec ajout depuis une fenêtre dédiée.",
        "Premier contact avec la consommation d'une API tierce et le découpage d'une interface en composants.",
      ],
      en: [
        "Several cities followed in parallel, added from a dedicated window.",
        "A first encounter with consuming a third-party API and splitting an interface into components.",
      ],
    },
    stack: ["Vue.js", "Vue Router", "Firebase", "JavaScript", "API REST"],
    image: null, // capture à déposer dans public/images/projects/
    github: "https://github.com/marvinescalle/WeatherReport",
    demo: null,
    category: "school",
    featured: false,
    published: true,
  },
  {
    id: "issuesreport",
    title: "IssuesReport",
    year: "2022",
    type: { fr: "Application web", en: "Web application" },
    description: {
      fr: "Forum d'entraide en ligne : chacun crée un compte, publie une question, modifie ses propres publications et consulte celles des autres.",
      en: "An online help forum: users create an account, post a question, edit their own posts and read those of others.",
    },
    context: { fr: "Projet étudiant", en: "Student project" },
    objective: {
      fr: "Écrire une application complète en PHP sans framework, de l'inscription à la publication, afin d'en maîtriser chaque couche.",
      en: "Write a complete PHP application without a framework, from sign-up to publishing, in order to master every layer of it.",
    },
    role: {
      fr: "Développement complet : schéma de base de données, authentification, publication et édition des questions, et intégration de l'interface.",
      en: "Full development: database schema, authentication, question publishing and editing, and interface integration.",
    },
    longDescription: {
      fr: "L'application couvre l'inscription, la connexion, la publication d'une question, la modification de ses propres publications, la consultation d'une question et la page de profil.\n\nLe code sépare les gabarits d'affichage des traitements : les éléments communs à toutes les pages sont regroupés à part, et les opérations sur la base sont isolées par domaine, d'un côté les comptes, de l'autre les questions. Écrite sans framework, l'application rend visible ce qu'un framework masque habituellement, du routage jusqu'aux requêtes préparées.",
      en: "The application covers sign-up, login, posting a question, editing your own posts, reading a question and the profile page.\n\nThe code separates display templates from processing: elements common to every page are grouped apart, and database operations are isolated by domain, accounts on one side and questions on the other. Written without a framework, the application exposes what a framework usually hides, from routing down to prepared statements.",
    },
    challenges: {
      fr: [
        "Sans framework, tout est à écrire : le routage, la gestion de session, les requêtes et la protection des formulaires.",
        "N'autoriser la modification d'une question qu'à son auteur, et non à n'importe quel visiteur connecté.",
        "Éviter de répéter l'en-tête et la navigation dans chaque page.",
      ],
      en: [
        "Without a framework, everything has to be written: routing, session handling, queries and form protection.",
        "Restricting the editing of a question to its author, not to any logged-in visitor.",
        "Avoiding a repeat of the header and navigation in every page.",
      ],
    },
    solutions: {
      fr: [
        "Opérations de base de données isolées par domaine, les comptes d'un côté et les questions de l'autre, plutôt que dispersées dans les pages.",
        "Vérification de la propriété de la publication avant tout affichage du formulaire d'édition.",
        "Éléments communs regroupés dans des fichiers inclus, appelés par chaque page.",
      ],
      en: [
        "Database operations isolated by domain, accounts on one side and questions on the other, rather than scattered through the pages.",
        "Ownership of the post checked before the edit form is ever shown.",
        "Shared elements grouped into included files, called by every page.",
      ],
    },
    results: {
      fr: [
        "Cycle complet couvert, de la création de compte à la modification d'une publication.",
        "Compréhension directe de ce qu'un framework prend en charge, pour l'avoir écrit soi-même.",
      ],
      en: [
        "The full cycle covered, from account creation to editing a post.",
        "A direct understanding of what a framework handles, from having written it by hand.",
      ],
    },
    stack: ["PHP", "MySQL", "CSS", "HTML"],
    image: null, // capture à déposer dans public/images/projects/
    github: "https://github.com/marvinescalle/IssuesReport",
    demo: null,
    category: "school",
    featured: false,
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
