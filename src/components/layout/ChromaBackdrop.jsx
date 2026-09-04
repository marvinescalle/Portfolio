import styled, { keyframes } from "styled-components";

import { grainUrl } from "../../styles/chroma";
import { useSkin } from "../../theme/SkinProvider";
import { media } from "../../styles/theme";

/* ────────────────────────────────────────────────────────────────────────
   Le fond de CHROMA. Un seul système pour tout le site, en quatre couches,
   entièrement calculé par le navigateur : aucune image n'est téléchargée.

     1. le sol       un aplat ivoire ou encre, selon l'ambiance ;
     2. l'ambiance   trois masses colorées très douces, qui donnent la
                     profondeur et la température de la rubrique ;
     3. le motif     une tuile filaire à opacité très basse, dessinée à la
                     couleur d'accent de la page ;
     4. le grain     un bruit fractal, juste assez pour que l'aplat ne
                     paraisse pas plastique.

   Fixé à la fenêtre plutôt qu'attaché au document : le fond ne défile pas,
   ce qui coûte moins cher au compositeur et donne au contenu l'impression de
   glisser sur une affiche.

   Ce qui change d'une page à l'autre tient dans trois variables CSS, posées
   par la page sur son propre conteneur : elles descendent d'un côté jusqu'ici
   et de l'autre jusqu'au contenu, qui accorde ainsi ses filets et ses accents
   au fond sans rien savoir de lui. Le dessin, lui, ne bouge jamais.
   ──────────────────────────────────────────────────────────────────────── */

/* Respiration très lente des masses colorées : quelques pour cent de
   déplacement sur une minute. À l'échelle d'une seconde, rien ne bouge. */
const drift = keyframes`
  0%   { transform: translate3d(0, 0, 0) scale(1.06); }
  50%  { transform: translate3d(-2%, 1.5%, 0) scale(1.12); }
  100% { transform: translate3d(0, 0, 0) scale(1.06); }
`;

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: ${(props) => props.theme.body};
`;

const Ambience = styled.div`
  position: absolute;
  /* Exactement la fenêtre, pour que les pourcentages de position ci-dessous
     désignent bien ce qu'on croit. Une première version débordait de 20 % de
     chaque côté afin d'absorber la dérive : les positions se résolvaient
     alors contre une boîte de 140 %, et les masses posées à 5 % ou 99 %
     tombaient hors de l'écran. Seules leurs traînées restaient visibles, d'où
     un fond gris rosé sans aucune couleur franche.

     C'est la mise à l'échelle de la dérive, jamais inférieure à 1,06, qui
     tient désormais lieu de marge : 3 % de chaque côté pour un déplacement
     qui ne dépasse pas 2 %. */
  inset: 0;
  /* Une diagonale, et rien d'autre : la teinte principale accrochée au coin
     haut gauche, la secondaire au coin bas droit, un rappel plus faible de
     cette dernière en haut à droite, et une bande oblique très étirée qui
     relie les deux. Deux couleurs opposées sur la diagonale, du papier nu au
     milieu : c'est la composition d'une affiche, pas un dégradé de fond.

     La chute est volontairement courte. Étalées plus loin, les masses se
     rejoignaient en un voile uniforme, joli mais mou, et le contraste du
     texte en souffrait.

     Leur densité maximale est plafonnée à 42 %. C'est la valeur mesurée
     au-delà de laquelle un paragraphe posé en plein coeur d'une masse passe
     sous le seuil de 4,5 pour 1, même avec les gris renforcés de CHROMA. */
  background:
    linear-gradient(
      116deg,
      transparent 24%,
      color-mix(in srgb, var(--chroma-second) 9%, transparent) 50%,
      transparent 76%
    ),
    radial-gradient(
      52% 48% at 4% 2%,
      color-mix(in srgb, var(--chroma-accent) 42%, transparent) 0%,
      transparent 62%
    ),
    radial-gradient(
      56% 50% at 98% 96%,
      color-mix(in srgb, var(--chroma-second) 38%, transparent) 0%,
      transparent 64%
    ),
    radial-gradient(
      38% 34% at 96% 6%,
      color-mix(in srgb, var(--chroma-second) 20%, transparent) 0%,
      transparent 58%
    );
  animation: ${drift} 68s ease-in-out infinite;
  will-change: transform;

  /* Sur les fonds sombres les mêmes masses s'écraseraient : le mode écran
     les fait remonter comme une lumière au lieu de les mélanger à l'encre. */
  mix-blend-mode: ${(props) =>
    props.theme.name === "dark" ? "screen" : "multiply"};
  opacity: ${(props) => (props.theme.name === "dark" ? 0.85 : 1)};

  /* Sur petit écran les masses sont plus resserrées, donc plus présentes à
     surface égale : on les calme, et on arrête la dérive pour préserver la
     batterie. */
  ${media.md`
    opacity: 0.72;
    animation: none;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Motif = styled.div`
  position: absolute;
  inset: 0;
  background-image: var(--chroma-motif);
  background-repeat: repeat;
  background-size: 260px 260px;
  /* Au seuil de la perception, et plus bas encore sur fond sombre où la
     teinte claire d'un accent ressort beaucoup plus qu'elle ne s'y enfonce.
     Un cran au-dessus, la tuile cesse d'être une texture et se lit comme un
     papier peint : c'est exactement ce qu'il faut éviter. */
  opacity: ${(props) => (props.theme.name === "dark" ? 0.1 : 0.18)};

  /* Le motif s'efface vers le bas de la fenêtre, là où le texte est le plus
     dense : il reste une ambiance, jamais une trame qu'on suit du regard. */
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.4) 45%,
    rgba(0, 0, 0, 0.12) 100%
  );

  ${media.md`
    background-size: 200px 200px;
    opacity: 0.1;
  `}
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${grainUrl};
  background-repeat: repeat;
  opacity: ${(props) => (props.theme.name === "dark" ? 0.12 : 0.16)};
  mix-blend-mode: ${(props) =>
    props.theme.name === "dark" ? "screen" : "multiply"};

  /* Le grain est la couche la moins utile et la plus coûteuse à composer :
     elle disparaît là où l'écran est le plus petit. */
  ${media.sm`
    display: none;
  `}
`;

/**
 * Rendu une seule fois par page, derrière tout le reste. Ne rend rien en
 * MONO : la peau de référence n'a pas de fond décoratif, et c'est ce qui
 * fait sa force.
 */
const ChromaBackdrop = () => {
  const { isChroma } = useSkin();

  if (!isChroma) return null;

  return (
    <Root aria-hidden="true">
      <Ambience />
      <Motif />
      <Grain />
    </Root>
  );
};

export default ChromaBackdrop;
