# Portfolio de Marvin Escalle

Portfolio personnel développé en React, déployé sur Netlify.

## Démarrer en local

Prérequis : [Node.js](https://nodejs.org) 20 ou supérieur.

```bash
npm install
npm run dev
```

Le site est alors accessible sur http://localhost:3000.

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Version de production dans `dist/` |
| `npm run preview` | Sert `dist/` localement pour vérifier le build |

## Mettre à jour le contenu

**Tout le contenu du site vit dans `src/data/`.** Aucune modification
d'interface n'est nécessaire pour ajouter un projet ou une expérience.

| Fichier | Contenu |
| --- | --- |
| `profile.js` | Nom, titre, phrase d'accroche, e-mail, liens sociaux, chemin du CV |
| `skills.js` | Compétences, regroupées par domaine |
| `experience.js` | Expériences principales (grandes cartes) et secondaires (lignes) |
| `projects.js` | Projets, archives comprises |
| `education.js` | Formations affichées en timeline |
| `passions.js` | Vignettes de la mosaïque Passions |
| `navigation.js` | Sections et ordre de la navigation |
| `travel.js` | Pays visités et étapes du voyage, pour la fiche Voyages |

Les textes d'interface, français et anglais, vivent à part dans
`src/i18n/ui.js`.

### Ajouter un projet

Ouvrir `src/data/projects.js` et copier un objet existant dans le tableau
`projects`. La position dans le fichier n'a pas d'importance : l'affichage
trie automatiquement du plus récent au plus ancien d'après le champ `year`.

```js
{
  id: "mon-projet",
  title: "Mon projet",
  year: "2026",
  description: "Deux ou trois phrases.",
  context: "Projet personnel",
  stack: ["React", "Node.js"],
  image: "/images/projects/mon-projet.png", // ou null
  github: "https://github.com/marvinescalle/mon-projet", // ou null
  demo: null,
  category: "web",     // "devops" | "web" | "school"
  featured: true,      // true = grande carte en haut de page
  published: true,     // false = masqué sans perdre les données
}
```

Dès qu'un `github` (ou `demo`) est renseigné, **la carte entière devient
cliquable** et s'ouvre dans un nouvel onglet, avec une icône GitHub visible.
Sans lien, la carte reste un simple bloc, sans curseur trompeur.

Une entrée `devops-diplome` est déjà en place, en attente du projet de fin de
formation : la remplir puis passer `published` à `true`.

### Ajouter une expérience

Ouvrir `src/data/experience.js`.

- **Alternance ou poste majeur** → tableau `mainExperiences` (grande carte
  avec missions détaillées et technologies).
- **Stage, job d'été, mission courte** → tableau `secondaryExperiences`
  (une ligne : année, entreprise, poste, une phrase).

Un champ `period` ou `location` à `null` masque proprement la ligne
correspondante, plutôt que d'afficher une valeur approximative.

### Déposer les fichiers

| Quoi | Où |
| --- | --- |
| CV français | `public/cv/Marvin_Escalle_CV_FR.pdf` |
| CV anglais | `public/cv/Marvin_Escalle_CV_EN.pdf` |
| Captures de projets | `public/images/projects/` |
| Photos des passions | `public/images/passions/` |
| Logos d'entreprises | `public/images/logos/` |

Chaque dossier contient un `README.md` rappelant les formats attendus.

## Stack

- **React 19** + **Vite** : interface et build
- **React Router 7** : navigation, avec redirections depuis les anciennes URL
- **styled-components 6** : styles par composant, deux thèmes (clair / sombre)
- **Framer Motion** : animations, désactivées si le visiteur a demandé de
  réduire les animations

## Organisation du code

```
src/
├── assets/            Portraits optimisés et bande sonore
├── components/
│   ├── icons/         Icônes SVG de trait
│   ├── layout/        Navigation, pied de page, ossature des pages
│   └── ui/            Briques réutilisables (révélation, titres, étiquettes)
├── data/              ← tout le contenu éditorial
├── hooks/             Titre et métadonnées par page
├── pages/             Une page par section
├── styles/            Jetons de design et styles globaux
├── App.jsx            Routes et redirections
└── index.jsx          Point d'entrée
```

## Où vivent les images

Trois dossiers portent les mêmes sous-dossiers, ce qui prête à confusion.
Un seul se modifie :

| Dossier | Rôle | Suivi par git |
| --- | --- | --- |
| `photos-source/` | Les originaux pleine résolution | non, ignoré |
| `public/images/` | **Les versions web, celles du site** | oui |
| `dist/images/` | Copie produite par le build | non, ignoré |

Le portrait fait exception : il n'est dans aucun des trois. Il vit dans
`src/assets/optimized/portrait.jpg`, parce qu'il est importé par le code et
non chargé par une adresse. Vite lui donne alors un nom porteur d'empreinte,
ce qui permet de le mettre en cache indéfiniment. Les deux pages qui
l'affichent, l'accueil et À propos, partagent ce même fichier.

Le portrait est détouré sur fond blanc et affiché en mode `multiply`, qui
fait disparaître ce fond sur le papier cassé du site. Un fichier au fond
transparent convient aussi : l'aplatir en JPEG le pose sur du blanc, ce
qu'attend ce mode.

## Voyages et planisphère

La fiche Passions « Voyages » lit `src/data/travel.js`, seule source de
vérité : la carte, la liste des pays et le parcours daté en sortent tous les
trois.

**Ajouter un pays** : renseigner son nom dans `countryNames`, son continent
dans `countryRegions`, puis soit le citer dans un voyage, soit l'ajouter à
`otherVisitedCountries` s'il n'a ni texte ni photos. La carte le surligne et
la liste l'affiche, sans seconde liste à tenir à jour. Les continents ne sont
annoncés que lorsqu'il y en a plusieurs.

Un pays trop petit pour figurer au 1:110m, comme Monaco, n'a pas de tracé
dans les données Natural Earth : lui donner des coordonnées dans
`microStates` le fait apparaître sous la forme d'un point.

**Ajouter un voyage** : une entrée dans `otherJourneys`, avec ses dates en
ISO. Rien d'autre. L'ordre vient des dates et non de la position dans le
tableau : les étapes du grand voyage se lisent de la première à la dernière,
les voyages indépendants du plus récent au plus ancien. Tant que
`otherJourneys` est vide, la section correspondante n'apparaît pas.

Les dates sont stockées au jour près, mais jamais affichées ainsi :
`formatPeriod` n'en montre que le mois et l'année, dans la langue courante.

### Les tracés de la carte

`src/data/worldMap.js` est **généré**, par `scripts/build-world-map.mjs` :

```bash
node scripts/build-world-map.mjs
```

Le script télécharge le jeu « Admin 0 - Countries » au 1:110m de **Natural
Earth**, domaine public, le projette en équirectangulaire, simplifie les
contours et n'écrit que des tracés SVG. Aucune bibliothèque cartographique
n'est embarquée et rien n'est téléchargé à l'exécution. Le fichier obtenu,
une petite centaine de kilo-octets, est importé à la demande : il ne part sur
le réseau qu'à l'ouverture de la fiche Voyages.

## Accessibilité

Lien d'évitement, repères sémantiques, un seul `h1` par page, focus visible au
clavier, `alt` sur toutes les images, intitulés explicites sur les liens
externes, et respect de `prefers-reduced-motion`.

## Page Contact

Aucun formulaire, et c'est délibéré : il dépendait de Netlify Forms, ne
pouvait pas être essayé en local, et une panne silencieuse aurait fait
disparaître des messages sans que personne s'en aperçoive.

La page affiche trois moyens de contact, dont un lien `mailto:` qui ouvre
directement le client de messagerie du visiteur, plus une action discrète de
copie de l'adresse. Tout est piloté par `src/data/profile.js`.

## Déploiement

Chaque push sur `main` déclenche un déploiement Netlify. La configuration est
dans `netlify.toml` : build `npm run build`, dossier publié `dist/`, Node 22,
et une redirection SPA pour que les URL directes (`/projets`, `/contact`…)
fonctionnent.
