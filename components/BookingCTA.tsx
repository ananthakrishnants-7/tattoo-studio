export default function BookingCTA() {
  return (
    <section
      id="booking"
      className="border-t border-white/10 px-6 py-32 md:px-10 md:py-48"
    >
      <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-(--muted)">
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        04 — Your Turn
      </div>

      <h2 className="max-w-6xl text-6xl font-black leading-[0.85] tracking-[-0.06em] md:text-[10vw]">
        LET&apos;S MAKE
        <br />
        SOMETHING
        <br />
        <span className="text-(--accent)">PERMANENT.</span>
      </h2>

      <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/10 pt-6 md:flex-row md:items-end">
        <p className="max-w-md text-sm leading-7 text-(--muted) md:text-base">
          Have an idea? Tell us about it. Whether it&apos;s your first tattoo
          or your fiftieth, we&apos;ll help turn the idea into something worth
          keeping.
        </p>

        <a
          href="/booking"
          className="group inline-flex items-center gap-5 self-start border border-white/30 px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black"
        >
          Book your session
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>
    </section>
  );
}