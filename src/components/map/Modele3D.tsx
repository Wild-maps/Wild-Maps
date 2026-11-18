"use client";

import { createElement, useEffect, useState } from "react";
import type { Modele3D as Modele } from "@/data/types";
import { placer } from "./geometrie";

// Zone du panneau de gauche de la fiche, entre le titre et le lecteur
const zone = placer({ x: 0, y: 140, w: 418, h: 576 });

type Etat = "chargement" | "pret" | "erreur";

// Visionneuse 3D (@google/model-viewer, chargée seulement quand on ouvre la vue 3D) : on fait tourner l'animal à la souris ou au doigt.
export function Modele3D({ modele, nom }: { modele: Modele; nom: string }) {
  const [etat, setEtat] = useState<Etat>("chargement");
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;
    const pret = () => setEtat("pret");
    const echec = () => setEtat("erreur");
    element.addEventListener("load", pret);
    element.addEventListener("error", echec);
    import("@google/model-viewer").catch(echec);
    return () => {
      element.removeEventListener("load", pret);
      element.removeEventListener("error", echec);
    };
  }, [element]);

  const animer = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  return (
    <div className="absolute" style={zone}>
      {etat !== "erreur" &&
        createElement("model-viewer", {
          ref: setElement,
          src: modele.url,
          alt: `Modèle 3D : ${nom}. Faites-le glisser pour le faire tourner.`,
          "camera-controls": true,
          "auto-rotate": animer ? true : undefined,
          "auto-rotate-delay": 0,
          "shadow-intensity": 1,
          "touch-action": "pan-y",
          "interaction-prompt": "none",
          style: { width: "100%", height: "100%", background: "transparent", "--poster-color": "transparent" },
        })}
      <p
        role="status"
        className={
          etat === "pret"
            ? "sr-only"
            : "absolute inset-x-0 top-1/2 -translate-y-1/2 px-24 text-center font-ui text-[length:calc(22*var(--f))] leading-[calc(28*var(--f))] text-ecorce"
        }
      >
        {etat === "chargement" && "Chargement du modèle 3D…"}
        {etat === "erreur" && "Le modèle 3D n’a pas pu être chargé. Réessayez dans un instant."}
        {etat === "pret" && `Modèle 3D de ${nom} chargé.`}
      </p>
      {modele.credit && etat !== "erreur" && (
        <p className="absolute bottom-0 left-0 right-0 truncate px-16 text-center font-body text-[length:calc(13*var(--f))] text-ecorce/80">
          Modèle 3D : {modele.credit}
        </p>
      )}
    </div>
  );
}
