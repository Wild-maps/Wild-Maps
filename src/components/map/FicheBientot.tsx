import Image from "next/image";
import { useId } from "react";
import type { Animal } from "@/data/types";
import { placer } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";

export function FicheBientot({ animal, onFermer, onVoirAnimaux }: { animal: Animal; onFermer: () => void; onVoirAnimaux: () => void }) {
  const titreId = useId();
  const v = animal.vignette;

  return (
    <article
      aria-labelledby={titreId}
      className="[--f:min(1px,calc((100vw_-_32px)/640))] lg:[--f:min(1px,calc(100vw/1920))] [--spacing:var(--f)] relative flex w-640 flex-col items-center gap-24 rounded-[calc(30*var(--f))] bg-[#14352e] px-48 pb-40 pt-72 text-center text-creme shadow-[4.5px_6px_8.5px_rgba(0,0,0,0.25)]"
    >
      <div className="relative h-270 w-268">
        <span className="absolute inset-0 rounded-[calc(8*var(--f))] bg-sable shadow-[2px_4px_4px_rgba(0,0,0,0.25)]" />
        <ImageRecadree
          src={v.src}
          recadrage={v.recadrage}
          largeur={v.boite.w}
          style={placer(v.boite)}
          className={v.arrondi ? "rounded-[calc(8*var(--f))] overflow-hidden" : ""}
        />
      </div>
      <h2 id={titreId} className="font-display text-[length:calc(48*var(--f))] leading-[calc(45*var(--f))] tracking-[0.02em] text-sable">
        {animal.nom}
      </h2>
      <p className="font-ui text-[length:calc(32*var(--f))] text-ciel">Fiche bientôt disponible</p>
      <p className="max-w-440 text-[length:calc(19*var(--f))]">
        Nous préparons encore la fiche de cet animal. En attendant, découvrez ceux qui en ont déjà une dans le carrousel.
      </p>
      <button
        type="button"
        data-focus-initial
        onClick={onVoirAnimaux}
        className="mt-8 inline-flex h-50 items-center justify-center rounded-[10px] border-[4.5px] border-ecorce bg-ciel px-24 font-ui text-[length:calc(22*var(--f))] tracking-[0.02em] text-ecorce shadow-[1px_3px_4px_0px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#a6ddff] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel"
      >
        Voir les autres animaux
      </button>
      <button
        type="button"
        onClick={onFermer}
        aria-label="Fermer"
        className="absolute right-13 top-15 size-55 cursor-pointer rounded-full transition-transform ease-sortie hover:scale-105 active:scale-95 focus-visible:outline-3 focus-visible:outline-ciel motion-reduce:transition-none"
      >
        <Image src="/figma/map/fiche-pastille-fermer.svg" alt="" fill className="object-fill" />
        <Image src="/figma/map/fiche-icone-fermer.svg" alt="" width={35} height={35} className="absolute left-9 top-7 size-35" />
      </button>
    </article>
  );
}
