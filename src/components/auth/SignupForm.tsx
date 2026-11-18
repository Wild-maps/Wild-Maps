"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthNotice, Separator, primaryButton, secondaryButton, subtitle } from "./AuthCard";
import { COMPTE_EXISTANT, messageInscription } from "./messages";
import { SocialButtons } from "./SocialButtons";
import { TextField } from "./TextField";
import { useAuthForm } from "./useAuthForm";

const rules = {
  name: { missing: "Indiquez votre nom complet." },
  email: {
    missing: "Indiquez votre adresse email.",
    invalid: "Cette adresse email n’est pas valide (ex : email@email.com).",
  },
  password: { missing: "Choisissez un mot de passe.", invalid: "Le mot de passe doit contenir au moins 8 caractères." },
  cgu: { missing: "Acceptez les Conditions Générales pour créer votre compte." },
};

export function SignupForm() {
  const router = useRouter();
  const { errors, notice, setNotice, isPending, formProps } = useAuthForm(rules, async (valeurs) => {
    const email = String(valeurs.get("email")).trim();
    const { data, error } = await createClient().auth.signUp({
      email,
      password: String(valeurs.get("password")),
      options: {
        data: { full_name: String(valeurs.get("name")).trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/carte`,
      },
    });
    if (error) return messageInscription(error);
    // Supabase ne signale pas une adresse déjà inscrite par une erreur : le compte renvoyé n'a simplement aucune identité
    if (data.user?.identities?.length === 0) return COMPTE_EXISTANT;
    if (data.session) {
      router.push("/carte");
      router.refresh();
      return "Compte créé, bienvenue sur WildMap !";
    }
    return `Compte créé ! Un email de confirmation vient d’être envoyé à ${email}. Cliquez sur le lien qu’il contient pour activer votre compte.`;
  });

  return (
    <div className="pb-[clamp(28px,2.656vw,51px)]">
      <form {...formProps} className="mt-[clamp(18px,1.875vw,36px)]">
        <TextField
          id="name"
          name="name"
          label="Nom complet"
          icon="utilisateur"
          placeholder="Ex : MarcDupont"
          autoComplete="name"
          required
          error={errors.name}
        />
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
          className="mt-[clamp(18px,1.51vw,29px)]"
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Mot de passe"
          icon="cle"
          placeholder="Ex : Mdp$123"
          autoComplete="new-password"
          minLength={8}
          required
          error={errors.password}
          className="mt-[clamp(18px,1.51vw,29px)]"
        />

        <div className="mt-[clamp(12px,0.885vw,17px)] flex items-center gap-[clamp(10px,0.656vw,12.6px)] pl-[clamp(4px,0.357vw,6.85px)]">
          <span className="relative h-[clamp(26px,1.702vw,32.7px)] w-[clamp(24px,1.578vw,30.3px)] shrink-0">
            <input
              id="cgu"
              name="cgu"
              type="checkbox"
              required
              aria-labelledby="cgu-libelle cgu-lien"
              aria-invalid={errors.cgu ? true : undefined}
              aria-describedby={errors.cgu ? "cgu-erreur" : undefined}
              className="peer block size-full cursor-pointer appearance-none rounded-[5px] border-3 border-solid border-foret-900 bg-foret-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel aria-invalid:border-[#ffb4a2]"
            />
            <span className="pointer-events-none absolute left-[15.35%] top-[-8.35%] hidden h-[74.97%] w-[82.54%] peer-checked:block">
              <span className="absolute inset-[0_-1.83%_-11.01%_-3.55%]">
                <Image src="/figma/auth/coche.svg" alt="" width={26} height={27} className="block size-full max-w-none" />
              </span>
            </span>
          </span>
          <p className="text-[clamp(14px,0.755vw,14.5px)] tracking-[0.02em] text-white">
            <label id="cgu-libelle" htmlFor="cgu" className="cursor-pointer">
              J’accepte les
            </label>{" "}
            <button
              id="cgu-lien"
              type="button"
              onClick={() =>
                setNotice({
                  zone: "form",
                  text: "Les Conditions Générales arrivent bientôt : WildMap est encore en construction.",
                })
              }
              className="cursor-pointer text-ciel underline hover:text-[#b5e3ff] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel"
            >
              Conditions Générales
            </button>
          </p>
        </div>
        {errors.cgu && (
          <p id="cgu-erreur" className="mt-1.5 text-[clamp(14px,0.807vw,15.5px)] text-[#ffb4a2]">
            {errors.cgu}
          </p>
        )}

        <button type="submit" disabled={isPending} className={`${primaryButton} mt-[clamp(24px,3.021vw,58px)]`}>
          S’enregistrer
        </button>
        <AuthNotice text={notice?.zone === "form" ? notice.text : null} />
      </form>

      <Separator className="mt-[clamp(20px,2.188vw,42px)]" />
      <h2 className={`${subtitle} mt-[clamp(20px,1.823vw,35px)]`}>Déjà un compte ?</h2>
      <Link href="/connexion" className={`${secondaryButton} mt-[clamp(16px,1.615vw,31px)]`}>
        Se connecter
      </Link>
      <Separator className="mt-[clamp(20px,2.188vw,42px)]" />
      <SocialButtons action="S’inscrire" />
    </div>
  );
}
