import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "foret" | "ciel";

const variants: Record<Variant, string> = {
  foret:
    "bg-foret-700 border-foret-900 text-creme shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#3d7666]",
  ciel: "bg-ciel border-ecorce text-ecorce shadow-[1px_3px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#a6ddff]",
};

type PillButtonProps = ComponentProps<typeof Link> & { variant?: Variant };

export function PillButton({ variant = "foret", className = "", ...props }: PillButtonProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border-[4.5px] border-solid font-ui tracking-[0.02em] transition-[background-color,translate,scale] duration-150 ease-sortie motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ciel ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
