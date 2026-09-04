import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { designFor, grainUrl } from "../../styles/chroma";
import { MOTIFS } from "../decor/motifs";
import { useSkin } from "../../theme/SkinProvider";
import { media } from "../../styles/theme";

/* ────────────────────────────────────────────────────────────────────────
   Le fond de CHROMA. Un seul système pour tout le site, entièrement calculé
   par le navigateur : aucune image n'est téléchargée.

     1. le sol      un aplat ivoire ou encre ;
     2. les champs  deux masses colorées en diagonale et un coin franc, qui
                    donnent la température de la rubrique ;
     3. les signes  trois ou quatre grandes formes filaires, posées à des
                    places choisies et recadrées par les bords ;
     4. le grain    un bruit fractal, juste assez pour que l'aplat ne
                    paraisse pas plastique.

   Fixé à la fenêtre plutôt qu'attaché au document : le fond ne défile pas,
   ce qui coûte moins cher au compositeur et donne au contenu l'impression de
   glisser sur une affiche.

   La couche des signes remplace la tuile répétée de la première version.
   Répéter un petit motif produit une trame, et une trame se lit comme un
   papier peint : uniforme, sans intention, et d'autant plus visible qu'on
   ne la regarde pas. Quatre grandes formes placées à la main disent
   l'inverse, pour un coût de rendu comparable.
   ──────────────────────────────────────────────────────────────────────── */

/* Respiration très lente des champs colorés : quelques pour cent de
   déplacement sur une minute. À l'échelle d'une seconde, rien ne bouge. */
const drift = keyframes`
  0%   { transform: translate3d(0, 0, 0) scale(1.06); }
  50%  { transform: translate3d(-2%, 1.5%, 0) scale(1.12); }
  100% { transform: translate3d(0, 0, 0) scale(1.06); }
`;

/* Les signes dérivent dans l'autre sens, et deux fois plus lentement : le
   décalage entre les deux couches suffit à créer une profondeur, sans
   qu'aucun parallaxe soit lié au défilement. */
const glide = keyframes`
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(1.2%, -0.9%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`;

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: ${(props) => props.theme.body};
`;

const Fields = styled.div`
  position: absolute;
  /* Exactement la fenêtre, pour que les pourcentages de position désignent
     bien ce qu'on croit. C'est la mise à l'échelle de la dérive, jamais
     inférieure à 1,06, qui tient lieu de marge : 3 % de chaque côté pour un
     déplacement qui ne dépasse pas 2 %. */
  inset: 0;

  /* Deux masses opposées sur la diagonale, un rappel plus faible en haut à
     droite, et un coin franc en bas à gauche. Ce dernier est le seul bord
     net du fond : c'est lui qui fait basculer l'ensemble du côté de
     l'affiche imprimée plutôt que du dégradé décoratif.

     La densité maximale est plafonnée à 42 %. C'est la valeur mesurée
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

/* Le coin franc. Un triangle net découpé dans un aplat, posé en bas à
   gauche, là où aucune page n'ouvre sa colonne de lecture. */
const Wedge = styled.div`
  position: absolute;
  inset: 0;
  clip-path: polygon(0 62%, 34% 100%, 0 100%);
  background: var(--chroma-accent);
  opacity: ${(props) => (props.theme.name === "dark" ? 0.14 : 0.1)};

  ${media.md`
    clip-path: polygon(0 78%, 26% 100%, 0 100%);
    opacity: 0.08;
  `}
`;

const Signs = styled.div`
  position: absolute;
  inset: 0;
  animation: ${glide} 94s ease-in-out infinite;
  will-change: transform;

  ${media.md`
    animation: none;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Chaque signe est centré sur sa position, ce qui rend les valeurs du fichier
   de composition immédiatement lisibles : x et y désignent son milieu, et un
   signe posé à -8 % sort par la gauche. */
const Sign = styled.span`
  position: absolute;
  display: block;
  left: ${(props) => props.$x}%;
  top: ${(props) => props.$y}%;
  width: ${(props) => props.$size}vmin;
  height: ${(props) => props.$size}vmin;
  transform: translate(-50%, -50%) rotate(${(props) => props.$rot}deg);
  color: ${(props) =>
    props.$ink === "second" ? "var(--chroma-second)" : "var(--chroma-accent)"};
  opacity: ${(props) => props.$op};

  svg {
    width: 100%;
    height: 100%;
    stroke-width: ${(props) => props.$w};
  }

  /* Sous 860 px, la fenêtre est étroite et haute : les signes y occupent
     proportionnellement bien plus de place. On les rentre et on les calme. */
  ${media.md`
    opacity: 0.5;
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
  const { pathname } = useLocation();

  if (!isChroma) return null;

  const { decor } = designFor(pathname);

  return (
    <Root aria-hidden="true">
      <Fields />
      <Wedge />

      <Signs>
        {decor.map((signe, i) => {
          const Motif = MOTIFS[signe.m];
          if (!Motif) return null;

          return (
            <Sign
              key={`${signe.m}-${i}`}
              $x={signe.x}
              $y={signe.y}
              $size={signe.size}
              $rot={signe.rot ?? 0}
              $ink={signe.ink}
              $op={signe.op}
              $w={signe.w ?? 1.25}
            >
              <Motif />
            </Sign>
          );
        })}
      </Signs>

      <Grain />
    </Root>
  );
};

export default ChromaBackdrop;
