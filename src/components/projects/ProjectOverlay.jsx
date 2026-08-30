import styled from "styled-components";
import { motion } from "framer-motion";

import OverlaySheet from "../overlay/OverlaySheet";
import TagList from "../ui/Tag";
import { ArrowUpRight, Github } from "../icons";
import { pick, useLanguage, useTranslation } from "../../i18n";







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
  const t = useTranslation();
  const { language } = useLanguage();
  const s = t.projects.sheet;

  const meta = [
    pick(project.type, language),
    pick(project.context, language),
    project.year,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <OverlaySheet
      label={project.title}
      meta={meta}
      onClose={onClose}
    >
      <Title>{project.title}</Title>
      {project.description ? (
        <Lead>{pick(project.description, language)}</Lead>
      ) : null}

      <Cover>
        {project.image ? (
          <img
            src={project.image}
            alt={`${t.projects.preview} ${project.title}`}
            loading="lazy"
          />
        ) : (
          <span className="placeholder" aria-hidden="true">
            {project.title}
          </span>
        )}
      </Cover>

      <TextBlock title={s.context} text={pick(project.context, language)} />
      <TextBlock title={s.objective} text={pick(project.objective, language)} />
      <TextBlock title={s.role} text={pick(project.role, language)} />
      <TextBlock
        title={s.project}
        text={pick(project.longDescription, language)}
      />
      <ListBlock title={s.challenges} items={pick(project.challenges, language)} />
      <ListBlock title={s.solutions} items={pick(project.solutions, language)} />
      <ListBlock title={s.results} items={pick(project.results, language)} />

      {project.stack?.length ? (
        <Block title={s.stack}>
          <TagList
            items={project.stack}
            label={`${s.stackOf} ${project.title}`}
          />
        </Block>
      ) : null}

      {project.gallery?.length ? (
        <Block title={s.gallery}>
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
              {s.github}
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
              {s.demo}
              <ArrowUpRight />
            </Action>
          ) : null}
        </Actions>
      ) : null}
    </OverlaySheet>
  );
};

export default ProjectOverlay;
