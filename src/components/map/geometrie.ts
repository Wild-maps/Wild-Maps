import type { CSSProperties } from "react";
import type { Boite } from "@/data/types";

export type Unite = "--f" | "--u";

export const mesure = (n: number, unite: Unite = "--f") => `calc(${n} * var(${unite}))`;

export function placer({ x, y, w, h }: Boite, unite: Unite = "--f"): CSSProperties {
  return { left: mesure(x, unite), top: mesure(y, unite), width: mesure(w, unite), height: mesure(h, unite) };
}

export function placerDansCadre({ x, y, w, h }: Boite): CSSProperties {
  return { left: `${(x / 1920) * 100}%`, top: `${(y / 1000) * 100}%`, width: `${(w / 1920) * 100}%`, height: `${(h / 1000) * 100}%` };
}
