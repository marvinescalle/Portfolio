import { useLayoutEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

import { layout, lightTheme } from "../../styles/theme";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { useTranslation } from "../../i18n";
import ScrollTop from "../ui/ScrollTop";
import Footer from "./Footer";
import Nav from "./Nav";

const Page = styled(motion.div)`
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* Signature de transition : un trait fin traverse l'écran à chaque
   changement de rubrique. Assez bref pour ne jamais retarder la navigation,
   assez présent pour que le changement se remarque. */
const Sweep = styled(motion.span)`
  position: fixed;
  top: ${layout.navHeight};
  left: 0;
  z-index: 60;
  width: 46vw;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${(props) => props.theme.text} 35%,
    ${(props) => props.theme.text} 65%,
    transparent 100%
  );
  pointer-events: none;
`;

const Main = styled(motion.main)`
  flex: 1;
  /* La page CV a besoin de plus de largeur que les pages de texte : deux
     colonnes de PDF côte à côte doivent rester lisibles. */
  max-width: ${(props) => (props.$wide ? layout.wideWidth : layout.maxWidth)};
  width: 100%;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 3.5rem) ${layout.gutter} 0;
`;

/**
 * Ossature commune à toutes les pages internes : navigation, contenu,
 * pied de page, thème et métadonnées.
 *
 * La page d'accueil ne l'utilise pas : elle garde sa propre composition
 * plein écran, sans barre de navigation.
 */
const PageShell = ({
  theme = lightTheme,
  title,
  description,
  wide = false,
  children,
}) => {
  const reduce = useReducedMotion();
  const t = useTranslation();
  useDocumentMeta(title, description);

  // La couleur de fond du document suit le thème de la page, sinon le
  // débordement élastique laisse apparaître un fond de la mauvaise couleur.
  // Posée avant peinture et sans restauration au démontage : rétablir
  // l'ancienne valeur ferait clignoter le fond entre deux pages.
  useLayoutEffect(() => {
    document.body.style.backgroundColor = theme.body;
  }, [theme.body]);

  return (
    <ThemeProvider theme={theme}>
      <Page
        /* Uniquement l'opacité : une transformation, même nulle, ferait de
           ce conteneur le bloc de référence des éléments en position fixed
           qu'il contient, ce qui déplacerait le menu mobile. Le léger
           mouvement d'entrée est porté par le contenu, plus bas. */
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: reduce ? 0 : 0.28,
          ease: [0.22, 0.61, 0.36, 1],
        }}
      >
        {reduce ? null : (
          <Sweep
            aria-hidden="true"
            initial={{ x: "-50vw", opacity: 0 }}
            animate={{ x: "116vw", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          />
        )}

        <a className="skip-link" href="#contenu">
          {t.common.skipToContent}
        </a>
        <Nav />
        <Main
          id="contenu"
          $wide={wide}
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {children}
        </Main>
        <Footer />
        <ScrollTop />
      </Page>
    </ThemeProvider>
  );
};

export default PageShell;
