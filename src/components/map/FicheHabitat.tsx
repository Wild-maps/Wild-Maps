import Image from "next/image";
import { useId } from "react";
import { rang } from "@/components/ui/rang";
import type { Habitat } from "@/data/types";
import { encart, FicheGabarit, ListePastilles, police, TexteFiche } from "./FicheGabarit";
import { placer } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";

export function FicheHabitat({ habitat, onFermer }: { habitat: Habitat; onFermer: () => void }) {
  const titreId = useId();
  const condense = (actif?: boolean) => (actif ? police.condense : "");

  return (
    <FicheGabarit
      titreId={titreId}
      titre={habitat.titre}
      sousTitre={habitat.sousTitre}
      sousTitreClasse="text-[length:calc(40*var(--f))] leading-[calc(44*var(--f))] tracking-[0.02em] text-foret-700"
      illustration={
        <>
          <ImageRecadree
            src={habitat.photo.src}
            recadrage={habitat.photo.recadrage}
            largeur={habitat.photo.boite.w}
            style={placer(habitat.photo.boite)}
          />
          {habitat.retouches?.map((r) => (
            <Image
              key={r.src}
              src={r.src}
              alt=""
              width={Math.round(r.boite.w)}
              height={Math.round(r.boite.h)}
              className="absolute max-w-none"
              style={placer(r.boite)}
            />
          ))}
        </>
      }
      lecteur
      onFermer={onFermer}
    >
      <div className="relative flex flex-col gap-24 p-16 lg:h-full lg:flex-row lg:gap-33 lg:p-0 lg:pb-26 lg:pl-32 lg:pt-23">
        <section style={rang(0)} className={`compose-encart ${encart} flex flex-col pb-30 pl-20 pr-11 pt-5 lg:w-332`}>
          <h3 className={`${police.titreEncart} text-center`}>Faune</h3>
          <TexteFiche texte={habitat.faune.texte} className={`mt-26 ${police.condense} ${police.texte19} text-white`} />
          <ListePastilles pastilles={habitat.faune.especes} className="mt-40 gap-39 pl-11 lg:mt-auto" />
        </section>

        <div className="compose-colonne flex flex-col lg:w-458">
          <h3 className={`${police.titreEncart} text-center lg:mt-8 lg:w-434`}>Biome</h3>
          <TexteFiche texte={habitat.biome} className={`mt-23 ${condense(habitat.condense?.biome)} ${police.texte19}`} />
          <section style={rang(1)} className={`compose-encart ${encart} mt-24 pb-18 pl-19 pr-13 pt-13 lg:mt-auto lg:w-434`}>
            <h3 className={`${police.titreEncart} text-center`}>Flore</h3>
            <TexteFiche texte={habitat.flore.texte} className={`mt-14 ${condense(habitat.condense?.flore)} ${police.texte19} text-white`} />
            <ListePastilles pastilles={habitat.flore.especes} className="mt-36 gap-18" />
          </section>
        </div>
      </div>
    </FicheGabarit>
  );
}
