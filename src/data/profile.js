/**
 * Informations d'identité et de contact.
 * C'est le seul endroit où modifier le nom, le titre ou les liens sociaux.
 */

export const profile = {
  firstName: "Marvin",
  lastName: "Escalle",
  fullName: "Marvin Escalle",

  /**
   * Positionnement professionnel, en trois niveaux de lecture décroissants.
   * La hiérarchie est portée par la typographie, jamais par un séparateur.
   *
   *   role        Intitulé, le plus visible.
   *   focus       Ce que recouvre l'intitulé, en une ligne.
   *   disciplines Les domaines, en petites capitales espacées.
   */
  role: { fr: "Ingénieur IT", en: "IT Engineer" },
  focus: {
    fr: "Automatisation & coordination métier/technique",
    en: "Automation & business/technical coordination",
  },
  disciplines: {
    fr: ["Data", "Systèmes", "DevOps"],
    en: ["Data", "Systems", "DevOps"],
  },

  tagline: {
    fr: "J'aime transformer des problématiques techniques et métier en solutions concrètes, automatisées et réellement utilisables.",
    en: "I enjoy turning technical and business problems into concrete, automated and genuinely usable solutions.",
  },

  /**
   * Localisation affichée publiquement. Volontairement générique : les CV
   * portaient des villes différentes d'une version à l'autre, ce qui se lit
   * comme une incohérence plutôt que comme une mobilité.
   */
  location: {
    fr: "France · Mobilité internationale",
    en: "France · Open to international roles",
  },

  email: "marvinescalle.pro@gmail.com",

  links: {
    linkedin: "https://www.linkedin.com/in/marvin-escalle-789b601b7/",
    github: "https://github.com/marvinescalle",
    // Compte dédié aux dessins, utilisé dans la section Passions.
    instagramArt: "https://www.instagram.com/marmar_drw/",
  },

  /**
   * CV affichés et téléchargés depuis la page /cv : le même parcours, une
   * version par langue. Déposer les fichiers dans public/cv/ en gardant ces
   * noms, rien d'autre n'est à modifier. Le chemin part de la racine du site,
   * pas de src.
   */
  cv: {
    fr: {
      file: "/cv/Marvin_Escalle_CV_FR.pdf",
      downloadName: "Marvin_Escalle_CV_FR.pdf",
    },
    en: {
      file: "/cv/Marvin_Escalle_CV_EN.pdf",
      downloadName: "Marvin_Escalle_CV_EN.pdf",
    },
    /**
     * Format des pages, utilisé pour donner au cadre d'affichage les mêmes
     * proportions que le document : sans cela une bande vide apparaît sous
     * le PDF. Les CV actuels sont au format US Letter (612 x 792 points).
     * Basculer sur "a4" si les futurs fichiers sont au format A4.
     */
    format: "letter",
    // TODO à compléter : date de dernière mise à jour, ex. "Septembre 2026".
    updatedAt: null,
  },
};

export const seo = {
  title: "Marvin Escalle · IT Engineer | DevOps, Automation & Data",
  description: {
    fr: "Portfolio de Marvin Escalle, ingénieur IT spécialisé en automatisation, DevOps, systèmes et données. Découvrez mes expériences professionnelles, projets et compétences techniques.",
    en: "Portfolio of Marvin Escalle, an IT engineer specialising in automation, DevOps, systems and data. Explore my professional experience, projects and technical skills.",
  },
  // TODO à compléter une fois le nom de domaine acheté, ex.
  // "https://marvinescalle.fr". Sert aux balises Open Graph.
  siteUrl: null,
};

export default profile;
