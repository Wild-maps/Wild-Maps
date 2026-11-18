"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HAUTEUR_BARRE } from "./BarreCarte";

type FenetreProps = {
  ouverte: boolean;
  onFermer: () => void;
  etiquette: string;
  children: ReactNode;
};

export function Fenetre({ ouverte, onFermer, etiquette, children }: FenetreProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const retour = useRef<HTMLElement | null>(null);
  const contenu = useRef<HTMLDivElement>(null);
  const clic = useRef({ x: 0, y: 0, t: -Infinity });

  useEffect(() => {
    const noter = (e: MouseEvent) => {
      if (e.detail > 0) clic.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    };
    document.addEventListener("click", noter, true);
    return () => document.removeEventListener("click", noter, true);
  }, []);

  useEffect(() => {
    const dialogue = ref.current;
    if (!dialogue) return;
    if (ouverte && !dialogue.open) {
      retour.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialogue.showModal();
      const el = contenu.current;
      const parent = el?.offsetParent;
      if (el && parent && performance.now() - clic.current.t < 600) {
        const p = parent.getBoundingClientRect();
        el.style.transformOrigin = `${clic.current.x - p.left - el.offsetLeft}px ${clic.current.y - p.top - el.offsetTop}px`;
      }
      dialogue.querySelector<HTMLElement>("[data-focus-initial]")?.focus();
    } else if (!ouverte && dialogue.open) {
      dialogue.close();
    }
  }, [ouverte]);

  return (
    <dialog
      ref={ref}
      aria-label={etiquette}
      onCancel={(e) => {
        e.preventDefault();
        onFermer();
      }}
      onClose={() => {
        if (ouverte) onFermer();
        retour.current?.focus();
        retour.current = null;
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-white backdrop:bg-transparent"
    >
      {ouverte && (
        <div
          className="relative flex min-h-full items-center justify-center px-4 pb-6 lg:px-6 lg:pb-[clamp(16px,2.2dvh,43px)]"
          style={{ paddingTop: `calc(${HAUTEUR_BARRE} + clamp(16px, 2.2dvh, 38px))` }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onFermer();
          }}
        >
          <div
            aria-hidden
            className="fixed inset-x-0 bottom-0"
            style={{ top: HAUTEUR_BARRE }}
            onClick={onFermer}
          />
          <div
            ref={contenu}
            className="relative transition-[opacity,translate,scale] duration-300 ease-sortie starting:translate-y-3 starting:scale-[0.9] starting:opacity-0 motion-reduce:transition-none"
          >
            {children}
          </div>
        </div>
      )}
    </dialog>
  );
}
