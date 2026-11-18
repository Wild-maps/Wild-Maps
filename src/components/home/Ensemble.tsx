import Image from "next/image";
import { Fragment } from "react";
import { rang } from "@/components/ui/rang";

const logos = [
  { src: "/figma/home/ensemble/logo-museum.png", alt: "Muséum national d’Histoire naturelle", width: 1000, height: 1124 },
  { src: "/figma/home/ensemble/logo-ofb.png", alt: "Office français de la biodiversité", width: 2048, height: 2048 },
  { src: "/figma/home/ensemble/logo-inpn.png", alt: "Inventaire national du patrimoine naturel", width: 525, height: 525 },
];

function Lignes({ lignes }: { lignes: string[] }) {
  return lignes.map((ligne, i) => (
    <span key={i} className="xl:block">
      {ligne}{" "}
    </span>
  ));
}

type CarteProps = {
  titre: string;
  paragraphes: string[][];
  className: string;
  i: number;
};

function Carte({ titre, paragraphes, className, i }: CarteProps) {
  return (
    <article
      style={rang(i)}
      className={`apparait rounded-[clamp(14px,1.042vw,20px)] p-6 shadow-[4px_8px_4px_0px_rgba(0,0,0,0.15)] lg:min-h-[min(31.98vw,614px)] lg:pb-[clamp(16px,1.25vw,24px)] ${className}`}
    >
      <h3 className="mb-[1.156em] font-ui text-[clamp(22px,1.667vw,32px)] tracking-[0.02em] text-sable">{titre}</h3>
      {paragraphes.map((lignes, i) => (
        <p key={i} className="text-[clamp(16px,1.25vw,24px)] tracking-[0.02em] text-creme [&+p]:mt-[1lh]">
          <Lignes lignes={lignes} />
        </p>
      ))}
    </article>
  );
}

