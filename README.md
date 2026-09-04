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
- **styled-components 6** : styles par composant, deux peaux (mono / chroma),
  chacune en ambiance claire et sombre
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
├── styles/            Jetons de design, palette chroma, styles globaux
├── theme/             Peau active et thème qui en découle
├── App.jsx            Routes et redirections
└── index.jsx          Point d'entrée
```

## Les deux peaux

Le site existe en deux versions visuelles, **MONO** et **CHROMA**. Même
structure, même contenu, mêmes pages : seule la matière change. La bascule est
la pastille ronde posée à droite du choix de langue, et le choix est mémorisé
dans le navigateur. MONO est la version par défaut.

Aucune page n'est dupliquée. Un composant ne sait jamais quelle peau est
active : il demande des jetons, et la peau décide de ce qu'ils valent.

| Jeton | MONO | CHROMA |
| --- | --- | --- |
| `accent` | encre | teinte de la rubrique |
| `rule` | encre | teinte de la rubrique |
| `accentLabel` | gris discret | variante contrastée de la teinte |
| `accentBar` | transparent | dégradé des deux teintes |
| `canvas` | couleur de page | transparent, le fond est derrière |
| `card` | couleur de page | papier, plus clair que le sol teinté |
| `veil` | couleur de page | voile translucide sous flou |

C'est `accentBar` qui permet d'ajouter des repères propres à CHROMA sans écrire
la moindre condition : en MONO ils sont transparents, donc absents.

### Le fond

Un seul système pour tout le site, dans `components/layout/ChromaBackdrop.jsx`,
en quatre couches et sans une seule image : un aplat, deux champs colorés
posés en diagonale plus un coin franc, un signe, un grain fractal. Tout est
calculé par le navigateur.

### Le signe

La bibliothèque vit dans `components/decor/motifs.jsx` : six formes dessinées
à la main, dans le même repère de 100 sur 100, au même trait. Étoile, fer à
cheval, maillon, bulle, pétale, filaments.

Deux règles tiennent leur cohérence. Le trait ne grossit pas avec la forme,
grâce à `non-scaling-stroke` : un signe de 400 px garde la finesse d'un dessin
technique. Et la couleur vient de `currentColor`, donc un motif se recolore
depuis le CSS sans être redessiné.

**Une page n'en montre qu'un.** Sa position est déclarée dans `pageDesign` de
`styles/chroma.js`, en pourcentages de fenêtre et en vmin, ce qui la rend
valable à toutes les tailles d'écran.

Deux directions ont été essayées avant celle-ci. Une tuile répétée d'abord :
c'était un papier peint, uniforme et sans intention. Une composition de quatre
grandes formes ensuite : plus intentionnelle, mais elles se disputaient l'écran
et l'ensemble retombait en habillage. Reste ce qui marche : un signe, et de la
couleur. Le caractère d'une page tient à sa teinte, qui n'occupe aucune surface
de lecture, et à une forme qu'on remarque parce qu'elle est seule.

### Ajouter une rubrique à CHROMA

Ajouter une entrée à `pageDesign` dans `src/styles/chroma.js` : deux teintes
prises dans `hues`, un signe pris dans `motifs.jsx` avec sa position, et
`tone: "dark"` si la page est sombre. Rien d'autre.

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
