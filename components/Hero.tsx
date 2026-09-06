export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-end px-6 pb-12 pt-32 md:px-10 md:pb-16">
      <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-(--muted)">
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        Tattoo Studio — Est. 2026
      </div>

      <h1 className="max-w-6xl text-[18vw] font-black leading-[0.78] tracking-[-0.07em] md:text-[14vw]">
        MAKE IT
        <br />
        <span className="text-(--muted)">PERMANENT.</span>
      </h1>

      <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/15 pt-6 md:flex-row md:items-end">
        <p className="max-w-md text-sm leading-6 text-(--muted) md:text-base">
          Custom tattoos. Individual expression. Crafted by artists who give
          a damn.
        </p>

        <a
          href="#booking"
          className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.15em]"
        >
          Book an appointment
          <span className="text-xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>
    </section>
  );
}