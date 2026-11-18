"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Cadre({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  return (
    <div ref={ref} className="relative h-dvh w-full overflow-auto overscroll-none lg:landscape:overflow-hidden">
      <div className="relative aspect-[1920/1000] w-[max(100%,192dvh)] lg:landscape:absolute lg:landscape:left-1/2 lg:landscape:top-1/2 lg:landscape:-translate-x-1/2 lg:landscape:-translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
