# Déploiement final

Ce document rassemble ce qui reste à faire le jour où le portfolio part en
ligne. **Rien n'a été déployé** : tout le travail décrit ici a été préparé et
vérifié en local uniquement.

---

## Checklist du jour J

- [ ] Remplacer les deux CV dans `public/cv/` (voir plus bas)
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

## Netlify Forms

### Pourquoi cela ne peut pas être testé en local

Netlify Forms n'existe pas en local. Le traitement des soumissions est assuré
par l'infrastructure Netlify, qui repère les formulaires en analysant le HTML
livré **au moment du déploiement**.

En local, l'envoi du formulaire échoue donc toujours : la page affiche
proprement le message d'erreur avec l'adresse email en secours, ce qui est le
comportement attendu. Ce n'est pas un bug.

Ce qui **a** été vérifié en local :

- la requête part bien en `POST` vers `/`, encodée en
  `application/x-www-form-urlencoded` ;
- le corps de la requête contient `form-name=contact`, `bot-field`, `name`,
  `email`, `subject` et `message` ;
- le formulaire statique de détection est présent dans le `index.html`
  généré par le build ;
- les quatre états du bouton, la validation, le piège à robots et les
  messages d'erreur fonctionnent.

### 1. Activer la détection des formulaires

Dans le tableau de bord du site :

**Site configuration → Forms → Form detection → Enable form detection**

Puis **relancer un déploiement**. La détection s'appuie sur l'analyse du HTML
au build : activer l'option ne suffit pas, il faut un nouveau déploiement
pour que Netlify voie le formulaire.

Une fois détecté, un formulaire nommé `contact` apparaît dans l'onglet
**Forms** du site.

### 2. Voir les messages reçus

**Onglet Forms** du site, puis le formulaire `contact`. Chaque soumission y
est listée avec ses champs. Les messages considérés comme indésirables
arrivent dans l'onglet **Spam** du même écran : penser à y jeter un œil les
premiers jours.

Le plan gratuit inclut 100 soumissions par mois.

### 3. Recevoir un email à chaque message

**Site configuration → Forms → Form notifications → Add notification →
Email notification**

Renseigner l'adresse de réception (`marvinescalle.pro@gmail.com`) et
sélectionner le formulaire `contact`.

### 4. Tester après déploiement

1. Ouvrir la page `/contact` du site en ligne.
2. Remplir le formulaire avec une vraie adresse et envoyer.
3. Le site doit afficher **« Message envoyé. »** sans changer de page ni
   recharger. Si une page de confirmation Netlify grise apparaît, c'est que
   l'envoi en arrière-plan n'a pas fonctionné.
4. Vérifier la soumission dans l'onglet Forms.
5. Vérifier la réception de l'email de notification.
6. Refaire l'essai depuis un téléphone.

### Point de vigilance

Le formulaire existe en deux exemplaires :

| Où | Rôle |
| --- | --- |
| `index.html` | Copie statique, invisible, servant uniquement à la détection Netlify |
| `src/components/ui/ContactForm.jsx` | Le formulaire réellement affiché |

**Les deux doivent rester synchronisés.** Ajouter un champ dans le composant
sans l'ajouter dans `index.html` ferait que la valeur de ce champ ne
remonterait pas dans Netlify.

---

## CV

Deux fichiers à remplacer dans `public/cv/`, en conservant exactement ces
noms :

| Fichier | Colonne |
| --- | --- |
| `Marvin_Escalle_CV_FR.pdf` | Français, à gauche |
| `Marvin_Escalle_CV_EN.pdf` | Anglais, à droite |

Aucun code n'est à modifier : la page les reprend automatiquement.

**Les deux fichiers actuellement en place sont une copie de l'ancien CV
français.** La colonne anglaise affiche donc pour l'instant un document en
français, à remplacer avant toute mise en ligne.

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
