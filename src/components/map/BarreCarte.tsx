"use client";

import Image from "next/image";
import { useId, type Ref } from "react";
import { PillButton } from "@/components/ui/PillButton";
import type { Suggestion } from "@/data/regions";
import { Recherche } from "./Recherche";

export const HAUTEUR_BARRE = "clamp(60px,4.479vw,86px)";

const pastille = "relative block size-[clamp(44px,3.125vw,60px)] shrink-0";
const pastilleFond = "absolute -left-[3.33%] top-0 h-[113.33%] w-[113.33%] max-w-none";
const pastilleIcone = "absolute left-1/2 top-1/2 h-auto w-[56.67%] -translate-x-1/2 -translate-y-1/2";

type BarreCarteProps = {
  retour: { href: string; label: string };
  libelleSurvol?: string | null;
  onSuggestion?: (s: Suggestion) => boolean;
  onBientot: (nom: string) => void;
  patte?: { actif: boolean; onBasculer: () => void; controle: string };
  patteRef?: Ref<HTMLButtonElement>;
};

export function BarreCarte({ retour, libelleSurvol, onSuggestion, onBientot, patte, patteRef }: BarreCarteProps) {
  const infobulle = useId();

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[clamp(60px,4.479vw,86px)] backdrop-blur-[5px]">
      <Image src="/figma/map/barre-haut.png" alt="" fill priority sizes="100vw" className="-z-10 object-fill" />
      <div className="relative flex h-full items-center gap-3 pl-[clamp(12px,1.927vw,37px)] pr-[clamp(12px,2.292vw,44px)]">
        <PillButton
          href={retour.href}
          aria-label={retour.label}
          className="h-[clamp(40px,2.604vw,50px)] w-[clamp(39px,2.552vw,49px)] shrink-0"
        >
          <Image src="/figma/map/icone-retour.svg" alt="" width={31} height={31} className="size-[clamp(24px,1.615vw,31px)]" />
        </PillButton>

        <Recherche libelleSurvol={libelleSurvol} onSuggestion={onSuggestion} onBientot={onBientot} />

        <div className="ml-auto flex items-center gap-[clamp(10px,1.615vw,31px)]">
          {patte && (
            <button
              ref={patteRef}
              type="button"
              onClick={patte.onBasculer}
              aria-pressed={patte.actif}
              aria-controls={patte.controle}
              aria-label="Animaux de la région"
              className={`${pastille} cursor-pointer rounded-full transition-transform ease-sortie hover:scale-105 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel motion-reduce:transition-none`}
            >
              <Image
                src={patte.actif ? "/figma/map/pastille-patte-active.svg" : "/figma/map/pastille-patte.svg"}
                alt=""
                width={68}
                height={68}
                className={pastilleFond}
              />
              <Image
                src={patte.actif ? "/figma/map/icone-patte-active.svg" : "/figma/map/icone-patte.svg"}
                alt=""
                width={34}
                height={33}
                className={pastilleIcone}
              />
            </button>
          )}

          <span className="group relative">
            <button
              type="button"
              aria-disabled="true"
              aria-label="Filtres"
              aria-describedby={infobulle}
              className={`${pastille} cursor-not-allowed rounded-full focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel`}
            >
              <Image src="/figma/map/pastille-filtre.svg" alt="" width={68} height={68} className={pastilleFond} />
              <Image src="/figma/map/icone-filtre.svg" alt="" width={34} height={34} className={pastilleIcone} />
            </button>
            <span
              id={infobulle}
              role="tooltip"
              className="pointer-events-none invisible absolute right-0 top-[calc(100%+10px)] whitespace-nowrap rounded-[10px] border-[3px] border-ecorce bg-sable px-3 py-1.5 font-ui text-[clamp(13px,0.8vw,16px)] text-ecorce opacity-0 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
            >
              Filtres bientôt disponibles
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
