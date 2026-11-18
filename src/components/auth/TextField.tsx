import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

type Icon = "utilisateur" | "email" | "cle";

const icons: Record<Icon, ReactNode> = {
  email: (
    <Image
      src="/figma/auth/icone-email.svg"
      alt=""
      width={29}
      height={29}
      className="absolute left-[10.52%] top-[15.78%] size-[71.05%]"
    />
  ),
  cle: (
    <Image
      src="/figma/auth/icone-cle.svg"
      alt=""
      width={29}
      height={31}
      className="absolute left-[15.78%] top-[10.52%] h-[76.31%] w-[71.05%]"
    />
  ),
  utilisateur: (
    <span className="absolute left-[10.52%] top-[15.78%] size-[71.05%] overflow-clip">
      <span className="absolute inset-[-11.74%_-10.91%_-0.01%_-0.84%]">
        <Image src="/figma/auth/icone-utilisateur.svg" alt="" width={32} height={32} className="block size-full max-w-none" />
      </span>
    </span>
  ),
};

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  icon: Icon;
  error?: string;
};

export function TextField({ id, label, icon, error, className = "", ...props }: TextFieldProps) {
  const errorId = `${id}-erreur`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block font-ui text-[clamp(15px,1.042vw,20px)] tracking-[0.02em] text-creme">
        {label}
      </label>
      <div className="relative mt-[clamp(6px,0.521vw,10px)]">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="block h-[clamp(42px,2.5vw,48px)] w-full rounded-[10px] border-[4.5px] border-solid border-foret-900 bg-foret-700 pl-[clamp(12px,0.911vw,17.5px)] pr-[clamp(28px,1.82vw,35px)] font-body text-[clamp(16px,1.12vw,21.5px)] tracking-[0.02em] text-creme shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] placeholder:text-foret-950 autofill:shadow-[inset_0_0_0_100px_#346759,0px_4px_4px_0px_rgba(0,0,0,0.25)] autofill:[-webkit-text-fill-color:#fff9ee] focus:outline-3 focus:outline-offset-2 focus:outline-ciel aria-invalid:border-[#ffb4a2]"
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 size-[clamp(32px,2.099vw,40.3px)] translate-x-[42%] -translate-y-[45%]"
        >
          <span className="absolute inset-[-3.72%_-13.65%_-16.13%_-6.2%]">
            <Image src="/figma/auth/pastille-icone.svg" alt="" width={48} height={48} className="block size-full max-w-none" />
          </span>
          {icons[icon]}
        </span>
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[clamp(14px,0.807vw,15.5px)] text-[#ffb4a2] transition-[opacity,translate] duration-200 ease-sortie starting:-translate-y-1 starting:opacity-0 motion-reduce:transition-none">
          {error}
        </p>
      )}
    </div>
  );
}
