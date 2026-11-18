import Image from "next/image";
import { TraceLiaison } from "@/components/home/TraceLiaison";
import { rang } from "@/components/ui/rang";

type Exemple = {
  titre: string;
  image?: { src: string; alt: string };
  position: string;
};

const exemples: Exemple[] = [
  {
    titre: "La carte et les régions",
    image: { src: "/figma/home/exemples/carte-regions.png", alt: "Carte de France découpée en régions dans Wild Map" },
    position: "lg:left-0 lg:top-0",
  },
  {
    titre: "Le système de Ping",
    image: { src: "/figma/home/exemples/systeme-ping.png", alt: "Repère posé sur la carte, vue rapprochée d’une région" },
    position: "lg:left-[38.409%] lg:top-0",
  },
  {
    titre: "Fiches Animaux Typiques",
    image: { src: "/figma/home/exemples/fiche-animal.png", alt: "Fiche de l’écureuil volant, espèce menacée" },
    position: "lg:left-[76.065%] lg:top-0",
  },
  {
    titre: "Fiches Associations régionales",
    image: { src: "/figma/home/exemples/fiche-association.png", alt: "Fiche du Refuge des Pattes Abandonnées" },
    position: "lg:left-0 lg:top-[53.241%]",
  },
  {
    titre: "Fiches Biomes Régionaux",
    image: { src: "/figma/home/exemples/fiche-biome.png", alt: "Fiche du biome Forêt vierge, en Provence" },
    position: "lg:left-[38.409%] lg:top-[53.241%]",
  },
  { titre: "Inspections 3D des animaux", position: "lg:left-[76.065%] lg:top-[53.241%]" },
];

const lignesIntro = [
  "Plongez au cœur de la biodiversité avec  la MAP interactive et découvrez les animaux sauvages qui peuplent nos territoires.",
  "Pour la carte de la France, sélectionnez simplement la région qui vous intéresse, puis naviguez librement à l’intérieur de celle-ci.",
  "Vous pourrez ainsi accéder à des informations détaillées sur les associations locales, les biomes importants ainsi que les espèces emblématiques",
  "qui caractérisent chaque région.",
  "Une expérience immersive, intuitive et enrichissante pour mieux comprendre et apprécier la richesse de notre faune sauvage.",
];

export function Exemples() {
  return (
    <section
      id="exemples"
      className="scroll-mt-[clamp(64px,5.36vw,103px)] px-5 pb-16 pt-6 lg:pb-[clamp(32px,3.594vw,69px)] lg:pl-[7.97%] lg:pr-[8.906%] lg:pt-0"
    >
      <h2 className="apparait font-display text-[clamp(36px,2.865vw,55px)] tracking-[0.02em] text-sable">Quelques exemples</h2>
      <h3 className="apparait mt-[clamp(24px,2.97vw,57px)] font-ui text-[clamp(22px,1.5625vw,30px)] tracking-[0.02em] text-sable">
        Comment marche notre fameuse MAP intéractive ?
      </h3>
      <p className="mt-[clamp(18px,2.19vw,42px)] text-[clamp(15px,1.12vw,21.5px)] tracking-[0.02em] text-white">
        {lignesIntro.map((ligne, i) => (
          <span key={i} className="xl:block">
            {ligne}{" "}
          </span>
        ))}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:relative lg:mt-[clamp(40px,5.96vw,114.5px)] lg:block lg:aspect-[1596/1589]">
        <TraceLiaison className="pointer-events-none absolute left-[-0.154%] top-[11.676%] hidden h-[80.514%] w-[90.374%] max-w-none lg:block" />
        {exemples.map(({ titre, image, position }, i) => (
          <figure key={titre} data-exemple style={rang(i % 3)} className={`revele lg:absolute lg:w-[23.935%] ${position}`}>
            <div data-cadre className="relative">
              <div className="relative aspect-[382/690] overflow-clip rounded-[clamp(16px,1.5625vw,30px)] bg-foret-700 shadow-[4px_6px_4px_0px_rgba(0,0,0,0.25)]">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
                    className="recule"
                  />
                ) : (
                  <Inspection3D />
                )}
              </div>
              <span
                data-anneau
                aria-hidden
                className="pointer-events-none absolute -inset-[clamp(5px,0.66vw,13px)] rounded-[clamp(21px,2.2vw,43px)] border-2 border-sable opacity-0"
              />
            </div>
            <figcaption className="mt-[clamp(8px,0.9375vw,18px)] text-center text-[clamp(15px,1.25vw,24px)] tracking-[0.02em] text-white lg:flex lg:justify-center lg:whitespace-nowrap">
              <span className="soulignement">{titre}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Inspection3D() {
  return (
    <div className="recule absolute inset-0">
      <div className="absolute inset-x-0 top-[8%] flex flex-col items-center gap-[clamp(8px,0.8vw,15px)]">
        <span className="relative grid size-[clamp(40px,2.76vw,53px)] place-items-center rounded-full bg-ecorce shadow-[1px_3px_4px_0px_rgba(0,0,0,0.25)]">
          <Image src="/figma/map/fiche-vue-3d.png" alt="" width={37} height={37} className="size-[70%]" />
        </span>
        <span className="font-ui text-[clamp(14px,1.04vw,20px)] tracking-[0.02em] text-sable">Bientôt disponible</span>
      </div>
      <span className="absolute bottom-[14.5%] left-1/2 h-[5%] w-[64%] -translate-x-1/2 rounded-[50%] bg-black/30 blur-[6px]" />
      <div className="absolute bottom-[16%] left-1/2 aspect-square w-[86%] -translate-x-1/2 translate-y-1/2 [transform:perspective(700px)_rotateX(74deg)]">
        <span className="plateau block size-full rounded-full border-[3px] border-dashed border-white/35" />
      </div>
      <Image
        src="/figma/home/exemples/ours-3d.png"
        alt="Modèle 3D d’un ours, en maillage"
        width={567}
        height={606}
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 24vw, 36vw"
        className="pivote absolute bottom-[13%] left-1/2 h-auto w-[78%] -translate-x-1/2"
      />
    </div>
  );
}
