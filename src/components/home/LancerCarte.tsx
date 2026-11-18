"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ComponentProps, type MouseEvent } from "react";
import { courbe, mouvementReduit } from "@/components/ui/courbe";
import { PillButton } from "@/components/ui/PillButton";

type LancerCarteProps = Omit<ComponentProps<typeof PillButton>, "href" | "onClick"> & { href: string };

function disque(voile: HTMLElement, couleur: string, x: number, y: number, rayon: number) {
  const el = document.createElement("span");
  el.style.cssText = `position:absolute;left:${x - rayon}px;top:${y - rayon}px;width:${2 * rayon}px;height:${2 * rayon}px;border-radius:50%;background:${couleur};will-change:transform`;
  voile.append(el);
  return el;
}

export function LancerCarte({ href, ...props }: LancerCarteProps) {
  const router = useRouter();
  const animations = useRef<Animation[]>([]);

  useEffect(
    () => () => {
      animations.current.forEach((a) => a.cancel());
      animations.current = [];
    },
    [],
  );

  function lancer(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || mouvementReduit()) return;
    e.preventDefault();
    if (animations.current.length) return;

    const bouton = e.currentTarget;
    const b = bouton.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const rayon = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const depart = Math.max(b.width, b.height) / (2 * rayon);
    const deplace = courbe("deplace");
    const sortie = courbe("sortie");

    const voile = document.createElement("div");
    voile.dataset.encre = "";
    voile.setAttribute("aria-hidden", "true");
    voile.style.cssText = "position:fixed;inset:0;z-index:100;pointer-events:none;overflow:hidden";
    const sable = disque(voile, "var(--color-sable)", x, y, rayon);
    const nuit = disque(voile, "var(--color-foret-950)", x, y, rayon);
    document.body.append(voile);

    const section = bouton.closest("section");

    const fin = nuit.animate([{ transform: `scale(${depart * 0.4})` }, { transform: "scale(1)" }], { duration: 760, delay: 200, easing: deplace, fill: "both" });
    animations.current = [
      bouton.animate([{ scale: "1" }, { scale: "0.97", offset: 0.4 }, { scale: "1" }], { duration: 260, easing: sortie }),
      sable.animate([{ transform: `scale(${depart})` }, { transform: "scale(1)" }], { duration: 760, delay: 60, easing: deplace, fill: "both" }),
      fin,
      ...(section
        ? [
            section.animate([{ opacity: 1 }, { opacity: 0.4 }], {
              duration: 760,
              delay: 60,
              easing: deplace,
              fill: "forwards",
            }),
          ]
        : []),
    ];

    fin.finished.then(
      () => {
        router.push(href);
        setTimeout(() => voile.remove(), 5000);
      },
      () => voile.remove(),
    );
  }

  return <PillButton href={href} onClick={lancer} {...props} />;
}
