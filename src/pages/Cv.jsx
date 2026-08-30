import { useEffect, useState } from "react";
import styled from "styled-components";

import { profile } from "../data/profile";
import { useTranslation } from "../data/translations";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { ArrowUpRight, Download } from "../components/icons";

/* ────────────────────────────────────────────────────────────────────────
   Deux CV de même importance : français à gauche, anglais à droite. Sur
   petit écran, un sélecteur remplace la juxtaposition et n'affiche qu'une
   version à la fois, en pleine largeur.
   ──────────────────────────────────────────────────────────────────────── */

const Switch = styled.div`
  display: none;
  gap: 0;
  border: 1px solid ${(props) => props.theme.line};
  margin-bottom: 2rem;
  width: fit-content;

  ${media.md`
    display: flex;
  `}
`;

const SwitchButton = styled.button`
  padding: 0.7rem 1.5rem;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSoft};
  background: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;

  &[aria-pressed="true"] {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);

  ${media.md`
    grid-template-columns: 1fr;
    gap: 0;
  `}
`;

/* Une seule version est visible sous 860px : celle sélectionnée. */
const Column = styled.section`
  display: flex;
  flex-direction: column;

  ${media.md`
    display: none;

    &[data-active="true"] {
      display: flex;
    }
  `}
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.text};

  h2 {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }

  span {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    color: ${(props) => props.theme.textFaint};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 0 1.5rem;
`;

const Action = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid ${(props) => props.theme.line};
  transition: border-color 0.3s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    border-color: ${(props) => props.theme.text};
  }
`;

/* Le cadre suit exactement les proportions d'une page A4 : le document
   remplit alors la zone, sans la marge vide qui entourait l'ancien
   affichage. */
const Frame = styled.div`
  position: relative;
  flex: 1;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};
  aspect-ratio: 1 / 1.414;
  overflow: hidden;

  object,
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  height: 100%;
  padding: 2rem 1.5rem;
  text-align: center;

  p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: ${(props) => props.theme.textSoft};
    max-width: 34ch;
  }
`;

const FallbackAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.35rem;
  border: 1px solid ${(props) => props.theme.text};
  font-size: 0.85rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const CvColumn = ({ texts, file, downloadName, active, canEmbed }) => (
  <Column data-active={active} aria-label={texts.label}>
    <Head>
      <h2>{texts.label}</h2>
      <span aria-hidden="true">{texts.short}</span>
    </Head>

    <Actions>
      <Action href={file} download={downloadName}>
        {texts.download}
        <Download />
      </Action>
      <Action href={file} target="_blank" rel="noopener noreferrer">
        {texts.open}
        <ArrowUpRight />
      </Action>
    </Actions>

    <Frame>
      {canEmbed ? (
        <object
          data={`${file}#view=FitH&toolbar=0`}
          type="application/pdf"
          aria-label={texts.viewerLabel}
        >
          {/* Rendu par le navigateur si le PDF ne peut pas être intégré. */}
          <Fallback>
            <p>{texts.fallback}</p>
            <FallbackAction
              href={file}
              target="_blank"
              rel="noopener noreferrer"
            >
              {texts.open}
              <ArrowUpRight />
            </FallbackAction>
          </Fallback>
        </object>
      ) : (
        <Fallback>
          <p>{texts.fallback}</p>
          <FallbackAction href={file} target="_blank" rel="noopener noreferrer">
            {texts.open}
            <ArrowUpRight />
          </FallbackAction>
          <FallbackAction href={file} download={downloadName}>
            {texts.download}
            <Download />
          </FallbackAction>
        </Fallback>
      )}
    </Frame>
  </Column>
);

const Cv = () => {
  const t = useTranslation();
  const [language, setLanguage] = useState("fr");
  const [canEmbed, setCanEmbed] = useState(true);

  /* Les navigateurs mobiles n'intègrent pas les PDF. On leur propose
     directement l'ouverture plutôt qu'un rectangle vide. */
  useEffect(() => {
    if (typeof navigator !== "undefined" && "pdfViewerEnabled" in navigator) {
      setCanEmbed(navigator.pdfViewerEnabled);
    }
  }, []);

  const versions = [
    { id: "fr", texts: t.cv.versions.fr, ...profile.cv.fr },
    { id: "en", texts: t.cv.versions.en, ...profile.cv.en },
  ];

  return (
    <PageShell
      wide
      title="CV"
      description="Curriculum vitae de Marvin Escalle, ingénieur IT, en français et en anglais : consultation en ligne et téléchargement au format PDF."
    >
      <SectionHeader
        index="06"
        title={t.cv.title}
        lead={
          profile.cv.updatedAt
            ? `${t.cv.lead} ${t.cv.updatedAt} : ${profile.cv.updatedAt}.`
            : t.cv.lead
        }
      />

      <Reveal>
        <Switch role="group" aria-label={t.cv.switchLabel}>
          {versions.map((version) => (
            <SwitchButton
              key={version.id}
              type="button"
              aria-pressed={language === version.id}
              onClick={() => setLanguage(version.id)}
            >
              <span className="visually-hidden">{version.texts.label}</span>
              <span aria-hidden="true">{version.texts.short}</span>
            </SwitchButton>
          ))}
        </Switch>
      </Reveal>

      <Reveal delay={0.06}>
        <Columns>
          {versions.map((version) => (
            <CvColumn
              key={version.id}
              texts={version.texts}
              file={version.file}
              downloadName={version.downloadName}
              active={language === version.id}
              canEmbed={canEmbed}
            />
          ))}
        </Columns>
      </Reveal>
    </PageShell>
  );
};

export default Cv;
