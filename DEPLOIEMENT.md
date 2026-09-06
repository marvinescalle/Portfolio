# Déploiement

Le site est hébergé sur Netlify, qui reconstruit et met en ligne
automatiquement à chaque push sur `main`. Il n'y a donc aucune commande de
déploiement à lancer à la main.

## Comment publier une modification

```bash
git add -A
git commit -m "Description du changement"
git push origin main
```

Netlify détecte le push, lance `npm run build` et publie `dist/`. Le build
prend une trentaine de secondes. En cas d'échec, le site en ligne reste sur
la version précédente : rien ne casse en production.

## Configuration

Tout est dans `netlify.toml`, à la racine :

| Réglage | Valeur | Pourquoi |
| --- | --- | --- |
| `command` | `npm run build` | build Vite |
| `publish` | `dist` | dossier généré |
| `NODE_VERSION` | `22` | Vite exige Node 20 ou plus |
| Redirection `/*` vers `/index.html` | statut 200 | sans elle, un accès direct à `/projets` renvoie une 404 |

Cette dernière ligne est indispensable : le portfolio est une application à
page unique, c'est React Router qui gère les URL côté navigateur.

## Nom de domaine

Le domaine personnalisé se branche depuis Netlify, dans **Domain management**,
puis chez le registrar en pointant les enregistrements DNS vers Netlify. Le
certificat HTTPS est émis automatiquement par Let's Encrypt, gratuitement, et
se renouvelle seul.

## Mettre à jour le CV

Deux fichiers à remplacer dans `public/cv/`, en conservant exactement ces
noms :

| Fichier | Colonne |
| --- | --- |
| `Marvin_Escalle_CV_FR.pdf` | Français, à gauche |
| `Marvin_Escalle_CV_EN.pdf` | Anglais, à droite |

Aucun code n'est à modifier : la page les reprend automatiquement.

Les sources Word éditables sont versionnées à la racine du dépôt, hors de
`public/`, donc non publiées avec le site. La marche à suivre complète est
dans `public/cv/README.md`.

Les deux CV en place sont les versions généralistes, au format US Letter, sur
une page chacune. Si un futur fichier passe en A4, basculer `cv.format` sur
`"a4"` dans `src/data/profile.js`, sans quoi une bande vide apparaîtra sous le
document.

Pour afficher une date de mise à jour sous le titre de la page, renseigner
`cv.updatedAt` dans `src/data/profile.js`, par exemple `"Septembre 2026"`.

## Langues

Le site est bilingue, avec un sélecteur français / anglais dans l'en-tête. Les
textes d'interface vivent dans `src/i18n/ui.js`, et les contenus dans
`src/data/`, où chaque champ traduit prend la forme `{ fr: "...", en: "..." }`.

## À compléter

- [ ] Renseigner `seo.siteUrl` dans `src/data/profile.js` une fois le domaine
      acheté. Il sert aux balises Open Graph, donc à l'aperçu affiché quand le
      lien est partagé sur LinkedIn ou par message.
- [ ] Vérifier la page CV et la page Contact en production, sur ordinateur
      **et** sur téléphone.
