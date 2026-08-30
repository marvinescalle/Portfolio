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
        "Diplômé d'une formation DevOps et fort de plusieurs années d'expérience en alternance, j'ai construit un profil IT polyvalent à la croisée de l'automatisation, des systèmes, de la donnée et des problématiques métier.",
        "Mes expériences professionnelles, notamment chez {thales} et {fiscalyse}, m'ont amené à travailler sur des environnements et des besoins très différents : automatisation de tâches, collecte et traitement de données, développement d'outils, infrastructure, tests, amélioration de processus et accompagnement des utilisateurs.",
        "Ce que j'apprécie particulièrement est de comprendre un problème dans son ensemble, puis de construire une solution réellement utile plutôt que de me limiter à une technologie particulière.",
        "Curieux et autonome, je continue également à développer des projets personnels autour du développement, de l'intelligence artificielle, de la 3D et des nouvelles technologies.",
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
      lead: "Une sélection de réalisations, et les archives de mes travaux d'études.",
      seo: "Projets réalisés par Marvin Escalle : développement web, automatisation et DevOps, ainsi que les archives des travaux étudiants.",
      selection: "Sélection",
      archives: "Archives : projets étudiants",
      archivesNote:
        "Travaux réalisés pendant mes études, conservés à titre de parcours. Ils ne reflètent pas mon niveau actuel.",
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
      awaiting: "Photo à venir",
      more: "En savoir plus",
      openSheet: "ouvrir la fiche",
      sheet: {
        details: "En savoir plus",
        highlights: "À retenir",
        gallery: "Images",
        seeMore: "Voir plus",
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
        "Une opportunité, un projet ou simplement envie d'échanger ? N'hésitez pas à m'écrire directement.",
      formLabel: "Formulaire de contact",
      fields: {
        name: "Nom",
        email: "Email",
        subject: "Objet",
        subjectOptional: "Objet (facultatif)",
        message: "Message",
      },
      placeholders: {
        subject: "Facultatif",
      },
      errors: {
        name: "Merci d'indiquer votre nom.",
        email: "Merci d'indiquer votre adresse email.",
        emailInvalid: "Cette adresse email ne semble pas valide.",
        message: "Merci d'écrire votre message.",
      },
      submit: {
        idle: "Envoyer",
        loading: "Envoi...",
      },
      success: {
        title: "Message envoyé.",
        text: "Merci pour votre message. Je vous répondrai dès que possible.",
        again: "Envoyer un autre message",
      },
      failure: {
        title: "Une erreur est survenue.",
        text: "Le message n'a pas pu être envoyé. Vous pouvez également me contacter directement par email :",
        retry: "Réessayer",
      },
      honeypot: "Ne remplissez pas ce champ si vous êtes humain",
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
        "With a DevOps degree and several years of apprenticeship experience, I have built a versatile IT profile at the intersection of automation, systems, data and business needs.",
        "My professional experience, notably at {thales} and {fiscalyse}, has taken me across very different environments and requirements: task automation, data collection and processing, tooling, infrastructure, testing, process improvement and user support.",
        "What I enjoy most is understanding a problem as a whole, then building a genuinely useful solution rather than confining myself to one particular technology.",
        "Curious and self-driven, I also keep building personal projects around development, artificial intelligence, 3D and emerging technologies.",
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
      lead: "A selection of work, alongside the archive of my student projects.",
      seo: "Projects built by Marvin Escalle: web development, automation and DevOps, plus the archive of student work.",
      selection: "Selected",
      archives: "Archive: student projects",
      archivesNote:
        "Work produced during my studies, kept as a record of the journey. It does not reflect my current level.",
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
      awaiting: "Photo coming soon",
      more: "Find out more",
      openSheet: "open the details",
      sheet: {
        details: "More about it",
        highlights: "Highlights",
        gallery: "Images",
        seeMore: "See more",
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
        "An opportunity, a project, or simply want to connect? Feel free to get in touch.",
      formLabel: "Contact form",
      fields: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        subjectOptional: "Subject (optional)",
        message: "Message",
      },
      placeholders: {
        subject: "Optional",
      },
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "This email address does not look valid.",
        message: "Please write your message.",
      },
      submit: {
        idle: "Send",
        loading: "Sending...",
      },
      success: {
        title: "Message sent.",
        text: "Thank you for reaching out. I'll get back to you as soon as possible.",
        again: "Send another message",
      },
      failure: {
        title: "Something went wrong.",
        text: "The message could not be sent. You can also reach me directly by email:",
        retry: "Try again",
      },
      honeypot: "Do not fill this field if you are human",
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
