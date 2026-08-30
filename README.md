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
| `translations.js` | Textes français et anglais des pages CV et Contact |

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

## Accessibilité

Lien d'évitement, repères sémantiques, un seul `h1` par page, focus visible au
clavier, `alt` sur toutes les images, intitulés explicites sur les liens
externes, et respect de `prefers-reduced-motion`.

## Formulaire de contact

La page Contact utilise **Netlify Forms**, sans backend ni service externe.

Le formulaire existe en deux exemplaires qui doivent rester synchronisés :
une copie statique invisible dans `index.html`, qui sert uniquement à la
détection par Netlify au moment du build, et le formulaire réellement
affiché dans `src/components/ui/ContactForm.jsx`. Ajouter un champ dans l'un
sans l'ajouter dans l'autre ferait que sa valeur ne remonterait pas.

L'envoi passe par `fetch` en `POST` url-encodé vers la racine du site, ce qui
garde le visiteur sur la page au lieu d'afficher la confirmation générique de
Netlify.

Netlify Forms ne fonctionne pas en local : l'envoi y échoue toujours et la
page affiche alors son message d'erreur avec l'adresse email en secours. Voir
[DEPLOIEMENT.md](DEPLOIEMENT.md) pour la configuration et les tests à faire
une fois le site en ligne.

## Déploiement

Chaque push sur `main` déclenche un déploiement Netlify. La configuration est
dans `netlify.toml` : build `npm run build`, dossier publié `dist/`, Node 22,
et une redirection SPA pour que les URL directes (`/projets`, `/contact`…)
fonctionnent.
