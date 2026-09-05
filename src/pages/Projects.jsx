import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { AnimatePresence } from "framer-motion";

import {
  featuredProjects,
  findProject,
  personalProjects,
  studentProjects,
} from "../data/projects";
import ProjectOverlay from "../components/projects/ProjectOverlay";
import { pick, useLanguage, useTranslation } from "../i18n";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import TagList from "../components/ui/Tag";
import { ArrowDown, ArrowUpRight, Github } from "../components/icons";

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
  /* Colonne bornée : une colonne implicite en largeur automatique prend la
     largeur minimale de son contenu, et un mot insécable de 441 px faisait
     gonfler la grille bien au-delà du cadre. La plaque déborde alors quoi
     qu'on lui demande, sa largeur maximale se mesurant à cette colonne
     devenue trop large. */
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
  /* Sert de référence à la plaque typographique ci-dessous, qui doit se
     mesurer à la largeur du cadre et non à celle de la fenêtre. */
  container-type: inline-size;

  img {
    width: 100%;
    height: 100%;
    /* Les visuels sont hétérogènes : captures d'écran et logos : le mode
       contain évite de rogner un titre ou un logo en plein milieu. */
    /* Une image en élément de grille reçoit une hauteur minimale automatique,
       déduite de sa largeur définie et de son rapport d'origine. Dès que ce
       rapport est plus haut que celui du cadre, ce plancher dépasse la hauteur
       demandée : l'image déborde et se retrouve plaquée vers le bas, rognée.
       Le schéma d'architecture, en 1,70, débordait ainsi de 41 px dans un
       cadre en 16/9. */
    min-height: 0;
    min-width: 0;
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
    line-height: 1.15;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    padding: 1.25rem;
    text-align: center;
    max-width: 100%;

    /* Un mot ne se coupe jamais en son milieu : « ISSUESREPORT » se lisait
       ISSUESREPO / RT, ce qui donne l'impression d'un défaut d'affichage.
       Le mot est donc conservé entier et c'est le corps qui cède.

       La variable porte la longueur du mot le plus long du titre. Le corps
       est le plus petit des deux : la valeur de confort, et celle qui fait
       tout juste tenir ce mot dans la largeur du cadre. Le coefficient est
       la chasse moyenne d'une capitale de Syne en graisse 800, mesurée à
       1,21 cadratin. La valeur retenue est franchement au-dessus : à 1,25 le
       mot tombait au pixel près sur la largeur disponible, et le moindre
       arrondi le renvoyait à la ligne.

       Une première déclaration en unités de fenêtre reste posée pour les
       navigateurs sans requête de conteneur : le titre y est simplement
       plus petit, jamais coupé. */
    font-size: clamp(0.9rem, 2.2vw, 1.75rem);
    font-size: min(1.75rem, calc((100cqw - 2.5rem) / var(--longest, 12) / 1.32));
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: none;
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
  /* Un titre passe à la ligne sur ses espaces, et ne se coupe qu'en dernier
     recours, si un mot seul dépasse vraiment la colonne. */
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: none;
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

/* Douze travaux d'études occupaient plus de place que tout le reste de la
   page réuni. Les plus récents restent visibles, la suite se déplie. Le
   bouton reprend le dessin des filets de section, sans rien introduire de
   nouveau dans le vocabulaire graphique. */
const MoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.75rem;
  padding: 0.85rem 1.4rem;
  border: 1px solid ${(props) => props.theme.line};
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSoft};
  transition: border-color 0.3s ease, color 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.35s ease;
  }

  &:hover,
  &:focus-visible {
    border-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
  }

  &:hover svg {
    transform: translateY(2px);
  }
