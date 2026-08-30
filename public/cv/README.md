# CV

Deux fichiers, un par langue. Il suffit de les remplacer en gardant
exactement les mêmes noms : le portfolio les reprend automatiquement, aucun
code n'est à modifier.

| Fichier | Version |
| --- | --- |
| `Marvin_Escalle_CV_FR.pdf` | Français, colonne de gauche |
| `Marvin_Escalle_CV_EN.pdf` | Anglais, colonne de droite |

## Format des pages

Le cadre d'affichage reprend les proportions du document, sinon une bande
vide apparaît sous le PDF. Les fichiers actuels sont au format **US Letter**
(612 x 792 points), ce qui est indiqué par `cv.format: "letter"` dans
`src/data/profile.js`.

Si un futur CV est au format A4, remplacer cette valeur par `"a4"`.

## Autres réglages

Pour afficher une date de mise à jour sous le titre de la page, renseigner
`cv.updatedAt` dans `src/data/profile.js`, par exemple `"Août 2026"`.
