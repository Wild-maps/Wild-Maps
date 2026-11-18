"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthNotice, Separator, primaryButton, secondaryButton, subtitle } from "./AuthCard";
import { messageConnexion } from "./messages";
import { SocialButtons } from "./SocialButtons";
import { TextField } from "./TextField";
import { useAuthForm } from "./useAuthForm";

const rules = {
  email: {
    missing: "Indiquez votre adresse email.",
    invalid: "Cette adresse email n’est pas valide (ex : email@email.com).",
  },
  password: { missing: "Indiquez votre mot de passe." },
};

// Message affiché quand le retour de Google, Facebook ou du lien email a échoué (/connexion?erreur=connexion)
function ErreurDeRetour() {
  const echec = useSearchParams().get("erreur") === "connexion";
  return <AuthNotice text={echec ? "La connexion a échoué. Réessayez ou utilisez une autre méthode." : null} />;
}

export function LoginForm() {
  const router = useRouter();
  const { errors, notice, setNotice, isPending, formProps } = useAuthForm(rules, async (valeurs) => {
    const { error } = await createClient().auth.signInWithPassword({
      email: String(valeurs.get("email")).trim(),
      password: String(valeurs.get("password")),
    });
    if (error) return messageConnexion(error);
    router.push("/carte");
    router.refresh();
    return "Connexion réussie, redirection en cours…";
  });

  return (
    <div className="pb-[clamp(28px,2.083vw,40px)]">
      <form {...formProps} className="mt-[clamp(16px,1.51vw,29px)]">
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          icon="email"
          placeholder="Ex : email@email.com"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Mot de passe"
          icon="cle"
          placeholder="Ex : Mdp$123"
          autoComplete="current-password"
          required
          error={errors.password}
          className="mt-[clamp(18px,1.51vw,29px)]"
        />
        <div className="mt-[clamp(12px,1.198vw,23px)] text-right">
          <button
            type="button"
            onClick={() =>
              setNotice({
                zone: "form",
                text: "La réinitialisation du mot de passe arrive bientôt : WildMap est encore en construction.",
              })
            }
            className="cursor-pointer text-[clamp(14px,0.755vw,14.5px)] tracking-[0.02em] text-ciel underline hover:text-[#b5e3ff] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel"
          >
            Mot de passe oublié ?
          </button>
        </div>
        <button type="submit" disabled={isPending} className={`${primaryButton} mt-[clamp(24px,3.073vw,59px)]`}>
          Se connecter
        </button>
        <AuthNotice text={notice?.zone === "form" ? notice.text : null} />
      </form>

      <Separator className="mt-[clamp(20px,1.823vw,35px)]" />
      <h2 className={`${subtitle} mt-[clamp(20px,1.875vw,36px)]`}>Aucun compte ?</h2>
      <Link href="/inscription" className={`${secondaryButton} mt-[clamp(16px,1.771vw,34px)]`}>
        Créer un compte
      </Link>
      <Separator className="mt-[clamp(20px,1.979vw,38px)]" />

      <SocialButtons action="Se connecter" />
      <Suspense fallback={null}>
        <ErreurDeRetour />
      </Suspense>
    </div>
  );
}
