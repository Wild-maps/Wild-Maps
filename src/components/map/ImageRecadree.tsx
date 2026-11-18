import Image from "next/image";
import type { CSSProperties } from "react";
import type { Recadrage } from "@/data/types";

type ImageRecadreeProps = {
  src: string;
  recadrage?: Recadrage;
  largeur: number;
  alt?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function ImageRecadree({ src, recadrage: r, largeur, alt = "", priority, className = "", style }: ImageRecadreeProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={`${Math.ceil(r ? (largeur * r.width) / 100 : largeur)}px`}
      className="object-fill"
    />
  );
  return (
    <span className={`absolute block ${r ? "overflow-hidden" : ""} ${className}`} style={style}>
      {r ? (
        <span
          className="absolute block"
          style={{ left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` }}
        >
          {image}
        </span>
      ) : (
        image
      )}
    </span>
  );
}
