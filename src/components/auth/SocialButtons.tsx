"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { fournisseurActif } from "@/lib/supabase/fournisseurs";
import { AuthNotice } from "./AuthCard";

type Fournisseur = "facebook" | "apple" | "google";

const fournisseurs: { id: Fournisseur; name: string; src: string; className: string }[] = [
  { id: "facebook", name: "Facebook", src: "/figma/auth/logo-facebook.png", className: "left-[21.31%] top-[22.95%] size-[57.38%]" },
  { id: "apple", name: "Apple", src: "/figma/auth/logo-apple.png", className: "left-[21.31%] top-[19.67%] size-[60.66%]" },
  { id: "google", name: "Google", src: "/figma/auth/logo-google.png", className: "left-[22.95%] top-[22.95%] size-[55.74%]" },
];

// Boutons Google et Facebook : Supabase redirige vers le fournisseur, puis vers /auth/callback qui ouvre la session.
// Un nouveau compte est créé automatiquement à la première connexion. Apple n'est pas encore branché.
export function SocialButtons({ action }: { action: "Se connecter" | "S’inscrire" }) {
  const [message, setMessage] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function continuer(fournisseur: (typeof fournisseurs)[number]) {
    if (fournisseur.id === "apple") {
      setMessage("La connexion avec Apple arrive bientôt.");
      return;
    }
    setMessage(null);
    setEnCours(true);
    try {
      // sans cette vérification, un fournisseur non activé renverrait le visiteur sur une page d'erreur brute de Supabase
      if (!(await fournisseurActif(fournisseur.id))) throw new Error("fournisseur désactivé");
      const { error } = await createClient().auth.signInWithOAuth({
        provider: fournisseur.id,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/carte`,
          queryParams: fournisseur.id === "google" ? { prompt: "select_account" } : undefined,
        },
      });
      if (!error) return;
    } catch {}
    setEnCours(false);
    setMessage(`La connexion avec ${fournisseur.name} n’est pas disponible pour le moment.`);
  }

  return (
    <>
      <div
        role="group"
        aria-label="Continuer avec un autre compte"
        className="ml-[clamp(8px,0.625vw,12px)] mr-[clamp(6px,0.469vw,9px)] mt-[clamp(20px,2.083vw,40px)] flex justify-between"
      >
        {fournisseurs.map((fournisseur) => (
          <button
            key={fournisseur.id}
            type="button"
            disabled={enCours}
            aria-label={`${action} avec ${fournisseur.name}`}
            onClick={() => continuer(fournisseur)}
            className="relative size-[clamp(48px,3.177vw,61px)] cursor-pointer rounded-full transition-transform ease-sortie hover:-translate-y-0.5 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel disabled:cursor-wait disabled:opacity-70"
          >
            <span className="absolute inset-[0_-9.84%_-13.11%_-3.28%]">
              <Image src="/figma/auth/pastille-reseau.svg" alt="" width={69} height={69} className="block size-full max-w-none" />
            </span>
            <Image src={fournisseur.src} alt="" width={37} height={37} className={`absolute object-cover ${fournisseur.className}`} />
          </button>
        ))}
      </div>
      <AuthNotice text={message} />
    </>
  );
}
