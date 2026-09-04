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
      fr: "De l'athlétisme à la boxe, en passant par l'escalade et l'alpinisme. Vice-champion départemental en duo mixte et vice-champion régional en sprint 100 m.",
      en: "From athletics to boxing, by way of climbing and mountaineering. Runner-up in the departmental mixed doubles and in the regional 100 m sprint.",
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
      intro: null,
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
      fr: "J'adore lire des mangas, mais j'aime aussi dessiner les planches qui me fascinent.",
      en: "Drawing is still one of my favourite ways to create away from a screen.",
    },
    image: "/images/passions/dessin/griffith.jpg",
    alt: {
      fr: "Un dessin réalisé par Marvin Escalle",
      en: "A drawing by Marvin Escalle",
    },
    span: "tall",
    /* Décalée vers le bas, voir le commentaire de Cell dans la page
       Passions : la colonne étroite se lit alors en escalier. */
    offset: true,
    link: "https://www.instagram.com/marmar_drw/",
    linkLabel: "@marmar_drw",
    longText: null,
    highlights: [],
    gallery: [],
    story: {
      intro: null,
      columns: 2,
      /* Rien n'est rogné : un recadrage amputerait le trait. Les planches sont
         donc inscrites dans leur vignette. Le cadrage est en revanche propre à
         chaque groupe, celui des planches verticales n'ayant aucune raison de
         convenir aux horizontales : un rapport unique aurait réduit les unes
         ou les autres à une bande. */
      fit: "contain",
      groups: [
        {
          id: "portraits",
          title: null,
          text: null,
          ratio: "3 / 4",
          photos: [
          {
            src: "/images/passions/dessin/eclipse.jpg",
            caption: { fr: "Eclipse", en: "Eclipse" },
            alt: {
              fr: "Dessin de Marvin Escalle : Eclipse",
              en: "Drawing by Marvin Escalle: Eclipse",
            },
          },
          {
            src: "/images/passions/dessin/griffith.jpg",
            caption: { fr: "Griffith", en: "Griffith" },
            alt: {
              fr: "Dessin de Marvin Escalle : Griffith",
              en: "Drawing by Marvin Escalle: Griffith",
            },
          },
          {
            src: "/images/passions/dessin/kaido.jpg",
            caption: { fr: "Kaido", en: "Kaido" },
            alt: {
              fr: "Dessin de Marvin Escalle : Kaido",
              en: "Drawing by Marvin Escalle: Kaido",
            },
          },
          {
            src: "/images/passions/dessin/jotaro.jpg",
            caption: { fr: "Jotaro", en: "Jotaro" },
            alt: {
              fr: "Dessin de Marvin Escalle : Jotaro",
              en: "Drawing by Marvin Escalle: Jotaro",
            },
          },
          ],
        },
        {
          id: "paysages",
          title: null,
          text: null,
          ratio: "4 / 3",
          photos: [
          {
            src: "/images/passions/dessin/jolyne.jpg",
            caption: { fr: "Jolyne", en: "Jolyne" },
            alt: {
              fr: "Dessin de Marvin Escalle : Jolyne",
              en: "Drawing by Marvin Escalle: Jolyne",
            },
          },
          {
            src: "/images/passions/dessin/griffith2.jpg",
            caption: { fr: "Griffith", en: "Griffith" },
            alt: {
              fr: "Dessin de Marvin Escalle : Griffith",
              en: "Drawing by Marvin Escalle: Griffith",
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
      intro: null,
      columns: 3,
      ratio: "4 / 5",
      groups: [
      {
        id: "thailande",
        title: { fr: "Thaïlande", en: "Thailand" },
        text: null,
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
        text: null,
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
        text: null,
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
        text: null,
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
        text: null,
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
        text: null,
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
        text: null,
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
      fr: "Je suis de près les avancées de l'IA, du hardware et des outils de création numérique, que j'aime tester et intégrer à mes projets.",
      en: "I follow what happens in AI, in hardware and in the digital creation tools closely, and I like testing them and bringing them into my own projects.",
    },
    image: null, // → /images/passions/tech.jpg
    alt: {
      fr: "Visuel d'un projet personnel autour de l'IA et de la 3D",
      en: "Visual from a personal project around AI and 3D",
    },
    span: "tall",
    /* Décalée vers le bas, voir le commentaire de Cell dans la page
       Passions : la colonne étroite se lit alors en escalier. */
    offset: true,
    longText: {
      fr: "Je suis de près les évolutions de l'IA et du hardware, des nouveaux modèles aux dernières générations de composants. J'aime tester les nouveaux outils, comprendre ce qu'ils permettent réellement et les intégrer à mes projets de développement, de 3D ou de création numérique.",
      en: "I follow how AI and hardware evolve, from new models to the latest generations of components. I like trying the new tools out, working out what they actually make possible, and bringing them into my own projects, whether they involve development, 3D or digital creation.",
    },
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
    /* Illustration en 16/9, soit exactement le format de la case large :
       aucun recadrage, contrairement à une jaquette verticale. */
    image: "/images/passions/jeux/vignette.jpg",
    alt: {
      fr: "Sélection de jeux marquants",
      en: "A selection of memorable games",
    },
    span: "wide",
    longText: null,
    highlights: [],
    gallery: [],
    story: {
      intro: null,
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
