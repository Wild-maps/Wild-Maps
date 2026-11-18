"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { rang } from "@/components/ui/rang";

const revelation = 1750;

const pas = Array.from({ length: 9 }, (_, i) => {
  const [x0, y0, cx, cy, x1, y1] = [330, 1110, 560, 640, 930, 540];
  const t = 0.06 + (i / 8) * 0.94;
  const u = 1 - t;
  const x = u * u * x0 + 2 * u * t * cx + t * t * x1;
  const y = u * u * y0 + 2 * u * t * cy + t * t * y1;
  const angle = Math.atan2(2 * u * (cy - y0) + 2 * t * (y1 - cy), 2 * u * (cx - x0) + 2 * t * (x1 - cx));
  const cote = i % 2 ? 16 : -16;
  return {
    left: `${(((x + Math.cos(angle + Math.PI / 2) * cote - 427) / 1108) * 100).toFixed(2)}%`,
    top: `${(((y + Math.sin(angle + Math.PI / 2) * cote - 7) / 1042) * 100).toFixed(2)}%`,
    rotate: `${((angle * 180) / Math.PI + 90).toFixed(1)}deg`,
  };
});

let ouvertureJouee = false;

export function Ouverture() {
  const [visible, setVisible] = useState(() => !ouvertureJouee);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ouvertureJouee = true;
    const racine = ref.current;
    if (!racine) return;
    const fin = racine.getAnimations().find((a) => a instanceof CSSAnimation && a.animationName === "ouverture-fin");
    if (!fin) {
      const image = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(image);
    }

    const passer = () => {
      const ecart = revelation - Number(fin.currentTime ?? revelation);
      if (ecart <= 0) return;
      for (const a of document.getAnimations()) {
        if (a.timeline === document.timeline && a.currentTime !== null) a.currentTime = Number(a.currentTime) + ecart;
      }
    };
    const evenements = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    const ecouter = () => evenements.forEach((n) => addEventListener(n, passer, { passive: true }));
    const oublier = () => evenements.forEach((n) => removeEventListener(n, passer));
    ecouter();

    let minuterie = 0;
    fin.finished.then(
      () => {
        oublier();
        minuterie = window.setTimeout(() => setVisible(false), 1000);
      },
      () => {},
    );

    return () => {
      oublier();
      clearTimeout(minuterie);
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={ref} aria-hidden className="ouverture fixed inset-0 z-[60] overflow-clip">
      <div className="ouverture-boite ouverture-iris">
        <span className="ouverture-bouchon ouverture-calque absolute bg-sable" />
        <Image src="/figma/ouverture/voile-france.webp" alt="" width={1286} height={1220} unoptimized priority className="ouverture-voile ouverture-calque absolute max-w-none" />
        <Image src="/figma/ouverture/france-trait.webp" alt="" width={1286} height={1220} unoptimized priority className="ouverture-trait ouverture-calque absolute max-w-none" />
      </div>
      <div className="ouverture-boite">
        <div className="ouverture-rotor" />
      </div>
      <div className="ouverture-boite ouverture-traces">
        {pas.map((p, i) => (
          <span key={i} className="ouverture-pas" style={rang(i, p)}>
            <svg viewBox="-7.3 -8.3 14.6 15.9" className="block w-full overflow-visible">
              <ellipse cx="0" cy="3.2" rx="5.2" ry="4.4" />
              <circle cx="-5.4" cy="-3" r="1.9" />
              <circle cx="-1.9" cy="-6.3" r="2" />
              <circle cx="1.9" cy="-6.3" r="2" />
              <circle cx="5.4" cy="-3" r="1.9" />
            </svg>
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 flex h-[clamp(64px,5.36vw,103px)] items-center pl-[clamp(12px,1.1vw,21px)]">
        <span className="ouverture-marque flex items-center gap-[clamp(8px,1vw,19px)]">
          <Image src="/figma/ui/logo-wildmap.png" alt="" width={88} height={79} priority className="ouverture-logo h-auto w-[clamp(48px,4.58vw,88px)]" />
          <span className="block overflow-clip">
            <span className="ouverture-mot relative block font-display text-[clamp(26px,1.98vw,38px)] tracking-[0.02em] text-creme">
              Wild Map
              <span className="ouverture-encre absolute inset-0 text-foret-900">Wild Map</span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
