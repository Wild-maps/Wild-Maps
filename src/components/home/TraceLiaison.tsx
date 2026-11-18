"use client";

import { useEffect, useRef } from "react";
import { courbe, mouvementReduit } from "@/components/ui/courbe";

const chemin =
  "M158.463 50.9607C111.463 139.461 -48.6738 217.461 24.2401 220.661C200.634 228.403 284.24 301.661 601.24 110.661C918.24 -80.3391 1313.25 26.6853 1406.49 134.661C1541.46 290.961 1221.99 700.661 541.988 593.661C38.8076 514.484 -47.5372 1073.96 65.3258 1267.96C393.826 1337.46 719.989 765.661 1406.49 1026.66";

const ns = "http://www.w3.org/2000/svg";

const nombres = (chemin.match(/-?\d*\.?\d+/g) ?? []).map(Number);
const morceaux: string[] = [];
for (let k = 2; k + 5 < nombres.length; k += 6) morceaux.push(`M${nombres[k - 2]} ${nombres[k - 1]}C${nombres.slice(k, k + 6).join(" ")}`);

const pasParMorceau = 200;
const total = morceaux.length * pasParMorceau + 1;
const xs = new Float64Array(total);
const ys = new Float64Array(total);
const ls = new Float64Array(total);
const debuts: number[] = [];
const longueurs: number[] = [];
xs[0] = nombres[0];
ys[0] = nombres[1];
for (let m = 0, i = 0; m < morceaux.length; m++) {
  const [x0, y0] = [xs[i], ys[i]];
  const [ax, ay, bx, by, cx, cy] = nombres.slice(2 + m * 6, 8 + m * 6);
  debuts.push(ls[i]);
  for (let p = 1; p <= pasParMorceau; p++, i++) {
    const t = p / pasParMorceau;
    const u = 1 - t;
    xs[i + 1] = u * u * u * x0 + 3 * u * u * t * ax + 3 * u * t * t * bx + t * t * t * cx;
    ys[i + 1] = u * u * u * y0 + 3 * u * u * t * ay + 3 * u * t * t * by + t * t * t * cy;
    ls[i + 1] = ls[i] + Math.hypot(xs[i + 1] - xs[i], ys[i + 1] - ys[i]);
  }
  longueurs.push(ls[i] - debuts[m]);
}
const longueur = ls[total - 1];

function indice(s: number) {
  let gauche = 0;
  let droite = total - 1;
  while (droite - gauche > 1) {
    const m = (gauche + droite) >> 1;
    if (ls[m] <= s) gauche = m;
    else droite = m;
  }
  return gauche;
}

function point(s: number) {
  const i = indice(s);
  const k = Math.min(1, Math.max(0, (s - ls[i]) / (ls[i + 1] - ls[i] || 1)));
  return { x: xs[i] + (xs[i + 1] - xs[i]) * k, y: ys[i] + (ys[i + 1] - ys[i]) * k };
}

function troncon(a: number, b: number) {
  if (b <= a) return "";
  const debut = point(a);
  const fin = point(b);
  let d = `M${debut.x.toFixed(1)} ${debut.y.toFixed(1)}`;
  for (let i = indice(a) + 1, j = indice(b); i <= j; i++) d += `L${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`;
  return `${d}L${fin.x.toFixed(1)} ${fin.y.toFixed(1)}`;
}

type Patte = { s: number; el: SVGGElement; posee: boolean };
type Carte = { fig: HTMLElement; cadre: HTMLElement; anneau: HTMLElement | null; s: number; x: number; y: number; touchee: boolean };

