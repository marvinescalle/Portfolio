import { useState } from "react";
import styled from "styled-components";

import { profile } from "../data/profile";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { ArrowUpRight, Download } from "../components/icons";

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: clamp(2rem, 5vw, 3rem);
`;

const Action = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.4rem;
  border: 1px solid ${(props) => props.theme.text};
  font-size: 0.88rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }

  &.ghost {
    border-color: ${(props) => props.theme.line};
  }

  &.ghost:hover {
    border-color: ${(props) => props.theme.text};
  }
`;

const Frame = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};
  /* Ratio A4. Le cadre ne dépasse jamais la hauteur de la fenêtre. */
  aspect-ratio: 1 / 1.414;
  max-height: 80vh;
  overflow: hidden;

  object,
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* Les navigateurs mobiles n'affichent pas les PDF en ligne : le cadre est
     alors remplacé par une invitation à l'ouvrir. Les tablettes, elles,
     les affichent correctement. */
  ${media.sm`
    display: none;
  `}
`;

const MobileFallback = styled.div`
  display: none;
  border: 1px solid ${(props) => props.theme.line};
  padding: 2rem 1.5rem;
  text-align: center;

  p {
    font-size: 0.92rem;
    color: ${(props) => props.theme.textSoft};
    margin-bottom: 1.25rem;
  }

  ${media.sm`
    display: block;
  `}
`;

const Unavailable = styled.div`
  padding: 2rem;
  text-align: center;
  font-size: 0.92rem;
  color: ${(props) => props.theme.textSoft};
`;

const Cv = () => {
  const [failed, setFailed] = useState(false);
  const { file, downloadName, updatedAt } = profile.cv;

  return (
    <PageShell
      title="CV"
      description="Curriculum vitae de Marvin Escalle, ingénieur IT — consultation en ligne et téléchargement au format PDF."
    >
      <SectionHeader
        index="06"
        title="Mon CV"
        lead={
          updatedAt
            ? `Dernière mise à jour : ${updatedAt}.`
            : "Consultable directement ci-dessous, ou téléchargeable au format PDF."
        }
      />

      <Reveal>
        <Actions>
          <Action href={file} download={downloadName}>
            Télécharger
            <Download />
          </Action>
          <Action
            className="ghost"
            href={file}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir dans un nouvel onglet
            <ArrowUpRight />
          </Action>
        </Actions>
      </Reveal>

      <Reveal delay={0.08}>
        <Frame>
          {failed ? (
            <Unavailable>
              Le CV n'a pas pu être affiché ici. Utilisez le bouton
              « Ouvrir dans un nouvel onglet » ci-dessus.
            </Unavailable>
          ) : (
            <object
              data={`${file}#view=FitH`}
              type="application/pdf"
              aria-label="Curriculum vitae de Marvin Escalle"
              onError={() => setFailed(true)}
            >
              <Unavailable>
                Votre navigateur n'affiche pas les PDF intégrés.
              </Unavailable>
            </object>
          )}
        </Frame>
      </Reveal>

      <MobileFallback>
        <p>
          L'affichage des PDF dans la page n'est pas fiable sur mobile. Ouvrez
          le CV en plein écran pour le consulter confortablement.
        </p>
        <Action href={file} target="_blank" rel="noopener noreferrer">
          Ouvrir le CV
          <ArrowUpRight />
        </Action>
      </MobileFallback>
    </PageShell>
  );
};

export default Cv;
