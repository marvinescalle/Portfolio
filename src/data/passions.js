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
 * SUR LA VIGNETTE
 *   cardLabel  Intitulé court, utilisé par la mosaïque quand `label` est trop
 *              long pour sa colonne. La fiche garde `label`.
 *   tagline    Sous-titre en chasse fixe, entre le titre et la phrase.
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
 *   travel     Rend la fiche des voyages, dont les données vivent dans
 *              src/data/travel.js. Exclusif avec `story`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * LE CHAMP `story`
 *
 *   intro    Paragraphe d'ouverture, avant toute image. `null` si inutile.
 *   columns  Nombre de photos par ligne.
 *   ratio    Cadrage commun des vignettes, par exemple "4 / 5". Les photos
 *            sont recadrées dessus, ce qui aligne les lignes malgré des
 *            originaux tantôt verticaux tantôt horizontaux.
 *   numbered Numérote les sections, 01, 02, 03, dans le registre des
 *            en-têtes de page. Réservé aux fiches longues.
 *   groups   Sections successives, chacune avec :
 *              title   Titre de la section, ou `null` s'il n'y en a pas.
 *              text    Paragraphe sous le titre, ou `null`. Plusieurs
 *                      paragraphes se séparent par une ligne vide.
 *              points  Liste à puces, sous le texte. Facultative.
 *              after   Paragraphes de reprise, après la liste. Facultatif.
 *              photos  { src, alt, caption } ; `caption` est un libellé posé
 *                      au-dessus de la photo, utile quand chaque image a son
 *                      propre nom. Un groupe sans photo n'affiche aucune
 *                      grille : la section reste purement écrite tant
 *                      qu'aucun fichier n'est déposé.
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
    /* Le contenu de la fiche vit dans src/data/travel.js et se rend par un
       composant dédié : voir le commentaire dans PassionOverlay. */
    travel: true,
  },
  {
    id: "tech",
    label: { fr: "Tech & expérimentation", en: "Tech & experimentation" },
    /* La colonne étroite de la mosaïque fait 357 px, et « EXPÉRIMENTATION »
       n'y tient pas au-delà de 16 px, contre 28 pour les autres vignettes.
       Plutôt qu'un titre deux fois plus petit que ses voisins, la case porte
       le mot court et la fiche l'intitulé complet. Le sous-titre juste en
       dessous dit déjà l'étendue. */
    cardLabel: { fr: "Tech", en: "Tech" },
    tagline: "IA · Code · 3D · Hardware",
    text: {
      fr: "Je suis de près les évolutions de l'IA, du hardware et des outils de création numérique. J'aime surtout les tester, comprendre leurs limites et les intégrer à mes propres projets.",
      en: "I keep a close eye on how AI, hardware and digital creation tools evolve. What I like most is trying them out, working out where they stop, and bringing them into my own projects.",
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
    /* Le récit tient lieu de texte développé : renseigner les deux ferait
       deux introductions à la suite. */
    longText: null,
    highlights: [],
    gallery: [],
    story: {
      intro: null,
      numbered: true,
      /* Cadrage prévu pour de futures captures. Aucune grille n'est rendue
         tant qu'un groupe n'a pas de photo : déposer les fichiers dans
         public/images/passions/tech/ et remplir le tableau `photos` du
         groupe concerné suffit à les faire apparaître. */
      columns: 2,
      ratio: "16 / 10",
      fit: "cover",
      groups: [
        {
          id: "ia",
          title: { fr: "IA & développement", en: "AI & development" },
          text: {
            fr: "J'utilise beaucoup les outils d'intelligence artificielle dans mes projets personnels, comme assistants de développement et de réflexion. Concrètement, ils me servent à :",
            en: "I lean on AI tools a lot in my personal projects, as development and thinking assistants. In practice they help me:",
          },
          points: {
            fr: [
              "réfléchir à une architecture",
              "débloquer un problème",
              "améliorer du code existant",
              "automatiser des tâches",
              "prototyper rapidement",
              "faire avancer ce portfolio",
              "développer mes projets de jeux",
            ],
            en: [
              "think through an architecture",
              "get unstuck on a problem",
              "improve code that already exists",
              "automate tasks",
              "prototype quickly",
              "move this portfolio forward",
              "build my game projects",
            ],
          },
          after: {
            fr: "J'utilise notamment Claude Code. Ce qui m'intéresse est autant l'outil que la manière de le cadrer : donner du contexte, écrire des instructions précises, vérifier ce qui est produit, et recommencer jusqu'à obtenir quelque chose de réellement exploitable.\n\nJe suis aussi l'évolution des modèles de près, en particulier leurs capacités de raisonnement, de génération de code et d'utilisation d'outils.",
            en: "Claude Code is the one I use most. What interests me is as much the tool as the way you frame it: giving it context, writing precise instructions, checking what comes back, and going round again until the result is genuinely usable.\n\nI also follow how the models themselves progress, especially at reasoning, generating code and using tools.",
          },
          photos: [],
        },
        {
          id: "3d",
          title: { fr: "Génération 3D & création", en: "3D generation & creation" },
          text: {
            fr: "La génération 3D assistée par IA m'intéresse beaucoup, en particulier les enchaînements qui partent d'une image pour arriver à un modèle. Je m'en sers pour mes projets de jeux, surtout sur Roblox, où le passage se fait à peu près toujours dans cet ordre :",
            en: "AI-assisted 3D generation interests me a great deal, and image-to-3D pipelines in particular. I use them on my game projects, mostly on Roblox, where the sequence is nearly always the same:",
          },
          points: {
            fr: [
              "une référence visuelle",
              "la génération du modèle",
              "son adaptation aux contraintes techniques",
              "le contrôle du nombre de polygones",
              "l'import dans Roblox Studio",
              "l'intégration dans le jeu",
            ],
            en: [
              "a visual reference",
              "generating the model",
              "adapting it to the technical constraints",
              "keeping the polygon count in check",
              "importing it into Roblox Studio",
              "fitting it into the game",
            ],
          },
          after: {
            fr: "J'ai aussi expérimenté la création de packs d'assets réutilisables.\n\nCe qui me retient là-dedans est le trajet complet plutôt que le résultat d'une génération isolée : ce que les générateurs savent faire et où ils s'arrêtent, ce que le moteur accepte, et le compromis à trouver entre la qualité visuelle, les contraintes techniques et le temps passé.",
            en: "I have also experimented with putting together reusable asset packs.\n\nWhat holds my attention is the whole route rather than any single generation: what the generators can do and where they stop, what the engine will take, and the trade-off between how good it looks, what the technical limits allow and how long it takes.",
          },
          photos: [],
        },
        {
          id: "hardware",
          title: { fr: "Hardware", en: "Hardware" },
          text: {
            fr: "Le hardware me passionne depuis longtemps. Je monte et fais évoluer mes propres machines, et j'aide régulièrement des amis à concevoir les leurs, ce qui veut dire s'occuper de :",
            en: "Hardware has been a long-standing interest. I build and upgrade my own machines, and I regularly help friends put theirs together, which means dealing with:",
          },
          points: {
            fr: [
              "le choix du processeur et de la carte graphique",
              "la compatibilité des composants",
              "la carte mère",
              "la mémoire",
              "le stockage",
              "l'alimentation",
              "le refroidissement",
              "les performances attendues",
              "le budget",
              "la marge d'évolution",
            ],
            en: [
              "picking the CPU and the graphics card",
              "component compatibility",
              "the motherboard",
              "memory",
              "storage",
              "the power supply",
              "cooling",
              "the performance to aim for",
              "the budget",
              "room to upgrade later",
            ],
          },
          after: {
            fr: "La partie que je préfère est la comparaison : chercher l'équilibre entre les performances, le prix, l'usage réel de la machine et le temps qu'elle va tenir. Une bonne configuration n'est pas la plus chère, c'est celle qui correspond à ce qu'on en fait.\n\nJe suis aussi les nouvelles générations de processeurs et de cartes graphiques, et les changements d'architecture qui les accompagnent.",
            en: "The part I enjoy most is the comparing: finding the balance between performance, price, what the machine will actually be used for, and how long it will hold up. A good build is not the most expensive one, it is the one that matches what you do with it.\n\nI follow the new generations of processors and graphics cards too, and the architecture shifts that come with them.",
          },
          photos: [],
        },
        {
          id: "experimentation",
          title: { fr: "Expérimentation", en: "Experimentation" },
          text: {
            fr: "Quand un outil ou une technologie sort, j'ai en général envie de construire quelque chose avec plutôt que de regarder une démonstration. C'est ce qui relie des choses assez différentes : le développement web, l'automatisation, l'IA générative, la génération d'images et de 3D, les moteurs de jeu, l'infrastructure et le hardware.\n\nCe qui me plaît le plus est de comprendre suffisamment un nouvel outil pour pouvoir réellement en faire quelque chose.",
            en: "When a new tool or technology turns up, I usually want to build something with it rather than watch a demo. That is what ties together things as different as web development, automation, generative AI, image and 3D generation, game engines, infrastructure and hardware.\n\nWhat I enjoy most is understanding a new tool well enough to actually make something with it.",
          },
          photos: [],
        },
      ],
    },
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
