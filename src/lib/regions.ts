import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { construireIndex, contenusRegion, type Suggestion } from "@/data/regions";
import type { RegionContenu } from "@/data/types";
import { REGION_SELECT, versContenu, type LigneRegion } from "./contenu-db";

async function depuisSupabase(): Promise<RegionContenu[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !cle) throw new Error("NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY manquante");

  const supabase = createClient(url, cle, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("regions").select(REGION_SELECT).eq("is_active_v1", true).order("name");
  if (error) throw error;

  const contenus = (data as unknown as LigneRegion[]).flatMap((ligne) => versContenu(ligne) ?? []);
  if (contenus.length === 0) throw new Error("aucune région active avec du contenu dans la base");
  return contenus;
}

// Les régions actives (is_active_v1) et tout leur contenu, lus dans Supabase puis mis en cache quelques minutes.
// Si la base est injoignable, on retombe sur les fichiers src/data/*.ts pour que le site reste utilisable.
export async function chargerContenus(): Promise<RegionContenu[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("regions");
  try {
    return await depuisSupabase();
  } catch (erreur) {
    console.error("[wildmap] Supabase indisponible, contenu local utilisé :", erreur);
    return Object.values(contenusRegion);
  }
}

export async function getContenu(slug: string): Promise<RegionContenu | undefined> {
  return (await chargerContenus()).find((c) => c.slug === slug);
}

export async function getRegionsActives(): Promise<string[]> {
  return (await chargerContenus()).map((c) => c.slug);
}

export async function getIndexRecherche(): Promise<Suggestion[]> {
  const contenus = await chargerContenus();
  return construireIndex(contenus, new Set(contenus.map((c) => c.slug)));
}
