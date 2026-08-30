import styled, { keyframes } from "styled-components";

import { useTranslation } from "../../i18n";

const pulse = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
`;

const Screen = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const Label = styled.span`
  font-family: ${(props) => props.theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

/** Écran d'attente pendant le chargement d'une page. */
const Loading = () => {
  const t = useTranslation();
  return (
  <Screen role="status" aria-live="polite">
    <Label>{t.common.loading}</Label>
  </Screen>
  );
};

export default Loading;
