import styled from "styled-components";

import OverlaySheet from "../overlay/OverlaySheet";
import TravelStory from "../travel/TravelStory";
import { ArrowUpRight } from "../icons";
import { pick, useLanguage, useTranslation } from "../../i18n";
import { breakpoints, media } from "../../styles/theme";

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

  li {
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.6;
    color: ${(props) => props.theme.textSoft};
  }

  li + li {
    margin-top: 0.75rem;
  }

  li::before {
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

/* Récit illustré : une suite de sections titrées, chacune suivie de ses
   photos alignées.

   Les originaux sont tantôt verticaux tantôt horizontaux. Sans cadrage
   commun, une ligne de trois mélangerait les hauteurs et se lirait comme un
   empilement accidentel : les vignettes partagent donc un même rapport et
   recadrent l'image, plutôt que de conserver ses proportions. */
const StoryIntro = styled.p`
  margin-top: clamp(2rem, 5vw, 3.25rem);
  max-width: 62ch;
  line-height: 1.7;
  color: ${(props) => props.theme.textSoft};
`;

const StoryGroup = styled.section`
  margin-top: clamp(2.25rem, 5vw, 3.5rem);

  /* Numéro d'ordre, dans le registre des en-têtes de page : chasse fixe,
     petit, en retrait. Il n'apparaît que sur les fiches qui le demandent. */
  .num {
    display: block;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    color: ${(props) => props.theme.textFaint};
    margin-bottom: 0.55rem;
  }

  h3 {
    /* Couleur posée explicitement : sans elle le titre hérite du noir de la
       page qui porte l'overlay, et disparaît sur le fond sombre de la fiche. */
    color: ${(props) => props.theme.text};
    font-family: ${(props) => props.theme.fontDisplay};
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid ${(props) => props.theme.line};
  }

  p {
    margin-top: 1rem;
    max-width: 62ch;
    line-height: 1.7;
    color: ${(props) => props.theme.textSoft};
  }

  /* Même puce que les listes des cartes d'expérience : un tiret court plutôt
     qu'un point, pour rester dans le vocabulaire typographique du site. */
  .points {
    margin-top: 1.1rem;
    max-width: 62ch;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .points li {
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.6;
    color: ${(props) => props.theme.textSoft};
  }

  .points li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 0.75rem;
    height: 1px;
    background: ${(props) => props.theme.lineStrong};
  }
`;

const Shots = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, minmax(0, 1fr));
  gap: clamp(0.6rem, 1.6vw, 1rem);

  align-items: start;

  figure {
    margin: 0;
    grid-column: span 1;
  }

  /* Une photo peut occuper la place de deux, quand elle mérite plus de place
     ou qu'une ligne resterait incomplète.

     Elle ne reçoit alors aucun rapport imposé : en garder un doublerait sa
     hauteur en même temps que sa largeur, et une photo horizontale se
     retrouverait en énorme carré. Elle s'étire sur la hauteur de la ligne,
     fixée par la photo normale qui l'accompagne, et reste donc alignée avec
     le reste de la grille. */
  figure[data-span="2"] {
    grid-column: span 2;
    align-self: stretch;
  }

  figure[data-span="2"] img {
    aspect-ratio: auto;
    height: 100%;
  }

  figcaption {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    margin-bottom: 0.6rem;
  }

  img {
    display: block;
    width: 100%;
    /* Sans cadrage commun, les proportions d'origine sont conservées et rien
       n'est rogné. C'est ce qu'il faut pour des dessins, qu'un recadrage
       amputerait.

       Avec un cadrage commun, deux comportements possibles. Le remplissage
       remplit la vignette en rognant, ce qui convient à des photographies.
       L'inscription y place l'image entière, ce qu'il faut pour des visuels
       graphiques dont on ne peut rien retrancher : une jaquette verticale et
       un logotype large ne se recadrent pas au même format sans perte. */
    ${(props) =>
      props.$ratio
        ? `aspect-ratio: ${props.$ratio}; object-fit: ${props.$fit};`
        : "height: auto;"}
    border: 1px solid ${(props) => props.theme.line};
    background: ${(props) => props.theme.surface};
  }

  /* Sous 860 px trois colonnes réduiraient chaque photo à une vignette :
     on descend d'un cran, puis à une seule sur les écrans étroits. */
  /* Sous 860 px il ne reste que deux colonnes : une photo double occuperait
     la ligne entière, sans voisine pour en fixer la hauteur, et s'effondrerait.
     Elle repasse donc sur une seule colonne, avec le rapport commun.

     Media query écrite à la main plutôt qu'avec le raccourci media.md : ce
     dernier concatène ses valeurs sans les évaluer, si bien qu'une fonction de
     props s'y retrouve insérée sous forme de texte et la règle est ignorée. */
  @media (max-width: ${breakpoints.md}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    figure[data-span="2"] {
      grid-column: span 1;
      align-self: start;
    }

    figure[data-span="2"] img {
      aspect-ratio: ${(props) => props.$ratio || "auto"};
      height: ${(props) => (props.$ratio ? "auto" : "100%")};
    }
  }

  ${media.sm`
    grid-template-columns: minmax(0, 1fr);

    /* Une seule colonne : plus rien ne peut en occuper deux. */
    figure[data-span="2"] { grid-column: span 1; }
  `}
