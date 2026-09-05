import { useEffect, useState } from "react";
import styled from "styled-components";

/* ────────────────────────────────────────────────────────────────────────
   Planisphère des pays visités.

   Les tracés viennent de src/data/worldMap.js, fabriqué hors ligne à partir
   de Natural Earth par scripts/build-world-map.mjs. Rien n'est téléchargé au
   chargement de la page, et aucune bibliothèque cartographique n'est
   embarquée : ce composant ne fait que peindre des chemins déjà projetés.

   Le fichier de tracés pèse une bonne cinquantaine de kilo-octets. Il est
   donc importé à la demande : il ne part sur le réseau qu'au moment où la
   carte apparaît, c'est-à-dire à l'ouverture de la fiche Voyages, et jamais
   pour les autres pages du site.
   ──────────────────────────────────────────────────────────────────────── */

const Frame = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.line};
  background: ${(props) => props.theme.surface};

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  /* Le fond de carte n'est là que pour situer : il ne doit jamais accrocher
     l'oeil avant les pays visités. */
  .land {
    fill: ${(props) => props.theme.surface};
    stroke: ${(props) => props.theme.line};
    stroke-width: 0.6;
    stroke-linejoin: round;
    pointer-events: none;
  }

  .visited {
    fill: ${(props) => props.theme.text};
    stroke: ${(props) => props.theme.text};
    stroke-width: 1.4;
    stroke-linejoin: round;
    transition: opacity 0.25s ease;
    cursor: default;
  }

  /* Au survol, les autres pays visités reculent d'un cran plutôt que le
     survolé n'avance : rien ne clignote, et le contraste reste celui du
     thème. */
  &[data-hovered="true"] .visited {
    opacity: 0.4;
  }

  &[data-hovered="true"] .visited[data-active="true"] {
    opacity: 1;
  }
`;

/* Réserve la place de la carte avant son arrivée : sans cela le contenu qui
   la suit remonte puis redescend au moment du rendu. */
const Placeholder = styled.div`
  aspect-ratio: 1000 / 389;
`;

/* Légende posée sous la carte, dans le registre des micro-libellés du site :
   chasse fixe, petites capitales, discrète. Elle donne le compte au repos et
   le nom du pays au survol. Sa hauteur est réservée pour que rien ne saute
   d'un état à l'autre. */
const Caption = styled.p`
  margin-top: 0.75rem;
  min-height: 1.2em;
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textFaint};
  transition: color 0.25s ease;

  &[data-hovered="true"] {
    color: ${(props) => props.theme.text};
  }
`;

/**
 * @param visited  [{ code, name }] déjà localisés, dans l'ordre d'affichage.
 * @param label    Intitulé accessible de la carte.
 * @param summary  Légende au repos, par exemple « 7 pays visités ».
 */
const WorldMap = ({ visited, label, summary }) => {
  const [map, setMap] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    let vivant = true;
    import("../../data/worldMap").then((module) => {
      if (vivant) setMap(module);
    });
    return () => {
      vivant = false;
    };
  }, []);

  if (!map) {
    return (
      <Frame aria-hidden="true">
        <Placeholder />
      </Frame>
    );
  }

  const noms = new Map(visited.map((pays) => [pays.code, pays.name]));

  return (
    <div>
      <Frame data-hovered={Boolean(hovered)}>
        <svg
          viewBox={map.MAP_VIEWBOX}
          role="img"
          aria-label={`${label} ${visited.map((p) => p.name).join(", ")}`}
        >
          {/* Deux passes plutôt qu'une : tous les pays visités sont peints
              après le fond de carte, donc jamais recouverts par le contour
              d'un voisin. */}
          <g className="land">
            {map.countryPaths
              .filter((pays) => !noms.has(pays.code))
              .map((pays) => (
                <path key={pays.code ?? pays.name} d={pays.d} />
              ))}
          </g>

          <g>
            {map.countryPaths
              .filter((pays) => noms.has(pays.code))
              .map((pays) => (
                <path
                  key={pays.code}
                  className="visited"
                  data-active={hovered === pays.code}
                  d={pays.d}
                  onMouseEnter={() => setHovered(pays.code)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <title>{noms.get(pays.code)}</title>
                </path>
              ))}
          </g>
        </svg>
      </Frame>

      {/* Redondante avec la liste écrite qui suit, donc masquée aux lecteurs
          d'écran : elle ne sert qu'au survol, à la souris. */}
      <Caption data-hovered={Boolean(hovered)} aria-hidden="true">
        {hovered ? noms.get(hovered) : summary}
      </Caption>
    </div>
  );
};

export default WorldMap;
