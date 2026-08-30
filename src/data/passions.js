/**
 * Section Passions, pensée comme une galerie éditoriale, pas comme une liste
 * de loisirs. Chaque entrée occupe une place précise dans la mosaïque via
 * `span` :
 *
 *   "tall"  colonne étroite, image verticale
 *   "wide"  bloc large, image horizontale
 *   "large" grande vignette d'ouverture
 *
 * ─────────────────────────────────────────────────────────────────────────
 * OÙ DÉPOSER LES PHOTOS
 * Placer les fichiers dans  public/images/passions/
 * puis renseigner `image` avec le chemin correspondant, par exemple
 *   image: "/images/passions/sport.jpg"
 * Tant que `image` vaut `null`, une vignette typographique sobre s'affiche
 * à la place : aucune fausse photo n'est générée.
 *
 * Formats conseillés : JPG ou WebP, ~1600px de large, moins de 400 Ko.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * FICHE DÉTAILLÉE
 * Chaque vignette ouvre une fiche à l'adresse /passions/<id>. Les champs
 * suivants sont facultatifs et n'apparaissent que s'ils sont renseignés :
 *
 *   longText   Texte développé, un ou plusieurs paragraphes séparés par une
 *              ligne vide.
 *   highlights Tableau de points marquants, par exemple des résultats.
 *   gallery    Tableau de { src, alt } pour plusieurs images.
 */

export const passions = [
  {
    id: "sport",
    label: { fr: "Sport", en: "Sport" },
    text: {
      fr: "Athlétisme, sprint, puis boxe thaïlandaise et MMA. L'entraînement reste ma manière de couper avec l'écran.",
      en: "Athletics and sprinting, then Muay Thai and MMA. Training is still how I switch off from the screen.",
    },
    image: null, // → /images/passions/sport.jpg
    alt: {
      fr: "Marvin Escalle pendant une séance de sport",
      en: "Marvin Escalle during a training session",
    },
    span: "large",
    // TODO à compléter : texte développé et points marquants.
    longText: null,
    highlights: [],
    gallery: [],
  },
  {
    id: "dessin",
    label: { fr: "Dessin", en: "Drawing" },
    text: {
      fr: "Le dessin reste l'une de mes façons préférées de créer sans écran.",
      en: "Drawing is still one of my favourite ways to create away from a screen.",
    },
    image: null, // → /images/passions/dessin.jpg
    alt: {
      fr: "Un dessin réalisé par Marvin Escalle",
      en: "A drawing by Marvin Escalle",
    },
    span: "tall",
    link: "https://www.instagram.com/marmar_drw/",
    linkLabel: "@marmar_drw",
    longText: null,
    highlights: [],
    gallery: [],
  },
  {
    id: "voyage",
    label: { fr: "Voyage", en: "Travel" },
    text: {
      fr: "Après mes études, j'ai consacré une longue période à voyager et découvrir différents pays d'Asie.",
      en: "After my studies, I spent a long stretch travelling across several countries in Asia.",
    },
    image: null, // → /images/passions/voyage.jpg
    alt: {
      fr: "Photographie prise lors d'un voyage en Asie",
      en: "A photograph taken while travelling in Asia",
    },
    span: "wide",
    longText: null,
    highlights: [],
    gallery: [],
  },
  {
    id: "tech",
    label: { fr: "Tech & IA", en: "Tech & AI" },
    text: {
      fr: "J'expérimente régulièrement avec les nouvelles technologies, l'IA, la 3D et les outils de création numérique.",
      en: "I regularly experiment with new technologies, AI, 3D and digital creation tools.",
    },
    image: null, // → /images/passions/tech.jpg
    alt: {
      fr: "Visuel d'un projet personnel autour de l'IA et de la 3D",
      en: "Visual from a personal project around AI and 3D",
    },
    span: "tall",
    longText: null,
    highlights: [],
    gallery: [],
  },
];

/** Retrouve une passion depuis son adresse, pour la fiche détaillée. */
export const findPassion = (slug) =>
  passions.find((item) => item.id === slug) ?? null;

export default passions;
