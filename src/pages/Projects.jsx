import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { AnimatePresence } from "framer-motion";

import {
  archivedProjects,
  featuredProjects,
  findProject,
} from "../data/projects";
import ProjectOverlay from "../components/projects/ProjectOverlay";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import TagList from "../components/ui/Tag";
import { ArrowUpRight, Github } from "../components/icons";

/* Toutes les cartes ouvrent désormais une fiche : elles sont toutes
   cliquables, et le survol doit le dire clairement. */
const clickable = css`
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${(props) => props.theme.text};
  }

  &:hover .cover img,
  &:focus-visible .cover img {
    transform: scale(1.02);
  }

  &:hover .cta,
  &:focus-visible .cta {
    background-size: 100% 1px;
  }

  &:hover .cta svg,
  &:focus-visible .cta svg {
    transform: translate(2px, -2px);
  }
`;

const cardBase = css`
  display: block;
  position: relative;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.body};
  transition: border-color 0.35s ease;

  /* Le visuel retrouve ses couleurs au survol de la carte entière, qu'elle
     soit cliquable ou non. */
  &:hover .cover img {
    filter: grayscale(0);
  }

  ${clickable}
`;

const Cover = styled.div`
  position: relative;
  overflow: hidden;
  background: ${(props) => props.theme.surface};
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    /* Les visuels sont hétérogènes : captures d'écran et logos : le mode
       contain évite de rogner un titre ou un logo en plein milieu. */
    object-fit: contain;
    padding: 1.25rem;
    filter: grayscale(1);
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
      filter 0.6s ease;
  }

  /* Sans capture d'écran, on affiche une plaque typographique plutôt
     qu'une image générique. */
  .placeholder {
    font-family: ${(props) => props.theme.fontDisplay};
    font-weight: 800;
    font-size: clamp(1rem, 2.2vw, 1.75rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    padding: 1.25rem;
    text-align: center;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
`;

const FeaturedCard = styled.article`
  ${cardBase};
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);

  ${Cover} {
    aspect-ratio: auto;
    min-height: 20rem;
    border-right: 1px solid ${(props) => props.theme.line};
  }

  ${media.md`
    grid-template-columns: 1fr;

    ${Cover} {
      min-height: 0;
      aspect-ratio: 16 / 10;
      border-right: none;
      border-bottom: 1px solid rgba(10,10,10,0.14);
    }
  `}
`;

const Body = styled.div`
  padding: clamp(1.5rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Meta = styled.p`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 3.4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  line-height: 1;
`;

const Description = styled.p`
  font-size: 0.98rem;
  line-height: 1.7;
  color: ${(props) => props.theme.textSoft};
`;

const Cta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.82rem;
  align-self: flex-start;
  /* Le soulignement se dessine au survol de la carte entière. */
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1px;
  transition: background-size 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);

  svg {
    width: 15px;
    height: 15px;
    transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

const RepoBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.textSoft};

  svg {
    width: 17px;
    height: 17px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
  gap: 1.25rem;
`;

const SmallCard = styled.article`
  ${cardBase};
  display: flex;
  flex-direction: column;
  /* Le wrapper d'animation s'étire dans la grille : la carte doit le
     remplir pour que les cartes d'une même ligne s'alignent. */
  height: 100%;

  ${Body} {
    padding: 1.25rem;
    gap: 0.7rem;
  }

  ${Title} {
    font-size: 1.15rem;
    letter-spacing: -0.01em;
  }

  ${Description} {
    font-size: 0.87rem;
    line-height: 1.6;
  }
`;

const Block = styled.section`
  margin-top: clamp(3rem, 8vw, 5rem);

  &:first-of-type {
    margin-top: 0;
  }
`;

const BlockTitle = styled.h2`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
  padding-bottom: 1.25rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.text};
`;

const Note = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textFaint};
  max-width: 52ch;
  margin-bottom: 2rem;
`;

/** La carte ouvre la fiche du projet, à l'intérieur du portfolio. */
const cardLink = (project) => ({
  as: Link,
  to: `/projets/${project.id}`,
  "aria-label": `${project.title} : ouvrir la fiche du projet`,
});

const ProjectCover = ({ project }) => (
  <Cover className="cover">
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
);

const ProjectCta = () => (
  <Cta className="cta">
    Voir le projet
    <ArrowUpRight />
  </Cta>
);

const Projects = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = slug ? findProject(slug) : null;

  useBodyScrollLock(Boolean(project));

  const close = () => {
    // Revenir en arrière garde l'historique cohérent, sauf si la fiche est
    // le point d'entrée du visiteur : il quitterait alors le site.
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/projets", { replace: true });
  };

  return (
  <PageShell
    title="Projets"
    description="Projets réalisés par Marvin Escalle : développement web, automatisation et DevOps, ainsi que les archives des travaux étudiants."
  >
    <SectionHeader
      index="03"
      title="Projets"
      lead="Une sélection de réalisations, et les archives de mes travaux d'études."
    />

    {featuredProjects.length ? (
      <Block aria-labelledby="selection">
        <Reveal>
          <BlockTitle id="selection">Sélection</BlockTitle>
        </Reveal>

        {featuredProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <FeaturedCard
              {...cardLink(project)}
              style={{ marginBottom: "1.5rem" }}
            >
              {project.github ? (
                <RepoBadge aria-hidden="true">
                  <Github />
                </RepoBadge>
              ) : null}

              <ProjectCover project={project} />

              <Body>
                <Meta>
                  {[project.context, project.year].filter(Boolean).join(" · ")}
                </Meta>
                <Title>{project.title}</Title>
                <Description>{project.description}</Description>
                <TagList
                  items={project.stack}
                  label={`Technologies du projet ${project.title}`}
                />
                <ProjectCta />
              </Body>
            </FeaturedCard>
          </Reveal>
        ))}
      </Block>
    ) : null}

    {archivedProjects.length ? (
      <Block aria-labelledby="archives">
        <Reveal>
          <BlockTitle id="archives">Archives : projets étudiants</BlockTitle>
        </Reveal>
        <Reveal>
          <Note>
            Travaux réalisés pendant mes études, conservés à titre de parcours.
            Ils ne reflètent pas mon niveau actuel.
          </Note>
        </Reveal>

        <Grid>
          {archivedProjects.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.04, 0.3)}>
                <SmallCard {...cardLink(project)}>
                {project.github ? (
                  <RepoBadge aria-hidden="true">
                    <Github />
                  </RepoBadge>
                ) : null}

                <ProjectCover project={project} />

                <Body>
                  <Meta>{project.year}</Meta>
                  <Title>{project.title}</Title>
                  <Description>{project.description}</Description>
                  <TagList
                    items={project.stack}
                    label={`Technologies du projet ${project.title}`}
                  />
                  <ProjectCta />
                </Body>
              </SmallCard>
              </Reveal>
          ))}
        </Grid>
      </Block>
    ) : null}

    <AnimatePresence>
      {project ? (
        <ProjectOverlay
          key={project.id}
          project={project}
          onClose={close}
        />
      ) : null}
    </AnimatePresence>
  </PageShell>
  );
};

export default Projects;
