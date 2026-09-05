import styled from "styled-components";

import { education } from "../data/education";
import { pick, useLanguage, useTranslation } from "../i18n";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import TagList from "../components/ui/Tag";

const Timeline = styled.ol`
  position: relative;
  padding-left: clamp(1.5rem, 4vw, 3rem);

  /* Trait vertical continu : la colonne vertébrale de la timeline. */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.75rem;
    bottom: 0.75rem;
    width: 1px;
    background: ${(props) => props.theme.line};
  }
`;

const Entry = styled.li`
  position: relative;
  padding-bottom: clamp(2.5rem, 6vw, 4rem);

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: calc(-1 * clamp(1.5rem, 4vw, 3rem));
    top: 0.7rem;
    width: 9px;
    height: 9px;
    transform: translateX(-4px);
    background: ${(props) => props.theme.text};
  }
`;

const Head = styled.div`
  /* Une grille plutôt qu'un flex : l'année reste calée à droite même quand
     l'intitulé du diplôme passe sur deux lignes. */
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 1rem;

  h2 {
    /* Calé sur le mot le plus long des intitulés, « développement », pour
       qu'il tienne sans être coupé jusqu'à 375px de large. */
    font-size: clamp(1.35rem, 5.5vw, 2.35rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    overflow-wrap: break-word;
  }

  .period {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    color: ${(props) => props.theme.textFaint};
  }

  /* Sur mobile, l'année passe au-dessus du titre : côte à côte, elle ne
     laisserait pas assez de place aux intitulés longs. */
  ${media.sm`
    grid-template-columns: 1fr;
    gap: 0.4rem;

    .period {
      grid-row: 1;
    }
  `}
`;

const School = styled.p`
  margin-top: 0.35rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.textFaint};
`;

const Grade = styled.p`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.9rem;
  padding: 0.35rem 0.7rem;
  border: 1px solid ${(props) => props.theme.line};
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: ${(props) => props.theme.textSoft};

  strong {
    font-weight: 500;
    color: ${(props) => props.theme.text};
  }

  /* La mention suit la note dans le même cartouche, séparée du point qui
     sert de ponctuation partout ailleurs sur le site. */
  .mention::before {
    content: "·";
    margin-right: 0.5rem;
    color: ${(props) => props.theme.textFaint};
  }
`;

const Body = styled.p`
  margin: 1.25rem 0 1.5rem;
  max-width: 62ch;
  font-size: clamp(0.98rem, 1.3vw, 1.05rem);
  line-height: 1.7;
  color: ${(props) => props.theme.textSoft};
`;

const Education = () => {
  const t = useTranslation();
  const { language } = useLanguage();

  return (
  <PageShell
    title={t.education.title}
    description={t.education.seo}
  >
    <SectionHeader
      index={t.education.index}
      title={t.education.title}
      lead={t.education.lead}
    />

    <Timeline>
      {education.map((item, i) => (
        <Entry key={item.id}>
          <Reveal delay={i * 0.08}>
            <Head>
              <h2>{pick(item.degree, language)}</h2>
              {item.period ? (
                <span className="period">{item.period}</span>
              ) : null}
            </Head>

            {item.school ? <School>{pick(item.school, language)}</School> : null}

            {item.grade ? (
              <Grade>
                {pick(item.gradeLabel, language) ?? t.education.grade}
                {/* Le français colle une espace insécable avant le
                    deux-points, l'anglais n'en met aucune. */}
                {language === "fr" ? "\u00a0: " : ": "}
                <strong>{item.grade}</strong>
                {pick(item.mention, language) ? (
                  <span className="mention">
                    {pick(item.mention, language)}
                  </span>
                ) : null}
              </Grade>
            ) : null}

            {item.description ? (
              <Body>{pick(item.description, language)}</Body>
            ) : null}

            <TagList
              items={item.skills}
              label={`${t.education.skillsOf} ${pick(item.degree, language)}`}
            />
          </Reveal>
        </Entry>
      ))}
    </Timeline>
  </PageShell>
  );
};

export default Education;
