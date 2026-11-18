import Image from "next/image";
import Link from "next/link";
import { BoutonCompte } from "@/components/compte/BoutonCompte";
import { PillButton } from "@/components/ui/PillButton";

const navLinks = [
  { href: "/carte", label: "MAP !" },
  { href: "/#wildmap-c-est-quoi", label: "WILD MAP c’est quoi ?" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/equipe", label: "La Team" },
];

const buttonSize = "h-[clamp(38px,2.6vw,50px)] px-[clamp(10px,0.75vw,14px)] text-[clamp(15px,1.146vw,22px)]";

export function TopBar({ current }: { current?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[clamp(64px,5.36vw,103px)] backdrop-blur-[5px]">
      <Image src="/figma/ui/topbar-bg.png" alt="" fill priority className="-z-10 object-cover" />
      <div className="flex h-full items-center justify-between pl-[clamp(12px,1.1vw,21px)] pr-[clamp(12px,2.4vw,46px)]">
        <Link href="/" className="marque-tete flex items-center gap-[clamp(8px,1vw,19px)]" aria-label="WildMap, accueil">
          <Image
            src="/figma/ui/logo-wildmap.png"
            alt=""
            width={88}
            height={79}
            className="h-auto w-[clamp(48px,4.58vw,88px)]"
            priority
          />
          <span className="font-display text-[clamp(26px,1.98vw,38px)] tracking-[0.02em] text-creme">Wild Map</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-[clamp(12px,2.55vw,49px)] lg:flex">
          {navLinks.map((link) => (
            <PillButton
              key={link.href}
              href={link.href}
              aria-current={link.href === current ? "page" : undefined}
              className={buttonSize}
            >
              {link.label}
            </PillButton>
          ))}
          <BoutonCompte className={`${buttonSize} min-w-[clamp(140px,9.83vw,189px)]`} />
        </nav>

        <Image
          src="/figma/ui/socials.svg"
          alt="Instagram, TikTok et Facebook"
          width={304}
          height={71}
          className="hidden h-auto w-[clamp(180px,15.5vw,298px)] xl:block"
        />

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-[10px] border-[4.5px] border-foret-900 bg-foret-700 px-3 py-1.5 font-ui text-lg text-creme [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Fermer</span>
          </summary>
          <nav
            aria-label="Navigation principale"
            className="absolute right-0 mt-3 flex w-64 flex-col gap-3 rounded-[14px] bg-foret-950/95 p-4 shadow-lg"
          >
            {navLinks.map((link) => (
              <PillButton
                key={link.href}
                href={link.href}
                aria-current={link.href === current ? "page" : undefined}
                className="h-11 text-lg"
              >
                {link.label}
              </PillButton>
            ))}
            <BoutonCompte className="h-11 text-lg" />
          </nav>
        </details>
      </div>
    </header>
  );
}
