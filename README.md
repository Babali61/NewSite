# NewSite

Builder **open source** et **gratuit** pour créer un site web **sans code** : thème configurable + blocs assemblables (drag-and-drop).

> Public principal : personnes **non-développeuses**. Les commandes ci-dessous sont destinées aux contributeurs / mainteneurs du projet.

## Pour les non-devs (parcours prévu)

1. Ouvrir l’app dans le navigateur (lien web).
2. Choisir un modèle (ex. portfolio).
3. Modifier textes, images et couleurs.
4. Ajouter / réordonner des blocs.
5. Voir le résultat sur une URL preview.
6. Publier → obtenir une **URL publique gratuite**.

Pas de terminal, pas de Git, pas de compte technique (GitHub, Netlify, etc.) côté utilisateur final.

## Stack (contributeurs)

| Couche | Choix |
| --- | --- |
| Éditeur | Vite + React + SCSS |
| Drag-and-drop | [@dnd-kit](https://dndkit.com) (à brancher) |
| API | Node (stub pour l’instant) |
| Données (prévu) | SQL — SQLite local, Postgres free tier en prod |
| Licence | MIT |

## Structure du monorepo

```
apps/
  editor/     # App Vite React — parcours non-dev
  api/        # API Node (sites, publish, liens magiques)
packages/
  theme/      # Tokens SCSS + variables CSS
  blocks/     # Composants blocs + schémas de props
  document/   # Types PageDocument + validation
  render/     # Rendu de page (éditeur + site public)
```

## Démarrer en local (devs)

Prérequis : **Node.js 20+**.

```bash
npm install
npm run dev          # éditeur → http://localhost:5173
npm run dev:api      # API stub → http://localhost:3001
```

## Scripts utiles

| Commande | Rôle |
| --- | --- |
| `npm run dev` / `dev:editor` | Lancer l’éditeur |
| `npm run dev:api` | Lancer l’API stub |
| `npm run build` | Build de production de l’éditeur |

## Statut

Squelette monorepo initial. Prochaines étapes : proto éditeur (3 blocs, tokens, @dnd-kit), puis API + SQLite et publish mock.
