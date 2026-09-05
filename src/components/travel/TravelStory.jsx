import styled from "styled-components";

import {
  countryNames,
  formatPeriod,
  journeyStops,
  microStates,
  regionNames,
  sortedOtherJourneys,
  visitedCountries,
} from "../../data/travel";
import { pick, useLanguage, useTranslation } from "../../i18n";
import { breakpoints, media } from "../../styles/theme";
import WorldMap from "./WorldMap";

/* ────────────────────────────────────────────────────────────────────────
   Le corps de la fiche Voyages.

   Trois blocs dans cet ordre : la carte et la liste des pays, le grand
   voyage avec ses étapes, puis les voyages indépendants. Le grand voyage ne
   se mélange jamais aux autres : c'est un parcours, pas une collection.

   Tout vient de src/data/travel.js, y compris l'ordre : les étapes se lisent
   de la première à la dernière, les voyages indépendants du plus récent au
   plus ancien, et ce tri est fait par les dates, pas par la position dans le
   tableau.
   ──────────────────────────────────────────────────────────────────────── */

const Block = styled.section`
  margin-top: clamp(2.25rem, 5vw, 3.5rem);
`;

/* Intitulé de bloc, dans le même registre que les sections des autres
   fiches : chasse fixe, petites capitales, filet sous le titre. */
const BlockHead = styled.header`
  padding-bottom: 0.85rem;
  border-bottom: 1px solid ${(props) => props.theme.line};
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  h3 {
    color: ${(props) => props.theme.text};
    font-family: ${(props) => props.theme.fontDisplay};
    font-size: clamp(1.1rem, 2.2vw, 1.5rem);
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .meta {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
  }
`;

/* La liste des pays passe sous la carte plutôt qu'à côté.

   Dix-neuf pays dans une colonne de 14 rem donnaient une bande verticale
   deux fois plus haute que la carte, qui écrasait la composition. En dessous,
   sur toute la largeur, un continent par colonne, elle se lit d'un coup
   d'oeil et se contentera d'ajouter des lignes à mesure que la liste
   grandira. */
const Regions = styled.div`
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: start;

  h4 {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${(props) => props.theme.textFaint};
    padding-bottom: 0.7rem;
    border-bottom: 1px solid ${(props) => props.theme.line};
  }

  li {
    padding: 0.45rem 0;
    font-size: 0.92rem;
    color: ${(props) => props.theme.textSoft};
  }

  li + li {
    border-top: 1px solid ${(props) => props.theme.line};
  }
`;

/* Une étape du grand voyage. Le pays domine, la période le suit sur la même
   ligne tant que la place le permet. */
const Stop = styled.article`
  margin-top: clamp(1.75rem, 4vw, 2.5rem);

  .head {
    display: flex;
    align-items: baseline;
    gap: 0.35rem 1rem;
    flex-wrap: wrap;
  }

  h4 {
    font-family: ${(props) => props.theme.fontDisplay};
    font-size: clamp(1rem, 2vw, 1.3rem);
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${(props) => props.theme.text};
  }

  .period {
    font-family: ${(props) => props.theme.fontMono};
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: ${(props) => props.theme.textFaint};
  }

  p {
    margin-top: 0.85rem;
    max-width: 62ch;
    line-height: 1.7;
    color: ${(props) => props.theme.textSoft};
  }
`;

/* Reprise exacte du cadrage des autres fiches : trois photos par ligne, même
   rapport, une photo pouvant en occuper deux. */
const Shots = styled.div`
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.6rem, 1.6vw, 1rem);
  align-items: start;

  figure {
    margin: 0;
    grid-column: span 1;
  }

  /* Une photo peut occuper la place de deux. Elle ne reçoit alors aucun
     rapport imposé : en garder un doublerait sa hauteur en même temps que sa
     largeur. Elle s'étire sur la hauteur de la ligne, fixée par sa voisine. */
  figure[data-span="2"] {
    grid-column: span 2;
    align-self: stretch;
  }

  figure[data-span="2"] img {
    aspect-ratio: auto;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border: 1px solid ${(props) => props.theme.line};
    background: ${(props) => props.theme.surface};
  }

  /* Media query écrite à la main : le raccourci media.md concatène ses
     valeurs sans les évaluer, une fonction de props s'y perdrait. */
  @media (max-width: ${breakpoints.md}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    figure[data-span="2"] {
      grid-column: span 1;
      align-self: start;
    }

    figure[data-span="2"] img {
      aspect-ratio: 4 / 5;
      height: auto;
    }
  }

  ${media.sm`
    grid-template-columns: minmax(0, 1fr);

    figure[data-span="2"] { grid-column: span 1; }
  `}
`;

