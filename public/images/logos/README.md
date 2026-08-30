# Logos des entreprises

Déposez ici les logos affichés sur les grandes cartes de la page Expériences,
puis renseignez le champ `logo` de l'expérience concernée dans
`src/data/experience.js` :

```js
logo: "/images/logos/thales.png",
```

Format conseillé : PNG à fond transparent ou SVG, environ 400 px de large.
Un logo sombre sur fond transparent rend le mieux, le site étant sur fond
clair à cet endroit.

Tant que `logo` vaut `null`, l'initiale de l'entreprise s'affiche dans le
cadre. La composition reste donc complète même sans logo.
