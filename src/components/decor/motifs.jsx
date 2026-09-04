/* ────────────────────────────────────────────────────────────────────────
   Bibliothèque de motifs CHROMA.

   Huit signes, dessinés ici et nulle part ailleurs. Aucun n'illustre quoi
   que ce soit : ce sont des formes, tracées au même trait, dans le même
   repère de 100 sur 100, et pensées pour être posées grand, recadrées par
   les bords, parfois superposées.

   Deux règles tiennent toute la cohérence de l'ensemble :

     - le trait ne grossit pas avec la forme. `non-scaling-stroke` fige son
       épaisseur en pixels quelle que soit la taille d'affichage, si bien
       qu'un signe de 600 px garde la finesse d'un dessin technique au lieu
       de devenir un gros contour ;
     - la couleur vient de `currentColor`. Un motif se recolore depuis le
       CSS, sans être redessiné ni dupliqué.
   ──────────────────────────────────────────────────────────────────────── */

const base = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  vectorEffect: "non-scaling-stroke",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

/** Étoile à quatre branches, aux flancs creusés. Le signe le plus net. */
export const Star = (props) => (
  <svg {...base} {...props}>
    <path d="M50 1C54.5 29.5 70.5 45.5 99 50C70.5 54.5 54.5 70.5 50 99C45.5 70.5 29.5 54.5 1 50C29.5 45.5 45.5 29.5 50 1Z" />
  </svg>
);

/** La même, pleine : sert de masse et non de contour. */
export const StarSolid = (props) => (
  <svg {...base} {...props} fill="currentColor" stroke="none">
    <path d="M50 1C54.5 29.5 70.5 45.5 99 50C70.5 54.5 54.5 70.5 50 99C45.5 70.5 29.5 54.5 1 50C29.5 45.5 45.5 29.5 50 1Z" />
  </svg>
);

/** Fer à cheval, réduit à deux arcs ouverts vers le haut. */
export const Horseshoe = (props) => (
  <svg {...base} {...props}>
    <path d="M21 8C12 33 12 58 29 75C40 86 60 86 71 75C88 58 88 33 79 8" />
    <path d="M37 15C31 35 31 54 41 64C46.5 69.5 53.5 69.5 59 64C69 54 69 35 63 15" />
  </svg>
);

/** Maillon de chaîne. Posé par deux, il en fait une. */
export const Link = (props) => (
  <svg {...base} {...props}>
    <rect x="24" y="6" width="52" height="88" rx="26" />
    <rect x="35" y="17" width="30" height="66" rx="15" />
  </svg>
);

/** Bulle à double contour. */
export const Bubble = (props) => (
  <svg {...base} {...props}>
    <circle cx="50" cy="50" r="47" />
    <circle cx="50" cy="50" r="35" />
  </svg>
);

/** Pétale, avec sa nervure. */
export const Petal = (props) => (
  <svg {...base} {...props}>
    <path d="M50 2C79 25 85 58 50 98C15 58 21 25 50 2Z" />
    <path d="M50 13C70 33 74 58 50 88" />
  </svg>
);

/** Filaments. Trois courbes lâchées, jamais parallèles. */
export const Strings = (props) => (
  <svg {...base} {...props}>
    <path d="M2 98C26 70 22 40 46 2" />
    <path d="M26 99C52 74 46 42 72 4" />
    <path d="M54 98C78 76 74 46 98 10" />
  </svg>
);

/** Rayons, de longueurs alternées pour éviter la rosace mécanique. */
export const Burst = (props) => {
  const rayons = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 16;
    const debut = 16;
    const fin = i % 2 === 0 ? 49 : 34;
    return (
      <path
        key={i}
        d={`M${(50 + Math.cos(angle) * debut).toFixed(2)} ${(50 + Math.sin(angle) * debut).toFixed(2)}L${(50 + Math.cos(angle) * fin).toFixed(2)} ${(50 + Math.sin(angle) * fin).toFixed(2)}`}
      />
    );
  });
  return (
    <svg {...base} {...props}>
      {rayons}
    </svg>
  );
};

/** Repère de calage : une croix et quatre équerres, comme sur une planche. */
export const Marker = (props) => (
  <svg {...base} {...props}>
    <path d="M50 14V86M14 50H86" />
    <path d="M4 22V4H22" />
    <path d="M78 4H96V22" />
    <path d="M96 78V96H78" />
    <path d="M22 96H4V78" />
  </svg>
);

export const MOTIFS = {
  star: Star,
  starSolid: StarSolid,
  horseshoe: Horseshoe,
  link: Link,
  bubble: Bubble,
  petal: Petal,
  strings: Strings,
  burst: Burst,
  marker: Marker,
};

export default MOTIFS;
