import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import music from "../../assets/audio/guts.mp3";

const bounce = keyframes`
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 1.15rem;
  padding: 0.35rem 0;
  color: ${(props) => (props.$onDark ? props.theme.body : props.theme.text)};
  transition: color 0.6s ease;

  span {
    display: block;
    width: 2px;
    height: 100%;
    background: currentColor;
    transform-origin: center;
    transform: scaleY(0.4);
    animation: ${bounce} 1.1s ease-in-out infinite;
    animation-play-state: ${(props) => (props.$playing ? "running" : "paused")};
  }

  span:nth-child(2) { animation-delay: 0.15s; }
  span:nth-child(3) { animation-delay: 0.3s; }
  span:nth-child(4) { animation-delay: 0.45s; }
  span:nth-child(5) { animation-delay: 0.6s; }
`;

/**
 * Ambiance sonore de la page d'accueil, héritée de la première version du
 * portfolio. Toujours à l'arrêt au chargement : rien ne démarre sans action
 * du visiteur.
 */
const SoundToggle = ({ onDark = false }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // La lecture peut être refusée par le navigateur : on ne bascule
      // l'état visuel que si elle démarre réellement.
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

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
    >
      <span />
      <span />
      <span />
      <span />
      <span />
      <audio ref={audioRef} src={music} loop preload="none" />
    </Button>
  );
};

export default SoundToggle;
