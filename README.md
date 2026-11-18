# Wild-Maps

**Site en ligne : [wildmap-ten.vercel.app](https://wildmap-ten.vercel.app)**

Site de découverte de la faune sauvage française, région par région : une carte de France cliquable mène à chaque région (paysage, épingles habitat et association), puis à un carrousel d'animaux avec leurs fiches animal, habitat et association.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (thème dans `src/app/globals.css`)
- Supabase (contenu des régions, animaux, habitats et associations)

## Lancer le projet

```bash
npm install
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
npm run dev
```

Sur Vercel, les deux variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` doivent aussi être définies (Project Settings > Environment Variables). Sans elles, le site affiche le contenu des fichiers `src/data/` à la place de la base.

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

## Données

Le contenu vient de Supabase (`src/lib/regions.ts`), mis en cache une minute. Une région est cliquable sur la carte quand `regions.is_active_v1` vaut `true` et qu'elle a son paysage (`regions.details`). Les autres affichent « bientôt disponible ».

| Table | Rôle |
| --- | --- |
| `regions` | les 13 régions ; `details` contient l'image de paysage et les zones tracées |
| `animals` | une espèce ; `details.fiche` contient la fiche complète |
| `region_animals` | animaux d'une région : `position` (ordre du carrousel) et `details` (vignette) |
| `habitats`, `associations` | fiches ; `details` contient la mise en page, le slug est préfixé par la région pour les habitats (`paca-milieux-forestiers`) |
| `region_habitats`, `region_associations` | épingles sur la carte (`map_x`, `map_y`) |

Les fichiers `src/data/*.ts` servent de secours si Supabase est injoignable et de modèle pour le format des fiches (`src/data/types.ts`). La mise en page des fiches (boîtes, recadrages) reste celle exportée de la maquette Figma.

Pour ajouter une région : renseigner ses lignes dans les tables ci-dessus, puis passer `is_active_v1` à `true`. Les modèles 3D (`.glb`) et les images iront dans les buckets Storage `models` et `images`.
