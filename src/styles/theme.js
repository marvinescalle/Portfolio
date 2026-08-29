/**
 * Jetons de design du portfolio.
 *
 * L'identité repose sur un contraste noir / blanc cassé très marqué : deux
 * thèmes seulement, l'un l'exact négatif de l'autre. Les sections sombres
 * (Passions, Contact) utilisent `darkTheme`, le reste `lightTheme`.
 */

const shared = {
  fontDisplay: "'Syne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontBody: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontMono: "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
};

export const lightTheme = {
  ...shared,
  name: "light",
  body: "#FCF6F4",
  text: "#0A0A0A",
  textSoft: "rgba(10, 10, 10, 0.66)",
  textFaint: "rgba(10, 10, 10, 0.42)",
  line: "rgba(10, 10, 10, 0.14)",
  lineStrong: "rgba(10, 10, 10, 0.3)",
  surface: "rgba(10, 10, 10, 0.035)",
  inverseBody: "#0A0A0A",
  inverseText: "#FCF6F4",
};

export const darkTheme = {
  ...shared,
  name: "dark",
  body: "#0A0A0A",
  text: "#FCF6F4",
  textSoft: "rgba(252, 246, 244, 0.68)",
  textFaint: "rgba(252, 246, 244, 0.44)",
  line: "rgba(252, 246, 244, 0.16)",
  lineStrong: "rgba(252, 246, 244, 0.34)",
  surface: "rgba(252, 246, 244, 0.05)",
  inverseBody: "#FCF6F4",
  inverseText: "#0A0A0A",
};

/** Points de rupture, en pixels. */
export const breakpoints = {
  xs: 400,
  sm: 640,
  md: 860,
  lg: 1100,
  xl: 1400,
};

/**
 * Media queries « jusqu'à » : media.md`...` s'applique sous 860px.
 * Utilisable directement dans un template styled-components.
 */
export const media = Object.entries(breakpoints).reduce((acc, [key, px]) => {
  acc[key] = (strings, ...values) => {
    const css = strings.reduce(
      (out, chunk, i) => out + chunk + (values[i] ?? ""),
      ""
    );
    return `@media (max-width: ${px}px) { ${css} }`;
  };
  return acc;
}, {});

/** Largeur maximale du contenu et gouttière latérale. */
export const layout = {
  maxWidth: "1240px",
  gutter: "clamp(1.25rem, 5vw, 5rem)",
  navHeight: "5.5rem",
};
