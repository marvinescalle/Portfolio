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
 *   story      Récit illustré, décrit ci-dessous.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * LE CHAMP `story`
 *
 *   intro    Paragraphe d'ouverture, avant toute image. `null` si inutile.
 *   columns  Nombre de photos par ligne.
 *   ratio    Cadrage commun des vignettes, par exemple "4 / 5". Les photos
 *            sont recadrées dessus, ce qui aligne les lignes malgré des
 *            originaux tantôt verticaux tantôt horizontaux.
 *   groups   Sections successives, chacune avec :
 *              title   Titre de la section, ou `null` s'il n'y en a pas.
 *              text    Paragraphe sous le titre, ou `null`.
 *              photos  { src, alt, caption } ; `caption` est un libellé posé
 *                      au-dessus de la photo, utile quand chaque image a son
 *                      propre nom.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const passions = [
  {
    id: "sport",
    label: { fr: "Sport", en: "Sport" },
    text: {
      fr: "Athlétisme, sprint, puis boxe thaïlandaise et MMA. L'entraînement reste ma manière de couper avec l'écran.",
      en: "Athletics and sprinting, then Muay Thai and MMA. Training is still how I switch off from the screen.",
    },
    image: "/images/passions/sport/boxe.jpg",
    alt: {
      fr: "Marvin Escalle pendant une séance de sport",
      en: "Marvin Escalle during a training session",
    },
    span: "large",
    // TODO à compléter : texte développé et points marquants.
    longText: null,
    highlights: [],
    gallery: [],
    story: {
      intro: { fr: "texte", en: "texte" },
      columns: 2,
      ratio: "3 / 4",
      groups: [
        {
          id: "disciplines",
          title: null,
          text: null,
          photos: [
          {
            src: "/images/passions/sport/alpinisme.jpg",
            caption: { fr: "Alpinisme", en: "Mountaineering" },
            alt: {
              fr: "Marvin Escalle, alpinisme",
              en: "Marvin Escalle, mountaineering",
            },
          },
          {
            src: "/images/passions/sport/escalade.jpg",
            caption: { fr: "Escalade", en: "Climbing" },
            alt: {
              fr: "Marvin Escalle, escalade",
              en: "Marvin Escalle, climbing",
            },
          },
          {
            src: "/images/passions/sport/boxe.jpg",
            caption: { fr: "Boxe", en: "Boxing" },
            alt: {
              fr: "Marvin Escalle, boxe",
              en: "Marvin Escalle, boxing",
            },
          },
          {
            src: "/images/passions/sport/course.jpg",
            caption: { fr: "Course", en: "Running" },
            alt: {
              fr: "Marvin Escalle, course",
              en: "Marvin Escalle, running",
            },
          },
          {
            src: "/images/passions/sport/badminton.jpg",
            caption: { fr: "Badminton", en: "Badminton" },
            alt: {
              fr: "Marvin Escalle, badminton",
              en: "Marvin Escalle, badminton",
            },
          },
          {
            src: "/images/passions/sport/tennis.jpg",
            caption: { fr: "Tennis", en: "Tennis" },
            alt: {
              fr: "Marvin Escalle, tennis",
              en: "Marvin Escalle, tennis",
            },
          },
          ],
        },
      ],
    },
  },
  {
    id: "dessin",
    label: { fr: "Dessin", en: "Drawing" },
    text: {
      fr: "Le dessin reste l'une de mes façons préférées de créer sans écran.",
      en: "Drawing is still one of my favourite ways to create away from a screen.",
    },
    image: "/images/passions/dessin/griffith.jpg",
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
    story: {
      intro: { fr: "texte", en: "texte" },
      columns: 2,
      /* Aucun cadrage commun : recadrer un dessin l'amputerait. Chaque
         planche garde ses proportions d'origine, ce qui oblige à donner ses
         dimensions : sans elles le navigateur ne réserve aucune hauteur, les
         images s'effondrent avant chargement et le chargement différé ne se
         déclenche jamais. */
      ratio: null,
      groups: [
        {
          id: "planches",
          title: null,
          text: null,
          photos: [
          {
            src: "/images/passions/dessin/eclipse.jpg",
            width: 1125,
            height: 1400,
            caption: { fr: "Eclipse", en: "Eclipse" },
            alt: {
              fr: "Dessin de Marvin Escalle : Eclipse",
              en: "Drawing by Marvin Escalle: Eclipse",
            },
          },
          {
            src: "/images/passions/dessin/griffith.jpg",
            width: 780,
            height: 1400,
            caption: { fr: "Griffith", en: "Griffith" },
            alt: {
              fr: "Dessin de Marvin Escalle : Griffith",
              en: "Drawing by Marvin Escalle: Griffith",
            },
          },
          {
            src: "/images/passions/dessin/jolyne.jpg",
            width: 1400,
            height: 1004,
            caption: { fr: "Jolyne", en: "Jolyne" },
            alt: {
              fr: "Dessin de Marvin Escalle : Jolyne",
              en: "Drawing by Marvin Escalle: Jolyne",
            },
          },
          {
            src: "/images/passions/dessin/kaido.jpg",
            width: 1116,
            height: 1400,
            caption: { fr: "Kaido", en: "Kaido" },
            alt: {
              fr: "Dessin de Marvin Escalle : Kaido",
              en: "Drawing by Marvin Escalle: Kaido",
            },
          },
          ],
        },
      ],
    },
  },
  {
    id: "voyage",
    label: { fr: "Voyages", en: "Travel" },
    text: {
      fr: "Après mes études, j'ai consacré une longue période à voyager et découvrir différents pays d'Asie.",
      en: "After my studies, I spent a long stretch travelling across several countries in Asia.",
    },
    // Déjà en 16/9, soit exactement le format de la case : aucun recadrage.
    image: "/images/passions/voyage/top.jpg",
    alt: {
      fr: "Photographie prise lors d'un voyage en Asie",
      en: "A photograph taken while travelling in Asia",
    },
    span: "wide",
    longText: null,
    highlights: [],
    gallery: [],
    story: {
      intro: { fr: "texte", en: "texte" },
      columns: 3,
      ratio: "4 / 5",
      groups: [
      {
        id: "thailande",
        title: { fr: "Thaïlande", en: "Thailand" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/thailande1.jpg",
            alt: {
              fr: "Photographie prise en Thaïlande",
              en: "Photograph taken in Thailand",
            },
          },
          {
            src: "/images/passions/voyage/thailande2.jpg",
            alt: {
              fr: "Photographie prise en Thaïlande",
              en: "Photograph taken in Thailand",
            },
          },
          {
            src: "/images/passions/voyage/thailande3.jpg",
            alt: {
              fr: "Photographie prise en Thaïlande",
              en: "Photograph taken in Thailand",
            },
          },
        ],
      },
      {
        id: "vietnam",
        title: { fr: "Vietnam", en: "Vietnam" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/vietnam1.jpg",
            alt: {
              fr: "Photographie prise en Vietnam",
              en: "Photograph taken in Vietnam",
            },
          },
          {
            src: "/images/passions/voyage/vietnam2.jpg",
            alt: {
              fr: "Photographie prise en Vietnam",
              en: "Photograph taken in Vietnam",
            },
          },
          {
            src: "/images/passions/voyage/vietnam3.jpg",
            alt: {
              fr: "Photographie prise en Vietnam",
              en: "Photograph taken in Vietnam",
            },
          },
        ],
      },
      {
        id: "chine",
        title: { fr: "Chine", en: "China" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/chine1.jpg",
            alt: {
              fr: "Photographie prise en Chine",
              en: "Photograph taken in China",
            },
          },
          {
            src: "/images/passions/voyage/chine2.jpg",
            alt: {
              fr: "Photographie prise en Chine",
              en: "Photograph taken in China",
            },
          },
          {
            src: "/images/passions/voyage/chine2-1.jpg",
            alt: {
              fr: "Photographie prise en Chine",
              en: "Photograph taken in China",
            },
          },
          {
            src: "/images/passions/voyage/chine2-2.jpg",
            alt: {
              fr: "Photographie prise en Chine",
              en: "Photograph taken in China",
            },
          },
          {
            src: "/images/passions/voyage/chine2-3.jpg",
            alt: {
              fr: "Photographie prise en Chine",
              en: "Photograph taken in China",
            },
          },
          {
            src: "/images/passions/voyage/chine3.jpg",
            alt: {
              fr: "Photographie prise en Chine",
              en: "Photograph taken in China",
            },
          },
        ],
      },
      {
        id: "ouzbekistan",
        title: { fr: "Ouzbékistan", en: "Uzbekistan" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/ouzbekistan1.jpg",
            span: 2,
            alt: {
              fr: "Photographie prise en Ouzbékistan",
              en: "Photograph taken in Uzbekistan",
            },
          },
          {
            src: "/images/passions/voyage/ouzbekistan2.jpg",
            alt: {
              fr: "Photographie prise en Ouzbékistan",
              en: "Photograph taken in Uzbekistan",
            },
          },
        ],
      },
      {
        id: "nepal",
        title: { fr: "Népal", en: "Nepal" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/nepal1.jpg",
            alt: {
              fr: "Photographie prise en Népal",
              en: "Photograph taken in Nepal",
            },
          },
          {
            src: "/images/passions/voyage/nepal2.jpg",
            alt: {
              fr: "Photographie prise en Népal",
              en: "Photograph taken in Nepal",
            },
          },
          {
            src: "/images/passions/voyage/nepal3.jpg",
            alt: {
              fr: "Photographie prise en Népal",
              en: "Photograph taken in Nepal",
            },
          },
        ],
      },
      {
        id: "japon",
        title: { fr: "Japon", en: "Japan" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/japon1.jpg",
            alt: {
              fr: "Photographie prise en Japon",
              en: "Photograph taken in Japan",
            },
          },
          {
            src: "/images/passions/voyage/japon2.jpg",
            alt: {
              fr: "Photographie prise en Japon",
              en: "Photograph taken in Japan",
            },
          },
          {
            src: "/images/passions/voyage/japon3.jpg",
            alt: {
              fr: "Photographie prise en Japon",
              en: "Photograph taken in Japan",
            },
          },
        ],
      },
      {
        id: "coree",
        title: { fr: "Corée du Sud", en: "South Korea" },
        text: { fr: "texte", en: "texte" },
        photos: [
          {
            src: "/images/passions/voyage/koree1.jpg",
            alt: {
              fr: "Photographie prise en Corée du Sud",
              en: "Photograph taken in South Korea",
            },
          },
          {
            src: "/images/passions/voyage/koree2.jpg",
            alt: {
              fr: "Photographie prise en Corée du Sud",
              en: "Photograph taken in South Korea",
            },
          },
          {
            src: "/images/passions/voyage/koree3.jpg",
            alt: {
              fr: "Photographie prise en Corée du Sud",
              en: "Photograph taken in South Korea",
            },
          },
        ],
      },
      ],
    },
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
  {
    id: "jeux",
    label: { fr: "Jeux vidéo", en: "Video games" },
    text: {
      fr: "Des salons en réseau aux longues sessions solo, une pratique qui va de la GameCube aux jeux en ligne d'aujourd'hui.",
      en: "From living-room multiplayer to long solo sessions, a habit running from the GameCube to today's online games.",
    },
    image: "/images/passions/jeux/elden-ring.jpg",
    alt: {
      fr: "Sélection de jeux marquants",
      en: "A selection of memorable games",
    },
    span: "wide",
    longText: null,
    highlights: [],
    gallery: [],
    story: {
      intro: { fr: "texte", en: "texte" },
      columns: 3,
      ratio: "4 / 5",
      /* Jaquettes verticales et logotypes larges se côtoient, de 0,65 à 2,24
         de rapport. Les inscrire dans la vignette plutôt que les y rogner :
         un recadrage commun amputerait les seconds. */
      fit: "contain",
      groups: [
        {
          id: "selection",
          title: null,
          text: null,
          photos: [
          {
            src: "/images/passions/jeux/r6.jpg",
            caption: { fr: "Rainbow Six Siege", en: "Rainbow Six Siege" },
            alt: {
              fr: "Jaquette de Rainbow Six Siege",
              en: "Cover art for Rainbow Six Siege",
            },
          },
          {
            src: "/images/passions/jeux/lol.jpg",
            caption: { fr: "League of Legends", en: "League of Legends" },
            alt: {
              fr: "Jaquette de League of Legends",
              en: "Cover art for League of Legends",
            },
          },
          {
            src: "/images/passions/jeux/elden-ring.jpg",
            caption: { fr: "Elden Ring", en: "Elden Ring" },
            alt: {
              fr: "Jaquette de Elden Ring",
              en: "Cover art for Elden Ring",
            },
          },
          {
            src: "/images/passions/jeux/mw3.jpg",
            caption: { fr: "Call of Duty : Modern Warfare 3", en: "Call of Duty: Modern Warfare 3" },
            alt: {
              fr: "Jaquette de Call of Duty : Modern Warfare 3",
              en: "Cover art for Call of Duty: Modern Warfare 3",
            },
          },
          {
            src: "/images/passions/jeux/subnautica.png",
            caption: { fr: "Subnautica", en: "Subnautica" },
            alt: {
              fr: "Jaquette de Subnautica",
              en: "Cover art for Subnautica",
            },
          },
          {
            src: "/images/passions/jeux/fallout-new-vegas.jpg",
            caption: { fr: "Fallout : New Vegas", en: "Fallout: New Vegas" },
            alt: {
              fr: "Jaquette de Fallout : New Vegas",
              en: "Cover art for Fallout: New Vegas",
            },
          },
          {
            src: "/images/passions/jeux/lotro.png",
            caption: { fr: "The Lord of the Rings Online", en: "The Lord of the Rings Online" },
            alt: {
              fr: "Jaquette de The Lord of the Rings Online",
              en: "Cover art for The Lord of the Rings Online",
            },
          },
          {
            src: "/images/passions/jeux/dofus.png",
            caption: { fr: "Dofus", en: "Dofus" },
            alt: {
              fr: "Jaquette de Dofus",
              en: "Cover art for Dofus",
            },
          },
          {
            src: "/images/passions/jeux/titan-quest.jpg",
            caption: { fr: "Titan Quest", en: "Titan Quest" },
            alt: {
              fr: "Jaquette de Titan Quest",
              en: "Cover art for Titan Quest",
            },
          },
          {
            src: "/images/passions/jeux/smash-melee.jpg",
            caption: { fr: "Super Smash Bros. Melee", en: "Super Smash Bros. Melee" },
            alt: {
              fr: "Jaquette de Super Smash Bros. Melee",
              en: "Cover art for Super Smash Bros. Melee",
            },
          },
          {
            src: "/images/passions/jeux/mario-kart.jpg",
            caption: { fr: "Mario Kart : Double Dash", en: "Mario Kart: Double Dash" },
            alt: {
              fr: "Jaquette de Mario Kart : Double Dash",
              en: "Cover art for Mario Kart: Double Dash",
            },
          },
          {
            src: "/images/passions/jeux/zelda-skyward.jpg",
            caption: { fr: "Zelda : Skyward Sword", en: "Zelda: Skyward Sword" },
            alt: {
              fr: "Jaquette de Zelda : Skyward Sword",
              en: "Cover art for Zelda: Skyward Sword",
            },
          },
          ],
        },
      ],
    },
  },
];

/** Retrouve une passion depuis son adresse, pour la fiche détaillée. */
export const findPassion = (slug) =>
  passions.find((item) => item.id === slug) ?? null;

export default passions;
