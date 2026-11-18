"use client";

import { useEffect, useRef } from "react";
import { mouvementReduit } from "@/components/ui/courbe";

const vague = "M0 29.9547C137 -14.5426 470 -32.7203 1013 146.197C1410.7 277.237 1779 334.781 1981.5 79.2023";
const vagueArriere = "M0 74C190 12 560 -4 1060 112C1460 205 1800 236 1981.5 38";
const largeur = 1981.5;
const bas = 820.783;
const nombre = 56;
const depart = -60;
const xs = Array.from({ length: nombre }, (_, i) => depart + ((largeur - 2 * depart) * i) / (nombre - 1));
const k1 = (2 * Math.PI) / 760;
const k2 = (2 * Math.PI) / 410;
const k3 = (2 * Math.PI) / 980;
const intervalle = 30;

function profil(d: string) {
  const n = (d.match(/-?\d*\.?\d+/g) ?? []).map(Number);
  const pts: [number, number][] = [[n[0], n[1]]];
  for (let k = 2; k + 5 < n.length; k += 6) {
    const [x0, y0] = pts[pts.length - 1];
    for (let i = 1; i <= 80; i++) {
      const t = i / 80;
      const u = 1 - t;
      const a = u * u * u;
      const b = 3 * u * u * t;
      const c = 3 * u * t * t;
      const e = t * t * t;
      pts.push([a * x0 + b * n[k] + c * n[k + 2] + e * n[k + 4], a * y0 + b * n[k + 1] + c * n[k + 3] + e * n[k + 5]]);
    }
  }
  return (x: number) => {
    if (x <= pts[0][0]) return pts[0][1];
    if (x >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
    let gauche = 0;
    let droite = pts.length - 1;
    while (droite - gauche > 1) {
      const m = (gauche + droite) >> 1;
      if (pts[m][0] <= x) gauche = m;
      else droite = m;
    }
    const k = (x - pts[gauche][0]) / (pts[droite][0] - pts[gauche][0] || 1);
    return pts[gauche][1] * (1 - k) + pts[droite][1] * k;
  };
}

function lisse(ys: number[]) {
  let d = `M${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
  for (let i = 0; i < nombre - 1; i++) {
    const a = Math.max(0, i - 1);
    const c = i + 1;
    const e = Math.min(nombre - 1, i + 2);
    d += `C${(xs[i] + (xs[c] - xs[a]) / 6).toFixed(1)} ${(ys[i] + (ys[c] - ys[a]) / 6).toFixed(1)} ${(xs[c] - (xs[e] - xs[i]) / 6).toFixed(1)} ${(ys[c] - (ys[e] - ys[i]) / 6).toFixed(1)} ${xs[c].toFixed(1)} ${ys[c].toFixed(1)}`;
  }
  return d;
}

export function Houle() {
  const cadreRef = useRef<HTMLDivElement>(null);
  const arriereRef = useRef<SVGPathElement>(null);
  const avantRef = useRef<SVGPathElement>(null);
  const creteRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const cadre = cadreRef.current;
    const arriere = arriereRef.current;
    const avant = avantRef.current;
    const crete = creteRef.current;
    if (!cadre || !arriere || !avant || !crete || mouvementReduit()) return;

    const baseAvant = xs.map(profil(vague));
    const baseArriere = xs.map(profil(vagueArriere));
    const ysAvant = new Array<number>(nombre);
    const ysArriere = new Array<number>(nombre);
    let t = 0;
    let precedent = 0;
    let image = 0;
    let visible = false;

    const calculer = () => {
      for (let i = 0; i < nombre; i++) {
        const x = xs[i];
        ysAvant[i] = baseAvant[i] + 6 * Math.sin(x * k1 + t * 0.8) + 3 * Math.sin(x * k2 - t * 1.2 + 1.3);
        ysArriere[i] = baseArriere[i] + 7 * Math.sin(x * k3 - t * 0.6 + 2) + 3 * Math.sin(x * k2 * 1.25 + t * 0.95);
      }
      const dAvant = lisse(ysAvant);
      avant.setAttribute("d", `${dAvant}V${bas}H${depart}Z`);
      crete.setAttribute("d", dAvant);
      arriere.setAttribute("d", `${lisse(ysArriere)}V${bas}H${depart}Z`);
    };

    const boucle = (maintenant: number) => {
      image = visible ? requestAnimationFrame(boucle) : 0;
      if (maintenant - precedent < intervalle) return;
      t += Math.min(48, maintenant - precedent) / 1000;
      precedent = maintenant;
      calculer();
    };

    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting;
      if (visible && !image) {
        precedent = performance.now();
        image = requestAnimationFrame(boucle);
      }
    });
    observateur.observe(cadre);

    return () => {
      observateur.disconnect();
      cancelAnimationFrame(image);
    };
  }, []);

  return (
    <div ref={cadreRef} aria-hidden className="pointer-events-none absolute left-[-3%] top-0 hidden aspect-[1981.5/820.783] min-h-full w-[106%] lg:block">
      <svg viewBox="0 0 1981.5 820.783" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <path ref={arriereRef} d={`${vagueArriere}V${bas}H0Z`} className="fill-foret-700/45" />
      </svg>
      <svg viewBox="0 0 1981.5 820.783" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <path ref={avantRef} d={`${vague}V${bas}H0Z`} className="fill-[#161616]/60" />
        <path ref={creteRef} d={vague} vectorEffect="non-scaling-stroke" className="fill-none stroke-creme/15 [stroke-width:2]" />
      </svg>
    </div>
  );
}
