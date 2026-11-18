"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Animal, Boite } from "@/data/types";
import { rang } from "@/components/ui/rang";
import { mesure, placer } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";

const u = (n: number) => mesure(n, "--u");
const place = (b: Boite) => placer(b, "--u");

const motifs = [
  { n: 1, boite: { x: -54, y: 0, w: 1761.202, h: 504.824 } },
  { n: 2, boite: { x: -68.99, y: 5.93, w: 1743.069, h: 480.188 } },
  { n: 3, boite: { x: 693.55, y: 258.11, w: 133.747, h: 38.301 } },
  { n: 4, boite: { x: 1613, y: -1, w: 572.628, h: 167.963 } },
  { n: 5, boite: { x: 2185.55, y: -1, w: 744.79, h: 156.841 } },
  { n: 6, boite: { x: 1576.77, y: 154, w: 593.86, h: 156.841 } },
  { n: 7, boite: { x: 2170.55, y: 154, w: 744.79, h: 156.841 } },
];

const emplacements = [137, 477, 817, 1176, 1516];

const depuisGauche = (x: number): CSSProperties => ({ left: `calc(50% + ${u(x - 960)})` });

const pasCarte = 340;

type Position = { x: number; o: number; ordre: number; cachee: boolean };

function courbe(nom: string, repli: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(nom).trim() || repli;
}

type CarrouselProps = {
  id: string;
  titre: string;
  animaux: Animal[];
  masque: boolean;
  onChoisir: (animal: Animal) => void;
  onFermer: () => void;
};

