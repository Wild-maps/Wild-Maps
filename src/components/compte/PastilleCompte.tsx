"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar } from "./Avatar";
import { useCompte } from "./useCompte";

const pastille =
  "relative block size-[clamp(44px,3.125vw,60px)] shrink-0 rounded-full transition-transform ease-sortie hover:scale-105 active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel motion-reduce:transition-none";

export function PastilleCompte() {
  const compte = useCompte();

  if (compte.etat !== "connecte") {
    return <span aria-hidden className={`${pastille} ${compte.etat === "inconnu" ? "invisible" : "hidden"}`} />;
  }

  return (
    <Link href="/profil" aria-label={`Mon profil, connecté en tant que ${compte.compte.nom}`} className={pastille}>
      <Image src="/figma/map/pastille-filtre.svg" alt="" width={68} height={68} className="absolute -left-[3.33%] top-0 h-[113.33%] w-[113.33%] max-w-none" />
      <span className="absolute left-[11.67%] top-[11.67%] flex size-[76.67%] items-center justify-center">
        <Avatar compte={compte.compte} className="size-full text-[clamp(22px,1.563vw,30px)]" />
      </span>
    </Link>
  );
}
