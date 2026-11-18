"use client";

import { useCallback, useEffect, useState } from "react";

type AnnonceEtat = { nom: string; cle: number } | null;

export function useAnnonce() {
  const [annonce, setAnnonce] = useState<AnnonceEtat>(null);

  useEffect(() => {
    if (!annonce) return;
    const minuteur = setTimeout(() => setAnnonce(null), 3200);
    return () => clearTimeout(minuteur);
  }, [annonce]);

  const annoncer = useCallback((nom: string) => setAnnonce({ nom, cle: Date.now() }), []);
  return { annonce, annoncer };
}

export function Annonce({ annonce }: { annonce: AnnonceEtat }) {
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-[clamp(16px,3vw,48px)] z-50 flex justify-center"
    >
      {annonce && (
        <p
          key={annonce.cle}
          className="rounded-[10px] border-[4.5px] border-ecorce bg-sable px-[clamp(14px,1.2vw,24px)] py-[clamp(6px,0.6vw,12px)] text-center font-ui text-[clamp(15px,1.12vw,21.5px)] tracking-[0.02em] text-ecorce shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] transition-[opacity,translate] duration-200 starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none"
        >
          <span className="font-display text-[1.15em]">Bientôt disponible</span>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          {annonce.nom} n’a pas encore sa page.
        </p>
      )}
    </div>
  );
}
