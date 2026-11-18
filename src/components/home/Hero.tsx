import Image from "next/image";
import Link from "next/link";
import { LancerCarte } from "@/components/home/LancerCarte";
import { rang } from "@/components/ui/rang";

type HeroLinkProps = {
  pastille: string;
  icon: string;
  iconClassName: string;
  title: string;
  lines: string[];
  linkLabel: string;
  href: string;
  className: string;
  i: number;
};

function HeroLink({ pastille, icon, iconClassName, title, lines, linkLabel, href, className, i }: HeroLinkProps) {
  return (
    <div className={`entree ${className}`} style={rang(i)}>
      <div className="flex items-start gap-[clamp(12px,1.67vw,32px)]">
        <span className="relative block size-12 shrink-0 xl:size-[min(3.28vw,63px)]">
          <Image src={pastille} alt="" fill />
          <Image src={icon} alt="" width={42} height={42} className={`absolute ${iconClassName}`} />
        </span>
        <h2 className="pt-[0.18em] font-display text-[30px] leading-none tracking-[0.02em] text-sable xl:text-[min(2.083vw,40px)]">
          {title}
        </h2>
      </div>
      <p className="mt-[clamp(14px,1.2vw,23px)] text-[15px] tracking-[0.02em] text-white xl:text-[min(1.12vw,21.5px)]">
        {lines.map((line, i) => (
          <span key={i} className="xl:block">
            {line}{" "}
          </span>
        ))}
      </p>
      <Link
        href={href}
        className="mt-[clamp(10px,1vw,20px)] inline-block font-ui text-[15px] tracking-[0.02em] text-ciel underline hover:text-[#b5e3ff] xl:text-[min(1.12vw,21.5px)]"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-foret-950 px-5 pb-12 pt-[104px] sm:px-10 xl:aspect-[1920/1070] xl:p-0"
    >
      <Image
        src="/figma/home/hero-motif.svg"
        alt=""
        width={587}
        height={724}
        priority
        className="fondu pointer-events-none absolute left-[69.375%] top-[8.6%] hidden h-[67.66%] w-[30.55%] xl:block"
        style={rang(2)}
      />

      <h1 className="font-display text-[clamp(48px,5.208vw,100px)] tracking-[0.02em] text-sable xl:absolute xl:left-[6.35%] xl:top-[18.04%]">
        {["EXPLOREZ", "LA FAUNE QUI", "VOUS ENTOURE"].map((ligne, i) => (
          <span key={ligne} className="block overflow-hidden">
            <span className="entree-ligne block" style={rang(i)}>
              {ligne}
            </span>
          </span>
        ))}
      </h1>

      <p style={rang(3)} className="entree mt-6 max-w-[34rem] text-base tracking-[0.02em] text-white xl:absolute xl:left-[6.6%] xl:top-[54.58%] xl:mt-0 xl:max-w-none xl:whitespace-nowrap xl:text-[min(1.12vw,21.5px)]">
        Découvrez la faune sauvage française et régionale.
        <br />
        Une expérience immersive autour de la biodiversité.
      </p>

      <LancerCarte
        href="/carte"
        variant="ciel"
        style={rang(5)}
        className="entree-pop mt-8 h-[clamp(48px,2.917vw,56px)] w-[clamp(200px,11.875vw,228px)] text-[clamp(17px,1.146vw,22px)] xl:absolute xl:left-[6.35%] xl:top-[62.9%] xl:mt-0"
      >
        LANCER LA MAP !
      </LancerCarte>

      <div
        style={rang(4)}
        className="entree-animal pointer-events-none absolute left-[31.77%] top-[46.92%] hidden h-[45.42%] w-[25.68%] overflow-hidden xl:block"
      >
        <Image
          src="/figma/home/hero-singe-gauche.png"
          alt=""
          width={1149}
          height={1369}
          sizes="26vw"
          style={rang(0, { "--duree": "4.4s" })}
          className="respire absolute left-0 top-[-0.04%] h-[120.86%] w-full max-w-none"
        />
      </div>
      <div
        style={rang(2)}
        className="entree-animal pointer-events-none relative mx-auto mt-10 aspect-[561/716] w-2/3 max-w-sm overflow-hidden xl:absolute xl:left-[51.82%] xl:top-[21.31%] xl:mt-0 xl:h-[66.92%] xl:w-[29.22%] xl:max-w-none">
        <Image
          src="/figma/home/hero-singe-centre.png"
          alt="Singe-écureuil assis"
          width={1174}
          height={1340}
          sizes="(min-width: 1280px) 30vw, 66vw"
          priority
          style={rang(0, { "--duree": "5.2s" })}
          className="respire absolute left-[-32.44%] top-[-17.04%] h-[134.23%] w-[150.09%] max-w-none"
        />
      </div>
      <div
        style={rang(6)}
        className="entree-animal pointer-events-none absolute left-[73.18%] top-[42.24%] hidden h-[45.05%] w-[37.66%] xl:block"
      >
        <Image
          src="/figma/home/hero-singe-droite.png"
          alt=""
          fill
          sizes="38vw"
          style={rang(0, { "--duree": "4.8s" })}
          className="respire object-cover"
        />
      </div>

      <div className="pointer-events-none absolute left-0 top-[71.03%] hidden h-[29.02%] w-full xl:block">
        <Image
          src="/figma/home/hero-colline.webp"
          unoptimized
          alt=""
          width={1928}
          height={319}
          className="absolute inset-x-[-0.21%] bottom-0 top-[-2.58%] h-[102.58%] w-[100.42%] max-w-none"
        />
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:contents">
        <HeroLink
          className="xl:absolute xl:left-[54.79%] xl:top-[80.28%] xl:w-[14%]"
          pastille="/figma/home/pastille-faq.svg"
          icon="/figma/home/icone-faq.svg"
          iconClassName="left-[19%] top-[19%] size-[62%]"
          title="F.A.Q"
          lines={["Des questions autour", "de la biodiversité", "autour de chez vous ?"]}
          linkLabel="Se renseigner !"
          href="/#wildmap-c-est-quoi"
          i={7}
        />
        <HeroLink
          className="xl:absolute xl:left-[70.83%] xl:top-[80.28%] xl:w-[21%]"
          pastille="/figma/home/pastille-communaute.svg"
          icon="/figma/home/icone-communaute.svg"
          iconClassName="left-[16%] top-[17%] size-[66.7%]"
          title="Communauté"
          lines={["Rejoignez notre communauté engagée", "et apprenez en d’avantage autour", "de la biodiversité sauvage et locale ..."]}
          linkLabel="Rejoindre !"
          href="/inscription"
          i={8}
        />
      </div>
    </section>
  );
}
