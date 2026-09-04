import { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import { profile } from "../data/profile";
import { useTranslation } from "../i18n";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import OverlaySheet from "../components/overlay/OverlaySheet";
import { ArrowUpRight, Download, Eye } from "../components/icons";

/* ────────────────────────────────────────────────────────────────────────
   Trois variantes ciblées, aucune principale.

   La page est d'abord un choix : trois entrées de poids strictement égal,
   posées les unes sous les autres comme les rubriques de la page Contact.
   Les documents ne s'affichent qu'à la demande, dans la même fiche en
   surimpression que les projets et les passions : six PDF côte à côte ne se
   lisent pas, ils s'endurent.
   ──────────────────────────────────────────────────────────────────────── */

const Variants = styled.ul`
  border-top: 1px solid ${(props) => props.theme.text};
`;

const Variant = styled.li`
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) minmax(0, 20rem);
  gap: clamp(1rem, 3vw, 2.5rem);
  align-items: start;
  padding: clamp(1.75rem, 4vw, 2.75rem) 0;
  border-bottom: 1px solid ${(props) => props.theme.line};

  .index {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    color: ${(props) => props.theme.textFaint};
    padding-top: 0.5rem;
  }

  h2 {
    font-size: clamp(1.5rem, 3.6vw, 2.35rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    line-height: 1.02;
    /* Aucun intitulé ne se coupe au milieu d'un mot. */
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: none;
  }

  .focus {
    margin-top: 0.6rem;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    line-height: 1.7;
    color: ${(props) => props.theme.textFaint};
  }

  ${media.md`
    grid-template-columns: 2.5rem minmax(0, 1fr);
    gap: 0.5rem 1rem;
  `}

  ${media.sm`
    grid-template-columns: minmax(0, 1fr);

    .index { display: none; }
  `}
`;

/* Une ligne par langue, chacune portant ses deux actions. */
const Editions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.md`
    grid-column: 2;
    margin-top: 1.25rem;
  `}

  ${media.sm`
    grid-column: 1;
  `}
`;

const Edition = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem 1.25rem;

  .lang {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    min-width: 2.5rem;
  }
`;

const actionVisual = `
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid;
  transition: border-color 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Action = styled.button`
  ${actionVisual};
  border-color: ${(props) => props.theme.line};

  &:hover,
  &:focus-visible {
    border-color: ${(props) => props.theme.text};
  }
`;

const ActionLink = styled.a`
  ${actionVisual};
  border-color: ${(props) => props.theme.line};

  &:hover,
  &:focus-visible {
    border-color: ${(props) => props.theme.text};
  }
`;

/* Une variante dont le fichier n'est pas encore déposé n'affiche aucune
   action : un bouton qui mène à une page manquante vaut moins qu'une ligne
   qui dit franchement où l'on en est. */
const Pending = styled.p`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
  border: 1px dashed ${(props) => props.theme.line};
  padding: 0.7rem 0.9rem;
`;

/** Proportions des formats de page courants, hauteur / largeur. */
const PAGE_RATIOS = {
  a4: "1 / 1.4142",
  letter: "1 / 1.2941",
};

/* Le cadre reprend exactement les proportions du document : le PDF remplit
   alors toute la zone, sans bande vide au-dessous ni marge autour. */
const Frame = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};
  aspect-ratio: ${(props) => props.$ratio};
  overflow: hidden;

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

/* Les mêmes actions à l'intérieur de l'aperçu. Le document est un
   sous-document : le piège à focus de la fiche ne peut pas y entrer sans y
   perdre le visiteur, ces deux liens sont donc le chemin clavier vers le
   fichier. */
const PreviewActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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

const Cv = () => {
  const t = useTranslation();
  const [preview, setPreview] = useState(null);
  const [canEmbed, setCanEmbed] = useState(true);

  useBodyScrollLock(Boolean(preview));

  /* Les navigateurs mobiles n'intègrent pas les PDF. On leur propose
     directement l'ouverture plutôt qu'un rectangle vide. */
  useEffect(() => {
    if (typeof navigator !== "undefined" && "pdfViewerEnabled" in navigator) {
      setCanEmbed(navigator.pdfViewerEnabled);
    }
  }, []);

  const ratio = PAGE_RATIOS[profile.cv.format] ?? PAGE_RATIOS.a4;

  return (
    <PageShell
      title="CV"
      description={t.cv.seo}
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

      <Variants>
        {profile.cv.variants.map((variant, i) => {
          const texts = t.cv.variants[variant.id];
          const editions = Object.entries(variant.files).filter(
            ([, edition]) => edition.ready
          );

          return (
            <Reveal as="li" key={variant.id} delay={i * 0.07}>
              <Variant as="div">
                <span className="index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2>{texts.label}</h2>
                  <p className="focus">{texts.focus}</p>
                </div>

                {editions.length ? (
                  <Editions>
                    {editions.map(([code, edition]) => (
                      <Edition key={code}>
                        <span className="lang">{t.cv.languages[code]}</span>

                        <Action
                          type="button"
                          onClick={() =>
                            setPreview({ variant, code, edition, texts })
                          }
                        >
                          {t.cv.preview}
                          <Eye />
                        </Action>

                        <ActionLink
                          href={edition.file}
                          download={edition.downloadName}
                        >
                          {t.cv.download}
                          <Download />
                        </ActionLink>
                      </Edition>
                    ))}
                  </Editions>
                ) : (
                  <Pending>{t.cv.pending}</Pending>
                )}
              </Variant>
            </Reveal>
          );
        })}
      </Variants>

      <AnimatePresence>
        {preview ? (
          <OverlaySheet
            key={`${preview.variant.id}-${preview.code}`}
            label={`${preview.texts.label} · ${t.cv.languages[preview.code]}`}
            meta={`${preview.texts.label} · ${t.cv.languages[preview.code]}`}
            onClose={() => setPreview(null)}
          >
            <PreviewActions>
              <ActionLink
                href={preview.edition.file}
                download={preview.edition.downloadName}
              >
                {t.cv.download}
                <Download />
              </ActionLink>
              <ActionLink
                href={preview.edition.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.cv.openTab}
                <ArrowUpRight />
              </ActionLink>
            </PreviewActions>

            <Frame $ratio={ratio}>
              {canEmbed ? (
                /* iframe et non object : Safari n'initialise pas le lecteur
                   PDF d'un object créé dans un sous-arbre encore invisible,
                   et ne réessaie jamais ensuite. */
                <iframe
                  src={`${preview.edition.file}#view=FitH&toolbar=0`}
                  title={`${t.cv.previewLabel} ${preview.texts.label}`}
                  tabIndex={-1}
                />
              ) : (
                <Fallback>
                  <p>{t.cv.fallback}</p>
                  <FallbackAction
                    href={preview.edition.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.cv.openTab}
                    <ArrowUpRight />
                  </FallbackAction>
                  <FallbackAction
                    href={preview.edition.file}
                    download={preview.edition.downloadName}
                  >
                    {t.cv.download}
                    <Download />
                  </FallbackAction>
                </Fallback>
              )}
            </Frame>
          </OverlaySheet>
        ) : null}
      </AnimatePresence>
    </PageShell>
  );
};

export default Cv;
