/**
 * Tous les textes d'interface du portfolio, en français et en anglais.
 *
 * POUR MODIFIER UN TEXTE : le changer ici, dans les deux langues. Aucun
 * composant ne contient de texte en dur.
 *
 * Les contenus éditoriaux (projets, expériences, formations, passions) ne
 * sont pas ici : ils vivent dans src/data/, où chaque champ traduisible
 * prend la forme { fr, en }.
 */

export const ui = {
  fr: {
    nav: {
      main: "Navigation principale",
      home: "Accueil",
      backHome: "Marvin Escalle, retour à l'accueil",
      menu: "Menu",
      close: "Fermer",
      language: "Choisir la langue",
      items: {
        "/a-propos": "À propos",
        "/experiences": "Expériences",
        "/projets": "Projets",
        "/formation": "Formation",
        "/passions": "Passions",
        "/cv": "CV",
        "/contact": "Contact",
      },
    },

    common: {
      skipToContent: "Aller au contenu",
      loading: "Chargement",
      backHome: "Retour à l'accueil",
      newTab: "nouvel onglet",
      email: "M'écrire un e-mail",
      linkedin: "Profil LinkedIn",
      github: "Profil GitHub",
      close: "Fermer",
    },

    home: {
      hello: "Bonjour,",
      iam: "Je suis",
      hint: "Cliquez pour découvrir",
      open: "Afficher la présentation",
      hide: "Masquer la présentation",
      discover: "Découvrir mon parcours",
      seeCv: "Voir mon CV",
      sections: "Sections du portfolio",
      skipIntro: "Passer",
    },

    about: {
      index: "01",
      title: "À propos",
      seo: "Ingénieur IT au profil polyvalent : automatisation, systèmes, données et problématiques métier. Parcours, approche et compétences techniques.",
      paragraphs: [
        "Diplômé d'un Master 2 DevOps et fort de trois années d'alternance, dont deux chez {thales}, j'ai développé un profil hybride entre technique et fonctionnel.",
        "Mes expériences m'ont amené à automatiser la collecte et le traitement de données, participer à l'intégration et à la validation de systèmes complexes, administrer des environnements IT et traduire des besoins utilisateurs en solutions techniques exploitables.",
        "Ce qui m'intéresse particulièrement est de comprendre un problème de bout en bout : besoin, contraintes, solution, intégration et validation, plutôt que de me limiter à une technologie particulière.",
        "En parallèle, je développe régulièrement des projets autour du cloud, du développement, de l'intelligence artificielle, de la 3D et des nouvelles technologies.",
      ],
      skills: "Compétences",
      portrait: "Portrait de",
    },

    experience: {
      index: "02",
      title: "Expériences",
      lead: "Deux alternances structurantes, et les expériences qui les ont précédées.",
      seo: "Alternances chez Thales et Fiscalyse, stages et premières expériences : automatisation, développement d'outils, données et intégration de systèmes.",
      others: "Autres expériences",
      website: "Site de l'entreprise",
      stackOf: "Technologies et environnement chez",
      logoOf: "Logo",
    },

    projects: {
      index: "03",
      title: "Projets",
      lead: "Une sélection de réalisations, mes projets personnels, puis les travaux menés pendant mes études.",
      seo: "Projets réalisés par Marvin Escalle : chaîne de livraison sur AWS, projets personnels autour du développement et de l'automatisation, et travaux d'études.",
      selection: "Sélection",
      personal: "Projets personnels",
      student: "Projets d'études",
      studentNote:
        "Travaux réalisés pendant mes études, conservés à titre de parcours. Ils ne reflètent pas mon niveau actuel.",
      seeAllStudent: "Voir tous les projets d'études",
      seeFewerStudent: "Réduire la liste",
      see: "Voir le projet",
      openSheet: "ouvrir la fiche du projet",
      preview: "Aperçu du projet",
      sheet: {
        context: "Contexte",
        objective: "Objectif",
        role: "Mon rôle",
        project: "Le projet",
        challenges: "Difficultés",
        solutions: "Solutions",
        results: "Résultat",
        stack: "Stack",
        gallery: "Captures",
        github: "Voir sur GitHub",
        gitlab: "Voir sur GitLab",
        repo: "Voir le dépôt",
        demo: "Voir la démo",
        stackOf: "Technologies du projet",
      },
    },

    education: {
      index: "04",
      title: "Formation",
      lead: "Un parcours qui part du développement et des bases de données pour aller vers l'infrastructure et l'automatisation.",
      seo: "Baccalauréat STMG, BTS SIO, Bachelor Informatique et Master DevOps chez Ynov : du développement et des bases de données vers l'infrastructure et l'automatisation.",
      grade: "Note",
      skillsOf: "Compétences travaillées :",
    },

    passions: {
      index: "05",
      title: "Passions",
      lead: "Ce qui occupe le temps passé loin des serveurs.",
      seo: "Sport, dessin, voyage et expérimentations autour de la tech, de l'IA et de la 3D.",
      more: "En savoir plus",
      openSheet: "ouvrir la fiche",
      sheet: {
        details: "En savoir plus",
        highlights: "À retenir",
        gallery: "Images",
        seeMore: "Voir plus",
      },
      travel: {
        countries: "Pays visités",
        count: "{n} pays visités",
        mapLabel: "Planisphère des pays visités :",
        other: "Autres voyages",
      },
    },

    notFound: {
      code: "Erreur 404",
      title: "Page introuvable",
      text: "Cette adresse ne correspond à aucune page du portfolio. Elle a peut-être changé lors de la refonte du site.",
      back: "Revenir à l'accueil",
    },

    contact: {
      title: ["Travaillons", "ensemble."],
      intro:
        "Disponible pour des opportunités IT en France et à l'international. Une opportunité, un projet ou simplement envie d'échanger ? N'hésitez pas à m'écrire directement.",
      seo: "Contacter Marvin Escalle, ingénieur IT : e-mail, LinkedIn et GitHub.",
      copy: "Copier l'adresse",
      copied: "Adresse copiée",
      channels: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      newTab: "nouvel onglet",
    },

    cv: {
      title: "Curriculum vitae",
      lead: "Deux versions, un même parcours.",
      seo: "Curriculum vitae de Marvin Escalle, ingénieur IT, en français et en anglais : consultation en ligne et téléchargement au format PDF.",
      updatedAt: "Dernière mise à jour",
      versions: {
        fr: {
          label: "Français",
          short: "FR",
          download: "Télécharger",
          open: "Ouvrir dans un nouvel onglet",
          viewerLabel: "CV de Marvin Escalle, version française",
          fallback:
            "Votre navigateur n'affiche pas les PDF directement dans la page.",
        },
        en: {
          label: "English",
          short: "EN",
          download: "Download",
          open: "Open in new tab",
          viewerLabel: "Marvin Escalle's résumé, English version",
          fallback:
            "Your browser cannot display PDF files inside the page.",
        },
      },
      switchLabel: "Choisir la version du CV",
    },

    sound: {
      on: "Activer l'ambiance sonore",
      off: "Couper l'ambiance sonore",
      playing: "Ambiance sonore active",
      muted: "Ambiance sonore coupée",
    },
  },

  en: {
    nav: {
      main: "Main navigation",
      home: "Home",
      backHome: "Marvin Escalle, back to home",
      menu: "Menu",
      close: "Close",
      language: "Choose a language",
      items: {
        "/a-propos": "About",
        "/experiences": "Experience",
        "/projets": "Projects",
        "/formation": "Education",
        "/passions": "Interests",
        "/cv": "CV",
        "/contact": "Contact",
      },
    },

    common: {
      skipToContent: "Skip to content",
      loading: "Loading",
      backHome: "Back to home",
      newTab: "new tab",
      email: "Send me an email",
      linkedin: "LinkedIn profile",
      github: "GitHub profile",
      close: "Close",
    },

    home: {
      hello: "Hello,",
      iam: "I am",
      hint: "Click to discover",
      open: "Show introduction",
      hide: "Hide introduction",
      discover: "Explore my background",
      seeCv: "View my résumé",
      sections: "Portfolio sections",
      skipIntro: "Skip",
    },

    about: {
      index: "01",
      title: "About",
      seo: "Versatile IT engineer working across automation, systems, data and business needs. Background, approach and technical skills.",
      paragraphs: [
        "I hold a Master's degree in DevOps and have spent three years as an apprentice, two of them at {thales}, which is where my profile grew into something hybrid: part technical, part functional.",
        "That work has had me automating how data is collected and processed, taking part in the integration and validation of complex systems, administering IT environments, and turning what users need into technical solutions that can actually be built.",
        "What interests me most is following a problem all the way through: the need, the constraints, the solution, then its integration and validation, rather than sticking to one particular technology.",
        "Alongside that, I regularly build projects around cloud, development, artificial intelligence, 3D and new technologies.",
      ],
      skills: "Skills",
      portrait: "Portrait of",
    },

    experience: {
      index: "02",
      title: "Experience",
      lead: "Two formative apprenticeships, and the roles that led up to them.",
      seo: "Apprenticeships at Thales and Fiscalyse, internships and early roles: automation, tooling, data and systems integration.",
      others: "Other roles",
      website: "Company website",
      stackOf: "Technologies and environment at",
      logoOf: "Logo",
    },

    projects: {
      index: "03",
      title: "Projects",
      lead: "A selection of work, then my personal projects and the ones built during my studies.",
      seo: "Projects built by Marvin Escalle: a delivery chain on AWS, personal projects around development and automation, and student work.",
      selection: "Selected",
      personal: "Personal projects",
      student: "Student projects",
      studentNote:
        "Work produced during my studies, kept as a record of the journey. It does not reflect my current level.",
      seeAllStudent: "See every student project",
      seeFewerStudent: "Show fewer",
      see: "View project",
      openSheet: "open the project details",
      preview: "Preview of project",
      sheet: {
        context: "Context",
        objective: "Goal",
        role: "My role",
        project: "The project",
        challenges: "Challenges",
        solutions: "Solutions",
        results: "Outcome",
        stack: "Stack",
        gallery: "Screenshots",
        github: "View on GitHub",
        gitlab: "View on GitLab",
        repo: "View the repository",
        demo: "View the demo",
        stackOf: "Technologies used in",
      },
    },

    education: {
      index: "04",
      title: "Education",
      lead: "A path that starts with development and databases, and moves towards infrastructure and automation.",
      seo: "French Baccalauréat, BTS SIO, Bachelor in Web Development and Master's in DevOps at Ynov: from development and databases towards infrastructure and automation.",
      grade: "Grade",
      skillsOf: "Skills covered:",
    },

    passions: {
      index: "05",
      title: "Interests",
      lead: "What fills the time spent away from servers.",
      seo: "Sport, drawing, travel and hands-on experiments with tech, AI and 3D.",
      more: "Find out more",
      openSheet: "open the details",
      sheet: {
        details: "More about it",
        highlights: "Highlights",
        gallery: "Images",
        seeMore: "See more",
      },
      travel: {
        countries: "Countries visited",
        count: "{n} countries visited",
        mapLabel: "World map of the countries visited:",
        other: "Other trips",
      },
    },

    notFound: {
      code: "Error 404",
      title: "Page not found",
      text: "This address does not match any page of the portfolio. It may have changed when the site was rebuilt.",
      back: "Back to home",
    },

    contact: {
      title: ["Let's work", "together."],
      intro:
        "Available for IT roles in France and abroad. An opportunity, a project, or simply want to connect? Feel free to get in touch.",
      seo: "Get in touch with Marvin Escalle, IT engineer: email, LinkedIn and GitHub.",
      copy: "Copy the address",
      copied: "Address copied",
      channels: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      newTab: "new tab",
    },

    cv: {
      title: "Curriculum vitae",
      lead: "Two versions, one career.",
      seo: "Marvin Escalle's résumé, IT engineer, in French and English: read it online or download the PDF.",
      updatedAt: "Last updated",
      versions: {
        fr: {
          label: "Français",
          short: "FR",
          download: "Télécharger",
          open: "Ouvrir dans un nouvel onglet",
          viewerLabel: "CV de Marvin Escalle, version française",
          fallback:
            "Votre navigateur n'affiche pas les PDF directement dans la page.",
        },
        en: {
          label: "English",
          short: "EN",
          download: "Download",
          open: "Open in new tab",
          viewerLabel: "Marvin Escalle's résumé, English version",
          fallback: "Your browser cannot display PDF files inside the page.",
        },
      },
      switchLabel: "Choose the résumé version",
    },

    sound: {
      on: "Turn the ambient sound on",
      off: "Turn the ambient sound off",
      playing: "Ambient sound on",
      muted: "Ambient sound off",
    },
  },
};

export default ui;
