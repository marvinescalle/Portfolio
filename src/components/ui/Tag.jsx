import styled from "styled-components";

import { pick, useLanguage } from "../../i18n";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.45rem;
`;

const Item = styled.li`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  line-height: 1;
  padding: 0.45rem 0.6rem;
  border: 1px solid ${(props) => props.theme.line};
  color: ${(props) => props.theme.textSoft};
  /* Un intitulé ne se coupe jamais au milieu. Les plus longs, du type
     « Terraform / Infrastructure as Code », passent à la ligne sur les
     espaces plutôt que de déborder de la colonne. */
  white-space: normal;
  overflow-wrap: break-word;
`;

/**
 * Liste de technologies. Rien n'est rendu si le tableau est vide.
 *
 * Un élément est soit une chaîne, identique dans les deux langues, soit un
 * objet { fr, en } lorsqu'il se traduit : « Sécurité » n'a rien à faire dans
 * la version anglaise.
 */
const TagList = ({ items, label }) => {
  const { language } = useLanguage();
  if (!items?.length) return null;

  return (
    <List aria-label={label}>
      {items.map((item) => {
        const text = pick(item, language);
        return <Item key={text}>{text}</Item>;
      })}
    </List>
  );
};

export default TagList;
