import Image from "next/image";
import type { ReactNode } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { rang } from "@/components/ui/rang";
import { AuthCard } from "./AuthCard";

type Variant = "connexion" | "inscription";

const decors: Record<Variant, { behind: ReactNode; front: ReactNode }> = {
  connexion: {
    behind: (
      <>
        <div className="fondu pointer-events-none absolute left-0 top-[1.354vw] hidden h-[50.719vw] w-[38.229vw] -scale-x-100 lg:block">
          <Image src="/figma/auth/motif-taches.svg" alt="" width={734} height={974} loading="eager" className="block size-full max-w-none" />
        </div>
        <div style={rang(4)} className="entree-animal pointer-events-none absolute bottom-[-7.306vw] left-[24.783vw] hidden h-[33.656vw] w-[33.974vw] items-center justify-center lg:flex">
          <div className="relative h-[84.37%] w-[84.79%] shrink-0 -scale-y-100 rotate-[168.28deg] overflow-hidden">
            <Image
              src="/figma/home/hero-singe-gauche.png"
              alt=""
              width={1149}
              height={1369}
              sizes="29vw"
              className="absolute left-0 top-[-0.04%] h-[120.86%] w-full max-w-none"
            />
          </div>
        </div>
      </>
    ),
    front: (
      <Image
        src="/figma/auth/heron.png"
        alt=""
        width={1306}
        height={1205}
        sizes="32vw"
        style={rang(2)}
        className="entree-animal pointer-events-none absolute bottom-0 left-0 hidden h-[29.323vw] w-[31.823vw] object-cover lg:block"
      />
    ),
  },
  inscription: {
    behind: (
      <>
        <div className="fondu pointer-events-none absolute left-[-0.052vw] top-[1.458vw] hidden h-[50.516vw] w-[38.229vw] -scale-x-100 lg:block">
          <Image src="/figma/auth/motif-taches-inscription.svg" alt="" width={734} height={970} loading="eager" className="block size-full max-w-none" />
        </div>
        <div style={rang(4)} className="entree-animal pointer-events-none absolute bottom-[1.354vw] left-[26.875vw] hidden h-[23.229vw] w-[17.24vw] overflow-hidden lg:block">
          <Image
            src="/figma/auth/murene-gauche.png"
            alt=""
            width={1024}
            height={1536}
            sizes="21vw"
            className="absolute left-[-21%] top-[-17.26%] h-[134.52%] w-[121%] max-w-none"
          />
        </div>
      </>
    ),
    front: (
      <>
        <div style={rang(2)} className="entree-animal pointer-events-none absolute bottom-[-2.76vw] left-[3.49vw] hidden h-[29.74vw] w-[23.281vw] overflow-hidden lg:block">
          <Image
            src="/figma/home/hero-singe-centre.png"
            alt=""
            width={1174}
            height={1340}
            sizes="35vw"
            className="absolute left-[-32.44%] top-[-17.04%] h-[134.23%] w-[150.09%] max-w-none"
          />
        </div>
        <div style={rang(6)} className="entree-animal pointer-events-none absolute bottom-[-5.804vw] left-[42.24vw] hidden h-[19.138vw] w-[17.342vw] items-center justify-center lg:flex">
          <div className="relative h-[82.98%] w-[75.49%] shrink-0 -scale-y-100 rotate-[162.08deg] overflow-hidden">
            <Image
              src="/figma/auth/murene-droite.png"
              alt=""
              width={1023}
              height={1537}
              sizes="18vw"
              className="absolute left-[-31.17%] top-[-20.42%] h-[162.48%] w-[131.17%] max-w-none"
            />
          </div>
        </div>
      </>
    ),
  },
};

type AuthSceneProps = {
  variant: Variant;
  tagline: [string, string];
  title: string;
  children: ReactNode;
};

export function AuthScene({ variant, tagline, title, children }: AuthSceneProps) {
  const { behind, front } = decors[variant];

  return (
    <main className="relative flex-1 overflow-hidden bg-foret-950 px-4 pb-12 pt-6 sm:px-8 lg:min-h-[52.083vw] lg:p-0">
      {behind}

      <div className="pointer-events-none absolute bottom-[-11.51vw] left-0 hidden h-[16.302vw] w-[101.771vw] -scale-x-100 lg:block">
        <span className="absolute inset-[-2.56%_-0.2%_0_-0.2%]">
          <Image src="/figma/auth/colline.webp" alt="" width={1962} height={321} unoptimized className="block size-full max-w-none" />
        </span>
      </div>

      {front}

      <div className="relative mx-auto max-w-[34rem] lg:contents">
        <PillButton
          href="/"
          aria-label="Retour à l’accueil"
          className="entree h-[clamp(44px,2.552vw,49px)] w-[clamp(50px,2.865vw,55px)] lg:absolute lg:left-[4.375vw] lg:top-[3.958vw]"
        >
          <Image src="/figma/auth/fleche-retour.svg" alt="" width={36} height={36} className="size-[clamp(28px,1.875vw,36px)]" />
        </PillButton>

        <p className="mt-6 font-display text-[clamp(40px,5.208vw,100px)] tracking-[0.02em] text-sable lg:absolute lg:left-[4.375vw] lg:top-[8.906vw] lg:mt-0">
          {tagline.map((ligne, i) => (
            <span key={ligne} className="block overflow-hidden">
              <span className="entree-ligne block" style={rang(i + 1)}>
                {ligne}
              </span>
            </span>
          ))}
        </p>

        <AuthCard title={title}>{children}</AuthCard>
      </div>
    </main>
  );
}
