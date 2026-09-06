import styled from "styled-components";

import portrait from "../assets/optimized/portrait.jpg";
import { getAge, profile } from "../data/profile";
import { skillGroups } from "../data/skills";
import { pick, useLanguage, useTranslation } from "../i18n";
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

  /* Le fond doit être posé juste derrière l'image : le mode multiply se
     mélange avec ce qui est peint dans le même contexte d'empilement, et
     l'animation d'apparition en isole le contenu. */
  .frame {
    background: ${(props) => props.theme.body};
    overflow: hidden;
  }

  img {
    width: 100%;
    /* Hauteur libre, sans quoi l'attribut height du balisage devient la
       hauteur utilisée : l'image était alors étirée à 1020 px pour 123 px de
       large, soit sept fois trop haute. C'est ce que fait déjà le portrait de
       l'accueil, qui échappait au défaut pour cette seule raison. */
    height: auto;
    mix-blend-mode: multiply;
  }

  /* La légende se mesure sur la largeur de l'image, pas sur celle de la
     fenêtre : le cadre est plafonné à 22rem mais rétrécit avec la colonne.
     Le conteneur est posé sur figcaption plutôt que sur la figure, car
     container-type isole un contexte d'empilement, ce qui neutraliserait le
     mode multiply de l'image juste au-dessus. */
  figcaption {
    container-type: inline-size;
    padding-top: 0.75rem;
  }

  figcaption > span {
    display: block;
    font-family: ${(props) => props.theme.fontMono};
    /* La ligne est calée sur la largeur de la photo, bord à bord.

       Le corps est déduit de la largeur du cadre : le coefficient est mesuré
       sur les 38 caractères que font les deux langues, interlettrage compris,
       et vise un poil en dessous de la largeur disponible. La justification
       reprend le reliquat, quelques dixièmes de pixel par espace, de sorte
       que la ligne touche les deux bords sans jamais se replier. Les bornes
       du clamp ne servent que de garde-fous. */
    font-size: clamp(0.6rem, 3.62cqw, 0.9rem);
    letter-spacing: 0.11em;
    /* L'interlettrage s'applique aussi après le dernier caractère. Sans cette
       compensation la ligne s'arrêterait un pixel et demi avant le bord
       droit, alors qu'elle affleure le bord gauche. */
    margin-right: -0.11em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    text-align: justify;
    text-align-last: justify;
  }

  /* Quand la légende se replie, sous 860 px, la coupure ne doit tomber que
     sur les séparateurs : sans cela l'âge se retrouvait scindé, le nombre sur
     une ligne et son unité sur la suivante. */
  figcaption .part {
    white-space: nowrap;
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
  /* Même écart entre un intitulé de section et son filet sur toutes les
     pages : 1,25rem. C'était 1,5 ici, seul cas différent du site. */
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${(props) => props.theme.text};
`;

const Groups = styled.div`
  display: grid;
  /* Cinq catégories, donc cinq colonnes : en grille automatique la
     cinquième se retrouvait seule sur une deuxième ligne. */
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0 clamp(1rem, 2vw, 2rem);

  ${media.lg`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}

  ${media.md`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.xs`
    grid-template-columns: 1fr;
  `}
`;

const Group = styled.div`
  /* Le wrapper d'apparition s'étire dans la grille : sans cela les filets
     d'une même ligne ne s'alignent pas. */
  height: 100%;
  padding: 2rem 0 2.25rem;
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

const About = () => {
  const t = useTranslation();
  const { language } = useLanguage();

  // Les noms d'entreprise sont mis en valeur sans dupliquer le paragraphe
  // dans le code : le dictionnaire porte des repères {thales} et {fiscalyse}.
  const renderParagraph = (text) =>
    text.split(/(\{thales\}|\{fiscalyse\})/).map((part, i) => {
      if (part === "{thales}") return <strong key={i}>Thales</strong>;
      if (part === "{fiscalyse}") return <strong key={i}>Fiscalyse</strong>;
      return part;
    });

  return (
  <PageShell title={t.about.title} description={t.about.seo}>
    <SectionHeader index={t.about.index} title={t.about.title} />

    <Columns>
      <Reveal>
        <Prose>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{renderParagraph(paragraph)}</p>
          ))}
        </Prose>
      </Reveal>

      <Reveal delay={0.1}>
        <Portrait>
          <div className="frame">
            <img
              src={portrait}
              alt={`${t.about.portrait} ${profile.fullName}`}
              loading="lazy"
              width="800"
              height="1000"
            />
          </div>
          <figcaption>
            <span>
              <span className="part">{profile.fullName}</span> ·{" "}
              <span className="part">
                {t.about.age.replace("{n}", getAge())}
              </span>{" "}
              · <span className="part">{pick(profile.role, language)}</span>
            </span>
          </figcaption>
        </Portrait>
      </Reveal>
    </Columns>

    <Skills aria-labelledby="competences">
      <Reveal>
        <SkillsTitle id="competences">{t.about.skills}</SkillsTitle>
      </Reveal>

      <Groups>
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.06}>
            <Group>
              <h3>{pick(group.label, language)}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={pick(item, language)}>{pick(item, language)}</li>
                ))}
              </ul>
            </Group>
          </Reveal>
        ))}
      </Groups>
    </Skills>
  </PageShell>
  );
};

export default About;
