import { Gasoek_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Houle } from "@/components/layout/Houle";
import { PillButton } from "@/components/ui/PillButton";

const gasoekOne = Gasoek_One({ weight: "400", subsets: ["latin"] });

const menu = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "Map" },
  { href: "/#wildmap-c-est-quoi", label: "WILDMAP c’est quoi?" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/equipe", label: "La team" },
  { href: "/connexion", label: "Connexion" },
];

const motifs = [
  { haut: -487, cote: "left-[-3.229%]" },
  { haut: 98, cote: "left-[-3.229%]" },
  { haut: 683, cote: "left-[-3.229%]" },
  { haut: -432, cote: "left-[96.877%] rotate-180" },
  { haut: 153, cote: "left-[96.877%] rotate-180" },
  { haut: 738, cote: "left-[96.877%] rotate-180" },
];

const legal = [{ label: "Mentions légales" }, { label: "Confidentialité", href: "/confidentialite" }, { label: "CGU" }];

const titreColonne = "font-ui text-[clamp(20px,1.354vw,26px)] text-creme";
const liste = "mt-[clamp(12px,1.146vw,22px)] flex flex-col items-start gap-[clamp(8px,0.677vw,13px)] text-[clamp(14px,0.885vw,17px)]";
const bouton =
  "inline-flex items-center rounded-[10px] border-[3px] border-solid border-foret-900 bg-foret-700/85 px-[clamp(10px,0.73vw,14px)] py-[clamp(5px,0.39vw,7.5px)] font-ui leading-tight tracking-[0.02em] text-creme shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]";
const lien = `${bouton} transition-[background-color,translate,scale] duration-150 ease-sortie hover:bg-[#3d7666] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel`;

export function Footer() {
  return (
    <footer className="relative overflow-clip bg-[#172723] text-sable lg:bg-transparent">
      {motifs.map(({ haut, cote }) => (
        <Image
          key={haut}
          src="/figma/ui/motif-traces.svg"
          alt=""
          width={123}
          height={585}
          style={{ top: `${(haut / 1920) * 100}vw` }}
          className={`pointer-events-none absolute hidden h-auto w-[6.417%] lg:block ${cote}`}
        />
      ))}

      <Houle />
      <Image
        src="/figma/ui/footer/ocelot.png"
        alt=""
        width={438}
        height={635}
        sizes="23vw"
        className="apparait pointer-events-none absolute bottom-[-0.718vw] right-[0.9375%] hidden aspect-[438/635] h-auto w-[22.8125%] lg:block"
      />

      <div className="relative px-5 pb-6 pt-12 lg:ml-[4.0104%] lg:w-[70.104%] lg:px-0 lg:pb-[clamp(12px,1.075vw,20.64px)] lg:pt-[clamp(40px,4.219vw,81px)]">
        <div className="flex items-start gap-[clamp(16px,1.6vw,30.73px)]">
          <Image
            src="/figma/ui/logo-wildmap.png"
            alt=""
            width={106}
            height={95}
            className="mt-[clamp(4px,0.365vw,7px)] h-auto w-[clamp(64px,5.535vw,106.27px)] shrink-0"
          />
          <div>
            <p className={`${gasoekOne.className} text-[clamp(24px,1.5625vw,30px)] tracking-[0.02em] text-creme`}>
              WildMap
            </p>
            <p className="mt-[clamp(6px,0.666vw,12.78px)] text-[clamp(14px,0.833vw,16px)]">
              <span className="lg:block">Découvrez la faune sauvage française et régionale.</span>{" "}
              <span className="lg:block">Une expérience immersive autour de la biodiversité.</span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-[clamp(32px,3.05vw,58.56px)] lg:grid-cols-[35.14%_34.175%_1fr] lg:gap-0">
          <nav aria-label="Pied de page">
            <h2 className={titreColonne}>Menu</h2>
            <ul className={liste}>
              {menu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={lien}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={titreColonne}>Contact</h2>
            <ul className={liste}>
              <li>
                <a href="mailto:contact@wildmap.fr" className={lien}>
                  contact@wildmap.fr
                </a>
              </li>
              {legal.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <Link href={l.href} className={lien}>
                      {l.label}
                    </Link>
                  ) : (
                    <span title="Bientôt disponible" className={`${bouton} cursor-default opacity-60`}>
                      {l.label}
                      <span className="sr-only">, bientôt disponible</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={titreColonne}>Réseaux</h2>
            <Image
              src="/figma/ui/footer/reseaux.svg"
              alt="Instagram, TikTok et Facebook"
              width={68}
              height={260}
              className="ml-[clamp(-2px,-0.104vw,-1px)] mt-[clamp(16px,1.5625vw,30px)] h-auto w-[clamp(52px,3.542vw,68px)]"
            />
          </div>
        </div>

        <div className="relative mt-[clamp(24px,2.167vw,41.6px)]">
          <PillButton
            href="#top"
            aria-label="Revenir en haut de la page"
            className="absolute bottom-[calc(100%+clamp(12px,1.28vw,24.57px))] right-0 h-[clamp(40px,2.552vw,49px)] w-[clamp(44px,2.8125vw,54px)]"
          >
            <Image src="/figma/ui/footer/fleche.svg" alt="" width={36} height={36} className="size-[clamp(28px,1.875vw,36px)] rotate-90" />
          </PillButton>
          <Image
            src="/figma/ui/footer/trait-oiseau.svg"
            alt=""
            width={1354}
            height={10.5}
            className="-mx-[0.3%] h-auto w-[100.6%] max-w-none"
          />
        </div>

        <div className="mt-[clamp(10px,0.872vw,16.75px)] flex flex-col gap-2 text-[clamp(13px,0.78125vw,15px)] sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6">
          <p>© 2026 WildMap — Projet étudiant Aix Ynov Campus. Tous droits réservés.</p>
          <p>Mentions légales / Confidentialité / CGU</p>
          <p>v.1.0.0 Hébergé en France</p>
        </div>
      </div>
    </footer>
  );
}
