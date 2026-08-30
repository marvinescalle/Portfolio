import styled from "styled-components";

import OverlaySheet from "../overlay/OverlaySheet";
import { ArrowUpRight } from "../icons";
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
