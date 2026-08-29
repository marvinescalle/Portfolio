/**
 * Section Passions — pensée comme une galerie éditoriale, pas comme une liste
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
 */

export const passions = [
  {
    id: "sport",
    label: "Sport",
    text: "Athlétisme, sprint, puis boxe thaïlandaise et MMA. L'entraînement reste ma manière de couper avec l'écran.",
    image: null, // → /images/passions/sport.jpg
    alt: "Marvin Escalle pendant une séance de sport",
    span: "large",
  },
  {
    id: "dessin",
    label: "Dessin",
    text: "Le dessin reste l'une de mes façons préférées de créer sans écran.",
    image: null, // → /images/passions/dessin.jpg
    alt: "Un dessin réalisé par Marvin Escalle",
    span: "tall",
    link: "https://www.instagram.com/marmar_drw/",
    linkLabel: "@marmar_drw",
  },
  {
    id: "voyage",
    label: "Voyage",
    text: "Après mes études, j'ai consacré une longue période à voyager et découvrir différents pays d'Asie.",
    image: null, // → /images/passions/voyage.jpg
    alt: "Photographie prise lors d'un voyage en Asie",
    span: "wide",
  },
  {
    id: "tech",
    label: "Tech & IA",
    text: "J'expérimente régulièrement avec les nouvelles technologies, l'IA, la 3D et les outils de création numérique.",
    image: null, // → /images/passions/tech.jpg
    alt: "Visuel d'un projet personnel autour de l'IA et de la 3D",
    span: "tall",
  },
];

export default passions;
