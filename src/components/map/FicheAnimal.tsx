import Image from "next/image";
import { useId } from "react";
import { rang } from "@/components/ui/rang";
import type { Aliment, Animal, FicheAnimal as Fiche, LigneFiche } from "@/data/types";
import { encart, FicheGabarit, police, TexteFiche } from "./FicheGabarit";
import { placer } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";

const icones: Record<string, { src: string; w: number; h: number }> = {
  fruits: { src: "/figma/map/icone-fruits.svg", w: 40, h: 38 },
  insectes: { src: "/figma/map/icone-insectes.svg", w: 36.8, h: 36.8 },
};

function Lignes({ lignes, className }: { lignes: LigneFiche[]; className: string }) {
  return (
    <dl className={`${police.texte19} leading-26 ${className}`}>
      {lignes.map((l) => (
        <div key={l.libelle} className="flex justify-between gap-12">
          <dt className="font-semibold text-sable">{l.libelle}</dt>
          <dd className="whitespace-pre-line text-right">{l.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

function IconeAliment({ aliment }: { aliment: Aliment }) {
  const icone = icones[aliment.icone];
  return (
    <span className="relative flex size-44 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sable">
      {icone ? (
        <Image src={icone.src} alt="" width={Math.round(icone.w)} height={Math.round(icone.h)} style={{ width: `calc(${icone.w} * var(--f))`, height: `calc(${icone.h} * var(--f))` }} />
      ) : (
        <Image src={aliment.icone} alt="" width={28} height={28} className="size-28" />
      )}
    </span>
  );
}

export function FicheAnimal({ animal, fiche, onFermer }: { animal: Animal; fiche: Fiche; onFermer: () => void }) {
  const titreId = useId();

  return (
    <FicheGabarit
      titreId={titreId}
      titre={fiche.titre ?? animal.nom}
      sousTitre={fiche.statut}
      sousTitreClasse="text-[length:calc(36*var(--f))] leading-[calc(40*var(--f))] tracking-[0.02em]"
      sousTitreStyle={{ color: fiche.couleurStatut }}
      illustration={
        <ImageRecadree
          src={fiche.portrait.src}
          recadrage={fiche.portrait.recadrage}
          largeur={fiche.portrait.boite.w}
          style={placer(fiche.portrait.boite)}
        />
      }
      lecteur
      petitesTraces={fiche.petitesTraces}
      onFermer={onFermer}
    >
      <div className="relative flex flex-col gap-24 p-16 lg:h-full lg:flex-row lg:gap-33 lg:p-0 lg:pl-32">
        <div className="flex flex-col gap-22 lg:w-332 lg:justify-between lg:py-23">
          <section style={rang(0)} className={`compose-encart ${encart} pb-13 pl-20 pr-23 pt-7 lg:h-213`}>
            <h3 className={`${police.titreEncart} text-center`}>Identité</h3>
            <Lignes lignes={fiche.identite} className="mt-4" />
          </section>
          <section style={rang(1)} className={`compose-encart ${encart} pb-13 pl-21 pr-23 pt-7 lg:h-177`}>
            <h3 className={`${police.titreEncart} text-center`}>Habitat</h3>
            <Lignes lignes={fiche.habitat} className="mt-13" />
          </section>
          <section style={rang(2)} className={`compose-encart ${encart} pb-13 pl-21 pr-23 pt-3 lg:h-205`}>
            <h3 className={`${police.titreEncart} text-center`}>Régime</h3>
            <Lignes lignes={[{ libelle: "Alimentaire", valeur: fiche.regime.alimentaire }]} className="mt-13" />
            <ul className="mt-14 flex flex-col gap-13">
              {fiche.regime.aliments.map((a) => (
                <li key={a.libelle} className={`flex items-center gap-15 ${police.texte19} leading-[calc(22*var(--f))]`}>
                  <IconeAliment aliment={a} />
                  {a.libelle}
                </li>
              ))}
            </ul>
          </section>
          <section style={rang(3)} className={`compose-encart ${encart} pb-13 pl-21 pr-23 pt-7 lg:h-125`}>
            <h3 className={`${police.titreEncart} text-center`}>Reproduction</h3>
            <Lignes lignes={fiche.reproduction} className="mt-14" />
          </section>
        </div>

        <div className="compose-colonne lg:w-458 lg:pt-32">
          <h3 className={`${police.titreEncart} text-center lg:w-434`}>Mode de vie</h3>
          <TexteFiche texte={fiche.modeDeVie} className={`mt-25 ${police.texte19}`} />
          <hr className="mt-16 w-full border-creme lg:w-433" />
          <h3 className={`${police.titreEncart} mt-19 text-center lg:w-434`}>Anecdotes</h3>
          <TexteFiche texte={fiche.anecdotes} className={`mt-23 ${police.texte19}`} />
        </div>
      </div>
    </FicheGabarit>
  );
}
