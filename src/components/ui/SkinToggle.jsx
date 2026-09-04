import styled from "styled-components";

import { useSkin } from "../../theme/SkinProvider";
import { useTranslation } from "../../i18n";

/* ────────────────────────────────────────────────────────────────────────
   Bascule entre les deux peaux du site.

   Volontairement muette : pas de libellé, pas d'icône, un simple disque de
   la taille d'une puce typographique. Éteint en MONO, il porte en CHROMA le
   dégradé de la rubrique en cours, et se lit donc comme un échantillon
   d'encre plutôt que comme un réglage. L'intitulé accessible, lui, dit
   exactement ce que fait le bouton.
   ──────────────────────────────────────────────────────────────────────── */

const Button = styled.button`
  display: inline-grid;
  place-items: center;
  width: 1.1rem;
  height: 1.1rem;
  padding: 0;
  border-radius: 50%;
  /* Le disque flotte dans un anneau fin, exactement comme le point du
     logotype et les puces des listes. */
  border: 1px solid
    ${(props) => (props.$onDark ? props.theme.body : props.theme.lineStrong)};
  transition: border-color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.12);
    border-color: ${(props) =>
      props.$onDark ? props.theme.body : props.theme.text};
  }

  span {
    display: block;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    /* En MONO le jeton vaut la couleur du texte, le disque est donc une
       simple pastille d'encre. En CHROMA il porte les deux teintes de la
       page, et devient l'aperçu de ce qu'il déclenche. */
    background: ${(props) =>
      props.theme.skin === "chroma"
        ? props.theme.band
        : props.$onDark
          ? props.theme.body
          : props.theme.text};
    opacity: ${(props) => (props.theme.skin === "chroma" ? 1 : 0.55)};
    transition: opacity 0.3s ease;
  }

  &:hover span {
    opacity: 1;
  }
`;

const SkinToggle = ({ onDark = false }) => {
  const { skin, toggle } = useSkin();
  const t = useTranslation();

  return (
    <Button
      type="button"
      onClick={toggle}
      $onDark={onDark}
      aria-pressed={skin === "chroma"}
      aria-label={skin === "chroma" ? t.skin.toMono : t.skin.toChroma}
      title={skin === "chroma" ? t.skin.chroma : t.skin.mono}
    >
      <span aria-hidden="true" />
    </Button>
  );
};

export default SkinToggle;
