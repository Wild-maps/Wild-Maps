"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Fournisseur = "google" | "facebook" | "apple" | "email";

export type Compte = {
  nom: string;
  prenom: string;
  email: string;
  avatar: string | null;
  fournisseur: Fournisseur;
  depuis: string;
};

export type EtatCompte = { etat: "inconnu" } | { etat: "deconnecte" } | { etat: "connecte"; compte: Compte };

const configure = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

function texte(valeur: unknown) {
  return typeof valeur === "string" && valeur.trim() ? valeur.trim() : null;
}

function lireCompte(user: User): Compte {
  const meta = user.user_metadata ?? {};
  const email = user.email ?? "";
  const masque = email.endsWith("@privaterelay.appleid.com");
  const nom = texte(meta.full_name) ?? texte(meta.name) ?? (email && !masque ? email.split("@")[0] : "Explorateur");
  const recent = [...(user.identities ?? [])].sort(
    (a, b) => (b.last_sign_in_at ? Date.parse(b.last_sign_in_at) : 0) - (a.last_sign_in_at ? Date.parse(a.last_sign_in_at) : 0),
  )[0];
  const brut = recent?.provider ?? user.app_metadata?.provider;
  return {
    nom,
    prenom: nom.split(/\s+/)[0],
    email,
    avatar: texte(meta.avatar_url) ?? texte(meta.picture),
    fournisseur: brut === "google" || brut === "facebook" || brut === "apple" ? brut : "email",
    depuis: user.created_at,
  };
}

export function useCompte(): EtatCompte {
  const [etat, setEtat] = useState<EtatCompte>(() => (configure ? { etat: "inconnu" } : { etat: "deconnecte" }));

  useEffect(() => {
    if (!configure) return;
    const { data } = createClient().auth.onAuthStateChange((_, session) => {
      setEtat(session?.user ? { etat: "connecte", compte: lireCompte(session.user) } : { etat: "deconnecte" });
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return etat;
}
