import styled from "styled-components";

import OverlaySheet from "../overlay/OverlaySheet";
import { ArrowUpRight } from "../icons";
import { pick, useLanguage, useTranslation } from "../../i18n";
import { media } from "../../styles/theme";

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

const Visual = styled.div`
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
    object-fit: cover;
  }

  .awaiting {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    border: 1px dashed ${(props) => props.theme.line};
    padding: 0.4rem 0.7rem;
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

  h3 + p {
    margin-top: 1rem;
    max-width: 62ch;
    line-height: 1.7;
    color: ${(props) => props.theme.textSoft};
  }
`;

const Shots = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, minmax(0, 1fr));
  gap: clamp(0.6rem, 1.6vw, 1rem);

  figure {
    margin: 0;
  }

  figcaption {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    margin-bottom: 0.6rem;
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: ${(props) => props.$ratio};
    object-fit: cover;
    border: 1px solid ${(props) => props.theme.line};
    background: ${(props) => props.theme.surface};
  }

  /* Sous 860 px trois colonnes réduiraient chaque photo à une vignette :
     on descend d'un cran, puis à une seule sur les écrans étroits. */
  ${media.md`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.sm`
    grid-template-columns: minmax(0, 1fr);
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

/** Fiche détaillée d'une passion. Aucune rubrique vide n'est affichée. */
const PassionOverlay = ({ passion, onClose }) => {
  const t = useTranslation();
  const { language } = useLanguage();
  const label = pick(passion.label, language);

  return (
  <OverlaySheet label={label} meta={label} onClose={onClose}>
    <Title>{label}</Title>
    <Lead>{pick(passion.text, language)}</Lead>

    <Visual>
      {passion.image ? (
        <img src={passion.image} alt={pick(passion.alt, language)} loading="lazy" />
      ) : (
        <span className="awaiting" aria-hidden="true">
          {t.passions.awaiting}
        </span>
      )}
    </Visual>

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

    {passion.story ? (
      <>
        {pick(passion.story.intro, language) ? (
          <StoryIntro>{pick(passion.story.intro, language)}</StoryIntro>
        ) : null}

        {passion.story.groups.map((group) => (
          <StoryGroup key={group.id}>
            {group.title ? <h3>{pick(group.title, language)}</h3> : null}
            {pick(group.text, language) ? (
              <p>{pick(group.text, language)}</p>
            ) : null}

            <Shots
              $columns={passion.story.columns}
              $ratio={passion.story.ratio}
            >
              {group.photos.map((shot) => (
                <figure key={shot.src}>
                  {shot.caption ? (
                    <figcaption>{pick(shot.caption, language)}</figcaption>
                  ) : null}
                  <img
                    src={shot.src}
                    alt={pick(shot.alt, language) ?? ""}
                    loading="lazy"
                  />
                </figure>
              ))}
            </Shots>
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