export function Carrousel({ id, titre, animaux, masque, onChoisir, onFermer }: CarrouselProps) {
  const [decalage, setDecalage] = useState(0);
  const [sens, setSens] = useState<1 | -1>(1);
  const section = useRef<HTMLElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const avant = useRef<Map<string, Position> | null>(null);
  const enCours = useRef<Animation[]>([]);
  const molette = useRef({ cumul: 0, verrou: 0 });
  const n = animaux.length;

  useEffect(() => {
    section.current?.focus();
  }, []);

  useEffect(() => {
    if (masque) return;
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) onFermer();
    };
    window.addEventListener("keydown", auClavier);
    return () => window.removeEventListener("keydown", auClavier);
  }, [masque, onFermer]);

  useLayoutEffect(() => {
    const ul = liste.current;
    const precedent = avant.current;
    avant.current = null;
    enCours.current.forEach((a) => a.cancel());
    enCours.current = [];
    if (!ul || !precedent || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const unite = (section.current?.offsetHeight ?? 430) / 430;
    const dernier = Math.min(n, emplacements.length) - 1;
    const bordGauche = emplacements[0] - pasCarte;
    const bordDroit = emplacements[dernier] + pasCarte;
    const ressort = courbe("--ease-ressort", "cubic-bezier(0.23, 1, 0.32, 1)");
    const animations: Animation[] = [];

    for (const li of Array.from(ul.children) as HTMLElement[]) {
      if (li.hidden) continue;
      const ordre = Number(li.dataset.ordre);
      const ici = emplacements[ordre];
      const x = li.getBoundingClientRect().left;
      const p = precedent.get(li.dataset.cle ?? "");
      const rangDepart = p && !p.cachee ? p.ordre : sens === 1 ? dernier : 0;
      const delay = (sens === 1 ? rangDepart : dernier - rangDepart) * 38;
      const ecart = (bord: number) => `translateX(${(bord - ici) * unite}px)`;
      const sortie = sens === 1 ? bordGauche : bordDroit;
      const entree = sens === 1 ? bordDroit : bordGauche;

      if (!p || p.cachee) {
        animations.push(
          li.animate(
            [
              { transform: `${ecart(entree)} scale(0.9)`, opacity: 0 },
              { transform: "none", opacity: 1 },
            ],
            { duration: 700, easing: ressort, delay, fill: "backwards" },
          ),
        );
      } else if (Math.abs(ordre - p.ordre) > 1) {
        animations.push(
          li.animate(
            [
              { transform: `translateX(${p.x - x}px)`, opacity: p.o, easing: "cubic-bezier(0.25, 0.5, 0.5, 1)" },
              { transform: `${ecart(sortie)} scale(0.88)`, opacity: 0, offset: 0.32 },
              { transform: `${ecart(entree)} scale(0.88)`, opacity: 0, offset: 0.32, easing: ressort },
              { transform: "none", opacity: 1 },
            ],
            { duration: 900, delay, fill: "backwards" },
          ),
        );
      } else if (Math.abs(p.x - x) > 0.5) {
        animations.push(
          li.animate([{ transform: `translateX(${p.x - x}px)`, opacity: p.o }, { transform: "none", opacity: 1 }], {
            duration: 680,
            easing: ressort,
            delay,
            fill: "backwards",
          }),
        );
      }

      const carte = li.firstElementChild as HTMLElement | null;
      carte?.style.setProperty("transform-origin", "50% 85%");
      const penche = carte?.animate(
        [{ rotate: "0deg" }, { rotate: `${sens * 3.2}deg`, offset: 0.24 }, { rotate: `${sens * -1.4}deg`, offset: 0.62 }, { rotate: "0deg" }],
        { duration: 760, easing: "cubic-bezier(0.45, 0, 0.55, 1)", delay },
      );
      if (penche) animations.push(penche);
    }
    enCours.current = animations;
  }, [decalage, sens, n]);

  function tourner(pas: 1 | -1) {
    const ul = liste.current;
    if (ul) {
      const positions = new Map<string, Position>();
      for (const li of Array.from(ul.children) as HTMLElement[]) {
        positions.set(li.dataset.cle ?? "", {
          x: li.getBoundingClientRect().left,
          o: Number(getComputedStyle(li).opacity),
          ordre: Number(li.dataset.ordre),
          cachee: li.hidden,
        });
      }
      avant.current = positions;
    }
    setSens(pas);
    setDecalage((d) => d + pas);
  }

  return (
    <div hidden={masque} className="fixed inset-0 z-30">
      <div aria-hidden className="absolute inset-0" onClick={onFermer} />
      <section
        ref={section}
        id={id}
        role="dialog"
        aria-label={titre}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (n > 1 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
            e.preventDefault();
            tourner(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onWheel={(e) => {
          if (n < 2 || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
          const m = molette.current;
          if (e.timeStamp < m.verrou) {
            m.cumul = 0;
            return;
          }
          m.cumul += e.deltaX;
          if (Math.abs(m.cumul) < 60) return;
          tourner(m.cumul > 0 ? 1 : -1);
          m.cumul = 0;
          m.verrou = e.timeStamp + 450;
        }}
        className="[--u:max(0.42px,min(1px,calc(100vw/1920)))] lg:[--u:min(1px,calc(100vw/1920),calc(100dvh/1000))] absolute inset-x-0 bottom-0 overflow-clip outline-none transition-transform duration-500 ease-tiroir starting:translate-y-full motion-reduce:transition-none"
        style={{ height: u(430) }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 bg-[#14352e] shadow-[0_-4px_4px_rgba(0,0,0,0.25)]" style={{ height: u(400) }} />
          {motifs.map(({ n: num, boite }) => (
            <div key={num} className="absolute" style={{ ...place(boite), ...depuisGauche(boite.x) }}>
              <Image
                src={`/figma/map/bandeau-motif-${num}.svg`}
                alt=""
                width={Math.round(boite.h)}
                height={Math.round(boite.w)}
                className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90"
                style={{ width: u(boite.h), height: u(boite.w) }}
              />
            </div>
          ))}
          <span className="absolute inset-x-0" style={{ top: u(222.44), height: u(226.558) }}>
            <Image src="/figma/map/bandeau-vague.svg" alt="" fill className="object-fill" />
          </span>
          <span className="absolute rounded-[calc(8*var(--u))] bg-sable" style={{ ...place({ x: -153, y: 113, w: 218, h: 220 }), ...depuisGauche(-153) }} />
          <span className="absolute rounded-[calc(8*var(--u))] bg-sable" style={{ ...place({ x: 1856, y: 115, w: 218, h: 220 }), ...depuisGauche(1856) }} />
        </div>

        <ul ref={liste} aria-label="Animaux">
          {animaux.map((animal, i) => {
            const ordre = (((i - decalage) % n) + n) % n;
            const visible = ordre < emplacements.length;
            const v = animal.vignette;
            return (
              <li
                key={animal.slug + i}
                data-cle={animal.slug + i}
                data-ordre={ordre}
                hidden={!visible}
                className="entree absolute"
                style={{ ...depuisGauche(emplacements[ordre] ?? 0), top: u(88), width: u(268.18), height: u(330), ...rang(i * 0.6, { "--retard": "120ms" }) }}
              >
                <button
                  type="button"
                  onClick={() => onChoisir(animal)}
                  className="group relative block size-full cursor-pointer rounded-[calc(8*var(--u))] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ciel"
                >
                  <span
                    className="absolute inset-x-0 top-0 block transition-[translate,scale] duration-200 ease-sortie group-hover:-translate-y-[calc(6*var(--u))] group-active:scale-[0.97] motion-reduce:transition-none"
                    style={{ height: u(270.105) }}
                  >
                    <span className="absolute inset-0 rounded-[calc(8*var(--u))] bg-sable shadow-[2px_4px_4px_rgba(0,0,0,0.25)]" />
                    <ImageRecadree
                      src={v.src}
                      recadrage={v.recadrage}
                      largeur={v.boite.w}
                      style={place(v.boite)}
                      className={v.arrondi ? "overflow-hidden rounded-[calc(8*var(--u))]" : ""}
                    />
                  </span>
                  <span
                    className="absolute inset-x-0 text-center font-display text-[length:calc(30*var(--u))] tracking-[0.02em] text-sable"
                    style={{ top: u(292) }}
                  >
                    {animal.nom}
                    {!animal.fiche && <span className="sr-only"> (fiche bientôt disponible)</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {n > 1 && (
          <>
            <Fleche cote="gauche" style={{ left: `max(4px, calc(50% - ${u(960 - 125.5)} - ${u(28)}))`, top: u(228.4 - 28) }} onClick={() => tourner(-1)} />
            <Fleche cote="droite" style={{ left: `min(calc(100% - ${u(56)} - 4px), calc(50% + ${u(1791.5 - 960)} - ${u(28)}))`, top: u(221.5 - 28) }} onClick={() => tourner(1)} />
          </>
        )}

        <button
          type="button"
          onClick={onFermer}
          aria-label="Fermer le carrousel"
          className="absolute cursor-pointer rounded-full transition-transform ease-sortie hover:scale-110 active:scale-95 focus-visible:outline-3 focus-visible:outline-ciel motion-reduce:transition-none"
          style={{ left: `min(calc(100% - ${u(49)} - 8px), calc(50% + ${u(1854.5 - 960)}))`, top: u(18.5), width: u(49), height: u(49) }}
        >
          <Image src="/figma/map/carrousel-fermer.svg" alt="" fill className="object-fill" />
        </button>
      </section>
    </div>
  );
}

function Fleche({ cote, style, onClick }: { cote: "gauche" | "droite"; style: CSSProperties; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={cote === "gauche" ? "Animaux précédents" : "Animaux suivants"}
      className="absolute flex cursor-pointer items-center justify-center rounded-full transition-transform ease-sortie hover:scale-110 active:scale-95 focus-visible:outline-3 focus-visible:outline-ciel motion-reduce:transition-none"
      style={{ ...style, width: u(56), height: u(56) }}
    >
      <Image
        src={`/figma/map/carrousel-fleche-${cote}.svg`}
        alt=""
        width={43}
        height={51}
        className={`max-w-none ${cote === "gauche" ? "rotate-90" : "-rotate-90"}`}
        style={{ width: u(42.79), height: u(51.41) }}
      />
    </button>
  );
}
