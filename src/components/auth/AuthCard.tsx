import Image from "next/image";
import { rang } from "@/components/ui/rang";
import type { ReactNode } from "react";

const buttonBase =
  "flex h-[clamp(42px,2.552vw,49px)] w-full cursor-pointer items-center justify-center rounded-[10px] border-[2.5px] border-solid font-ui text-[clamp(18px,1.302vw,25px)] tracking-[0.02em] transition-[background-color,scale] duration-150 ease-sortie active:scale-[0.97] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel";

export const primaryButton = `${buttonBase} border-ecorce bg-ciel text-ecorce shadow-[1px_3px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#a6ddff] disabled:cursor-wait disabled:opacity-70`;

export const secondaryButton = `${buttonBase} border-foret-900 bg-foret-700 text-creme shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#3d7666]`;

export const subtitle = "text-center font-display text-[clamp(26px,1.823vw,35px)] tracking-[0.02em] text-sable";

export function Separator({ className = "" }: { className?: string }) {
  return <hr className={`ml-[clamp(8px,0.625vw,12px)] mr-[clamp(6px,0.469vw,9px)] h-px border-0 bg-creme ${className}`} />;
}

export function AuthNotice({ text }: { text: string | null }) {
  return (
    <p
      role="status"
      className={
        text
          ? "mt-3 rounded-[10px] border-2 border-ciel bg-foret-950 px-4 py-3 text-[clamp(15px,0.885vw,17px)] text-creme"
          : "sr-only"
      }
    >
      {text}
    </p>
  );
}

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={rang(2)} className="entree relative z-10 mt-6 overflow-hidden rounded-[clamp(24px,2.083vw,40px)] bg-foret-900 pl-[clamp(20px,2.5vw,48px)] pr-[clamp(24px,2.708vw,52px)] pt-[clamp(20px,1.458vw,28px)] lg:mb-[3.75vw] lg:ml-auto lg:mr-[7.865vw] lg:mt-[3.958vw] lg:w-[max(31.094vw,380px)]">
      <Image
        src="/figma/auth/vague-carte.svg"
        alt=""
        width={597}
        height={293}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full"
      />
      <div className="relative">
        <h1 className="text-center font-display text-[clamp(40px,3.646vw,70px)] tracking-[0.02em] text-sable">{title}</h1>
        {children}
      </div>
    </div>
  );
}
