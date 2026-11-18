import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { Pastille, Texte } from "@/data/types";
import { mesure } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";
import { robotoCondensed } from "./polices";

const echelle =
  "[--f:min(1px,calc((100vw_-_32px)/418))] lg:[--f:min(1px,calc(100vw/1920),calc((100dvh_-_130px)/833))] [--spacing:var(--f)]";

export const police = {
  titreEncart: "font-ui text-[length:calc(32*var(--f))] leading-[calc(39*var(--f))] text-sable",
  texte16: "text-[length:calc(16*var(--f))]",
  texte19: "text-[length:calc(19*var(--f))]",
  texte20: "text-[length:calc(20*var(--f))]",
  condense: "font-[family-name:var(--font-roboto-condensed)]",
};

export const encart = "rounded-[calc(10*var(--f))] bg-foret-700 shadow-[0_4px_4px_rgba(0,0,0,0.25)]";

const p = (n: number) => mesure(n);

export function TexteFiche({ texte, className = "" }: { texte: Texte; className?: string }) {
  return (
    <div className={`flex flex-col gap-[1lh] ${className}`}>
      {texte.map((lignes, i) => (
        <p key={i}>
          {lignes.map((ligne, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {ligne}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

export function ListePastilles({ pastilles, className = "", libelle = "" }: { pastilles: Pastille[]; className?: string; libelle?: string }) {
  return (
    <ul className={`flex flex-col ${className}`}>
      {pastilles.map((pastille) => (
        <li key={pastille.nom} className="flex items-center gap-23">
          <span className="relative block size-66 shrink-0 overflow-hidden rounded-full bg-sable">
            <ImageRecadree
              src={pastille.image.src}
              recadrage={pastille.image.recadrage}
              largeur={66}
              className="inset-0"
            />
          </span>
          <span className={`${police.condense} ${police.texte20} font-semibold text-sable ${libelle}`}>{pastille.nom}</span>
        </li>
      ))}
    </ul>
  );
}

function Lecteur() {
  return (
    <div aria-hidden className="compose-lecteur pointer-events-none absolute left-0 top-716.5 h-116.5 w-418 select-none">
      <span className="absolute inset-0 backdrop-blur-[5px]" />
      <Image src="/figma/map/fiche-lecteur-fond.svg" alt="" fill className="object-fill" />
      <span
        className="absolute bg-ecorce"
        style={{ left: p(32), top: p(43.5), width: p(242), height: p(33), borderRadius: `${p(10)} ${p(10)} ${p(10)} ${p(30)}` }}
      />
      <Image
        src="/figma/map/fiche-lecteur-pastille.svg"
        alt=""
        width={64}
        height={66}
        className="absolute max-w-none -rotate-[5.83deg]"
        style={{ left: p(11), top: p(29.5), width: p(63.64), height: p(65.59) }}
      />
      <Image src="/figma/map/fiche-lecteur-lecture.svg" alt="" width={43} height={43} className="absolute max-w-none" style={{ left: p(20.4), top: p(39.5), width: p(43.3), height: p(43) }} />
      <Image src="/figma/map/fiche-lecteur-piste.svg" alt="" width={181} height={5} className="absolute max-w-none" style={{ left: p(80), top: p(58.5), width: p(181.4), height: p(5) }} />
      <Image src="/figma/map/fiche-lecteur-progression.svg" alt="" width={68} height={5} className="absolute max-w-none" style={{ left: p(70.9), top: p(57.5), width: p(68.1), height: p(5) }} />
      <Image src="/figma/map/fiche-lecteur-curseur.svg" alt="" width={14} height={14} className="absolute max-w-none" style={{ left: p(131.6), top: p(53), width: p(14), height: p(14) }} />
      <span className="absolute flex items-center justify-center" style={{ left: p(270), top: p(32.5), width: p(57.6), height: p(57.6) }}>
        <Image src="/figma/map/fiche-lecteur-volume.svg" alt="" width={41} height={41} className="max-w-none rotate-[46.01deg]" style={{ width: p(40.77), height: p(40.77) }} />
      </span>
      <Image src="/figma/map/fiche-pastille-3d.svg" alt="" width={61} height={61} className="absolute max-w-none" style={{ left: p(341), top: p(33.5), width: p(61), height: p(61) }} />
      <Image src="/figma/map/fiche-vue-3d.png" alt="" width={37} height={37} className="absolute max-w-none" style={{ left: p(351), top: p(42.5), width: p(37), height: p(37) }} />
    </div>
  );
}

function Traces({ petites }: { petites: boolean }) {
  const pivot = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: p(x), top: p(y), width: p(w), height: p(h) });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <Image src="/figma/map/fiche-traces.svg" alt="" width={50} height={573} className="absolute max-w-none" style={pivot(1266, 17, 50.06, 573)} />
      {petites && (
        <>
          <span className="absolute flex items-center justify-center" style={pivot(1201.68, 589.52, 20.09, 16.42)}>
            <Image src="/figma/map/fiche-trace-petite.svg" alt="" width={14} height={19} className="max-w-none -rotate-[83.23deg]" style={{ width: p(14.33), height: p(18.53) }} />
          </span>
          <span className="absolute flex items-center justify-center" style={pivot(1194.18, 650.99, 20.09, 16.42)}>
            <Image src="/figma/map/fiche-trace-petite.svg" alt="" width={14} height={19} className="max-w-none -rotate-[83.23deg]" style={{ width: p(14.33), height: p(18.53) }} />
          </span>
          <span className="absolute flex items-center justify-center" style={pivot(1222.84, 645, 43, 33)}>
            <Image src="/figma/map/fiche-trace-grande.svg" alt="" width={33} height={43} className="max-w-none rotate-90" style={{ width: p(33), height: p(43) }} />
          </span>
        </>
      )}
    </div>
  );
}

type FicheGabaritProps = {
  titreId: string;
  titre: string;
  sousTitre: string;
  sousTitreClasse: string;
  sousTitreStyle?: CSSProperties;
  illustration: ReactNode;
  lecteur?: boolean;
  petitesTraces?: boolean;
  onFermer: () => void;
  children: ReactNode;
};

export function FicheGabarit({
  titreId,
  titre,
  sousTitre,
  sousTitreClasse,
  sousTitreStyle,
  illustration,
  lecteur = false,
  petitesTraces = false,
  onFermer,
  children,
}: FicheGabaritProps) {
  return (
    <article
      aria-labelledby={titreId}
      className={`${echelle} ${robotoCondensed.variable} relative flex w-[min(100vw_-_32px,640px)] flex-col overflow-hidden rounded-[calc(30*var(--f))] bg-[#14352e] text-creme shadow-[4.5px_6px_8.5px_rgba(0,0,0,0.25)] lg:h-833 lg:w-1297 lg:flex-row`}
    >
      <div className="relative z-10 shrink-0 overflow-hidden bg-sable lg:w-418 lg:overflow-visible">
        <div className="relative mx-auto h-833 w-418">
          <div className="compose-portrait absolute inset-0">{illustration}</div>
          <div className="absolute left-9 top-31 flex w-389 flex-col items-center text-center">
            <h2
              id={titreId}
              className="whitespace-pre-line font-display text-[length:calc(48*var(--f))] font-bold leading-[calc(45*var(--f))] tracking-[0.02em] text-ecorce [clip-path:inset(-50%_-10%_-0.2em_-10%)]"
            >
              <span className="compose-ligne block">{titre}</span>
            </h2>
            <p className={`compose-statut mt-4 max-w-263 font-display ${sousTitreClasse}`} style={sousTitreStyle}>
              {sousTitre}
            </p>
          </div>
          {lecteur && <Lecteur />}
        </div>
      </div>

      <div className="relative flex-1">
        <Image
          src="/figma/map/fiche-vague.svg"
          alt=""
          width={879}
          height={330}
          className="pointer-events-none absolute left-0 top-503 hidden h-330 w-879 max-w-none lg:block"
        />
        <div className="pointer-events-none absolute inset-y-0 -left-418 right-0">
          <Traces petites={petitesTraces} />
        </div>
        {children}
      </div>

      <button
        type="button"
        data-focus-initial
        onClick={onFermer}
        aria-label="Fermer la fiche"
        className="compose-fermer absolute right-13 top-15 z-20 size-55 cursor-pointer rounded-full transition-transform ease-sortie hover:scale-105 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-ciel motion-reduce:transition-none"
      >
        <Image src="/figma/map/fiche-pastille-fermer.svg" alt="" fill className="object-fill" />
        <Image src="/figma/map/fiche-icone-fermer.svg" alt="" width={35} height={35} className="absolute left-9 top-7 size-35" />
      </button>
    </article>
  );
}