`;

/** Nombre de travaux d'études affichés avant dépliage. */
const STUDENT_PREVIEW = 6;

/** La carte ouvre la fiche du projet, à l'intérieur du portfolio. */
const cardLink = (project, t, title) => ({
  as: Link,
  to: `/projets/${project.id}`,
  "aria-label": `${title} : ${t.projects.openSheet}`,
});

/** Longueur du mot le plus long, qui décide du corps de la plaque. */
const longestWord = (title) =>
  title.split(/\s+/).reduce((max, word) => Math.max(max, word.length), 1);

const ProjectCover = ({ project, title, alt }) => (
  <Cover className="cover">
    {project.image ? (
      <img
        src={project.image}
        alt={alt}
        loading="lazy"
      />
    ) : (
      <span
        className="placeholder"
        style={{ "--longest": longestWord(title) }}
        aria-hidden="true"
      >
        {title}
      </span>
    )}
  </Cover>
);

const ProjectCta = ({ label }) => (
  <Cta className="cta">
    {label}
    <ArrowUpRight />
  </Cta>
);

/** Grille de petites cartes, commune aux projets personnels et d'études. */
const ProjectGrid = ({ items, t, language, offset = 0, id }) => (
  <Grid id={id}>
    {items.map((project, i) => {
      const title = pick(project.title, language);
      return (
      <Reveal key={project.id} delay={Math.min((offset + i) * 0.04, 0.3)}>
        <SmallCard {...cardLink(project, t, title)}>
          {project.github ? (
            <RepoBadge aria-hidden="true">
              <Github />
            </RepoBadge>
          ) : null}

          <ProjectCover
            project={project}
            title={title}
            alt={`${t.projects.preview} ${title}`}
          />

          <Body>
            <Meta>{project.year}</Meta>
            <Title>{title}</Title>
            <Description>{pick(project.description, language)}</Description>
            <TagList
              items={project.stack}
              label={`${t.projects.sheet.stackOf} ${title}`}
            />
            <ProjectCta label={t.projects.see} />
          </Body>
        </SmallCard>
      </Reveal>
      );
    })}
  </Grid>
);

const Projects = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = useTranslation();
  const { language } = useLanguage();
  const project = slug ? findProject(slug) : null;
  const [allStudents, setAllStudents] = useState(false);

  useBodyScrollLock(Boolean(project));

  /* Le projet a été atteint par une de ses anciennes adresses : la fiche
     s'ouvre normalement, et la barre d'adresse est corrigée sans ajouter
     d'entrée dans l'historique. Un lien déjà partagé continue de marcher. */
  useEffect(() => {
    if (slug && project && project.id !== slug) {
      navigate(`/projets/${project.id}`, { replace: true });
    }
  }, [slug, project, navigate]);

  const close = () => {
    // Revenir en arrière garde l'historique cohérent, sauf si la fiche est
    // le point d'entrée du visiteur : il quitterait alors le site.
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/projets", { replace: true });
  };

  const students = allStudents
    ? studentProjects
    : studentProjects.slice(0, STUDENT_PREVIEW);

  return (
  <PageShell
    title={t.projects.title}
    description={t.projects.seo}
  >
    <SectionHeader
      index={t.projects.index}
      title={t.projects.title}
      lead={t.projects.lead}
      rule={false}
    />

    {featuredProjects.length ? (
      <Block aria-labelledby="selection">
        <Reveal>
          <BlockTitle id="selection">{t.projects.selection}</BlockTitle>
        </Reveal>

        {featuredProjects.map((project, i) => {
          const title = pick(project.title, language);
          return (
          <Reveal key={project.id} delay={i * 0.08}>
            <FeaturedCard
              {...cardLink(project, t, title)}
              style={{ marginBottom: "1.5rem" }}
            >
              {project.github ? (
                <RepoBadge aria-hidden="true">
                  <Github />
                </RepoBadge>
              ) : null}

              <ProjectCover
                project={project}
                title={title}
                alt={`${t.projects.preview} ${title}`}
              />

              <Body>
                <Meta>
                  {[pick(project.context, language), project.year]
                    .filter(Boolean)
                    .join(" · ")}
                </Meta>
                <Title>{title}</Title>
                <Description>{pick(project.description, language)}</Description>
                <TagList
                  items={project.stack}
                  label={`${t.projects.sheet.stackOf} ${title}`}
                />
                <ProjectCta label={t.projects.see} />
              </Body>
            </FeaturedCard>
          </Reveal>
          );
        })}
      </Block>
    ) : null}

    {personalProjects.length ? (
      <Block aria-labelledby="personnels">
        <Reveal>
          <BlockTitle id="personnels">{t.projects.personal}</BlockTitle>
        </Reveal>

        <ProjectGrid items={personalProjects} t={t} language={language} />
      </Block>
    ) : null}

    {studentProjects.length ? (
      <Block aria-labelledby="etudes">
        <Reveal>
          <BlockTitle id="etudes">{t.projects.student}</BlockTitle>
        </Reveal>
        <Reveal>
          <Note>{t.projects.studentNote}</Note>
        </Reveal>

        <ProjectGrid
          id="grille-etudes"
          items={students}
          t={t}
          language={language}
        />

        {/* Vrai bouton de dépliage, réversible et annoncé comme tel : il
            reste en place une fois ouvert plutôt que de disparaître sous le
            doigt de celui qui vient de l'actionner. */}
        {studentProjects.length > STUDENT_PREVIEW ? (
          <Reveal>
            <MoreButton
              type="button"
              aria-expanded={allStudents}
              aria-controls="grille-etudes"
              onClick={() => setAllStudents((ouvert) => !ouvert)}
            >
              {allStudents ? t.projects.seeFewerStudent : t.projects.seeAllStudent}
              <ArrowDown style={allStudents ? { transform: "rotate(180deg)" } : undefined} />
            </MoreButton>
          </Reveal>
        ) : null}
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
