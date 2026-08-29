import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";

//Components
import { YinYang } from "./AllSvgs";
import Intro from "./Intro";
import Loading from "../subComponents/Loading";
import { mediaQueries } from "./Themes";

const PowerButton = lazy(() => import("../subComponents/PowerButton"));
const SocialIcons = lazy(() => import("./../subComponents/SocialIcons"));

const LogoComponent = lazy(() => import("./../subComponents/LogoComponent"));

//   import SocialIcons from './../subComponents/SocialIcons';
// import LogoComponent from './../subComponents/LogoComponent';

const MainContainer = styled(motion.div)`
  background: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Karla", sans-serif;

    font-weight: 500;
  }

  h2 {
    ${mediaQueries(40)`
      font-size:1.2em;

  `};

    ${mediaQueries(30)`
      font-size:1em;

  `};
  }
`;

const Container = styled.div`
  padding: 2rem;
`;

const rotate = keyframes`
from {
    transform: rotate(0) ;
  }
  to {
    transform: rotate(360deg) ;
  }
`;
const Center = styled.button`
  position: absolute;
  top: ${(props) => (props.click ? "85%" : "50%")};
  left: ${(props) => (props.click ? "92%" : "50%")};
  transform: translate(-50%, -50%);
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;
  & > *:first-child {
    animation: ${rotate} infinite 1.5s linear;
  }
  & > *:last-child {
    display: ${(props) => (props.click ? "none" : "inline-block")};
    padding-top: 1rem;
  }

  @media only screen and (max-width: 50em) {
    top: ${(props) => (props.click ? "90%" : "50%")};
    left: ${(props) => (props.click ? "90%" : "50%")};
    width: ${(props) => (props.click ? "80px" : "150px")};
    height: ${(props) => (props.click ? "80px" : "150px")};
  }
  @media only screen and (max-width: 30em) {
    width: ${(props) => (props.click ? "40px" : "150px")};
    height: ${(props) => (props.click ? "40px" : "150px")};
  }
`;

const Contact = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`;
const Projet = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  position: absolute;
  top: 70%;
  right: calc(0px);
  transform: rotate(90deg) translate(-50%, -50%);
  z-index: 1;

  text-decoration: none;
  @media only screen and (max-width: 50em) {
    text-shadow: ${(props) => (props.click ? "0 0 4px #000" : "none")};
  }
`;
const Stages = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  position: absolute;
  top: 50%;
  right: calc(0px);
  transform: rotate(90deg) translate(-50%, -50%);
  z-index: 1;

  text-decoration: none;
  @media only screen and (max-width: 50em) {
    text-shadow: ${(props) => (props.click ? "0 0 4px #000" : "none")};
  }
`;
const Ressources = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  position: absolute;
  top: 50%;
  left: calc(1rem + 2vw);
  transform: translate(-50%, -50%) rotate(-90deg);
  z-index: 1;
  text-decoration: none;
  @media only screen and (max-width: 50em) {
    text-shadow: ${(props) => (props.click ? "0 0 4px #000" : "none")};
  }
`;
const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;

  display: flex;
  justify-content: space-evenly;
`;

const Apropos = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  text-decoration: none;
  z-index: 1;
`;
const Doc = styled(NavLink)`
  color: ${(props) => (props.click ? props.theme.body : props.theme.text)};
  text-decoration: none;
  z-index: 1;
`;
const Bts = styled(NavLink)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
`;
const DarkDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 50%;
  width: ${(props) => (props.click ? "50%" : "0%")};
  background-color: #000000;
  height: ${(props) => (props.click ? "100%" : "0%")};
  transition: height 0.5s ease, width 1s ease 0.5s;
  z-index: 1;

  ${(props) =>
    props.click
      ? mediaQueries(50)`
       height: 50%;
  right:0;
  
  width: 100%;
  transition: width 0.5s ease, height 1s ease 0.5s;

  `
      : mediaQueries(50)`
       height: 0;
  
  width: 0;
  `};
`;

/*
Music by <a href="/users/wataboi-12344345/?tab=audio&amp;utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=audio&amp;utm_content=1167">Wataboi</a> from <a href="https://pixabay.com/music/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=1167">Pixabay</a>
*/

