import { motion } from "framer-motion";
import styled from "styled-components";
import { mediaQueries } from "./Themes";

const Box = styled(motion.a)`
  backdrop-filter: blur(2px);
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  text-decoration: none;
  width: 15vw;
  height: 15vh;
  margin-top: 50%;
  margin-left: 70%;

  border: 2px solid ${(props) => props.theme.text};
  padding: 1rem;
  color: ${(props) => props.theme.text};

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.text};

    transition: all 0.3s ease;
  }

  ${mediaQueries(50)`
    width:calc(30vw);

  `};
  ${mediaQueries(30)`
    
    height:18rem;

  `};

  ${mediaQueries(25)`
    
    height:14rem;
    padding:0.8rem;
    backdrop-filter: none;

  `};
`;


const Title = styled.h3`
  color: inherit;
  padding: 0.5rem 0;
  padding-top: 1rem;
  font-family: "Karla", sans-serif;
  font-weight: 700;
  font-size:calc(2em + 1vw);
  ${mediaQueries(40)`
    font-size:calc(0.8em + 1vw);

  `};

  ${mediaQueries(25)`
    
    font-size:calc(0.6em + 1vw);



  `};

  border-bottom: 1px solid ${(props) => props.theme.text};

  ${Box}:hover & {
    border-bottom: 1px solid ${(props) => props.theme.body};
  }
`;


const Container = styled(motion.div)``;
const item = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: "spring", duration: 0.5 } },
};

const DocComponent = (props) => {
  const { name, link } = props.Doc;
  return (
    <Container variants={item}>
      <Box href={link} target="_blank" rel="noopener noreferrer">
        <Title>{name}</Title>
      </Box>
    </Container>
  );
};

export default DocComponent;
