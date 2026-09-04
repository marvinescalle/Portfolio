# CV

Trois variantes ciblées, chacune en français et en anglais. Elles racontent le
même parcours et n'ont aucune hiérarchie entre elles : la page `/cv` leur donne
exactement le même poids.

| Fichier | Variante | Langue |
| --- | --- | --- |
| `Marvin_Escalle_CV_Business_Analyst_FR.pdf` | Business Analyst IT | Français |
| `Marvin_Escalle_CV_Business_Analyst_EN.pdf` | Business Analyst IT | Anglais |
| `Marvin_Escalle_CV_Data_Automatisation_FR.pdf` | Data & Automatisation | Français |
| `Marvin_Escalle_CV_Data_Automatisation_EN.pdf` | Data & Automatisation | Anglais |
| `Marvin_Escalle_CV_DevOps_IVVQ_FR.pdf` | DevOps & IVVQ | Français |
| `Marvin_Escalle_CV_DevOps_IVVQ_EN.pdf` | DevOps & IVVQ | Anglais |

## Déposer un fichier

Le déposer ici sous le nom exact du tableau, puis passer le champ `ready` de la
langue concernée à `true` dans `cv.variants` de `src/data/profile.js`.

Tant que `ready` vaut `false`, la variante s'affiche sans aucun lien, avec la
mention « Version en préparation ». Un bouton qui mène à un fichier absent vaut
moins qu'une ligne qui dit franchement où l'on en est.

## Ce que ces fichiers ne doivent pas contenir

Les versions publiées ici sont accessibles à n'importe quel visiteur. Elles ne
doivent donc porter **ni numéro de téléphone**, ni localisation qui varie d'une
version à l'autre. La mention retenue partout est « France · Mobilité
internationale », ou son équivalent anglais.

## Format des pages

Le cadre d'aperçu reprend les proportions du document, sinon une bande vide
apparaît sous le PDF. Les fichiers actuels sont au format **US Letter**
(612 x 792 points), ce qui est indiqué par `cv.format: "letter"` dans
`src/data/profile.js`. Si un futur CV est au format A4, remplacer cette valeur
par `"a4"`.

## Autres réglages

Pour afficher une date de mise à jour sous le titre de la page, renseigner
`cv.updatedAt` dans `src/data/profile.js`, par exemple `"Septembre 2026"`.
