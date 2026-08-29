import { useEffect } from "react";

import { seo } from "../data/profile";

const setMeta = (selector, attribute, value) => {
  const tag = document.head.querySelector(selector);
  if (tag && value) tag.setAttribute(attribute, value);
};

/**
 * Met à jour le titre et la description de la page courante.
 *
 * Le site est une application monopage : sans cela, chaque route conserverait
 * les balises définies dans index.html, ce qui nuit au référencement et aux
 * aperçus de partage.
 */
const useDocumentMeta = (title, description) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${seo.title}` : seo.title;
    const text = description || seo.description;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", text);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", text);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", text);
  }, [title, description]);
};

export default useDocumentMeta;
