import Image from "next/image";
import { rang } from "@/components/ui/rang";

type Carte = {
  titre: string;
  fond: string;
  retraits: string;
  paragraphes: string[][];
};

const intro = [
  [
    "WILD MAP est à l’origine un projet étudiant né dans le cadre des Ydays au sein de Ynov Campus Aix-en-Provence.",
    "Pensé comme un terrain d’expérimentation et d’apprentissage, ce projet avait pour ambition première de permettre aux étudiants de développer",
    "et de renforcer leurs compétences dans des domaines variés, allant de la gestion de projet au Design technique, en passant par l’UX-UI Design",
    "et la réalisation 3D.",
  ],
  [
    "Cependant, WILD MAP ne s’est jamais limité à un simple exercice académique.",
    "Très rapidement, il s’est transformé en une véritable aventure collective, portée par une équipe passionnée et engagée.",
    "Au cœur de cette initiative se trouve une volonté forte : transmettre et partager une passion commune pour la zoologie, tout en sensibilisant le public",
    "à la richesse et à la fragilité du monde animal.",
  ],
  [
    "À travers ce projet, les étudiants ont cherché à créer une plateforme à la fois éducative, accessible et innovante, capable de rapprocher les utilisateurs",
    "de la biodiversité qui les entoure.",
    "WILD MAP incarne ainsi la rencontre entre apprentissage, créativité et engagement, démontrant qu’un projet étudiant peut dépasser le cadre scolaire",
    "pour devenir une initiative porteuse de sens et d’impact.",
    "Aujourd’hui, WILD MAP représente bien plus qu’un simple projet pédagogique : c’est une démarche vivante, évolutive, qui continue de grandir grâce",
    "à la motivation de ses contributeurs et à l’intérêt de sa communauté.",
  ],
];

const cartes: Carte[] = [
  {
    titre: "WILD MAP : une nouvelle manière d’explorer le vivant",
    fond: "bg-foret-700",
    retraits: "pl-[clamp(20px,3.177vw,61px)] pr-[clamp(20px,2.552vw,49px)]",
    paragraphes: [
      ["WILD MAP est bien plus qu’une simple plateforme : c’est une invitation à redécouvrir le monde animal sous un angle nouveau."],
      [
        "En plaçant la géographie au cœur de l’expérience, le projet permet aux utilisateurs de visualiser les espèces dans leur habitat naturel, créant ainsi un lien direct entre l’animal et son environnement.",
      ],
    ],
  },
  {
    titre: "Sensibiliser pour mieux protéger !",
    fond: "bg-ecorce",
    retraits: "pl-[clamp(20px,2.813vw,54px)] pr-[clamp(20px,2.76vw,53px)]",
    paragraphes: [
      [
        "En mettant en lumière la diversité des espèces ainsi que les menaces qui pèsent sur elles, comme la destruction",
        "des habitats, le changement climatique et les activités humaines, le projet cherche à éveiller les consciences.",
      ],
      [
        "Loin d’un discours alarmiste, WILD MAP adopte une approche à la fois informative et engageante qui permet à chacun de mieux comprendre les enjeux actuels.",
      ],
    ],
  },
  {
    titre: "Interagir pour mieux apprendre",
    fond: "bg-ecorce",
    retraits: "pl-[clamp(20px,3.177vw,61px)] pr-[clamp(20px,2.552vw,49px)]",
    paragraphes: [
      ["WILD MAP donne à l’utilisateur la possibilité de manipuler les animaux, de les explorer librement et de s’approprier leur découverte."],
      [
        "En manipulant un modèle, l’utilisateur développe",
        "une compréhension plus intuitive et plus durable.",
        "Cette approche ludique renforce l’engagement et favorise une mémorisation plus efficace.",
      ],
    ],
  },
  {
    titre: "Immersion réaliste = meilleur compréhension",
    fond: "bg-foret-700",
    retraits: "pl-[clamp(20px,2.448vw,47px)] pr-[clamp(20px,2.396vw,46px)]",
    paragraphes: [
      [
        "L’un des principaux enjeux de WILD MAP est de rapprocher l’utilisateur du réel.",
        "Les modèles 3D ont ainsi été pensés pour être les plus fidèles possibles, en s’appuyant sur des références scientifiques",
        "et visuelles précises.",
        "Textures, volumes, postures...",
      ],
      [
        "Voir un animal en trois dimensions, pouvoir le faire pivoter, zoomer sur certains éléments ou l’observer sous différents angles, change profondément la manière dont on le perçoit.",
      ],
    ],
  },
];

function Paragraphes({ paragraphes, className }: { paragraphes: string[][]; className: string }) {
  return (
    <div className={`space-y-[1.172em] text-[clamp(15px,1.12vw,21.5px)] tracking-[0.02em] text-white ${className}`}>
      {paragraphes.map((lignes, i) => (
        <p key={i}>
          {lignes.map((ligne) => (
            <span key={ligne} className="xl:block">
              {ligne}{" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export function WildMapCestQuoi() {
  return (
    <section
      id="wildmap-c-est-quoi"
      className="relative scroll-mt-[clamp(64px,5.36vw,103px)] overflow-clip pb-[clamp(24px,2.552vw,49px)] pt-[clamp(32px,3.021vw,58px)]"
    >
      <div className="px-5 lg:pl-[8.698%] lg:pr-[7.917%]">
        <h2 className="apparait font-display text-[clamp(36px,2.865vw,55px)] tracking-[0.02em] text-sable">WILD MAP c’est quoi ?</h2>

        <h3 className="apparait mt-[clamp(32px,3.75vw,72px)] font-ui text-[clamp(20px,1.5625vw,30px)] tracking-[0.02em] text-sable">
          Un projet étudiant… et bien plus encore
        </h3>
        <Paragraphes paragraphes={intro} className="mt-[clamp(24px,2.813vw,54px)]" />

        <div className="mt-[clamp(32px,4.167vw,80px)] grid gap-[clamp(20px,3.646vw,70px)] lg:grid-cols-[759fr_756fr] lg:gap-x-[4.479vw]">
          {cartes.map((carte, i) => (
            <article
              key={carte.titre}
              style={rang(i % 2)}
              className={`apparait flex flex-col justify-center rounded-[clamp(14px,1.042vw,20px)] py-[clamp(20px,1.302vw,25px)] shadow-[4px_8px_4px_0px_rgba(0,0,0,0.15)] lg:min-h-[min(19.948vw,383px)] ${carte.fond} ${carte.retraits}`}
            >
              <h3 className="font-ui text-[clamp(20px,1.5625vw,30px)] tracking-[0.02em] text-sable">{carte.titre}</h3>
              <Paragraphes paragraphes={carte.paragraphes} className="mt-[clamp(16px,1.953vw,37.5px)]" />
            </article>
          ))}
        </div>
      </div>

      <div className="apparait relative ml-[-0.417%] mt-[clamp(32px,3.021vw,58px)] aspect-[1896/654] w-[98.75%] overflow-hidden">
        <Image
          src="/figma/home/wildmap/animaux-3d.png"
          alt="Modèles 3D d’un renard, d’un ours et d’un écureuil volant"
          width={1920}
          height={1080}
          sizes="100vw"
          className="absolute left-[-0.68%] top-[-27.27%] h-[164.48%] w-[100.68%] max-w-none"
        />
      </div>
    </section>
  );
}
