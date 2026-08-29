import styled from "styled-components";
import { Link } from "react-router-dom";

import PageShell from "../components/layout/PageShell";
import { ArrowRight } from "../components/icons";

const Wrap = styled.div`
  padding: clamp(3rem, 12vw, 8rem) 0;

  p.code {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: ${(props) => props.theme.textFaint};
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    text-transform: uppercase;
    margin: 1rem 0 1.5rem;
  }

  p.text {
    max-width: 42ch;
    color: ${(props) => props.theme.textSoft};
    margin-bottom: 2rem;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    border-bottom: 1px solid currentColor;
    padding-bottom: 0.2rem;
  }

  a svg {
    width: 16px;
    height: 16px;
  }
`;

const NotFound = () => (
  <PageShell title="Page introuvable">
    <Wrap>
      <p className="code">Erreur 404</p>
      <h1>Page introuvable</h1>
      <p className="text">
        Cette adresse ne correspond à aucune page du portfolio. Elle a peut-être
        changé lors de la refonte du site.
      </p>
      <Link to="/">
        Revenir à l'accueil
        <ArrowRight />
      </Link>
    </Wrap>
  </PageShell>
);

export default NotFound;
