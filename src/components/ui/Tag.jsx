import styled from "styled-components";

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
  white-space: nowrap;
`;

/** Liste de technologies. Rien n'est rendu si le tableau est vide. */
const TagList = ({ items, label }) => {
  if (!items?.length) return null;
  return (
    <List aria-label={label}>
      {items.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </List>
  );
};

export default TagList;
