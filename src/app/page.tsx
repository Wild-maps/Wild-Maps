import { CommentCaMarche } from "@/components/home/CommentCaMarche";
import { Ensemble } from "@/components/home/Ensemble";
import { Exemples } from "@/components/home/Exemples";
import { FichesInteractives } from "@/components/home/FichesInteractives";
import { Hero } from "@/components/home/Hero";
import { MotifsBords } from "@/components/home/MotifsBords";
import { Ouverture } from "@/components/home/Ouverture";
import { WildMapCestQuoi } from "@/components/home/WildMapCestQuoi";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";

export default function Home() {
  return (
    <>
      <Ouverture />
      <TopBar />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <div className="relative">
          <MotifsBords />
          <CommentCaMarche />
          <Exemples />
          <FichesInteractives />
          <WildMapCestQuoi />
          <Ensemble />
        </div>
      </main>
      <Footer />
    </>
  );
}
