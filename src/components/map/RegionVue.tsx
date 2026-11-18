"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { rang } from "@/components/ui/rang";
import { contenusRegion, type Suggestion } from "@/data/regions";
import type { Animal, Epingle, RegionContenu, RegionSlug } from "@/data/types";
import { Annonce, useAnnonce } from "./Annonce";
import { BarreCarte } from "./BarreCarte";
import { Cadre } from "./Cadre";
import { Carrousel } from "./Carrousel";
import { Fenetre } from "./Fenetre";
import { FicheAnimal } from "./FicheAnimal";
import { FicheAssociation } from "./FicheAssociation";
import { FicheBientot } from "./FicheBientot";
import { FicheHabitat } from "./FicheHabitat";
import { placerDansCadre } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";

type TypeFiche = "animal" | "habitat" | "association";
type Ouverte = { type: TypeFiche; slug: string };

const ID_CARROUSEL = "carrousel-animaux";

const epingles = {
  association: { src: "/figma/map/epingle-association-corps.svg", w: 89, h: 142, sol: 133.5, svg: { w: 99.5, h: 150, gauche: 4 } },
  habitat: { src: "/figma/map/epingle-habitat-corps.svg", w: 89, h: 140, sol: 131.5, svg: { w: 99.5, h: 148, gauche: 4 } },
};

const poussiere = Array.from(
  { length: 6 },
  (_, j) => ({ "--dx": `${(j % 2 ? 1 : -1) * (40 + ((j * 37) % 50))}%`, "--dy": `${30 + ((j * 53) % 70)}%` }) as CSSProperties,
);

function rangsDeChute(liste: Epingle[]) {
  const rangs: number[] = [];
  liste
    .map((e, i) => ({ i, d: Math.hypot(e.x + 44.5 - 960, e.y + 132 - 500) }))
    .sort((a, b) => a.d - b.d)
    .forEach(({ i }, k) => (rangs[i] = k));
  return rangs;
}

function lireAncre(ancre: string, contenu: RegionContenu): Ouverte | null {
  const m = /^#(animal|habitat|association)-(.+)$/.exec(ancre);
  if (!m) return null;
  const type = m[1] as TypeFiche;
  const slug = decodeURIComponent(m[2]);
  const liste = type === "animal" ? contenu.animaux : type === "habitat" ? contenu.habitats : contenu.associations;
  return liste.some((x) => x.slug === slug) ? { type, slug } : null;
}

function nomEpingle(e: Epingle, contenu: RegionContenu) {
  if (e.type === "habitat") {
    const h = contenu.habitats.find((x) => x.slug === e.cible);
    return `Habitat : ${h ? `${h.titre.replace("\n", " ")} (${h.sousTitre})` : e.cible}`;
  }
  return `Association : ${contenu.associations.find((x) => x.slug === e.cible)?.nom ?? e.cible}`;
}

