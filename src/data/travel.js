/**
 * Voyages.
 *
 * Un voyage se décrit ici, jamais dans un composant : la fiche Passions, la
 * liste des pays et le planisphère lisent tous les trois ce fichier.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * AJOUTER UN PAYS À LA CARTE
 * Il suffit qu'un voyage le cite par son code ISO 3166-1 alpha-2 : la carte
 * et la liste s'en déduisent, il n'y a pas de seconde liste à tenir à jour.
 * Le nom affiché vient de `countryNames` ci-dessous, à compléter pour tout
 * nouveau code.
 *
 * AJOUTER UN VOYAGE
 * Copier une entrée de `otherJourneys` et renseigner ses dates. L'ordre
 * d'affichage vient des dates, pas de la position dans le tableau : les
 * étapes d'un grand voyage se lisent de la première à la dernière, les
 * voyages indépendants de la plus récente à la plus ancienne.
 *
 * LES DATES
 * Toujours en ISO, `AAAA-MM-JJ`. C'est ce qui permet de trier. L'affichage
 * n'en montre jamais le détail : `formatPeriod` en tire un mois et une
 * année, ce qui se lit mieux qu'une date administrative.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Noms des pays, par code ISO. Le planisphère porte bien un nom anglais dans
 * ses données, mais il vient de Natural Earth et n'est pas toujours celui
 * qu'on emploierait : cette table reste la référence pour l'affichage.
 */
export const countryNames = {
  TH: { fr: "Thaïlande", en: "Thailand" },
  VN: { fr: "Vietnam", en: "Vietnam" },
  CN: { fr: "Chine", en: "China" },
  UZ: { fr: "Ouzbékistan", en: "Uzbekistan" },
  NP: { fr: "Népal", en: "Nepal" },
  JP: { fr: "Japon", en: "Japan" },
  KR: { fr: "Corée du Sud", en: "South Korea" },
};

/**
 * Continent de rattachement, utilisé pour regrouper la liste des pays le
 * jour où elle sera trop longue pour tenir d'un bloc. Tant qu'un seul
 * continent est représenté, aucun intertitre n'est affiché.
 */
export const countryRegions = {
  TH: "asie", VN: "asie", CN: "asie", UZ: "asie",
  NP: "asie", JP: "asie", KR: "asie",
};

export const regionNames = {
  asie: { fr: "Asie", en: "Asia" },
  europe: { fr: "Europe", en: "Europe" },
  afrique: { fr: "Afrique", en: "Africa" },
  ameriques: { fr: "Amériques", en: "Americas" },
  oceanie: { fr: "Océanie", en: "Oceania" },
};

/**
 * Le grand voyage : un seul parcours, plusieurs étapes successives. Il ne se
 * mélange pas aux voyages indépendants, qui vivent dans `otherJourneys`.
 */
export const mainJourney = {
  id: "asie-fin-etudes",
  type: "multi-country",
  title: {
    fr: "Voyage de fin d'études",
    en: "Post-graduation trip",
  },
  region: "asie",
  startDate: "2025-12-01",
  endDate: "2026-06-09",
  destinations: [
    {
      code: "TH",
      startDate: "2025-12-01",
      endDate: "2026-01-26",
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
      code: "VN",
      startDate: "2026-01-26",
      endDate: "2026-02-16",
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
      code: "CN",
      startDate: "2026-02-16",
      endDate: "2026-03-12",
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
      code: "UZ",
      startDate: "2026-03-12",
      endDate: "2026-03-24",
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
      code: "NP",
      startDate: "2026-03-24",
      endDate: "2026-04-13",
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
      code: "JP",
      startDate: "2026-04-16",
      endDate: "2026-05-31",
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
      code: "KR",
      startDate: "2026-05-31",
      endDate: "2026-06-09",
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
};

/**
 * Voyages indépendants, plus courts, sans lien entre eux. Vide pour
 * l'instant : la section n'apparaît pas tant qu'il n'y a rien à montrer.
 *
 * Une entrée prend la forme :
 *   {
 *     id: "islande-2027",
 *     type: "individual",
 *     code: "IS",
 *     startDate: "2027-08-04",
 *     endDate: "2027-08-18",
 *     text: { fr: "...", en: "..." },
 *     photos: [{ src, alt }],
 *   }
 */
export const otherJourneys = [];

/* ────────────────────────────────────────────────────────────────────────
   Lecture des données. Tout ce qui suit se déduit de ce qui précède.
   ──────────────────────────────────────────────────────────────────────── */

/** Étapes du grand voyage, de la première à la dernière. */
export const journeyStops = [...mainJourney.destinations].sort((a, b) =>
  a.startDate.localeCompare(b.startDate)
);

/** Voyages indépendants, du plus récent au plus ancien. */
export const sortedOtherJourneys = [...otherJourneys].sort((a, b) =>
  b.startDate.localeCompare(a.startDate)
);

/**
 * Tous les pays visités, sans doublon, dans l'ordre où ils l'ont été.
 * C'est la seule liste : le planisphère et la liste écrite la partagent.
 */
export const visitedCountries = (() => {
  const vus = new Map();

  const ajouter = (code, date) => {
    if (!code) return;
    const connu = vus.get(code);
    if (!connu || date < connu.firstVisit) {
      vus.set(code, { code, firstVisit: date, region: countryRegions[code] ?? null });
    }
  };

  journeyStops.forEach((etape) => ajouter(etape.code, etape.startDate));
  sortedOtherJourneys.forEach((voyage) => ajouter(voyage.code, voyage.startDate));

  return [...vus.values()].sort((a, b) => a.firstVisit.localeCompare(b.firstVisit));
})();

/** Les seuls codes, pour le planisphère. */
export const visitedCodes = new Set(visitedCountries.map((pays) => pays.code));

/* Abréviations posées à la main plutôt que tirées d'Intl : le français
   n'abrège ni mars, ni mai, ni juin, ni août, et les formes rendues par le
   navigateur varient d'une version à l'autre. Une table de douze entrées
   coûte moins cher qu'une surprise. */
const MONTHS = {
  fr: ["Janv.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
  en: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
};

/**
 * Période lisible, à partir de deux dates ISO.
 *
 *   même mois              Mars 2026
 *   même année             Janv. - Fév. 2026
 *   à cheval sur deux ans  Déc. 2025 - Janv. 2026
 *
 * L'année n'est répétée que lorsqu'elle change : la répéter à chaque fois
 * alourdit une ligne qui doit rester secondaire.
 */
export const formatPeriod = (startDate, endDate, language = "fr") => {
  const mois = MONTHS[language] ?? MONTHS.fr;
  const [a1, m1] = startDate.split("-").map(Number);
  const [a2, m2] = endDate.split("-").map(Number);

  if (a1 === a2 && m1 === m2) return `${mois[m1 - 1]} ${a1}`;
  if (a1 === a2) return `${mois[m1 - 1]} - ${mois[m2 - 1]} ${a1}`;
  return `${mois[m1 - 1]} ${a1} - ${mois[m2 - 1]} ${a2}`;
};

export default mainJourney;
