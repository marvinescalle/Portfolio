import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import { findPassion, passions } from "../data/passions";
import PassionOverlay from "../components/passions/PassionOverlay";
import { pick, useLanguage, useTranslation } from "../i18n";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { darkTheme, media } from "../styles/theme";
import PageShell from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { ArrowUpRight } from "../components/icons";

/* Composition asymétrique : une grande vignette d'ouverture, une colonne
   verticale, un bandeau horizontal. Volontairement pas quatre cartes
   identiques. */
const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(0.75rem, 1.6vw, 1.25rem);

  ${media.md`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.sm`
    grid-template-columns: 1fr;
  `}
`;

/* Le rapport donne à la case sa hauteur naturelle, qui sert à mesurer la
   rangée. Mais un élément de grille porteur d'un rapport n'est pas étiré par
   défaut : dans la rangée où la colonne étroite est la plus haute, la case
   large restait plus courte que sa rangée et laissait un vide sous elle.
   L'écart entre deux cartes passait ainsi de 20 à 83 px selon la rangée.

   L'étirement ne vise que les cases larges. La colonne étroite, elle, garde
   son gabarit : c'est lui qui règle le décalage en escalier plus bas, et
   l'étirer désalignerait les deux cases entre elles. */
const spans = {
  large: "grid-column: span 4; aspect-ratio: 4 / 3; align-self: stretch;",
  tall: "grid-column: span 2; aspect-ratio: 3 / 4;",
  wide: "grid-column: span 4; aspect-ratio: 16 / 9; align-self: stretch;",
};

/* La cellule porte la géométrie ; le wrapper d'animation ne doit pas
   s'intercaler entre la grille et son élément. */
const Cell = styled(Reveal)`
  position: relative;
  ${(props) => spans[props.$span] ?? spans.tall};

  /* Décalage vers le bas de la colonne étroite : la césure entre ses deux
     cases tombe alors au milieu de la carte centrale au lieu d'être à sa
     hauteur, et la composition se lit en escalier.

     Posé sur la tuile et non sur la case : celle-ci est animée par Framer
     Motion, qui pilote sa propriété transform et écraserait la nôtre. La
     valeur est un pourcentage de la hauteur de la tuile, donc identique pour
     les deux cases puisqu'elles partagent le même gabarit. Elle est passée de
     53 à 60 % le jour où les cases larges se sont mises à s'étirer : la carte
     du milieu ayant grandi, son centre s'est déplacé de 47 px. */
  ${(props) =>
    props.$offset
      ? "> a { transform: translateY(60%); }"
      : ""}

  /* Sous 860 px il ne reste qu'une colonne de cartes : l'escalier n'a plus
     d'objet et ne ferait que désaligner la pile. */
  ${media.md`
    grid-column: span 2;

    > a { transform: none; }
  `}

  ${media.sm`
    grid-column: span 1;
    aspect-ratio: 4 / 3;
  `}
`;

const Tile = styled(Link)`
  /* Posée sur toute la case plutôt que dimensionnée en pourcentages : une
     hauteur de 100 % se résout contre le rapport de la case et non contre la
     hauteur qu'elle obtient une fois étirée. */
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Le cadrage par défaut garde la bande centrale. Une photo verticale
       posée dans une case horizontale y perd ses deux extrémités, d'où ce
       réglage facultatif par entrée. */
    object-position: ${(props) => props.$position ?? "center"};
    filter: grayscale(1) contrast(1.05);
    transform: scale(1.01);
    transition: filter 0.8s ease, transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover img,
  &:focus-visible img {
    filter: grayscale(0) contrast(1);
    transform: scale(1.05);
  }

  /* Voile assurant la lisibilité de la légende par-dessus la photo. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.85) 0%,
      rgba(10, 10, 10, 0.15) 45%,
      rgba(10, 10, 10, 0) 70%
    );
    opacity: ${(props) => (props.$hasImage ? 1 : 0)};
  }

`;

const Caption = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  z-index: 2;
  padding: clamp(1rem, 2.2vw, 1.75rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* Sert de référence au calage du titre ci-dessous, qui doit se mesurer à
     la largeur de la case et non à celle de la fenêtre. */
  container-type: inline-size;

  h2 {
    font-weight: 800;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    line-height: 1.05;

    /* Un mot ne se coupe jamais en son milieu. La mosaïque a une colonne
       étroite, et « EXPÉRIMENTATION » y débordait largement : le titre se
       lisait EXPÉRIMENTA / TION. Le mot reste donc entier et c'est le corps
       qui cède.

       La variable porte la longueur du mot le plus long. Le corps est le plus
       petit des deux : la valeur de confort, et celle qui fait tout juste
       tenir ce mot dans la case. Le coefficient est la chasse moyenne d'une
       capitale de Syne en graisse 800, mesurée à 1,21 cadratin et arrondie
       au-dessus pour garder une marge.

       L'unité de conteneur se mesure déjà sur la boîte de contenu, donc hors
       rembourrage : le retrancher une seconde fois ramenait le titre à 12 px
       au lieu de 16.

       Une première déclaration en unités de fenêtre reste posée pour les
       navigateurs sans requête de conteneur : le titre y est simplement plus
       petit, jamais coupé. */
    font-size: clamp(1rem, 2.4vw, 1.75rem);
    font-size: min(
      clamp(1.1rem, 2.4vw, 1.75rem),
      calc(100cqw / var(--longest, 8) / 1.3)
    );
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: none;
  }

  /* Sous-titre facultatif : les domaines que recouvre la passion, en chasse
     fixe, entre le titre et la phrase. Il ne s'affiche que si l'entrée le
     renseigne. */
  .tagline {
    margin-top: -0.15rem;
    font-family: ${(props) => props.theme.fontMono};
    font-size: clamp(0.62rem, 0.8vw, 0.7rem);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
  }

  p {
    font-size: clamp(0.82rem, 1.1vw, 0.92rem);
    line-height: 1.55;
    color: ${(props) => props.theme.textSoft};
    max-width: 44ch;
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: ${(props) => props.theme.textSoft};
    transition: color 0.3s ease, transform 0.3s ease;
  }

  ${Tile}:hover .more,
  ${Tile}:focus-visible .more {
    color: ${(props) => props.theme.text};
  }

  ${Tile}:hover .more svg,
  ${Tile}:focus-visible .more svg {
    transform: translate(2px, -2px);
  }

  .more svg {
    width: 13px;
    height: 13px;
    transition: transform 0.3s ease;
  }
`;

/** Longueur du mot le plus long, qui décide du corps du titre. */
const longestWord = (label) =>
  label.split(/\s+/).reduce((max, word) => Math.max(max, word.length), 1);

const Passions = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = useTranslation();
  const { language } = useLanguage();
  const passion = slug ? findPassion(slug) : null;

  useBodyScrollLock(Boolean(passion));

  const close = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/passions", { replace: true });
  };

  return (
  <PageShell
    theme={darkTheme}
    title={t.passions.title}
    description={t.passions.seo}
  >
    <SectionHeader
      index={t.passions.index}
      title={t.passions.title}
      lead={t.passions.lead}
    />

    <Mosaic>
      {passions.map((item, i) => {
        /* La vignette peut porter un intitulé plus court que la fiche : voir
           le commentaire de `cardLabel` dans le fichier de données. */
        const titre = pick(item.cardLabel ?? item.label, language);

        return (
        <Cell
          key={item.id}
          $span={item.span}
          $offset={item.offset}
          delay={Math.min(i * 0.07, 0.25)}
        >
          <Tile
            to={`/passions/${item.id}`}
            aria-label={`${pick(item.label, language)} : ${t.passions.openSheet}`}
            $hasImage={Boolean(item.image)}
            $position={item.imagePosition}
          >
            {/* Sans photo, la case reste une plaque typographique pleine et
                nette. Un repère « photo à venir » n'apprend rien au visiteur
                et signale surtout que le site n'est pas terminé. */}
            {item.image ? (
              <img src={item.image} alt={pick(item.alt, language)} loading="lazy" />
            ) : null}

            <Caption>
              <h2 style={{ "--longest": longestWord(titre) }}>{titre}</h2>
              {item.tagline ? (
                <span className="tagline">{pick(item.tagline, language)}</span>
              ) : null}
              <p>{pick(item.text, language)}</p>
              <span className="more">
                {t.passions.more}
                <ArrowUpRight />
              </span>
            </Caption>
          </Tile>
        </Cell>
        );
      })}
    </Mosaic>

    <AnimatePresence>
      {passion ? (
        <PassionOverlay
          key={passion.id}
          passion={passion}
          onClose={close}
        />
      ) : null}
    </AnimatePresence>
  </PageShell>
  );
};

export default Passions;
