import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { SKIN_IDS, skins } from "../styles/theme";

/**
 * Peau active du portfolio, MONO ou CHROMA.
 *
 * Le choix est mémorisé dans localStorage et rétabli au rechargement, comme
 * celui de la langue. MONO reste la valeur par défaut : c'est la version de
 * référence, et un visiteur qui arrive sans avoir rien choisi la voit.
 *
 * L'attribut `data-skin` est posé sur la racine du document, ce qui permet
 * aux quelques règles globales qui en dépendent de s'accrocher au CSS plutôt
 * que de remonter jusqu'ici.
 */

const STORAGE_KEY = "portfolio-peau";

const readStored = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (SKIN_IDS.includes(stored)) return stored;
  } catch {
    /* stockage indisponible : la peau vaut pour la session en cours */
  }
  return "mono";
};

const SkinContext = createContext({
  skin: "mono",
  setSkin: () => {},
  toggle: () => {},
  themes: skins.mono,
  isChroma: false,
});

export const useSkin = () => useContext(SkinContext);

/**
 * Thème à donner au ThemeProvider pour l'ambiance demandée.
 * Les pages parlent d'ambiance, jamais de peau : `tone="dark"` sur Passions
 * et Contact, la claire partout ailleurs.
 */
export const useTone = (tone = "light") => {
  const { themes } = useSkin();
  return tone === "dark" ? themes.dark : themes.light;
};

export const SkinProvider = ({ children }) => {
  const [skin, setSkinState] = useState(() => {
    if (typeof window === "undefined") return "mono";
    return readStored();
  });

  useEffect(() => {
    document.documentElement.dataset.skin = skin;
    try {
      window.localStorage.setItem(STORAGE_KEY, skin);
    } catch {
      /* sans stockage, le choix vaut pour la session en cours */
    }
  }, [skin]);

  const setSkin = useCallback((next) => {
    if (SKIN_IDS.includes(next)) setSkinState(next);
  }, []);

  const toggle = useCallback(() => {
    setSkinState((current) => (current === "mono" ? "chroma" : "mono"));
  }, []);

  const value = useMemo(
    () => ({
      skin,
      setSkin,
      toggle,
      themes: skins[skin] ?? skins.mono,
      isChroma: skin === "chroma",
    }),
    [skin, setSkin, toggle]
  );

  return <SkinContext.Provider value={value}>{children}</SkinContext.Provider>;
};

export default SkinProvider;