const Photos = ({ photos, language }) =>
  photos?.length ? (
    <Shots>
      {photos.map((shot) => (
        <figure key={shot.src} data-span={shot.span ?? 1}>
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
  ) : null;

const TravelStory = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const textes = t.passions.travel;

  /* La liste est alphabétique, et le tri suit la langue affichée : c'est un
     index, on y cherche un nom. L'ordre de visite n'a de sens que dans le
     récit, plus bas. */
  const pays = visitedCountries
    .map((entree) => ({
      code: entree.code,
      region: entree.region,
      name: pick(countryNames[entree.code], language) ?? entree.code,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, language));

  /* Les continents ne sont annoncés que s'il y en a plusieurs : un seul
     intertitre au-dessus de la liste entière ne dirait rien. L'ordre des
     continents est celui de leur déclaration, pour qu'il ne bouge pas d'une
     visite à l'autre. */
  const regions = Object.keys(regionNames).filter((region) =>
    pays.some((p) => p.region === region)
  );
  const grouper = regions.length > 1;

  const nomEtape = (code) => pick(countryNames[code], language) ?? code;

  return (
    <>
      <Block aria-labelledby="voyages-carte">
        <BlockHead>
          <h3 id="voyages-carte">{textes.countries}</h3>
          <span className="meta">
            {textes.count.replace("{n}", pays.length)}
          </span>
        </BlockHead>

        <WorldMap
          visited={pays}
          markers={microStates}
          label={textes.mapLabel}
          summary={textes.count.replace("{n}", pays.length)}
        />

        {/* Un continent par colonne quand plusieurs sont représentés, une
            liste simple sinon : un intertitre unique n'apprendrait rien. Et
            pas de titre au-dessus, le bloc en porte déjà un. */}
        <Regions>
          {grouper ? (
            regions.map((region) => (
              <div key={region}>
                <h4>{pick(regionNames[region], language) ?? region}</h4>
                <ul>
                  {pays
                    .filter((p) => p.region === region)
                    .map((p) => (
                      <li key={p.code}>{p.name}</li>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <ul>
              {pays.map((p) => (
                <li key={p.code}>{p.name}</li>
              ))}
            </ul>
          )}
        </Regions>
      </Block>

      {/* Sans intitulé au-dessus : les étapes portent déjà leur pays et leur
          période, et un titre de plus n'ajoutait qu'une strate. */}
      <Block>
        {journeyStops.map((etape) => (
          <Stop key={etape.code}>
            <div className="head">
              <h4>{nomEtape(etape.code)}</h4>
              <span className="period">
                {formatPeriod(etape.startDate, etape.endDate, language)}
              </span>
            </div>

            {pick(etape.text, language) ? (
              <p>{pick(etape.text, language)}</p>
            ) : null}

            <Photos photos={etape.photos} language={language} />
          </Stop>
        ))}
      </Block>

      {/* Rien n'est affiché tant qu'aucun voyage indépendant n'est
          renseigné : un intitulé seul se lirait comme un oubli. */}
      {sortedOtherJourneys.length ? (
        <Block aria-labelledby="voyages-autres">
          <BlockHead>
            <h3 id="voyages-autres">{textes.other}</h3>
          </BlockHead>

          {sortedOtherJourneys.map((voyage) => (
            <Stop key={voyage.id}>
              <div className="head">
                <h4>{nomEtape(voyage.code)}</h4>
                <span className="period">
                  {formatPeriod(voyage.startDate, voyage.endDate, language)}
                </span>
              </div>

              {pick(voyage.text, language) ? (
                <p>{pick(voyage.text, language)}</p>
              ) : null}

              <Photos photos={voyage.photos} language={language} />
            </Stop>
          ))}
        </Block>
      ) : null}
    </>
  );
};

export default TravelStory;
