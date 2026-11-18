export const courbe = (nom: string) => getComputedStyle(document.documentElement).getPropertyValue(`--ease-${nom}`).trim() || "ease";

export const mouvementReduit = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
