import type { Animal, Association, Epingle, FicheAnimal, Habitat, ImageCadree, RegionContenu, ZoneTracee } from "@/data/types";

// Lignes telles que Supabase les renvoie (voir REGION_SELECT). Les colonnes lisibles (nom, famille, statut UICN…)
// servent à la base ; la mise en page des fiches vit dans `details`.
export type LigneRegion = {
  slug: string;
  name: string;
  details: { paysage?: ImageCadree; zones?: ZoneTracee[] } | null;
  region_animals: {
    position: number;
    details: { nom?: string; vignette?: Animal["vignette"] } | null;
    animals: {
      slug: string;
      name: string;
      model_3d_url: string | null;
      model_credit: string | null;
      details: { fiche?: FicheAnimal } | null;
    } | null;
  }[];
  region_habitats: { map_x: number | null; map_y: number | null; habitats: { slug: string; details: Habitat | null } | null }[];
  region_associations: {
    map_x: number | null;
    map_y: number | null;
    associations: { slug: string; details: Association | null } | null;
  }[];
};

export const REGION_SELECT =
  "slug,name,details," +
  "region_animals(position,details,animals(slug,name,model_3d_url,model_credit,details))," +
  "region_habitats(map_x,map_y,habitats(slug,details))," +
  "region_associations(map_x,map_y,associations(slug,details))";

const parSlug = <T extends { slug: string }>(a: T, b: T) => a.slug.localeCompare(b.slug);

// Reconstruit un RegionContenu (le format attendu par les composants) à partir des lignes de la base.
export function versContenu(ligne: LigneRegion): RegionContenu | null {
  const paysage = ligne.details?.paysage;
  if (!paysage) return null;

  const animaux = [...ligne.region_animals]
    .sort((a, b) => a.position - b.position)
    .flatMap<Animal>(({ details, animals }) => {
      const vignette = details?.vignette;
      if (!animals || !vignette) return [];
      const fiche = animals.details?.fiche;
      const modele3d = animals.model_3d_url ? { url: animals.model_3d_url, ...(animals.model_credit ? { credit: animals.model_credit } : {}) } : undefined;
      return [{ slug: animals.slug, nom: details?.nom ?? animals.name, vignette, ...(fiche ? { fiche } : {}), ...(modele3d ? { modele3d } : {}) }];
    });

  const habitats = ligne.region_habitats.flatMap((l) => (l.habitats?.details ? [{ habitat: l.habitats.details, x: l.map_x, y: l.map_y }] : []));
  const associations = ligne.region_associations.flatMap((l) =>
    l.associations?.details ? [{ association: l.associations.details, x: l.map_x, y: l.map_y }] : [],
  );

  const epingle = (type: Epingle["type"], cible: string, x: number | null, y: number | null): Epingle[] =>
    x === null || y === null ? [] : [{ type, cible, x, y }];

  return {
    slug: ligne.slug,
    nom: ligne.name,
    paysage,
    zones: ligne.details?.zones ?? [],
    epingles: [
      ...associations.flatMap((a) => epingle("association", a.association.slug, a.x, a.y)),
      ...habitats.flatMap((h) => epingle("habitat", h.habitat.slug, h.x, h.y)),
    ],
    animaux,
    habitats: habitats.map((h) => h.habitat).sort(parSlug),
    associations: associations.map((a) => a.association).sort(parSlug),
  };
}
