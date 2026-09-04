# Déploiement final

Ce document rassemble ce qui reste à faire le jour où le portfolio part en
ligne. **Rien n'a été déployé** : tout le travail décrit ici a été préparé et
vérifié en local uniquement.

---

## Checklist du jour J

- [ ] Compléter les champs marqués `TODO` dans `src/data/`
- [ ] Fusionner la branche `v2` dans `main`
- [ ] Déployer la version finale sur Netlify
- [ ] Vérifier que Netlify détecte le formulaire
- [ ] Envoyer un message de test depuis la page Contact en ligne
- [ ] Vérifier que la soumission apparaît dans l'onglet Forms de Netlify
- [ ] Vérifier la réception de la notification email
- [ ] Retester la page Contact et la page CV en production, sur ordinateur
      **et** sur téléphone

---

## Contact

Rien à configurer. La page Contact n'a plus de formulaire : elle affiche un
lien `mailto:` et les profils LinkedIn et GitHub, tous définis dans
`src/data/profile.js`. Netlify Forms n'est plus utilisé, et la déclaration
statique correspondante a été retirée de `index.html`.

---

## CV

Deux fichiers à remplacer dans `public/cv/`, en conservant exactement ces
noms :

| Fichier | Colonne |
| --- | --- |
| `Marvin_Escalle_CV_FR.pdf` | Français, à gauche |
| `Marvin_Escalle_CV_EN.pdf` | Anglais, à droite |

Aucun code n'est à modifier : la page les reprend automatiquement.

Les deux CV en place sont les versions Business Analyst IT, au format
US Letter. Si un futur fichier est au format A4, basculer `cv.format` sur
`"a4"` dans `src/data/profile.js`, sans quoi une bande vide apparaîtra sous
le document.

Pour afficher une date de mise à jour sous le titre de la page, renseigner
`cv.updatedAt` dans `src/data/profile.js`, par exemple `"Août 2026"`.

---

## Langues

Tous les textes de la page Contact et de la page CV existent déjà en français
et en anglais dans `src/data/translations.js`.

Le portfolio n'a pas encore de sélecteur de langue : la constante
`DEFAULT_LANGUAGE` fixe la langue utilisée partout. Le jour où un sélecteur
sera ajouté, il suffira de remplacer cette constante par une valeur issue
d'un contexte React, sans toucher aux composants.

Les intitulés des colonnes de la page CV font exception et restent dans leur
propre langue quelle que soit la langue du site : la colonne française
affiche « Télécharger », la colonne anglaise « Download ».
