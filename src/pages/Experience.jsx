import styled from "styled-components";

import { mainExperiences, secondaryExperiences } from "../data/experience";
import { pick, useLanguage, useTranslation } from "../i18n";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import TagList from "../components/ui/Tag";
import { ArrowUpRight } from "../components/icons";

const MainList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 3.5rem);
`;

const Card = styled.article`
  border: 1px solid ${(props) => props.theme.text};
  padding: clamp(1.5rem, 3.5vw, 3rem);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  background: ${(props) => props.theme.body};
  transition: background-color 0.4s ease, color 0.4s ease;

  ${media.md`
    grid-template-columns: 1fr;
    gap: 1.75rem;
  `}
`;

/* Accroche visuelle en tête de carte : le logo de l'entreprise, ou son
   initiale tant qu'aucun fichier n'a été déposé. */
const Logo = styled.div`
  /* Deux formats distincts. Sans logo, un carré porte l'initiale. Avec logo,
     un cadre allongé : les logotypes d'entreprise sont des mots, souvent très
     larges, et un cadre carré les réduirait à un filet de quelques pixels de
     haut. Celui de Thales fait 8,4 pour 1. */
  width: ${(props) =>
    props.$hasLogo ? "clamp(9rem, 15vw, 12rem)" : "clamp(3.75rem, 6vw, 5rem)"};
  height: ${(props) =>
    props.$hasLogo ? "clamp(3rem, 4.5vw, 3.5rem)" : "clamp(3.75rem, 6vw, 5rem)"};
  margin-bottom: 1.5rem;
  border: 1px solid ${(props) => props.theme.lineStrong};
  display: grid;
  place-items: center;
  padding: ${(props) => (props.$hasLogo ? "0.5rem 0.8rem" : "0")};
  overflow: hidden;

  img {
    /* Dimensionner par max-width et max-height avec des dimensions
       automatiques ne suffit pas : la largeur maximale est appliquée en
       premier, et la hauteur qui en découle peut dépasser le cadre sans être
       ramenée dedans. Le logo Fiscalyse débordait ainsi de 8 px et se
       retrouvait plaqué contre le bord inférieur. On remplit donc le cadre et
       c'est object-fit qui inscrit le logo dedans, en le centrant. */
    width: 100%;
    height: 100%;
    /* Un élément de grille a une hauteur minimale automatique, déduite de sa
       largeur définie et du rapport d'origine de l'image. Pour Fiscalyse cela
       valait 44 px contre les 36 px du cadre : la hauteur imposée ici était
       donc écrasée, l'image débordait et se retrouvait plaquée en bas. Le
       logo Thales y échappait, son rapport très allongé donnant un minimum
       inférieur à la hauteur du cadre. */
    min-height: 0;
    min-width: 0;
    object-fit: contain;
  }

  span {
    font-family: ${(props) => props.theme.fontDisplay};
    font-weight: 800;
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    line-height: 1;
    color: ${(props) => props.theme.textFaint};
  }
