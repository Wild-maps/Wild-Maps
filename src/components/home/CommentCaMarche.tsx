import Image from "next/image";
import { rang } from "@/components/ui/rang";

type Carte = {
  titre: string[];
  titreClassName: string;
  fond: string;
  paragraphes: string[][];
};

const cartes: Carte[] = [
  {
    titre: ["Découvrez la faune autrement avec Wild Map"],
    titreClassName: "font-ui text-[clamp(20px,1.5625vw,30px)]",
    fond: "bg-ecorce",
    paragraphes: [
      ["Avec Wild Map, explorez la biodiversité de manière simple, ludique et interactive."],
      [
        "Plongez dans l’univers fascinant de la faune sauvage et enrichissez vos connaissances en zoologie, que vous soyez curieux, passionné ou simplement en quête de découverte.",
      ],
    ],
  },
  {
    titre: ["Une MAP interactive pour voyager", "et apprendre"],
    titreClassName: "font-ui text-[clamp(21px,1.667vw,32px)]",
    fond: "bg-foret-700",
    paragraphes: [
      [
        "Naviguez facilement à travers notre MAP interactive et partez à la découverte des espèces emblématiques de chaque régions de France.",
      ],
      ["En quelques clics, voyagez de pays en pays et accédez à des informations claires, pédagogiques et accessibles à tous."],
    ],
  },
  {
    titre: ["Engagez-vous aux côtés des acteurs locaux"],
    titreClassName: "font-ui text-[clamp(21px,1.667vw,32px)]",
    fond: "bg-foret-700",
    paragraphes: [
      ["Wild Map met en lumière les associations engagées", "dans la protection de la faune."],
      [
        "Retrouvez-les directement sur la plateforme, informez-vous",
        "sur leurs actions et contactez-les facilement pour vous impliquer ou soutenir leurs initiatives.",
      ],
    ],
  },
  {
    titre: ["Sensibiliser pour mieux protéger"],
    titreClassName: "font-ui text-[clamp(20px,1.5625vw,30px)]",
    fond: "bg-ecorce",
    paragraphes: [
      [
        "Au-delà de la découverte, Wild Map sensibilise aux enjeux essentiels liés au bien-être animal et à la préservation",
        "de la biodiversité.",
      ],
      [
        "Apprenez les bons gestes à adopter face à la faune sauvage, comprenez les défis environnementaux actuels et participez,",
        "à votre échelle, à la protection des espèces.",
      ],
    ],
  },
];

function Lignes({ lignes }: { lignes: string[] }) {
  return lignes.map((ligne, i) => (
    <span key={i} className="xl:block">
      {ligne}{" "}
    </span>
  ));
}

function CarteEtape({ titre, titreClassName, fond, paragraphes, i }: Carte & { i: number }) {
  return (
    <article
      style={rang(i)}
      className={`apparait flex flex-col justify-center rounded-[20px] px-5 py-7 shadow-[4px_8px_4px_0px_rgba(0,0,0,0.15)] lg:min-h-[min(19.95vw,383px)] lg:py-[clamp(24px,2.6vw,50px)] lg:odd:pl-[clamp(20px,3.23vw,62px)] lg:odd:pr-[clamp(16px,2.5vw,48px)] lg:even:pl-[clamp(20px,2.81vw,54px)] lg:even:pr-[clamp(16px,2.76vw,53px)] ${fond}`}
    >
      <h3 className={`text-balance tracking-[0.02em] text-sable ${titreClassName}`}>
        <Lignes lignes={titre} />
      </h3>
      <div className="mt-[clamp(18px,1.95vw,37.5px)] space-y-[1lh] text-[clamp(15px,1.12vw,21.5px)] tracking-[0.02em] text-white">
        {paragraphes.map((lignes, i) => (
          <p key={i}>
            <Lignes lignes={lignes} />
          </p>
        ))}
      </div>
    </article>
  );
}

export function CommentCaMarche() {
  return (
    <section id="comment-ca-marche" className="scroll-mt-[clamp(64px,5.36vw,103px)] pt-8 lg:pt-0">
      <div className="px-5 lg:pl-[7.97%] lg:pr-[8.65%]">
        <h2 className="apparait mb-[clamp(24px,2.083vw,40px)] font-display text-[clamp(36px,2.865vw,55px)] tracking-[0.02em] text-sable">
          Comment ça marche ?
        </h2>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-[clamp(24px,4.479vw,86px)] lg:gap-y-[clamp(20px,3.646vw,70px)]">
          {cartes.map((carte, i) => (
            <CarteEtape key={carte.titre[0]} {...carte} i={i % 2} />
          ))}
        </div>
      </div>

      <div aria-hidden className="scene pointer-events-none relative aspect-[1920/498] overflow-hidden">
        <div className="surgit-gauche suit-scene absolute left-[-2.694%] top-[-1.258%] h-[91.933%] w-[22.325%] rotate-[64.67deg]">
          <Image src="/figma/home/comment-ca-marche/cameleon.png" alt="" fill sizes="23vw" />
        </div>
        <Image
          src="/figma/home/comment-ca-marche/cameleon-corne.svg"
          alt=""
          width={63}
          height={32}
          className="surgit-gauche suit-scene absolute left-[16.663%] top-[55.115%] h-[6.48%] w-[3.272%] max-w-none"
        />
        <Image
          src="/figma/home/comment-ca-marche/ligne-separation.svg"
          alt=""
          width={1885}
          height={21}
          className="trace suit-scene absolute left-[27.344%] top-[48.544%] h-[2.108%] w-[49.089%] max-w-none"
        />
        <div className="surgit-droite suit-scene absolute left-[84.428%] top-[10.453%] h-[86.4%] w-[18.584%] rotate-[-0.81deg]">
          <Image src="/figma/home/comment-ca-marche/gecko.png" alt="" fill sizes="19vw" />
        </div>
      </div>
    </section>
  );
}
