import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

import { layout, lightTheme } from "../../styles/theme";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import Footer from "./Footer";
import Nav from "./Nav";

const Page = styled(motion.div)`
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: ${layout.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 6rem) ${layout.gutter} 0;
`;

/**
 * Ossature commune à toutes les pages internes : navigation, contenu,
 * pied de page, thème et métadonnées.
 *
 * La page d'accueil ne l'utilise pas : elle garde sa propre composition
 * plein écran, sans barre de navigation.
 */
const PageShell = ({ theme = lightTheme, title, description, children }) => {
  const reduce = useReducedMotion();
  useDocumentMeta(title, description);

  // La couleur de fond du document suit le thème de la page, sinon le
  // débordement élastique laisse apparaître un fond de la mauvaise couleur.
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = theme.body;
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, [theme.body]);

  return (
    <ThemeProvider theme={theme}>
      <Page
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
      >
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Nav />
        <Main id="contenu">{children}</Main>
        <Footer />
      </Page>
    </ThemeProvider>
  );
};

export default PageShell;
