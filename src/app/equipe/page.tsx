import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { TeamSection } from "@/components/team/TeamSection";

export const metadata: Metadata = {
  title: "La Team — WildMap",
  description: "Les étudiantes et étudiants qui imaginent et construisent WildMap.",
};

export default function EquipePage() {
  return (
    <>
      <TopBar current="/equipe" />
      <TeamSection />
    </>
  );
}
