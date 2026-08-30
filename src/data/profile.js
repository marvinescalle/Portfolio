/**
 * Informations d'identité et de contact.
 * C'est le seul endroit où modifier le nom, le titre ou les liens sociaux.
 */

export const profile = {
  firstName: "Marvin",
  lastName: "Escalle",
  fullName: "Marvin Escalle",
  role: "Ingénieur IT",
  disciplines: ["Automatisation", "Systèmes", "Data", "DevOps"],
  tagline:
    "J'aime transformer des problématiques techniques et métier en solutions concrètes, automatisées et réellement utilisables.",

  // TODO à compléter : ville ou région à afficher dans la section Contact.
  // Laisser `null` masque proprement la ligne au lieu d'afficher une valeur
  // inventée.
  location: null,

  email: "marvinescalle.pro@gmail.com",

  links: {
    linkedin: "https://www.linkedin.com/in/marvin-escalle-789b601b7/",
    github: "https://github.com/marvinescalle",
    // Compte dédié aux dessins, utilisé dans la section Passions.
    instagramArt: "https://www.instagram.com/marmar_drw/",
  },

  /**
   * CV affiché et téléchargé depuis la page /cv.
   * Déposer le fichier dans public/cv/ puis mettre à jour `file` si le nom
   * change. Le chemin part de la racine du site, pas du dossier src.
   */
  cv: {
    file: "/cv/Marvin_Escalle_CV.pdf",
    downloadName: "Marvin_Escalle_CV.pdf",
    // TODO à compléter : date de dernière mise à jour du CV, ex. "Août 2026".
    updatedAt: null,
  },
};

export const seo = {
  title: "Marvin Escalle · IT Engineer | DevOps, Automation & Data",
  description:
    "Portfolio de Marvin Escalle, ingénieur IT spécialisé en automatisation, DevOps, systèmes et données. Découvrez mes expériences professionnelles, projets et compétences techniques.",
  // TODO à compléter une fois le nom de domaine acheté, ex.
  // "https://marvinescalle.fr". Sert aux balises Open Graph.
  siteUrl: null,
};

export default profile;
