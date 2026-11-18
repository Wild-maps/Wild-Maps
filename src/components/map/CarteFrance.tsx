"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { rang } from "@/components/ui/rang";
import { regionsCarte, type RegionCarte, type Suggestion } from "@/data/regions";
import { Annonce, useAnnonce } from "./Annonce";
import { BarreCarte } from "./BarreCarte";
import { Cadre } from "./Cadre";
import { placerDansCadre } from "./geometrie";

const boiteCarte = placerDansCadre({ x: -19, y: -5, w: 1941, h: 1092 });
const tailles = "(max-aspect-ratio: 1920/1000) 196dvh, 102vw";

const ordre = [
  "hauts-de-france", "normandie", "ile-de-france", "grand-est", "bretagne", "pays-de-la-loire",
  "centre-val-de-loire", "bourgogne-franche-comte", "nouvelle-aquitaine", "auvergne-rhone-alpes",
  "occitanie", "paca", "corse",
];
const regions = [...regionsCarte].sort((a, b) => ordre.indexOf(a.slug) - ordre.indexOf(b.slug));

function ImageCarte({ priority, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <div className={`absolute ${className}`} style={boiteCarte}>
      <Image src="/figma/map/carte-france.jpg" alt="" fill priority={priority} sizes={tailles} className="object-fill" />
    </div>
  );
}

const classeTrace = "fill-transparent stroke-transparent stroke-[4] outline-none";

let carteDessinee = false;

export function CarteFrance({ actives, index }: { actives: string[]; index: Suggestion[] }) {
  const router = useRouter();
  const [survol, setSurvol] = useState<string | null>(null);
  const scene = useRef<HTMLDivElement>(null);
  const plongee = useRef<Animation | null>(null);
  const { annonce, annoncer } = useAnnonce();
  const [intro, setIntro] = useState(() => !carteDessinee);

  const active = regions.find((r) => r.slug === survol);

  useEffect(
    () => () => {
      plongee.current?.cancel();
      plongee.current = null;
      setSurvol(null);
    },
    [],
  );

  useEffect(() => {
    carteDessinee = true;
    const encre = document.querySelector<HTMLElement>("[data-encre]");
    if (encre) {
      const fondu = encre.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease", fill: "forwards" });
      fondu.finished.then(
        () => encre.remove(),
        () => encre.remove(),
      );
    }
    if (!intro) return;
    const minuterie = setTimeout(() => setIntro(false), 2600);
    return () => clearTimeout(minuterie);
  }, [intro]);

  const evenements = (r: RegionCarte) => ({
    onPointerEnter: () => setSurvol(r.slug),
    onPointerLeave: () => setSurvol((s) => (s === r.slug ? null : s)),
    onFocus: () => setSurvol(r.slug),
    onBlur: () => setSurvol((s) => (s === r.slug ? null : s)),
  });

  function suivreLien(e: MouseEvent<Element>, r: RegionCarte, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (plongee.current) return;
    const el = scene.current;
    const trace = e.currentTarget.querySelector("path");
    if (!el || !trace || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      router.push(href);
      return;
    }
    const b = trace.getBBox();
    el.style.transformOrigin = `${((r.x + b.x + b.width / 2) / 1920) * 100}% ${((r.y + b.y + b.height / 2) / 1000) * 100}%`;
    const a = el.animate(
      [{ transform: "none", opacity: 1 }, { opacity: 1, offset: 0.4 }, { transform: "scale(2.1)", opacity: 0 }],
      { duration: 520, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
    );
    plongee.current = a;
    a.onfinish = () => router.push(href);
  }

  return (
    <>
      <BarreCarte index={index} retour={{ href: "/", label: "Retour à l’accueil" }} libelleSurvol={active?.libelle} onBientot={annoncer} />
      <main className="relative h-dvh overflow-hidden bg-foret-950">
        <h1 className="sr-only">Carte de France des régions</h1>
        <Cadre>
          <div ref={scene} className="absolute inset-0">
            <ImageCarte priority className={intro ? "carte-fond" : "arrivee"} />
            <div aria-hidden className="absolute inset-0 bg-[#151515]/40" />

            {regions.map((r, i) => (
              <div
                key={r.slug}
                aria-hidden
                style={{ ...placerDansCadre(r.calque), ...rang(i) }}
                className={`pointer-events-none absolute transition-opacity ease-sortie motion-reduce:transition-none ${
                  r.slug === survol ? "opacity-100 duration-200" : "opacity-0 duration-300"
                } ${intro ? "calque-intro" : ""}`}
              >
                <Image src={`/figma/map/regions/${r.slug}.webp`} alt="" fill unoptimized fetchPriority={intro ? "auto" : "low"} />
              </div>
            ))}

            {intro && (
              <svg aria-hidden viewBox="0 0 1920 1000" className="pointer-events-none absolute inset-0 size-full overflow-visible">
                {regions.map((r, i) => (
                  <path
                    key={r.slug}
                    d={r.d}
                    transform={`translate(${r.x} ${r.y})`}
                    pathLength={1}
                    style={rang(i)}
                    className="trait-intro fill-none stroke-creme/80 opacity-0 [stroke-dasharray:1] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4]"
                  />
                ))}
              </svg>
            )}

            <svg aria-hidden viewBox="0 0 1920 1000" className="pointer-events-none absolute inset-0 size-full overflow-visible">
              {regions.map((r) => (
                <path
                  key={r.slug}
                  d={r.d}
                  transform={`translate(${r.x} ${r.y})`}
                  pathLength={1}
                  className={`fill-none stroke-creme/70 transition-opacity ease-sortie [stroke-dasharray:1] [stroke-linejoin:round] [stroke-width:1.6] motion-reduce:transition-none ${
                    r.slug === survol ? "dessine opacity-100 duration-200" : "opacity-0 duration-300"
                  }`}
                />
              ))}
            </svg>

            <svg viewBox="0 0 1920 1000" className="absolute inset-0 size-full" role="group" aria-label="Régions de France">
              {regions.map((r) =>
                actives.includes(r.slug) ? (
                  <a
                    key={r.slug}
                    href={`/carte/${r.slug}`}
                    aria-label={r.nom}
                    className="group cursor-pointer outline-none"
                    onClick={(e) => suivreLien(e, r, `/carte/${r.slug}`)}
                    {...evenements(r)}
                    onPointerEnter={() => {
                      setSurvol(r.slug);
                      router.prefetch(`/carte/${r.slug}`);
                    }}
                    onFocus={() => {
                      setSurvol(r.slug);
                      router.prefetch(`/carte/${r.slug}`);
                    }}
                  >
                    <path d={r.d} transform={`translate(${r.x} ${r.y})`} className={`${classeTrace} group-focus-visible:stroke-ciel`} />
                  </a>
                ) : (
                  <path
                    key={r.slug}
                    d={r.d}
                    transform={`translate(${r.x} ${r.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${r.nom}, bientôt disponible`}
                    className={`${classeTrace} cursor-pointer focus-visible:stroke-ciel`}
                    onClick={() => annoncer(r.nom)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        annoncer(r.nom);
                      }
                    }}
                    {...evenements(r)}
                  />
                ),
              )}
            </svg>
          </div>
        </Cadre>
        <Annonce annonce={annonce} />
      </main>
    </>
  );
}
