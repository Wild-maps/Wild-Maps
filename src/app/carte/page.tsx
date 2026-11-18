import type { Metadata } from "next";
import { CarteFrance } from "@/components/map/CarteFrance";

export const metadata: Metadata = {
  title: "Carte des régions — WildMap",
  description: "Choisissez une région de France pour découvrir ses animaux, ses habitats et ses associations.",
};

export default function CartePage() {
  return <CarteFrance />;
}
