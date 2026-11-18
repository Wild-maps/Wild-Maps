import Image from "next/image";
import { LancerCarte } from "@/components/home/LancerCarte";
import { rang } from "@/components/ui/rang";

const paragraphes = [
  [
    "Nos cartes sont structurées en plusieurs sections complémentaires.",
    "Lorsque nous prenons l’exemple de fiches animales, ces dernières présentent d’abord une représentation réaliste de l’animal, accompagnée",
    "d’informations essentielles telles que son habitat, son régime alimentaire et son mode de vie.",
  ],
  [
    "Des données plus scientifiques viennent enrichir ces contenus afin de garantir une approche rigoureuse et fidèle à la réalité.",
    "Par ailleurs, nos cartes intègrent des interactions immersives : il est possible d’écouter les vocalisations de l’animal ou encore de visualiser un modèle 3D manipulable.",
    "Ces fonctionnalités permettent une meilleure compréhension de son apparence et facilitent la mémorisation de ses caractéristiques physiques.",
  ],
];

export function FichesInteractives() {
  return (
    <section
      id="fiches"
      className="relative scroll-mt-[clamp(64px,5.36vw,103px)] overflow-clip pb-12 pt-[clamp(40px,3.594vw,69px)] lg:pb-0"
    >
      <div className="px-5 lg:pl-[8.333%] lg:pr-[8.44%]">
        <h2 className="apparait font-ui text-[clamp(22px,1.5625vw,30px)] tracking-[0.02em] text-sable">
          Nos fiches interactives et nos modèles d’animaux
        </h2>
        <div className="apparait mt-[clamp(24px,3.438vw,66px)] space-y-[1.413em] font-ui text-[clamp(15px,1.12vw,21.5px)] tracking-[0.02em] text-creme">
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
      </div>

      <div className="relative mt-[clamp(28px,3.49vw,67px)] lg:aspect-[1920/1480]">
        <div className="apparait relative aspect-[1960/834] overflow-hidden lg:absolute lg:left-[-0.677%] lg:top-0 lg:w-[102.083%]">
          <Image
            src="/figma/home/fiches/telephone-et-carte.png"
            alt="Fiche animale affichée sur un téléphone, devant la carte interactive"
            width={1920}
            height={1080}
            sizes="100vw"
            className="absolute left-0 top-[-15.42%] h-[132.19%] w-full max-w-none"
          />
        </div>

        <Image
          src="/figma/home/fiches/fiche-ecureuil-ordinateur.png"
          alt="Fiche de l’écureuil volant : identité, habitat, régime, reproduction, mode de vie et anecdotes"
          width={1314}
          height={877}
          sizes="(min-width: 1024px) 36vw, 100vw"
          style={rang(1)}
          className="apparait mx-auto mt-6 h-auto w-[calc(100%-40px)] max-w-[684px] lg:absolute lg:left-[41.51%] lg:top-[14.932%] lg:mt-0 lg:w-[35.625%] lg:max-w-none"
        />

        <div className="mt-10 flex justify-center lg:contents">
          <LancerCarte
            href="/carte"
            variant="ciel"
            style={rang(1)}
            className="apparait-pop h-[clamp(48px,2.917vw,56px)] w-[clamp(200px,11.875vw,228px)] text-[clamp(17px,1.146vw,22px)] lg:absolute lg:left-[50.365%] lg:top-[61.014%] lg:-translate-x-1/2"
          >
            LANCER LA MAP !
          </LancerCarte>
        </div>

        <div className="pointer-events-none mt-8 flex items-center lg:contents">
          <div className="surgit-gauche relative aspect-[360/587] w-[26%] shrink-0 lg:absolute lg:left-[-0.677%] lg:top-[59.865%] lg:w-[18.75%]">
            <Image
              src="/figma/home/fiches/oiseau-huppe.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 19vw, 26vw"
              className="se-balance"
              style={rang(0, { "--pivot": "0% 80%" })}
            />
          </div>
          <Image
            src="/figma/home/fiches/separateur-ligne.svg"
            alt=""
            width={1885}
            height={21}
            className="trace h-[7px] min-w-0 flex-1 lg:absolute lg:left-[24.167%] lg:top-[79.003%] lg:h-auto lg:w-[49.089%] lg:flex-none"
          />
          <div className="surgit-droite relative flex aspect-[522.695/609.354] w-[27%] shrink-0 items-center justify-center lg:absolute lg:left-[75.546%] lg:top-[61.571%] lg:w-[27.224%]">
            <div className="relative h-[95.751%] w-[94.064%] rotate-[-3.12deg]">
              <Image
                src="/figma/home/fiches/oiseau-pic-epeiche.png"
                alt=""
                fill
                sizes="27vw"
                className="se-balance"
                style={rang(0, { "--pivot": "100% 75%", "--duree": "7s" })}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
