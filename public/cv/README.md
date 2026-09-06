# CV

Deux fichiers, un par langue. Il suffit de les remplacer en gardant
exactement les mêmes noms : le portfolio les reprend automatiquement, aucun
code n'est à modifier.

| Fichier | Version |
| --- | --- |
| `Marvin_Escalle_CV_FR.pdf` | Français, colonne de gauche |
| `Marvin_Escalle_CV_EN.pdf` | Anglais, colonne de droite |

## Sources

Ces deux PDF sont la version généraliste du CV. Les sources éditables et les
exports de référence vivent à la racine du dépôt, hors de `public/`, donc non
publiés :

| Fichier | Rôle |
| --- | --- |
| `Marvin_Escalle_CV_Generaliste_FR.docx` | Source Word, français |
| `Marvin_Escalle_CV_Generaliste_EN.docx` | Source Word, anglais |
| `Marvin_Escalle_CV_Generaliste_FR.pdf` | Export de référence, français |
| `Marvin_Escalle_CV_Generaliste_EN.pdf` | Export de référence, anglais |

Pour mettre le site à jour après avoir retouché un DOCX : réexporter en PDF
depuis Word, puis recopier l'export dans ce dossier sous le nom attendu ci
dessus. Le nom public reste `Marvin_Escalle_CV_FR.pdf` plutôt que le nom de
travail, pour que le fichier téléchargé par un recruteur porte un nom neutre.

## Ce que ces fichiers ne doivent pas contenir

Ils sont accessibles à n'importe quel visiteur du site. Ils ne devraient donc
porter **ni numéro de téléphone**, ni localisation qui varie d'une version à
l'autre. Les versions généralistes respectent déjà ces deux points : pas de
téléphone, et la même mention « France · Mobilité internationale » dans les
deux langues.

## Format des pages

Le cadre d'affichage reprend les proportions du document, sinon une bande
vide apparaît sous le PDF. Les fichiers actuels sont au format **US Letter**
(612 x 792 points), ce qui est indiqué par `cv.format: "letter"` dans
`src/data/profile.js`.

Si un futur CV est au format A4, remplacer cette valeur par `"a4"`.

Chacun des deux documents tient sur **une seule page**. C'est une contrainte
à conserver : la page CV affiche un aperçu unique par langue.

## Autres réglages

Pour afficher une date de mise à jour sous le titre de la page, renseigner
`cv.updatedAt` dans `src/data/profile.js`, par exemple `"Septembre 2026"`.
