import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./styles/GlobalStyle";
import SkinProvider, { useTone } from "./theme/SkinProvider";
import Loading from "./components/ui/Loading";
import { markIntroPlayed } from "./components/intro/introState";
import RouteCurtain, {
  useCurtain,
} from "./components/transition/RouteCurtain";
import { AmbienceProvider } from "./components/audio/AmbienceProvider";
import { LanguageProvider } from "./i18n";

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

function Portfolio() {
  const location = useLocation();
  const theme = useTone("light");

  // La page affichée est volontairement en retard sur l'adresse : elle ne
  // change qu'une fois l'écran couvert par le rideau.
  const [displayed, setDisplayed] = useState(location);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (location.key === displayed.key) return;

    // Ouvrir ou refermer une fiche reste dans la même rubrique : aucun
    // rideau, et surtout aucune remise à zéro du défilement.
    if (sectionOf(location.pathname) === sectionOf(displayed.pathname)) {
      setDisplayed(location);
      return;
    }

    setTarget(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { phase, handleComplete } = useCurtain(target, (next) => {
    setDisplayed(next ?? location);
    setTarget(null);
    window.scrollTo(0, 0);
  });

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
      <AmbienceProvider>
      <GlobalStyle />
      <ConsumeIntroOutsideHome />

      <Suspense fallback={<Loading />}>
        <Routes location={displayed} key={sectionOf(displayed.pathname)}>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/experiences" element={<Experience />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/projets/:slug" element={<Projects />} />
            <Route path="/formation" element={<Education />} />
            <Route path="/passions" element={<Passions />} />
            <Route path="/passions/:slug" element={<Passions />} />
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
      </Suspense>

      <RouteCurtain phase={phase} onComplete={handleComplete} />
      </AmbienceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * La peau est choisie au-dessus de tout le reste : elle décide des thèmes que
 * verront le ThemeProvider de l'application comme ceux des pages, sans
 * qu'aucune page ait à la connaître.
 */
function App() {
  return (
    <SkinProvider>
      <Portfolio />
    </SkinProvider>
  );
}

export default App;
