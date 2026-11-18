import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RegionVue } from "@/components/map/RegionVue";
import { chargerContenus, getContenu, getIndexRecherche } from "@/lib/regions";

export async function generateMetadata({ params }: PageProps<"/carte/[region]">): Promise<Metadata> {
  const contenu = await getContenu((await params).region);
  return {
    title: `${contenu?.nom ?? "Région"} — WildMap`,
    description: contenu
      ? `Les animaux, les habitats et les associations de la région ${contenu.nom}.`
      : "Les animaux, les habitats et les associations d’une région de France.",
  };
}

export async function generateStaticParams() {
  return (await chargerContenus()).map(({ slug }) => ({ region: slug }));
}

async function Region({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const [contenu, index] = await Promise.all([getContenu(region), getIndexRecherche()]);
  if (!contenu) notFound();
  return <RegionVue key={contenu.slug} contenu={contenu} index={index} />;
}

export default function RegionPage({ params }: PageProps<"/carte/[region]">) {
  return (
    <Suspense fallback={<div className="h-dvh bg-foret-950" />}>
      <Region params={params} />
    </Suspense>
  );
}
