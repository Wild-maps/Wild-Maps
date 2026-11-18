"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthNotice, Separator, primaryButton, secondaryButton, subtitle } from "./AuthCard";
import { TextField } from "./TextField";
import { useAuthForm } from "./useAuthForm";

const BIENTOT = "La connexion arrive bientôt : WildMap est encore en construction.";

const rules = {
  email: {
    missing: "Indiquez votre adresse email.",
    invalid: "Cette adresse email n’est pas valide (ex : email@email.com).",
  },
  password: { missing: "Indiquez votre mot de passe." },
};

const socials = [
  { name: "Facebook", src: "/figma/auth/logo-facebook.png", className: "left-[21.31%] top-[22.95%] size-[57.38%]" },
  { name: "Apple", src: "/figma/auth/logo-apple.png", className: "left-[21.31%] top-[19.67%] size-[60.66%]" },
  { name: "Google", src: "/figma/auth/logo-google.png", className: "left-[22.95%] top-[22.95%] size-[55.74%]" },
];

export function LoginForm() {
  const { errors, notice, setNotice, isPending, formProps } = useAuthForm(rules, BIENTOT);

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

      <div
        role="group"
        aria-label="Se connecter avec un autre compte"
        className="ml-[clamp(8px,0.625vw,12px)] mr-[clamp(6px,0.469vw,9px)] mt-[clamp(20px,2.083vw,40px)] flex justify-between"
      >
        {socials.map((social) => (
          <button
            key={social.name}
            type="button"
            aria-label={`Se connecter avec ${social.name}`}
            onClick={() => setNotice({ zone: "social", text: BIENTOT })}
            className="relative size-[clamp(48px,3.177vw,61px)] cursor-pointer rounded-full transition-transform ease-sortie hover:-translate-y-0.5 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel"
          >
            <span className="absolute inset-[0_-9.84%_-13.11%_-3.28%]">
              <Image src="/figma/auth/pastille-reseau.svg" alt="" width={69} height={69} className="block size-full max-w-none" />
            </span>
            <Image src={social.src} alt="" width={37} height={37} className={`absolute object-cover ${social.className}`} />
          </button>
        ))}
      </div>
      <AuthNotice text={notice?.zone === "social" ? notice.text : null} />
    </div>
  );
}
