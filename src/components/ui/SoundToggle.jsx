import styled, { keyframes } from "styled-components";

import { useAmbience } from "../audio/AmbienceProvider";

const bounce = keyframes`
  0%, 100% { transform: scaleY(0.35); }
  50% { transform: scaleY(1); }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: flex-end;
  gap: 3px;
  height: 0.9rem;
  padding: 0.35rem 0;
  color: ${(props) => (props.$onDark ? props.theme.body : props.theme.text)};
  opacity: ${(props) => (props.$playing ? 1 : 0.45)};
  transition: color 0.6s ease, opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  span {
    display: block;
    width: 2px;
    height: 100%;
    background: currentColor;
    transform-origin: bottom;
    transform: scaleY(0.35);
    animation: ${bounce} 1.1s ease-in-out infinite;
    animation-play-state: ${(props) => (props.$playing ? "running" : "paused")};
  }

  span:nth-child(2) { animation-delay: 0.15s; }
  span:nth-child(3) { animation-delay: 0.3s; }
  span:nth-child(4) { animation-delay: 0.45s; }
  span:nth-child(5) { animation-delay: 0.6s; }

  @media (prefers-reduced-motion: reduce) {
    span { animation: none; }
    span:nth-child(2) { transform: scaleY(0.7); }
    span:nth-child(3) { transform: scaleY(1); }
    span:nth-child(4) { transform: scaleY(0.7); }
  }
`;

/**
 * Bascule de l'ambiance sonore. Toujours à l'arrêt au chargement : rien ne
 * démarre sans action du visiteur. L'opacité distingue clairement l'état
 * actif de l'état inactif, en plus de aria-pressed.
 */
const SoundToggle = ({ onDark = false }) => {
  const { playing, toggle } = useAmbience();

  return (
    <Button
      type="button"
      onClick={toggle}
      $playing={playing}
      $onDark={onDark}
      aria-pressed={playing}
      aria-label={
        playing ? "Couper l'ambiance sonore" : "Activer l'ambiance sonore"
      }
      title={playing ? "Ambiance sonore active" : "Ambiance sonore coupée"}
    >
      <span />
      <span />
      <span />
      <span />
      <span />
    </Button>
  );
};

export default SoundToggle;
