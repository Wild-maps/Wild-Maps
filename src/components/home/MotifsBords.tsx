const bande = "pointer-events-none absolute inset-y-0 -z-10 hidden w-[6.417vw] overflow-clip lg:block";
const motif =
  "pas absolute inset-x-0 bottom-0 top-[-60vw] bg-[url(/figma/ui/motif-traces.svg)] bg-[length:100%_auto] bg-repeat-y [background-position-y:60vw]";

export function MotifsBords() {
  return (
    <>
      <div aria-hidden className={`${bande} left-[-3.229vw]`}>
        <div className={motif} />
      </div>
      <div aria-hidden className={`${bande} right-[-3.229vw] rotate-180`}>
        <div className={motif} />
      </div>
    </>
  );
}