`;

const Identity = styled.div`
  h2 {
    font-size: clamp(1.5rem, 4.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    text-transform: uppercase;
    line-height: 0.95;
  }

  .role {
    margin-top: 0.9rem;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    font-weight: 500;
  }

  .meta {
    margin-top: 0.35rem;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
  }
`;

const Site = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.25rem;
  font-size: 0.82rem;
  border-bottom: 1px solid ${(props) => props.theme.lineStrong};
  padding-bottom: 0.15rem;
  transition: border-color 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    border-color: ${(props) => props.theme.text};
  }
`;

const Detail = styled.div`
  .summary {
    font-size: clamp(1rem, 1.4vw, 1.08rem);
    line-height: 1.7;
    color: ${(props) => props.theme.text};
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${(props) => props.theme.line};
  }

  /* Ciblage par classe, et non par balise : la liste des technologies est
     elle aussi un <ul> enfant direct de ce bloc. */
  .highlights {
    margin: 1.5rem 0 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.05rem;
  }

  .highlights li {
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${(props) => props.theme.textSoft};
  }

  .highlights li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 0.75rem;
    height: 1px;
    background: ${(props) => props.theme.lineStrong};
  }

  /* Le domaine d'activité nomme le point, la phrase le détaille. Six blocs
     titrés se survolent d'un coup d'oeil là où six paragraphes nus
     obligeraient à tout lire pour trouver ce qu'on cherche. */
  .highlights .domain {
    display: block;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.text};
    margin-bottom: 0.3rem;
  }
`;

const Secondary = styled.section`
  margin-top: clamp(4rem, 10vw, 7rem);
`;

const SecondaryTitle = styled.h2`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${(props) => props.theme.text};
`;

const Row = styled.article`
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 1.5rem;
  align-items: baseline;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.line};

  .year {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.78rem;
    color: ${(props) => props.theme.textFaint};
  }

  h3 {
    font-family: ${(props) => props.theme.fontBody};
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0;
  }

  .role {
    display: block;
    font-size: 0.85rem;
    font-weight: 400;
    color: ${(props) => props.theme.textFaint};
    margin-top: 0.15rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: ${(props) => props.theme.textSoft};
  }

  ${media.md`
    grid-template-columns: 4rem minmax(0, 1fr);
    gap: 0.5rem 1rem;

    p { grid-column: 2; }
  `}
`;

const Experience = () => {
  const t = useTranslation();
  const { language } = useLanguage();

  return (
  <PageShell
    title={t.experience.title}
    description={t.experience.seo}
  >
    <SectionHeader
      index={t.experience.index}
      title={t.experience.title}
      lead={t.experience.lead}
      rule={false}
    />

    <MainList>
      {mainExperiences.map((job, i) => (
        <Reveal key={job.id} delay={i * 0.08}>
          <Card>
            <Identity>
              <Logo $hasLogo={Boolean(job.logo)}>
                {job.logo ? (
                  <img src={job.logo} alt={`${t.experience.logoOf} ${job.company}`} />
                ) : (
                  <span aria-hidden="true">{job.company.charAt(0)}</span>
                )}
              </Logo>

              <h2>{job.company}</h2>
              <p className="role">
                {pick(job.role, language)} · {pick(job.contract, language)}
              </p>
              {job.period || job.location ? (
                <p className="meta">
                  {[job.period, job.location].filter(Boolean).join(" · ")}
                </p>
              ) : null}

              {job.website ? (
                <Site
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.experience.website}
                  <ArrowUpRight />
                </Site>
              ) : null}
            </Identity>

            <Detail>
              <p className="summary">{pick(job.summary, language)}</p>

              <ul className="highlights">
                {pick(job.highlights, language).map((point) =>
                  typeof point === "string" ? (
                    <li key={point}>{point}</li>
                  ) : (
                    <li key={point.label}>
                      <span className="domain">{point.label}</span>
                      {point.text}
                    </li>
                  )
                )}
              </ul>

              <TagList
                items={job.stack}
                label={`${t.experience.stackOf} ${job.company}`}
              />
            </Detail>
          </Card>
        </Reveal>
      ))}
    </MainList>

    <Secondary aria-labelledby="autres-experiences">
      <Reveal>
        <SecondaryTitle id="autres-experiences">
          {t.experience.others}
        </SecondaryTitle>
      </Reveal>

      {secondaryExperiences.map((job, i) => (
        <Reveal key={job.id} delay={i * 0.04}>
          <Row>
            <span className="year">{job.year}</span>
            <h3>
              {pick(job.company, language)}
              <span className="role">{pick(job.role, language)}</span>
            </h3>
            <p>{pick(job.summary, language)}</p>
          </Row>
        </Reveal>
      ))}
    </Secondary>
  </PageShell>
  );
};

export default Experience;
