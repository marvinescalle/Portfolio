# Photos de la section Passions

Déposez ici les photos de la mosaïque, puis renseignez le chemin
correspondant dans `src/data/passions.js`.

| Fichier attendu | Entrée dans passions.js | Cadrage conseillé |
| --- | --- | --- |
| `sport.jpg`   | `id: "sport"`   | horizontal (4/3) |
| `dessin.jpg`  | `id: "dessin"`  | vertical (3/4) |
| `voyage.jpg`  | `id: "voyage"`  | horizontal large (16/9) |
| `tech.jpg`    | `id: "tech"`    | vertical (3/4) |

Exemple, dans `src/data/passions.js` :

```js
image: "/images/passions/sport.jpg",
```

Le chemin commence par `/` : il part de la racine du site, pas du dossier `src`.

Format : JPG ou WebP, environ 1600 px de large, moins de 400 Ko.
Tant que `image` vaut `null`, une vignette « Photo à venir » s'affiche à la
place. Aucune image n'est inventée.