export function TraceLiaison({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const traitRef = useRef<SVGGElement>(null);
  const fraisRef = useRef<SVGPathElement>(null);
  const lueurRef = useRef<SVGPathElement>(null);
  const pattesRef = useRef<SVGGElement>(null);
  const ondesRef = useRef<SVGGElement>(null);
  const pointeRef = useRef<SVGGElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const trait = traitRef.current;
    const frais = fraisRef.current;
    const lueur = lueurRef.current;
    const groupePattes = pattesRef.current;
    const groupeOndes = ondesRef.current;
    const pointe = pointeRef.current;
    const halo = haloRef.current;
    const grille = svg?.parentElement;
    if (!svg || !trait || !frais || !lueur || !groupePattes || !groupeOndes || !pointe || !halo || !grille || mouvementReduit()) return;

    const sortie = courbe("sortie");
    const ressort = courbe("ressort");
    const segments = [...trait.children] as SVGPathElement[];
    const avancees = segments.map(() => -1);
    for (const segment of segments) segment.style.strokeDasharray = "1 2";

    const pattes: Patte[] = [];
    for (let s = 36, k = 0; s < longueur - 12; s += 54, k++) {
      const p = point(s);
      const q = point(Math.min(longueur, s + 2));
      const angle = Math.atan2(q.y - p.y, q.x - p.x);
      const cote = k % 2 ? 1 : -1;
      const x = p.x + Math.cos(angle + Math.PI / 2) * 14 * cote;
      const y = p.y + Math.sin(angle + Math.PI / 2) * 14 * cote;
      const place = document.createElementNS(ns, "g");
      place.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((angle * 180) / Math.PI + 90).toFixed(1)}) scale(1.7)`);
      const corps = document.createElementNS(ns, "g");
      corps.setAttribute("class", "patte");
      const forme = document.createElementNS(ns, "use");
      forme.setAttribute("href", "#patte-craie");
      corps.append(forme);
      place.append(corps);
      groupePattes.append(place);
      pattes.push({ s, el: corps, posee: false });
    }

    let cartes: Carte[] = [];
    const placerCartes = () => {
      const g = grille.getBoundingClientRect();
      const b = svg.getBoundingClientRect();
      if (!b.width || !b.height) {
        cartes = [];
        return;
      }
      const vb = svg.viewBox.baseVal;
      const versSvg = (x: number, y: number) => ({
        x: ((x - (b.left - g.left)) / b.width) * vb.width,
        y: ((y - (b.top - g.top)) / b.height) * vb.height,
      });
      const marge = g.width * 0.01;
      cartes = [...grille.querySelectorAll<HTMLElement>("[data-exemple]")].flatMap((fig) => {
        const cadre = fig.querySelector<HTMLElement>("[data-cadre]");
        if (!cadre) return [];
        const a = versSvg(fig.offsetLeft - marge, fig.offsetTop - marge);
        const z = versSvg(fig.offsetLeft + cadre.offsetWidth + marge, fig.offsetTop + cadre.offsetHeight + marge);
        const centre = { x: (a.x + z.x) / 2, y: (a.y + z.y) / 2 };
        let i0 = -1;
        let meilleur = Infinity;
        let plusProche = 0;
        for (let i = 0; i < total; i++) {
          if (xs[i] >= a.x && xs[i] <= z.x && ys[i] >= a.y && ys[i] <= z.y) {
            i0 = i;
            break;
          }
          const d = (xs[i] - centre.x) ** 2 + (ys[i] - centre.y) ** 2;
          if (d < meilleur) {
            meilleur = d;
            plusProche = i;
          }
        }
        if (i0 < 0) i0 = plusProche;
        return [{ fig, cadre, anneau: fig.querySelector<HTMLElement>("[data-anneau]"), s: ls[i0], x: xs[i0], y: ys[i0], touchee: false }];
      });
    };

    const reagir = (c: Carte) => {
      for (const retard of [0, 150]) {
        const cercle = document.createElementNS(ns, "circle");
        cercle.setAttribute("cx", `${c.x}`);
        cercle.setAttribute("cy", `${c.y}`);
        cercle.setAttribute("r", "48");
        cercle.setAttribute("class", "onde-craie");
        groupeOndes.append(cercle);
        const onde = cercle.animate([{ scale: "0.12", opacity: 0.95 }, { scale: "1", opacity: 0 }], { duration: 750, delay: retard, easing: sortie, fill: "both" });
        onde.finished.then(
          () => cercle.remove(),
          () => cercle.remove(),
        );
      }
      c.cadre.animate([{ translate: "0 0", easing: sortie }, { translate: "0 -10px", offset: 0.28, easing: ressort }, { translate: "0 0" }], { duration: 900 });
      c.anneau?.animate([{ opacity: 0.9, scale: "1" }, { opacity: 0, scale: "1.07" }], { duration: 800, easing: sortie });
    };

    let cible = 0;
    let actuel = 0;
    let precedent = 0;
    let avant = 0;
    let image = 0;
    let dessine = -1;
    let enCours = "0";
    let rayon = "";

    const mesurer = () => {
      const { top, height } = svg.getBoundingClientRect();
      cible = height ? Math.min(1, Math.max(0, (innerHeight * 0.62 - top) / (height * 0.88))) : actuel;
    };

    const dessiner = (p: number, dt: number, silence: boolean) => {
      const h = longueur * p;
      segments.forEach((segment, m) => {
        const f = Math.min(1, Math.max(0, (h - debuts[m]) / longueurs[m]));
        if (f === avancees[m]) return;
        avancees[m] = f;
        segment.style.strokeDashoffset = `${1 - f}`;
        segment.style.visibility = f > 0 ? "" : "hidden";
      });
      const visible = p > 0.002 && p < 0.998 ? "" : "0";
      if (visible !== enCours) {
        enCours = visible;
        for (const el of [pointe, lueur, frais]) el.style.opacity = visible;
      }
      if (visible === "") {
        lueur.setAttribute("d", troncon(h - Math.min(150, h), h));
        frais.setAttribute("d", troncon(h - Math.min(56, h), h));
        const { x, y } = point(h);
        pointe.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      }
      const vitesse = dt ? (Math.abs(p - precedent) / dt) * 1000 : 0;
      const r = (17 * (1 + Math.min(1.4, vitesse * 2.4))).toFixed(1);
      if (r !== rayon) {
        rayon = r;
        halo.setAttribute("r", r);
      }
      precedent = p;
      dessine = p;
      for (const patte of pattes) {
        const posee = patte.s < h - 10;
        if (posee !== patte.posee) {
          patte.posee = posee;
          patte.el.classList.toggle("posee", posee);
        }
      }
      for (const c of cartes) {
        if (!c.touchee && h >= c.s && p > 0) {
          c.touchee = true;
          c.fig.dataset.touchee = "";
          if (!silence) reagir(c);
        } else if (c.touchee && h < c.s - 24) {
          c.touchee = false;
          delete c.fig.dataset.touchee;
        }
      }
    };

    const boucle = (t: number) => {
      mesurer();
      const dt = avant ? Math.min(64, t - avant) : 16;
      avant = t;
      actuel += (cible - actuel) * (1 - Math.exp(-dt / 160));
      if (Math.abs(cible - actuel) < 0.0003) actuel = cible;
      if (actuel !== dessine) dessiner(actuel, dt, false);
      image = actuel === cible ? 0 : requestAnimationFrame(boucle);
    };

    const relancer = () => {
      if (image) return;
      avant = 0;
      image = requestAnimationFrame(boucle);
    };

    const redimensionner = () => {
      placerCartes();
      relancer();
    };

    for (const fig of grille.querySelectorAll<HTMLElement>("[data-exemple]")) delete fig.dataset.touchee;
    placerCartes();
    mesurer();
    actuel = cible;
    precedent = cible;
    dessiner(actuel, 0, true);

    const observateur = new IntersectionObserver(([entree]) => {
      if (entree.isIntersecting) addEventListener("scroll", relancer, { passive: true });
      else removeEventListener("scroll", relancer);
      relancer();
    });
    observateur.observe(svg);
    addEventListener("resize", redimensionner);

    return () => {
      observateur.disconnect();
      removeEventListener("scroll", relancer);
      removeEventListener("resize", redimensionner);
      cancelAnimationFrame(image);
      groupePattes.replaceChildren();
      groupeOndes.replaceChildren();
      for (const segment of segments) segment.removeAttribute("style");
      for (const c of cartes) {
        c.cadre.getAnimations().forEach((a) => a.cancel());
        c.anneau?.getAnimations().forEach((a) => a.cancel());
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox="0 0 1442.37 1279.37"
      preserveAspectRatio="none"
      overflow="visible"
      className={className}
    >
      <defs>
        <pattern id="grain-craie" patternUnits="userSpaceOnUse" width="64" height="64">
          <image href="/figma/home/exemples/grain-craie.png" width="64" height="64" />
        </pattern>
        <g id="patte-craie">
          <ellipse cx="0" cy="3.2" rx="5.2" ry="4.4" />
          <circle cx="-5.4" cy="-3" r="1.9" />
          <circle cx="-1.9" cy="-6.3" r="2" />
          <circle cx="1.9" cy="-6.3" r="2" />
          <circle cx="5.4" cy="-3" r="1.9" />
        </g>
      </defs>
      <g ref={traitRef} fill="none" stroke="url(#grain-craie)" strokeWidth="4.2">
        {morceaux.map((d, i) => (
          <path key={d} d={d} pathLength={1} strokeLinecap={i === 0 || i === morceaux.length - 1 ? "round" : "butt"} />
        ))}
      </g>
      <path ref={lueurRef} fill="none" stroke="#fff9ee" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" opacity="0.16" style={{ opacity: 0 }} />
      <path ref={fraisRef} fill="none" stroke="#fff9ee" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" style={{ opacity: 0 }} />
      <g ref={pattesRef} />
      <g ref={ondesRef} />
      <g ref={pointeRef} className="transition-opacity duration-300" style={{ opacity: 0 }}>
        <circle ref={haloRef} r="17" fill="white" opacity="0.14" />
        <circle r="6.5" fill="#fff9ee" />
      </g>
    </svg>
  );
}
