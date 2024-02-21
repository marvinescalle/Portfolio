import { Switch, Route, useLocation } from "react-router-dom";
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
// const Cv = lazy(() => import("./components/CvMarvin"));
const SoundBar = lazy(() => import("./subComponents/SoundBar"));

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>
        <Suspense fallback={<Loading />}>
          <SoundBar />

          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Main} />

              <Route exact path="/Apropos" component={Apropos} />

              <Route exact path="/Projets" component={ProjetPage} />

              <Route exact path="/Stages" component={StagesPage} />

              <Route exact path="/Documents" component={DocPage} />

              <Route exact path="/Ressources" component={RessourcesPage} />

              <Route exact path="/Bts" component={Bts} />

              {/* <Route exact path="/CvMarvin" component={Cv} /> */}
            </Switch>
          </AnimatePresence>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