const Main = () => {
  const [click, setClick] = useState(false);
  const [path, setpath] = useState("");

  const handleClick = () => setClick(!click);

  const moveY = {
    y: "-100%",
  };
  const moveX = {
    x: `${path === "Ressources" ? "100%" : "-100%"}`,
  };
  const mq = window.matchMedia("(max-width: 50em)").matches;

  return (
    <Suspense fallback={<Loading />}>
      <MainContainer
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={path === "Apropos" || path === "DocPage" || path === "Bts" ? moveY : moveX}
        transition={{ duration: 0.5 }}
      >
        <DarkDiv click={click} />
        <Container>
          <LogoComponent theme={click ? "dark" : "light"} />
          <PowerButton />
          {mq ? (
            <SocialIcons theme="light" />
          ) : (
            <SocialIcons theme={click ? "dark" : "light"} />
          )}
          <Center click={click}>
            {mq ? (
              <YinYang
                onClick={() => handleClick()}
                width={click ? 80 : 150}
                height={click ? 80 : 150}
                fill="currentColor"
              />
            ) : (
              <YinYang
                onClick={() => handleClick()}
                width={click ? 120 : 200}
                height={click ? 120 : 200}
                fill="currentColor"
              />
            )}

            <span>Cliquez ici</span>
          </Center>

          {mq ? (
            <Contact
              click={+click}
              target="_blank"
              to={{ pathname: "mailto:marvinescalle.pro@gmail.com" }}
            >
              <motion.h3
                initial={{
                  y: -200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Me contacter
              </motion.h3>
            </Contact>
          ) : (
            <Contact
              click={+false}
              target="_blank"
              to={{ pathname: "mailto:marvinescalle.pro@gmail.com" }}
            >
              <motion.h3
                initial={{
                  y: -200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Me contacter
              </motion.h3>
            </Contact>
          )}

          {mq ? (
            <Projet click={+click} onClick={() => setpath("Projets")} to="/Projets">
              <motion.h2
                initial={{
                  y: -200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Mes projets
              </motion.h2>
            </Projet>
          ) : (
            <Projet click={+false} onClick={() => setpath("Projets")} to="/Projets">
              <motion.h2
                initial={{
                  y: -200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Mes projets
              </motion.h2>
            </Projet>
          )}
          
          {mq ? (
            <Stages click={+click} onClick={() => setpath("Stages")} to="/Stages">
              <motion.h2
                initial={{
                  y: -200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Mes Projets
              </motion.h2>
            </Stages>
          ) : (
            <Stages click={+false} onClick={() => setpath("Stages")} to="/Stages">
              <motion.h2
                initial={{
                  y: -200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Mes Stages
              </motion.h2>
            </Stages>
          )}

          <Ressources click={+click} to="/Ressources">
            <motion.h2
              onClick={() => setpath("Ressources")}
              initial={{
                y: -200,
                transition: { type: "spring", duration: 1.5, delay: 1 },
              }}
              animate={{
                y: 0,
                transition: { type: "spring", duration: 1.5, delay: 1 },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Mes passions
            </motion.h2>
          </Ressources>

          <BottomBar>
            <Apropos
              onClick={() => setClick(false)}
              click={mq ? +false : +click}
              to="/Apropos"
            >
              <motion.h2
                onClick={() => setpath("Apropos")}
                initial={{
                  y: 200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                A propos
              </motion.h2>
            </Apropos>

            <Doc
              onClick={() => setClick(false)}
              click={mq ? +false : +click}
              to="/Documents"
            >
              <motion.h2
                onClick={() => setpath("/Documents")}
                initial={{
                  y: 200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Documents
              </motion.h2>
            </Doc>

            <Bts to="/Bts">
              <motion.h2
                onClick={() => setpath("Bts")}
                initial={{
                  y: 200,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                animate={{
                  y: 0,
                  transition: { type: "spring", duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Mes études
              </motion.h2>
            </Bts>
          </BottomBar>
        </Container>

        {click ? <Intro click={click} /> : null}
      </MainContainer>
    </Suspense>
  );
};

export default Main;
