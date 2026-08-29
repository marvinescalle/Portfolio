import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import GlobalStyle from "./globalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/Themes";
import Loading from "./subComponents/Loading";

//Components
const Main = lazy(() => import("./components/Main"));
const Apropos = lazy(() => import("./components/Apropos"));
const Bts = lazy(() => import("./components/Bts"));
const ProjetPage = lazy(() => import("./components/Projet"));
const StagesPage = lazy(() => import("./components/Stages"));
const DocPage = lazy(() => import("./components/DocPage"));
const RessourcesPage = lazy(() => import("./components/RessourcesPage"));
const SoundBar = lazy(() => import("./subComponents/SoundBar"));

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>
        <Suspense fallback={<Loading />}>
          <SoundBar />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Main />} />

              <Route path="/Apropos" element={<Apropos />} />

              <Route path="/Projets" element={<ProjetPage />} />

              <Route path="/Stages" element={<StagesPage />} />

              <Route path="/Documents" element={<DocPage />} />

              <Route path="/Ressources" element={<RessourcesPage />} />

              <Route path="/Bts" element={<Bts />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
