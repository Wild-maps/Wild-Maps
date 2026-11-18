# Wild-Maps

**Site en ligne : [wildmap-ten.vercel.app](https://wildmap-ten.vercel.app)**

Site de découverte de la faune sauvage française, région par région : une carte de France cliquable mène à chaque région (paysage, épingles habitat et association), puis à un carrousel d'animaux avec leurs fiches animal, habitat et association.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (thème dans `src/app/globals.css`)

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

Autres commandes : `npm run build` (build de production), `npm run lint`.

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil |
| `/carte` | Carte de France des 13 régions |
| `/carte/paca`, `/carte/occitanie`, `/carte/hauts-de-france` | Pages région avec animaux et fiches |
| `/connexion`, `/inscription` | Formulaires (pas encore reliés à un backend) |
| `/equipe` | L'équipe |

## Structure

```
src/
  app/          routes
  components/
    home/       sections de l'accueil
    map/        carte, pages région, fiches
    auth/       connexion et inscription
    team/       page équipe
    layout/     barre du haut et pied de page
    ui/         boutons partagés
  data/         contenus des régions (animaux, habitats, associations)
public/figma/   images et illustrations de la maquette
```

Les autres régions affichent « bientôt disponible ». Pour en ajouter une : créer son fichier dans `src/data/` sur le modèle de `paca.ts`, ajouter son slug au type `RegionSlug` (`src/data/types.ts`), puis la brancher dans `src/data/regions.ts` (`contenusRegion` et champ `contenu` de la région).
