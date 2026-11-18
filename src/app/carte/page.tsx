import type { Metadata } from "next";
import { CarteFrance } from "@/components/map/CarteFrance";
import { getIndexRecherche, getRegionsActives } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Carte des régions — WildMap",
  description: "Choisissez une région de France pour découvrir ses animaux, ses habitats et ses associations.",
};

export default async function CartePage() {
  const [actives, index] = await Promise.all([getRegionsActives(), getIndexRecherche()]);
  return <CarteFrance actives={actives} index={index} />;
}
