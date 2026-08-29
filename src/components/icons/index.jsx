/**
 * Petites icônes de trait, dessinées à la même grille 24x24.
 * Elles héritent de la couleur du texte et sont décoratives par défaut :
 * l'intitulé accessible est porté par le lien ou le bouton qui les contient.
 */

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export const ArrowUpRight = (props) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowDown = (props) => (
  <svg {...base} {...props}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const Download = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M4 19h16" />
  </svg>
);

export const Mail = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

export const Github = (props) => (
  <svg {...base} {...props}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const Linkedin = (props) => (
  <svg {...base} {...props}>
    <path d="M16 8a5 5 0 0 1 5 5v7h-4v-7a1 1 0 0 0-2 0v7h-4v-7a5 5 0 0 1 5-5z" />
    <rect x="3" y="9" width="4" height="11" />
    <circle cx="5" cy="5" r="1.6" />
  </svg>
);

export const Instagram = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Menu = (props) => (
  <svg {...base} {...props}>
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </svg>
);

export const Close = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </svg>
);

/**
 * Symbole central de la page d'accueil, conservé depuis la première version
 * du portfolio : c'est l'élément le plus reconnaissable du site.
 */
export const YinYang = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      fill="currentColor"
      d="M30.22 15.32c3.56-2.62 7.61-3.68 11.12-4.03-.54.31-1.06.64-1.55 1.01-2.59 1.91-4.53 4.53-5.6 7.56-.11.3-.06.64.13.91.18.26.49.42.81.43 4.46.04 8.52 2.11 11.14 5.68 2.75 3.73 3.47 8.58 1.93 12.96-.93 2.65-2.63 4.94-4.9 6.62-3.01 2.22-6.71 3.13-10.4 2.57-3.7-.56-6.96-2.52-9.17-5.54-1.66-2.25-2.6-4.92-2.72-7.73C21.01 29.53 22.6 20.93 30.22 15.32zM57.49 76.01c-1.12 2.56-2.96 4.71-5.34 6.22-5.39 3.11-13.64 6.03-22.3 2.24-4.05-1.77-7-4.75-9.05-7.62.53.31 1.09.59 1.65.84 2.96 1.29 6.19 1.66 9.35 1.06.32-.06.59-.27.72-.56.14-.29.12-.63-.04-.91-2.19-3.88-2.43-8.43-.66-12.49 1.86-4.25 5.69-7.3 10.26-8.15 2.76-.52 5.59-.2 8.18.93 3.43 1.5 6.07 4.24 7.43 7.72C59.06 68.78 58.99 72.59 57.49 76.01zM87.86 61.86c0-.62-.03-1.24-.1-1.85-.36-3.2-1.66-6.19-3.75-8.63-.19-.22-.47-.35-.76-.35-.03 0-.06 0-.09 0-.32.03-.61.21-.77.49-2.26 3.84-6.09 6.32-10.49 6.81-4.61.52-9.16-1.28-12.19-4.8-1.83-2.13-2.97-4.75-3.28-7.55-.42-3.72.64-7.37 2.97-10.29 2.33-2.92 5.67-4.76 9.38-5.18 2.78-.31 5.56.21 8.05 1.51 5.39 3.11 12.04 8.8 13.09 18.19C90.42 54.6 89.31 58.65 87.86 61.86z"
    />
  </svg>
);
