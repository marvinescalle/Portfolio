import styled from "styled-components";

import { education } from "../data/education";
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
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  h2 {
    font-size: clamp(1.5rem, 3.4vw, 2.35rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }

  .period {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    color: ${(props) => props.theme.textFaint};
  }
`;

const School = styled.p`
  margin-top: 0.35rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.textFaint};
`;

const Body = styled.p`
  margin: 1.25rem 0 1.5rem;
  max-width: 62ch;
  font-size: clamp(0.98rem, 1.3vw, 1.05rem);
  line-height: 1.7;
  color: ${(props) => props.theme.textSoft};
`;

const Education = () => (
  <PageShell
    title="Formation"
    description="Baccalauréat STMG, BTS SIO, Bachelor Informatique et Master DevOps chez Ynov : du développement et des bases de données vers l'infrastructure et l'automatisation."
  >
    <SectionHeader
      index="04"
      title="Formation"
      lead="Un parcours qui part du développement et des bases de données pour aller vers l'infrastructure et l'automatisation."
    />

    <Timeline>
      {education.map((item, i) => (
        <Entry key={item.id}>
          <Reveal delay={i * 0.08}>
            <Head>
              <h2>{item.degree}</h2>
              {item.period ? (
                <span className="period">{item.period}</span>
              ) : null}
            </Head>

            {item.school ? <School>{item.school}</School> : null}
            {item.description ? <Body>{item.description}</Body> : null}

            <TagList
              items={item.skills}
              label={`Compétences travaillées : ${item.degree}`}
            />
          </Reveal>
        </Entry>
      ))}
    </Timeline>
  </PageShell>
);

export default Education;
