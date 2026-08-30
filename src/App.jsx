import { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./styles/GlobalStyle";
import { lightTheme } from "./styles/theme";
import Loading from "./components/ui/Loading";
import { markIntroPlayed } from "./components/intro/introState";
import { AmbienceProvider } from "./components/audio/AmbienceProvider";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Education = lazy(() => import("./pages/Education"));
const Passions = lazy(() => import("./pages/Passions"));
const Cv = lazy(() => import("./pages/Cv"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Si la session ne démarre pas sur l'accueil, l'intro est considérée comme
 * consommée : elle ne doit pas surgir plus tard, au milieu d'une visite.
 */
const ConsumeIntroOutsideHome = () => {
  useEffect(() => {
    if (window.location.pathname !== "/") markIntroPlayed();
  }, []);

  return null;
};

/** Première partie du chemin, qui identifie la section. */
const sectionOf = (pathname) => `/${pathname.split("/")[1] ?? ""}`;

/**
 * Remet la page en haut au changement de section, mais pas lorsqu'on ouvre
 * ou referme une fiche projet : la liste doit garder sa position.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    if (sectionOf(previous.current) !== sectionOf(pathname)) {
      window.scrollTo(0, 0);
    }
    previous.current = pathname;
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={lightTheme}>
      <AmbienceProvider>
      <GlobalStyle />
      <ScrollToTop />
      <ConsumeIntroOutsideHome />

      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={sectionOf(location.pathname)}>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/experiences" element={<Experience />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/projets/:slug" element={<Projects />} />
            <Route path="/formation" element={<Education />} />
            <Route path="/passions" element={<Passions />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="/contact" element={<Contact />} />

            {/* Anciennes URL de la version 1 : les liens déjà partagés
                continuent de fonctionner. */}
            <Route path="/Apropos" element={<Navigate to="/a-propos" replace />} />
            <Route path="/Stages" element={<Navigate to="/experiences" replace />} />
            <Route path="/Projets" element={<Navigate to="/projets" replace />} />
            <Route path="/Bts" element={<Navigate to="/formation" replace />} />
            <Route path="/Ressources" element={<Navigate to="/passions" replace />} />
            <Route path="/Documents" element={<Navigate to="/cv" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      </AmbienceProvider>
    </ThemeProvider>
  );
}

export default App;
