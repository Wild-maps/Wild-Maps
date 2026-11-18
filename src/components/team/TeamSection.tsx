import Image from "next/image";
import { rang } from "@/components/ui/rang";

const members = [
  { name: "Manon Abraham", level: "M1", track: "Animation 3D" },
  { name: "Elven Pichot", level: "M1", track: "Animation 3D" },
  { name: "Yann Girardo", level: "B3", track: "UX/UI Designer / D.A" },
  { name: "Marine Brunet", level: "M1", track: "Animation 3D" },
  { name: "Sarah Ottavi", level: "M1", track: "3D Game Tech Art" },
  { name: "Léo Boucher", level: "M1", track: "3D Game Tech Art" },
  { name: "Miloud Beddiaf", level: "M1", track: "Développement Full Stack" },
  { name: "Samra Benabbou", level: "M1", track: "Animation 3D" },
];

export function TeamSection() {
  return (
    <main className="relative flex-1 overflow-hidden bg-foret-950 px-5 pb-16 pt-[104px] sm:px-8 lg:min-h-[52.083vw] lg:p-0">
      <div className="fondu pointer-events-none absolute left-0 top-[1.354vw] hidden h-[50.516vw] w-[40.451vw] -scale-x-100 lg:block">
        <Image src="/figma/team/motif-taches.svg" alt="" width={777} height={970} className="block size-full max-w-none" />
      </div>

      <div style={rang(3)} className="entree-animal pointer-events-none absolute bottom-[-11.031vw] left-[2.314vw] hidden h-[48.02vw] w-[49.586vw] items-center justify-center lg:flex">
        <div className="relative h-[86.828%] w-[87.888%] shrink-0 rotate-[9.03deg] overflow-hidden">
          <Image
            src="/figma/team/serpent.png"
            alt=""
            width={1023}
            height={1537}
            sizes="50vw"
            className="absolute left-[-4.33%] top-[-28.4%] h-[180.5%] w-[114.94%] max-w-none"
          />
        </div>
      </div>
      <div style={rang(5)} className="entree-animal pointer-events-none absolute bottom-[-18.463vw] left-[-30.262vw] hidden h-[54.794vw] w-[55.423vw] items-center justify-center lg:flex">
        <div className="relative h-[71.825%] w-[74.22%] shrink-0 rotate-[-30.52deg] overflow-hidden">
          <Image
            src="/figma/team/serpent.png"
            alt=""
            width={1023}
            height={1537}
            sizes="48vw"
            className="absolute left-[-4.33%] top-[-28.4%] h-[180.5%] w-[114.94%] max-w-none"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[-11.51vw] left-0 hidden h-[16.302vw] w-[101.771vw] -scale-x-100 lg:block">
        <span className="absolute inset-[-2.56%_-0.2%_0_-0.2%]">
          <Image src="/figma/team/colline.webp" alt="" width={1962} height={321} unoptimized className="block size-full max-w-none" />
        </span>
      </div>

      <h1 className="relative font-display text-[clamp(44px,5.208vw,100px)] tracking-[0.02em] text-sable lg:absolute lg:left-[4.375vw] lg:top-[8.906vw]">
        <span className="block overflow-hidden">
          <span className="entree-ligne block">NOTRE TEAM</span>
        </span>
      </h1>

      <ul className="relative mt-8 grid gap-7 sm:grid-cols-2 lg:ml-[min(50vw,calc(100vw-560px))] lg:mt-0 lg:grid-cols-[max(25.677vw,280px)_auto] lg:gap-x-0 lg:gap-y-[2.986vw] lg:pt-[11.406vw]">
        {members.map((member, i) => (
          <li key={member.name} style={rang(i, { "--retard": "150ms" })} className="entree flex items-center gap-[clamp(12px,0.885vw,17px)]">
            <span className="relative size-[clamp(72px,6.198vw,119px)] shrink-0">
              <Image src="/figma/team/pastille-avatar.svg" alt="" width={119} height={119} className="absolute inset-0 size-full" />
              <Image
                src="/figma/team/icone-profil.svg"
                alt=""
                width={84}
                height={84}
                className="absolute left-[15.13%] top-[15.13%] size-[70.59%]"
              />
            </span>
            <div className="mt-[clamp(3px,0.365vw,7px)]">
              <h2 className="font-ui text-[clamp(22px,1.667vw,32px)] tracking-[0.02em] text-sable">{member.name}</h2>
              <p className="mt-[clamp(2px,0.26vw,5px)] pl-[clamp(2px,0.208vw,4px)] text-[clamp(15px,1.042vw,20px)] tracking-[0.02em] text-ciel">
                <strong className="font-extrabold text-white">{member.level}</strong> {member.track}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
