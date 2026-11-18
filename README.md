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

## Comptes

L'inscription et la connexion passent par Supabase Auth : email et mot de passe (avec email de confirmation), Google et Facebook (Apple n'est pas branché). Chaque compte reçoit une ligne dans `public.profiles` (nom, photo) créée par un déclencheur. Le retour de Google, de Facebook et du lien de confirmation passe par `/auth/callback`.

Google et Facebook ne fonctionnent qu'une fois activés dans Supabase (Authentication > Providers), avec les identifiants créés dans Google Cloud Console et Meta for Developers. Tant qu'un fournisseur est désactivé, son bouton affiche « pas disponible pour le moment ». Adresse de retour à déclarer chez Google et Facebook : `https://nvezkxhjbhbfghqzhiup.supabase.co/auth/v1/callback`. Dans Authentication > URL Configuration, ajouter `https://wildmap-ten.vercel.app/auth/callback` et `http://localhost:3000/auth/callback` aux Redirect URLs.

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

Pour ajouter une région : renseigner ses lignes dans les tables ci-dessus, puis passer `is_active_v1` à `true`.

## Modèles 3D

La fiche d'un animal affiche un cube 3D cliquable dès que `animals.model_3d_url` est renseigné : le visiteur voit alors l'animal en 3D à la place de l'illustration (lecteur `@google/model-viewer`, chargé seulement à l'ouverture de la vue 3D, `src/components/map/Modele3D.tsx`). Si `animals.model_credit` est renseigné (licence CC Attribution), le crédit s'affiche sous le modèle.

Pour ajouter un modèle :

1. Format `.glb` (depuis Blender : File > Export > glTF 2.0, format glTF Binary, textures embarquées). Les fichiers sources restent dans `modeles-3d/` (ignoré par Git) ou sur le Drive.
2. Alléger à environ 5 Mo (les fichiers du Drive font 100 à 350 Mo, bien trop pour le web). Commande à essayer, non testée dans ce dépôt : `npx @gltf-transform/cli optimize entree.glb sortie.glb --compress meshopt --texture-compress webp --texture-size 1024`.
3. Déposer le fichier dans le bucket Supabase `models` (Storage, limite de 25 Mo) et copier son URL publique dans `animals.model_3d_url`.

Le renard roux est le seul animal avec une fiche en base pour l'instant ; ajouter la fiche d'un animal (sanglier, loutre…) demande d'abord de créer sa ligne dans `animals` et `region_animals`.
