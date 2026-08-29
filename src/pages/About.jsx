import styled from "styled-components";

import portrait from "../assets/optimized/portrait-about.jpg";
import { profile } from "../data/profile";
import { skillGroups } from "../data/skills";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";

const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;

  ${media.md`
    grid-template-columns: 1fr;
  `}
`;

const Prose = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 62ch;

  p {
    font-size: clamp(1rem, 1.35vw, 1.1rem);
    line-height: 1.75;
    color: ${(props) => props.theme.textSoft};
  }

  /* Le premier paragraphe porte l'essentiel : il est plus présent. */
  p:first-child {
    font-size: clamp(1.15rem, 1.9vw, 1.4rem);
    line-height: 1.55;
    color: ${(props) => props.theme.text};
  }

  strong {
    color: ${(props) => props.theme.text};
    font-weight: 500;
  }
`;

const Portrait = styled.figure`
  position: sticky;
  top: 8rem;
  max-width: 22rem;
  margin-left: auto;
  border-top: 1px solid ${(props) => props.theme.text};
  padding-top: 1rem;

  /* Le fond doit être posé juste derrière l'image : le mode multiply se
     mélange avec ce qui est peint dans le même contexte d'empilement, et
     l'animation d'apparition en isole le contenu. */
  .frame {
    background: ${(props) => props.theme.body};
    overflow: hidden;
  }

  img {
    width: 100%;
    mix-blend-mode: multiply;
    filter: grayscale(1) contrast(1.05);
    transition: filter 0.7s ease;
  }

  &:hover img {
    filter: grayscale(0) contrast(1);
  }

  figcaption {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    padding-top: 0.75rem;
  }

  ${media.md`
    position: static;
    max-width: 18rem;
  `}
`;

const Skills = styled.section`
  margin-top: clamp(4rem, 10vw, 7rem);
`;

const SkillsTitle = styled.h2`
  font-size: clamp(0.75rem, 1.4vw, 0.8rem);
  font-family: ${(props) => props.theme.fontMono};
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.text};
`;

const Groups = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
`;

const Group = styled.div`
  /* Le wrapper d'apparition s'étire dans la grille : sans cela les filets
     d'une même ligne ne s'alignent pas. */
  height: 100%;
  padding: 2rem 1.5rem 2.25rem 0;
  border-bottom: 1px solid ${(props) => props.theme.line};

  h3 {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    margin-bottom: 1rem;
  }

  > ul > li {
    font-size: 1rem;
    line-height: 1.9;
  }

  /* Le point sert de puce graphique, dans l'esprit typographique du site. */
  > ul > li::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 4px;
    margin-right: 0.7rem;
    vertical-align: 0.22em;
    background: ${(props) => props.theme.text};
  }
`;

const About = () => (
  <PageShell
    title="À propos"
    description="Ingénieur IT au profil polyvalent : automatisation, systèmes, données et problématiques métier. Parcours, approche et compétences techniques."
  >
    <SectionHeader index="01" title="À propos" />

    <Columns>
      <Reveal>
        <Prose>
          <p>
            Diplômé d'une formation DevOps et fort de plusieurs années
            d'expérience en alternance, j'ai construit un profil IT polyvalent
            à la croisée de l'automatisation, des systèmes, de la donnée et des
            problématiques métier.
          </p>
          <p>
            Mes expériences professionnelles, notamment chez{" "}
            <strong>Thales</strong> et <strong>Fiscalyse</strong>, m'ont amené à
            travailler sur des environnements et des besoins très différents :
            automatisation de tâches, collecte et traitement de données,
            développement d'outils, infrastructure, tests, amélioration de
            processus et accompagnement des utilisateurs.
          </p>
          <p>
            Ce que j'apprécie particulièrement est de comprendre un problème
            dans son ensemble, puis de construire une solution réellement utile
            plutôt que de me limiter à une technologie particulière.
          </p>
          <p>
            Curieux et autonome, je continue également à développer des projets
            personnels autour du développement, de l'intelligence artificielle,
            de la 3D et des nouvelles technologies.
          </p>
        </Prose>
      </Reveal>

      <Reveal delay={0.1}>
        <Portrait>
          <div className="frame">
            <img
              src={portrait}
              alt={`Portrait de ${profile.fullName}`}
              loading="lazy"
              width="900"
              height="1020"
            />
          </div>
          <figcaption>
            {profile.fullName} — {profile.role}
          </figcaption>
        </Portrait>
      </Reveal>
    </Columns>

    <Skills aria-labelledby="competences">
      <Reveal>
        <SkillsTitle id="competences">Compétences</SkillsTitle>
      </Reveal>

      <Groups>
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.06}>
            <Group>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Group>
          </Reveal>
        ))}
      </Groups>
    </Skills>
  </PageShell>
);

export default About;
