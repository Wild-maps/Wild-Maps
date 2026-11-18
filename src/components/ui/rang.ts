import type { CSSProperties } from "react";

export const rang = (i: number, extra?: Record<string, string | number>) => ({ "--i": i, ...extra }) as CSSProperties;
