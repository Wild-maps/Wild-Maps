"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type KeyboardEvent } from "react";
import { indexRecherche, type Suggestion } from "@/data/regions";

const PLACEHOLDER = "Rechercher une région, un animal ou encore une association";

const TYPES: Record<Suggestion["type"], string> = {
  region: "Région",
  animal: "Animal",
  association: "Association",
  habitat: "Habitat",
};

const normaliser = (texte: string) =>
  texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’'\-–—,.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const entrees = indexRecherche.map((s) => ({ s, cle: normaliser(s.libelle) }));

function chercher(requete: string): Suggestion[] {
  const q = normaliser(requete);
  if (!q) return [];
  return entrees
    .map(({ s, cle }) => ({ s, rang: cle.startsWith(q) ? 0 : cle.split(" ").some((mot) => mot.startsWith(q)) ? 1 : cle.includes(q) ? 2 : 3 }))
    .filter((r) => r.rang < 3)
    .sort((a, b) => a.rang - b.rang)
    .slice(0, 8)
    .map((r) => r.s);
}

type RechercheProps = {
  libelleSurvol?: string | null;
  onSuggestion?: (s: Suggestion) => boolean;
  onBientot: (nom: string) => void;
};

export function Recherche({ libelleSurvol, onSuggestion, onBientot }: RechercheProps) {
  const router = useRouter();
  const id = useId();
  const [requete, setRequete] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(0);
  const resultats = useMemo(() => chercher(requete), [requete]);
  const listeVisible = ouvert && requete.trim() !== "";

  function choisir(s: Suggestion) {
    setRequete("");
    setOuvert(false);
    if (onSuggestion?.(s)) return;
    if (s.href) router.push(s.href);
    else onBientot(s.libelle);
  }

  function auClavier(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!resultats.length) return;
      setOuvert(true);
      const pas = e.key === "ArrowDown" ? 1 : -1;
      setActif((i) => (i + pas + resultats.length) % resultats.length);
    } else if (e.key === "Enter") {
      const s = resultats[actif] ?? resultats[0];
      if (listeVisible && s) {
        e.preventDefault();
        choisir(s);
      }
    } else if (e.key === "Escape" && (ouvert || requete)) {
      e.preventDefault();
      if (ouvert) setOuvert(false);
      else setRequete("");
    }
  }

  return (
    <div className="relative min-w-0 flex-1 lg:absolute lg:left-[29.583%] lg:top-1/2 lg:w-[39.531%] lg:flex-none lg:-translate-y-1/2">
      <label htmlFor={`${id}-champ`} className="sr-only">
        Rechercher une région, un animal ou une association
      </label>
      <div className="flex h-[clamp(40px,2.615vw,50px)] items-center gap-[clamp(8px,0.9vw,18px)] rounded-[10px] border-[4.5px] border-foret-900 bg-foret-700 pl-[clamp(8px,0.5vw,9.5px)] pr-3 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-ciel">
        <Image
          src="/figma/map/icone-loupe.svg"
          alt=""
          width={26}
          height={26}
          className="size-[clamp(20px,1.354vw,26px)] shrink-0"
        />
        <input
          id={`${id}-champ`}
          type="text"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          aria-expanded={listeVisible}
          aria-controls={`${id}-liste`}
          aria-autocomplete="list"
          aria-activedescendant={listeVisible && resultats[actif] ? `${id}-option-${actif}` : undefined}
          value={requete}
          placeholder={libelleSurvol ?? PLACEHOLDER}
          onChange={(e) => {
            setRequete(e.target.value);
            setActif(0);
            setOuvert(true);
          }}
          onFocus={() => setOuvert(true)}
          onBlur={() => setOuvert(false)}
          onKeyDown={auClavier}
          className={`h-full min-w-0 flex-1 bg-transparent text-[clamp(15px,1.12vw,21.5px)] tracking-[0.02em] text-creme outline-none ${
            libelleSurvol ? "placeholder:text-white" : "placeholder:text-foret-900"
          }`}
        />
      </div>

      <ul
        id={`${id}-liste`}
        role="listbox"
        aria-label="Suggestions"
        hidden={!listeVisible}
        className="absolute inset-x-0 top-[calc(100%+8px)] z-10 max-h-[min(60dvh,420px)] overflow-y-auto rounded-[10px] border-[4.5px] border-foret-900 bg-foret-950/95 py-1.5 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]"
      >
        {resultats.map((s, i) => (
          <li
            key={`${s.type}-${s.href ?? s.region}-${s.libelle}`}
            id={`${id}-option-${i}`}
            role="option"
            aria-selected={i === actif}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => choisir(s)}
            onPointerMove={() => setActif(i)}
            className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2 ${i === actif ? "bg-foret-700" : ""}`}
          >
            <span className="text-[clamp(15px,1vw,19px)] text-creme">{s.libelle}</span>
            <span className="shrink-0 text-right font-ui text-[clamp(12px,0.78vw,15px)] text-sable">
              {s.type === "region" ? (s.href ? TYPES.region : "Bientôt disponible") : `${TYPES[s.type]} · ${s.detail}`}
            </span>
          </li>
        ))}
        {resultats.length === 0 && (
          <li role="option" aria-selected={false} aria-disabled className="px-4 py-2 text-[clamp(15px,1vw,19px)] text-creme">
            Aucun résultat pour « {requete.trim()} »
          </li>
        )}
      </ul>
    </div>
  );
}
