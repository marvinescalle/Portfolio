import { createContext, useContext, useMemo, useRef, useState } from "react";

import music from "../../assets/audio/guts.mp3";

/**
 * Ambiance sonore du portfolio.
 *
 * L'élément audio vit au-dessus des routes : monté dans une page, il
 * s'arrêterait à chaque changement de rubrique. Rien ne démarre sans une
 * action du visiteur, et le fichier n'est même pas téléchargé avant.
 */
const AmbienceContext = createContext({
  playing: false,
  toggle: () => {},
});

export const useAmbience = () => useContext(AmbienceContext);

export const AmbienceProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const value = useMemo(
    () => ({
      playing,
      toggle: () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
          audio.pause();
          setPlaying(false);
          return;
        }

        // La lecture peut être refusée par le navigateur : l'état visuel ne
        // bascule que si le son démarre réellement.
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      },
    }),
    [playing]
  );

  return (
    <AmbienceContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={music} loop preload="none" />
    </AmbienceContext.Provider>
  );
};

export default AmbienceProvider;
