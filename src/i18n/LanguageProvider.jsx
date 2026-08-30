import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ui } from "./ui";

/**
 * Langue de l'interface.
 *
 * Le choix est mémorisé dans localStorage et rétabli au rechargement. À la
 * toute première visite, la langue du navigateur sert de valeur de départ.
 * L'attribut lang du document suit, ce dont dépendent les lecteurs d'écran
 * comme la césure automatique.
 */

const STORAGE_KEY = "portfolio-langue";
export const LANGUAGES = ["fr", "en"];

const readStored = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(stored)) return stored;
  } catch {
    /* stockage indisponible : on se rabat sur le navigateur */
  }

  const preferred = window.navigator?.language ?? "fr";
  return preferred.toLowerCase().startsWith("en") ? "en" : "fr";
};

const LanguageContext = createContext({
  language: "fr",
  setLanguage: () => {},
  t: ui.fr,
});

export const useLanguage = () => useContext(LanguageContext);

/** Dictionnaire de la langue active. */
export const useTranslation = () => useContext(LanguageContext).t;

/**
 * Renvoie la bonne variante d'un champ de contenu.
 * Accepte aussi bien une chaîne simple, qui n'est alors pas traduite, qu'un
 * objet { fr, en }. La version française sert de repli.
 */
export const pick = (value, language) => {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object" || Array.isArray(value)) return value;
  return value[language] ?? value.fr ?? null;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return "fr";
    return readStored();
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* sans stockage, le choix vaut pour la session en cours */
    }
  }, [language]);

  const setLanguage = useCallback((next) => {
    if (LANGUAGES.includes(next)) setLanguageState(next);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, t: ui[language] ?? ui.fr }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