export function RegionVue({ slug }: { slug: RegionSlug }) {
  const contenu = contenusRegion[slug];
  const [carrousel, setCarrousel] = useState(false);
  const [fiche, setFiche] = useState<Ouverte | null>(null);
  const { annonce, annoncer } = useAnnonce();
  const patte = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cible = lireAncre(window.location.hash, contenu);
    if (!cible) return;
    const image = requestAnimationFrame(() => setFiche(cible));
    return () => cancelAnimationFrame(image);
  }, [contenu]);

  const fermerCarrousel = useCallback(() => {
    setCarrousel(false);
    patte.current?.focus();
  }, []);

  function fermerFiche() {
    setFiche(null);
    if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname);
  }

  function ouvrirDepuisRecherche(s: Suggestion) {
    const m = s.href ? /^\/carte\/([^#]+)(#.+)?$/.exec(s.href) : null;
    if (!m || m[1] !== contenu.slug) return false;
    const cible = m[2] ? lireAncre(m[2], contenu) : null;
    if (cible) {
      setCarrousel(false);
      setFiche(cible);
    }
    return true;
  }

  const ouvreAnimal = (a: Animal) => setFiche({ type: "animal", slug: a.slug });
  const rangs = rangsDeChute(contenu.epingles);
  const decorVisible = !carrousel && !fiche;

  let corps: ReactNode = null;
  let etiquette = "";
  if (fiche?.type === "animal") {
    const a = contenu.animaux.find((x) => x.slug === fiche.slug);
    if (a) {
      etiquette = `Fiche : ${a.nom}`;
      corps = a.fiche ? (
        <FicheAnimal animal={a} fiche={a.fiche} onFermer={fermerFiche} />
      ) : (
        <FicheBientot
          animal={a}
          onFermer={fermerFiche}
          onVoirAnimaux={() => {
            fermerFiche();
            setCarrousel(true);
          }}
        />
      );
    }
  } else if (fiche?.type === "habitat") {
    const h = contenu.habitats.find((x) => x.slug === fiche.slug);
    if (h) {
      etiquette = `Fiche habitat : ${h.titre.replace("\n", " ")}`;
      corps = <FicheHabitat habitat={h} onFermer={fermerFiche} />;
    }
  } else if (fiche?.type === "association") {
    const a = contenu.associations.find((x) => x.slug === fiche.slug);
    if (a) {
      etiquette = `Fiche association : ${a.nom}`;
      corps = <FicheAssociation association={a} onFermer={fermerFiche} />;
    }
  }

  return (
    <>
      <BarreCarte
        retour={{ href: "/carte", label: "Retour à la carte de France" }}
        onSuggestion={ouvrirDepuisRecherche}
        onBientot={annoncer}
        patte={{
          actif: carrousel,
          onBasculer: () => (carrousel ? fermerCarrousel() : setCarrousel(true)),
          controle: ID_CARROUSEL,
        }}
        patteRef={patte}
      />
      <main className="relative h-dvh overflow-hidden bg-foret-950">
        <h1 className="sr-only">{contenu.nom}</h1>
        <Cadre>
          <ImageRecadree
            src={contenu.paysage.src}
            recadrage={contenu.paysage.recadrage}
            largeur={contenu.paysage.boite.w}
            priority
            className={`arrivee ${decorVisible ? "" : "blur-[5px]"}`}
            style={placerDansCadre(contenu.paysage.boite)}
          />
          <div aria-hidden className="absolute inset-0 bg-[#151515]/45" />

          <div
            className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${decorVisible ? "" : "invisible opacity-0"}`}
          >
            {contenu.zones.map((z, i) => (
              <svg
                key={z.d.slice(0, 24)}
                aria-hidden
                viewBox={`0 0 ${z.boite.w} ${z.boite.h}`}
                preserveAspectRatio="none"
                overflow="visible"
                className="pointer-events-none absolute"
                style={{ ...placerDansCadre(z.boite), ...rang(i) }}
              >
                <path d={z.d} pathLength={1} className="zone-tracee fill-sable stroke-sable [stroke-width:4]" style={{ fillOpacity: z.remplissage ?? 0.45 }} />
              </svg>
            ))}
            {contenu.epingles.map((e, i) => {
              const modele = epingles[e.type];
              const sol = (modele.sol / modele.h) * 100;
              return (
                <button
                  key={`${e.type}-${e.cible}-${e.x}`}
                  type="button"
                  aria-label={nomEpingle(e, contenu)}
                  onClick={() => setFiche({ type: e.type, slug: e.cible })}
                  className="group absolute cursor-pointer rounded-full focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ciel"
                  style={{ ...placerDansCadre({ x: e.x, y: e.y, w: modele.w, h: modele.h }), ...rang(rangs[i]) }}
                >
                  <span
                    aria-hidden
                    className="epingle-sol absolute left-[10%] h-[14%] w-[80%] rounded-[50%] border-2 border-creme/80 opacity-0"
                    style={{ top: `${sol - 7}%` }}
                  />
                  <span
                    aria-hidden
                    className="epingle-ombre absolute left-[25.85%] h-[12%] w-[48.3%] rounded-[50%] bg-ecorce shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-[scale] duration-200 ease-sortie group-hover:scale-90 motion-reduce:transition-none"
                    style={{ top: `${sol - 6}%` }}
                  />
                  {poussiere.map((p, j) => (
                    <span
                      key={j}
                      aria-hidden
                      className="epingle-poussiere absolute left-1/2 -ml-[2.5%] aspect-square w-[5%] rounded-full bg-sable opacity-0"
                      style={{ ...p, top: `${sol - 3}%` }}
                    />
                  ))}
                  <span
                    className="epingle-corps absolute top-0"
                    style={{
                      left: `${(-modele.svg.gauche / modele.w) * 100}%`,
                      width: `${(modele.svg.w / modele.w) * 100}%`,
                      height: `${(modele.svg.h / modele.h) * 100}%`,
                      transformOrigin: `50% ${(132.4 / modele.svg.h) * 100}%`,
                    }}
                  >
                    <Image
                      src={modele.src}
                      alt=""
                      width={Math.round(modele.svg.w)}
                      height={Math.round(modele.svg.h)}
                      className="size-full max-w-none origin-bottom transition-transform duration-200 ease-sortie group-hover:-translate-y-[4%] group-hover:scale-105 group-active:scale-95 motion-reduce:transition-none"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </Cadre>

        {carrousel && (
          <Carrousel
            id={ID_CARROUSEL}
            titre={`Animaux de la région ${contenu.nom}`}
            animaux={contenu.animaux}
            masque={fiche !== null}
            onChoisir={ouvreAnimal}
            onFermer={fermerCarrousel}
          />
        )}

        <Fenetre ouverte={corps !== null} onFermer={fermerFiche} etiquette={etiquette}>
          {corps}
        </Fenetre>
        <Annonce annonce={annonce} />
      </main>
    </>
  );
}
