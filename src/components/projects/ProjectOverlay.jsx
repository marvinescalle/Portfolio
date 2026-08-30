import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

import { layout, media } from "../../styles/theme";
import TagList from "../ui/Tag";
import { ArrowUpRight, Close, Github } from "../icons";

/* ────────────────────────────────────────────────────────────────────────
   Fiche projet en surimpression. La liste reste visible derrière, et
   conserve sa position de défilement : la fiche est une couche, pas une
   page qui remplace la précédente.

   L'adresse change malgré tout, ce qui rend chaque fiche partageable, et
   permet à Précédent et Suivant de la fermer et de la rouvrir.
   ──────────────────────────────────────────────────────────────────────── */

/* Racine unique : AnimatePresence n'anime la sortie que de son enfant
   direct, les deux couches doivent donc vivre sous un même parent animé. */
const Root = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.55);
`;

const Sheet = styled(motion.div)`
  position: fixed;
  z-index: 101;
  top: 4vh;
  bottom: 4vh;
  left: 50%;
  width: min(1100px, 92vw);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.text};
  overflow: hidden;

  ${media.md`
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: none;
    border: 0;
  `}
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem clamp(1.25rem, 3vw, 2.5rem);
  border-bottom: 1px solid ${(props) => props.theme.line};
  flex: 0 0 auto;

  .meta {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
  }
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  svg {
    width: 16px;
    height: 16px;
  }
`;

/* Le défilement a lieu ici, jamais sur la page derrière. */
const Scroller = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.5rem)
    clamp(2.5rem, 6vw, 4rem);
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 5.5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  line-height: 0.95;
`;

const Lead = styled.p`
  margin-top: 1.25rem;
  max-width: 62ch;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.7;
  color: ${(props) => props.theme.text};
`;

const Cover = styled(motion.div)`
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: clamp(1rem, 2vw, 2rem);
  }

  .placeholder {
    font-family: ${(props) => props.theme.fontDisplay};
    font-weight: 800;
    font-size: clamp(1rem, 3vw, 2rem);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    padding: 1.5rem;
    text-align: center;
    overflow-wrap: anywhere;
  }
`;

const Section = styled.section`
  margin-top: clamp(2rem, 5vw, 3.25rem);

  h3 {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    padding-bottom: 0.85rem;
    border-bottom: 1px solid ${(props) => props.theme.line};
    margin-bottom: 1.25rem;
  }

  p {
    max-width: 62ch;
    line-height: 1.7;
    color: ${(props) => props.theme.textSoft};
  }

  p + p {
    margin-top: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 62ch;
  }

  .list li {
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.6;
    color: ${(props) => props.theme.textSoft};
  }

  .list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 0.75rem;
    height: 1px;
    background: ${(props) => props.theme.lineStrong};
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;

  figure {
    border: 1px solid ${(props) => props.theme.line};
    background: ${(props) => props.theme.surface};
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: clamp(2rem, 5vw, 3rem);
  padding-top: clamp(1.5rem, 4vw, 2.25rem);
  border-top: 1px solid ${(props) => props.theme.text};
`;

const Action = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.4rem;
  border: 1px solid ${(props) => props.theme.text};
  font-size: 0.85rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }

  &.ghost {
    border-color: ${(props) => props.theme.line};
  }

  &.ghost:hover {
    border-color: ${(props) => props.theme.text};
  }
`;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

const Block = ({ title, children }) =>
  children ? (
    <Section>
      <h3>{title}</h3>
      {children}
    </Section>
  ) : null;

const TextBlock = ({ title, text }) =>
  text ? (
    <Block title={title}>
      {String(text)
        .split("\n\n")
        .map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
    </Block>
  ) : null;

const ListBlock = ({ title, items }) =>
  items?.length ? (
    <Block title={title}>
      <ul className="list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Block>
  ) : null;

const ProjectOverlay = ({ project, onClose }) => {
  const sheetRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      // Piège à focus : la tabulation ne sort pas de la fiche tant qu'elle
      // est ouverte.
      const nodes = sheetRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      // Le focus revient sur la carte d'où l'on vient.
      if (returnFocusRef.current instanceof HTMLElement) {
        returnFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  const meta = [project.type, project.context, project.year]
    .filter(Boolean)
    .join(" · ");

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 32 };

  return createPortal(
    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.22 }}
    >
      <Backdrop onClick={onClose} />

      <Sheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        layoutId={reduce ? undefined : `project-${project.id}`}
        initial={reduce ? { opacity: 0 } : undefined}
        animate={reduce ? { opacity: 1 } : undefined}
        exit={reduce ? { opacity: 0 } : undefined}
        transition={spring}
      >
        <Bar>
          <span className="meta">{meta}</span>
          <CloseButton type="button" onClick={onClose} ref={closeRef}>
            Fermer
            <Close />
          </CloseButton>
        </Bar>

        <Scroller>
          <Title>{project.title}</Title>
          {project.description ? <Lead>{project.description}</Lead> : null}

          <Cover>
            {project.image ? (
              <img
                src={project.image}
                alt={`Aperçu du projet ${project.title}`}
                loading="lazy"
              />
            ) : (
              <span className="placeholder" aria-hidden="true">
                {project.title}
              </span>
            )}
          </Cover>

          <TextBlock title="Contexte" text={project.context} />
          <TextBlock title="Objectif" text={project.objective} />
          <TextBlock title="Mon rôle" text={project.role} />
          <TextBlock title="Le projet" text={project.longDescription} />
          <ListBlock title="Difficultés" items={project.challenges} />
          <ListBlock title="Solutions" items={project.solutions} />
          <ListBlock title="Résultat" items={project.results} />

          {project.stack?.length ? (
            <Block title="Stack">
              <TagList
                items={project.stack}
                label={`Technologies du projet ${project.title}`}
              />
            </Block>
          ) : null}

          {project.gallery?.length ? (
            <Block title="Captures">
              <Gallery>
                {project.gallery.map((shot) => (
                  <figure key={shot.src}>
                    <img src={shot.src} alt={shot.alt ?? ""} loading="lazy" />
                  </figure>
                ))}
              </Gallery>
            </Block>
          ) : null}

          {project.github || project.demo ? (
            <Actions>
              {project.github ? (
                <Action
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir sur GitHub
                  <Github />
                </Action>
              ) : null}
              {project.demo ? (
                <Action
                  className="ghost"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir la démo
                  <ArrowUpRight />
                </Action>
              ) : null}
            </Actions>
          ) : null}
        </Scroller>
      </Sheet>
    </Root>,
    document.body
  );
};

export default ProjectOverlay;
