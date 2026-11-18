"use client";

import Image from "next/image";
import { useState } from "react";
import type { Compte } from "./useCompte";

export function Avatar({ compte, className = "" }: { compte: Compte; className?: string }) {
  const [rate, setRate] = useState<string | null>(null);

  if (compte.avatar && rate !== compte.avatar) {
    return (
      <Image
        src={compte.avatar}
        alt=""
        width={160}
        height={160}
        unoptimized
        referrerPolicy="no-referrer"
        onError={() => setRate(compte.avatar)}
        className={`shrink-0 rounded-full bg-sable object-cover ${className}`}
      />
    );
  }

  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-sable font-display leading-none text-ecorce ${className}`}>
      {compte.prenom.charAt(0).toUpperCase()}
    </span>
  );
}
