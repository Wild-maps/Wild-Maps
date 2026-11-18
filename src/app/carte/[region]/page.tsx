import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RegionVue } from "@/components/map/RegionVue";
import { contenusRegion, trouverContenu } from "@/data/regions";

export async function generateMetadata({ params }: PageProps<"/carte/[region]">): Promise<Metadata> {
  const contenu = trouverContenu((await params).region);
  return {
    title: `${contenu?.nom ?? "Région"} — WildMap`,
    description: contenu
      ? `Les animaux, les habitats et les associations de la région ${contenu.nom}.`
      : "Les animaux, les habitats et les associations d’une région de France.",
  };
}

export function generateStaticParams() {
  return Object.keys(contenusRegion).map((region) => ({ region }));
}

async function Region({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const contenu = trouverContenu(region);
  if (!contenu) notFound();
  return <RegionVue key={contenu.slug} slug={contenu.slug} />;
}

export default function RegionPage({ params }: PageProps<"/carte/[region]">) {
  return (
    <Suspense fallback={<div className="h-dvh bg-foret-950" />}>
      <Region params={params} />
    </Suspense>
  );
}
