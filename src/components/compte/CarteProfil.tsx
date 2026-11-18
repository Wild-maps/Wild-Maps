"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthNotice, Separator, primaryButton, secondaryButton, subtitle } from "@/components/auth/AuthCard";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "./Avatar";
import { useCompte, type Fournisseur } from "./useCompte";

const services: Record<Fournisseur, { nom: string; logo: string | null; className: string }> = {
  google: { nom: "Google", logo: "/figma/auth/logo-google.png", className: "left-[22.95%] top-[22.95%] size-[55.74%]" },
  facebook: { nom: "Facebook", logo: "/figma/auth/logo-facebook.png", className: "left-[21.31%] top-[22.95%] size-[57.38%]" },
  apple: { nom: "Apple", logo: "/figma/auth/logo-apple.png", className: "left-[21.31%] top-[19.67%] size-[60.66%]" },
  email: { nom: "e-mail et mot de passe", logo: null, className: "" },
};

const dateLongue = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const ligne = "flex items-center justify-between gap-4 text-[clamp(15px,0.885vw,17px)]";
const libelle = "font-ui text-sable";
const valeur = "text-right text-white";

type Sortie = { vers: "/" | "/connexion"; libelle: string };

export function CarteProfil() {
  const compte = useCompte();
  const router = useRouter();
  const [sortie, setSortie] = useState<Sortie | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function sortir(choix: Sortie) {
    setMessage(null);
    setSortie(choix);
    const { error } = await createClient().auth.signOut({ scope: "local" });
    if (error) {
      setSortie(null);
      setMessage("La déconnexion n’a pas abouti. Réessayez dans un instant.");
      return;
    }
    router.replace(choix.vers);
    router.refresh();
  }

  if (sortie) {
    return (
      <p role="status" className={`${subtitle} pb-[clamp(48px,4.167vw,80px)] pt-[clamp(24px,2.083vw,40px)]`}>
        {sortie.libelle}
      </p>
    );
  }

  if (compte.etat === "inconnu") {
    return (
      <div aria-busy className="pb-[clamp(28px,2.083vw,40px)]">
        <div className="mt-[clamp(16px,1.51vw,29px)] flex items-center gap-4">
          <span className="size-[clamp(72px,5vw,96px)] shrink-0 rounded-full bg-foret-700" />
          <span className="flex flex-1 flex-col gap-2">
            <span className="h-5 w-2/3 rounded-full bg-foret-700" />
            <span className="h-4 w-1/2 rounded-full bg-foret-700/70" />
          </span>
        </div>
        <span className="sr-only">Chargement de votre compte…</span>
      </div>
    );
  }

  if (compte.etat === "deconnecte") {
    return (
      <div className="pb-[clamp(28px,2.083vw,40px)]">
        <p className="mt-[clamp(16px,1.51vw,29px)] text-center text-[clamp(15px,0.885vw,17px)] text-white">Vous n’êtes pas connecté.</p>
        <Link href="/connexion" className={`${primaryButton} mt-[clamp(20px,1.823vw,35px)]`}>
          Se connecter
        </Link>
      </div>
    );
  }

  const { compte: c } = compte;
  const service = services[c.fournisseur];

  return (
    <div className="pb-[clamp(28px,2.083vw,40px)]">
      <div className="mt-[clamp(16px,1.51vw,29px)] flex items-center gap-[clamp(14px,1.042vw,20px)]">
        <span className="rounded-full border-[4.5px] border-sable shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <Avatar compte={c} className="size-[clamp(72px,5vw,96px)] text-[clamp(36px,2.604vw,50px)]" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-ui text-[clamp(22px,1.458vw,28px)] tracking-[0.02em] text-creme">{c.nom}</p>
          {c.email && <p className="truncate text-[clamp(15px,0.885vw,17px)] text-white/80">{c.email}</p>}
        </div>
      </div>

      <div className="mt-[clamp(20px,1.823vw,35px)] flex flex-col gap-3 rounded-[20px] bg-foret-700 px-5 py-4 shadow-[4px_8px_4px_0px_rgba(0,0,0,0.15)]">
        <p className={ligne}>
          <span className={libelle}>Connecté avec</span>
          <span className={`${valeur} flex items-center gap-2`}>
            {service.logo && (
              <span className="relative size-7 shrink-0 rounded-full bg-creme">
                <Image src={service.logo} alt="" width={37} height={37} className={`absolute object-cover ${service.className}`} />
              </span>
            )}
            {service.nom}
          </span>
        </p>
        <p className={ligne}>
          <span className={libelle}>Membre depuis le</span>
          <span className={valeur}>{dateLongue.format(new Date(c.depuis))}</span>
        </p>
      </div>

      <Link href="/carte" className={`${primaryButton} mt-[clamp(24px,2.396vw,46px)]`}>
        Lancer la map !
      </Link>

      <Separator className="mt-[clamp(20px,1.823vw,35px)]" />
      <h2 className={`${subtitle} mt-[clamp(16px,1.458vw,28px)]`}>Pas vous ?</h2>
      <button
        type="button"
        onClick={() => sortir({ vers: "/connexion", libelle: "On change de compte…" })}
        className={`${secondaryButton} mt-[clamp(14px,1.354vw,26px)]`}
      >
        Changer de compte
      </button>
      <button
        type="button"
        onClick={() => sortir({ vers: "/", libelle: "À bientôt sur Wild Map !" })}
        className={`${secondaryButton} mt-3`}
      >
        Se déconnecter
      </button>
      <AuthNotice text={message} />
    </div>
  );
}