`;

const External = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: clamp(2rem, 5vw, 3rem);
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
`;

/** Un bloc de texte, découpé en paragraphes sur les lignes vides. */
const Paragraphs = ({ text }) =>
  text
    ? String(text)
        .split("\n\n")
        .map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
    : null;

/** Fiche détaillée d'une passion. Aucune rubrique vide n'est affichée. */
const PassionOverlay = ({ passion, onClose }) => {
  const t = useTranslation();
  const { language } = useLanguage();
  const label = pick(passion.label, language);

  return (
  <OverlaySheet label={label} meta={label} onClose={onClose}>
    <Title>{label}</Title>
    <Lead>{pick(passion.text, language)}</Lead>

    {pick(passion.longText, language) ? (
      <Section>
        <h3>{t.passions.sheet.details}</h3>
        {pick(passion.longText, language).split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </Section>
    ) : null}

    {pick(passion.highlights, language)?.length ? (
      <Section>
        <h3>{t.passions.sheet.highlights}</h3>
        <ul>
          {pick(passion.highlights, language).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    ) : null}

    {passion.gallery?.length ? (
      <Section>
        <h3>{t.passions.sheet.gallery}</h3>
        <Gallery>
          {passion.gallery.map((shot) => (
            <figure key={shot.src}>
              <img src={shot.src} alt={shot.alt ?? ""} loading="lazy" />
            </figure>
          ))}
        </Gallery>
      </Section>
    ) : null}

    {/* Les voyages ont leur propre corps de fiche : une carte, une liste de
        pays et un parcours daté ne s'expriment pas avec le récit illustré
        générique, qui ne connaît que des sections et des photos. */}
    {passion.travel ? <TravelStory /> : null}

    {passion.story ? (
      <>
        {pick(passion.story.intro, language) ? (
          <StoryIntro>{pick(passion.story.intro, language)}</StoryIntro>
        ) : null}

        {passion.story.groups.map((group, i) => (
          <StoryGroup key={group.id}>
            {passion.story.numbered ? (
              <span className="num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}

            {group.title ? <h3>{pick(group.title, language)}</h3> : null}

            <Paragraphs text={pick(group.text, language)} />

            {pick(group.points, language)?.length ? (
              <ul className="points">
                {pick(group.points, language).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}

            <Paragraphs text={pick(group.after, language)} />

            {/* Aucune grille tant qu'aucune photo n'est déposée : une section
                purement écrite ne doit pas laisser un blanc à sa suite. */}
            {group.photos?.length ? (
              <Shots
                $columns={group.columns ?? passion.story.columns}
                $ratio={group.ratio ?? passion.story.ratio}
                $fit={group.fit ?? passion.story.fit ?? "cover"}
              >
                {group.photos.map((shot) => (
                  <figure key={shot.src} data-span={shot.span ?? 1}>
                    {shot.caption ? (
                      <figcaption>{pick(shot.caption, language)}</figcaption>
                    ) : null}
                    <img
                      src={shot.src}
                      alt={pick(shot.alt, language) ?? ""}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                    />
                  </figure>
                ))}
              </Shots>
            ) : null}
          </StoryGroup>
        ))}
      </>
    ) : null}

    {passion.link ? (
      <External href={passion.link} target="_blank" rel="noopener noreferrer">
        {passion.linkLabel ?? t.passions.sheet.seeMore}
        <ArrowUpRight />
      </External>
    ) : null}
  </OverlaySheet>
  );
};

export default PassionOverlay;
