import { createGlobalStyle } from "styled-components";
import { layout, media } from "./theme";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  /* Les utilisateurs qui demandent moins d'animation ne subissent ni le
     défilement animé, ni les transitions décoratives. */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: ${(props) => props.theme.fontBody};
    font-size: 1rem;
    line-height: 1.65;
    font-weight: 400;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.6s ease, color 0.6s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    /* normalize.css repose une marge sur h1 via un sélecteur de type, plus
       spécifique que le reset universel : il faut la neutraliser ici. */
    margin: 0;
    font-family: ${(props) => props.theme.fontDisplay};
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img, svg, video {
    display: block;
    max-width: 100%;
  }

  ul, ol {
    list-style: none;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Focus visible uniquement au clavier, jamais masqué. */
  :focus-visible {
    outline: 2px solid ${(props) => props.theme.text};
    outline-offset: 3px;
    border-radius: 2px;
  }

  ::selection {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }

  /* Lien d'évitement pour la navigation au clavier. */
  .skip-link {
    position: absolute;
    left: ${layout.gutter};
    top: -100px;
    z-index: 999;
    padding: 0.75rem 1.25rem;
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: top 0.2s ease;
  }

  .skip-link:focus {
    top: 1rem;
  }

  /* Contenu réservé aux lecteurs d'écran. */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  ${media.sm`
    body { font-size: 0.975rem; }
  `}
`;

export default GlobalStyle;
