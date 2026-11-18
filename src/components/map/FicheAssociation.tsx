import Image from "next/image";
import { useId } from "react";
import { rang } from "@/components/ui/rang";
import type { Association } from "@/data/types";
import { encart, FicheGabarit, ListePastilles, police, TexteFiche } from "./FicheGabarit";
import { placer } from "./geometrie";
import { ImageRecadree } from "./ImageRecadree";

type Contact = { cle: keyof Association["contact"]; icone: string; pastille: string };

const contacts: Contact[] = [
  { cle: "telephone", icone: "telephone", pastille: "contact-pastille-telephone" },
  { cle: "email", icone: "email", pastille: "contact-pastille" },
  { cle: "site", icone: "site", pastille: "contact-pastille" },
  { cle: "adresse", icone: "adresse", pastille: "contact-pastille" },
];

const libellesContact: Record<Contact["cle"], string> = {
  telephone: "Téléphone",
  email: "E-mail",
  site: "Site web",
  adresse: "Adresse",
};

export function FicheAssociation({ association: a, onFermer }: { association: Association; onFermer: () => void }) {
  const titreId = useId();

  return (
    <FicheGabarit
      titreId={titreId}
      titre={a.titre}
      sousTitre={a.sousTitre}
      sousTitreClasse="text-[length:calc(40*var(--f))] leading-[calc(44*var(--f))] tracking-[0.02em] text-foret-700"
      illustration={
        <>
          <ImageRecadree
            src={a.logo.src}
            recadrage={a.logo.recadrage}
            largeur={a.logo.boite.w}
            alt={`Logo de ${a.nom}`}
            style={placer(a.logo.boite)}
          />
          <ImageRecadree src={a.photo.src} recadrage={a.photo.recadrage} largeur={a.photo.boite.w} style={placer(a.photo.boite)} />
          <p
            className="absolute left-260 top-602 h-77 w-158 bg-sable p-8 pl-10"
            style={{ borderRadius: "calc(20 * var(--f)) 0 calc(20 * var(--f)) calc(20 * var(--f))" }}
          >
            <span className={`flex h-61 w-139 items-center justify-center rounded-[calc(15*var(--f))] bg-ecorce ${police.texte20} tracking-[0.02em] text-creme`}>
              {a.etat}
            </span>
            <Image src="/figma/map/association-pastille-ouvert.svg" alt="" width={28} height={28} className="absolute left-125 top-2 size-28" />
          </p>
        </>
      }
      onFermer={onFermer}
    >
      <div className="relative flex flex-col gap-24 p-16 lg:h-full lg:flex-row lg:gap-33 lg:p-0 lg:pb-26 lg:pl-32 lg:pt-23">
        <section style={rang(0)} className={`compose-encart ${encart} flex flex-col pb-30 pl-18 pr-13 pt-6 lg:w-332`}>
          <h3 className={`${police.titreEncart} text-center`}>{a.mission.titre}</h3>
          <TexteFiche texte={a.mission.texte} className={`mt-23 ${police.texte19}`} />
          <ListePastilles pastilles={a.mission.pastilles} className="my-auto gap-34 pl-9 pt-30" />
        </section>

        <div className="compose-colonne flex flex-col lg:w-458">
          <h3 className={`${police.titreEncart} text-center lg:mt-8 lg:w-434`}>{a.membres.titre}</h3>
          <TexteFiche texte={a.membres.texte} className={`mt-23 ${police.texte20}`} />
          <ListePastilles pastilles={a.membres.pastilles} className="mt-28 gap-27 lg:max-w-434" />

          <h3 className={`${police.titreEncart} mt-30 text-center lg:mt-auto lg:w-434`}>Contact</h3>
          <ul className="mt-21 flex flex-col gap-27 lg:pl-24">
            {contacts.map(({ cle, icone, pastille }) => {
              const valeur = a.contact[cle];
              return (
                <li
                  key={cle}
                  className="relative flex h-46 items-center justify-center rounded-[calc(10*var(--f))] border-[calc(4.5*var(--f))] border-foret-900 bg-foret-700 px-36 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:w-399"
                >
                  <span className="sr-only">{libellesContact[cle]} : </span>
                  <span className={`${police.texte16} font-semibold tracking-[0.02em] text-ciel`}>{valeur}</span>
                  <span aria-hidden className="absolute -right-18 -top-16 size-40">
                    <Image src={`/figma/map/${pastille}.svg`} alt="" fill className="object-fill" />
                    <Image
                      src={`/figma/map/contact-icone-${icone}.svg`}
                      alt=""
                      width={22}
                      height={22}
                      className={`absolute left-8 top-7 ${icone === "adresse" ? "size-24 -translate-1" : "size-22"}`}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FicheGabarit>
  );
}
