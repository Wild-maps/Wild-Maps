"use client";

import { PillButton } from "@/components/ui/PillButton";
import { Avatar } from "./Avatar";
import { useCompte } from "./useCompte";

export function BoutonCompte({ className = "" }: { className?: string }) {
  const compte = useCompte();

  if (compte.etat === "connecte") {
    return (
      <PillButton
        href="/profil"
        aria-label={`Mon profil, connecté en tant que ${compte.compte.nom}`}
        className={`gap-[0.45em] pl-[0.3em] ${className}`}
      >
        <Avatar compte={compte.compte} className="size-[1.45em] text-[0.95em] ring-2 ring-sable" />
        <span className="max-w-[9em] truncate">{compte.compte.prenom}</span>
      </PillButton>
    );
  }

  const inconnu = compte.etat === "inconnu";
  return (
    <PillButton
      href="/connexion"
      variant="ciel"
      aria-hidden={inconnu || undefined}
      tabIndex={inconnu ? -1 : undefined}
      className={`${className} ${inconnu ? "invisible" : ""}`}
    >
      Se connecter
    </PillButton>
  );
}