export function Ensemble() {
  return (
    <section id="a-propos" className="relative overflow-clip px-5 pb-16 pt-24 lg:px-0 lg:pb-[clamp(64px,5.833vw,112px)] lg:pt-0">
      <div className="scene pointer-events-none relative hidden lg:block lg:aspect-[1920/525.5]">
        <div className="surgit-gauche suit-scene absolute left-[-2.8125%] top-0 h-[92.864%] w-[24.635%] overflow-hidden">
          <Image
            src="/figma/home/ensemble/anguille-bleue.png"
            alt=""
            width={1023}
            height={1537}
            sizes="27vw"
            style={rang(0, { "--pivot": "0% 70%", "--duree": "5.5s" })}
            className="se-balance absolute left-0 top-[-17.24%] h-[163.18%] w-[112.05%] max-w-none"
          />
        </div>
        <Image
          src="/figma/home/ensemble/trait-oiseau-long.svg"
          alt=""
          width={1089.5}
          height={10.5}
          className="trace suit-scene absolute left-[21.745%] top-[42.769%] h-[1.998%] w-[56.745%] max-w-none"
        />
        <div className="surgit-droite suit-scene absolute left-[74.635%] top-[8.373%] h-[93.245%] w-[27.708%] overflow-hidden">
          <Image
            src="/figma/home/ensemble/anguille-tachetee.png"
            alt=""
            width={1023}
            height={1537}
            sizes="28vw"
            style={rang(0, { "--pivot": "100% 70%", "--duree": "6.5s" })}
            className="se-balance absolute left-[-0.05%] top-[-23.27%] h-[163.31%] w-[100.09%] max-w-none"
          />
        </div>
      </div>

      <div className="relative lg:pl-[8.385%] lg:pr-[8.333%]">
        <h2 className="apparait font-display text-[clamp(32px,2.5vw,48px)] tracking-[0.02em] text-sable">
          Ensemble pour explorer et protéger le vivant
        </h2>

        <div className="apparait mt-[clamp(32px,4.479vw,86px)] lg:w-[82.43%]">
          <h3 className="mb-[1.156em] font-ui text-[clamp(22px,1.667vw,32px)] tracking-[0.02em] text-sable">
            Des partenaires scientifiques pour garantir la fiabilité
          </h3>
          <p className="text-[clamp(16px,1.25vw,24px)] tracking-[0.02em] text-creme">
            <Lignes
              lignes={[
                "Afin d’assurer la qualité et la rigueur de ses contenus, WILD MAP s’appuie sur l’expertise d’instituts de recherche",
                "et d’acteurs scientifiques reconnus tels que le CNRS ou encore le Muséum national d’Histoire naturelle.",
                "Ces collaborations permettent de valider les informations diffusées, d’enrichir les contenus avec des données fiables et de garantir une approche pédagogique sérieuse.",
                "Grâce à ces partenaires, WILD MAP dépasse le cadre d’un simple projet numérique",
                "pour devenir une plateforme crédible, ancrée dans une démarche scientifique rigoureuse.",
              ]}
            />
          </p>
        </div>

        <div className="mt-[clamp(32px,4.375vw,84px)] flex items-center justify-between">
          {logos.map((logo, i) => (
            <Fragment key={logo.src}>
              {i > 0 && (
                <Image
                  src="/figma/home/ensemble/trait-oiseau-court.svg"
                  alt=""
                  width={254}
                  height={10.5}
                  className="trace hidden h-auto w-[15.885%] lg:block"
                />
              )}
              <span style={rang(i)} className="apparait-pop relative block size-[clamp(88px,9.6875vw,186px)] shrink-0 overflow-hidden rounded-[clamp(14px,1.042vw,20px)]">
                <Image src={logo.src} alt={logo.alt} fill sizes="(min-width: 1024px) 10vw, 88px" className="object-cover" />
              </span>
            </Fragment>
          ))}
        </div>

        <div className="mt-[clamp(40px,5.417vw,104px)] grid gap-6 lg:grid-cols-2 lg:gap-[clamp(32px,4.375vw,84px)]">
          <Carte
            i={0}
            className="bg-ecorce lg:pl-[clamp(24px,2.5vw,48px)] lg:pr-[clamp(16px,1.719vw,33px)] lg:pt-[clamp(24px,2.24vw,43px)]"
            titre="Un ancrage territorial fort grâce aux associations"
            paragraphes={[
              [
                "WILD MAP s’appuie également sur un réseau",
                "d’associations régionales et nationales engagées",
                "dans la protection de la faune et de la flore.",
                "Des structures comme la Ligue pour la Protection des Oiseaux ou WWF France participent à cette dynamique",
                "en apportant leur expertise-terrain et leur connaissance",
                "des enjeux locaux.",
              ],
              [
                "Ces partenariats permettent de donner une dimension concrète et engagée au projet.",
                "Ils offrent la possibilité de relier les contenus numériques",
                "à des actions réelles de préservation, tout en valorisant",
                "le travail de celles et ceux qui agissent au quotidien",
                "pour protéger la biodiversité.",
              ],
            ]}
          />
          <Carte
            i={1}
            className="bg-foret-700 lg:pl-[clamp(24px,2.8125vw,54px)] lg:pr-[clamp(8px,0.625vw,12px)] lg:pt-[clamp(24px,2.083vw,40px)]"
            titre="Un levier de visibilité et d’impact pour les associations locales"
            paragraphes={[
              [
                "S’associer à WILD MAP, c’est bénéficier d’une opportunité unique de valoriser son engagement auprès",
                "d’un public large, curieux et déjà sensibilisé aux enjeux",
                "de la biodiversité.",
                "La plateforme agit comme un véritable relais de visibilité,",
                "en mettant en lumière les associations directement",
                "sur une carte interactive consultée par des utilisateurs",
                "en recherche de sens et d’action.",
              ],
              [
                "Chaque association partenaire dispose d’un espace dédié, conçu pour présenter clairement son identité,",
                "ses missions et ses actions.",
                "Cette présence ne se limite pas à une simple mention :",
                "elle permet de raconter une histoire, de transmettre",
                "des valeurs et de créer un lien direct avec les utilisateurs.",
              ],
            ]}
          />
        </div>
      </div>
    </section>
  );
}
