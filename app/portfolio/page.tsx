import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PortfolioPage() {
  const tattoos = await prisma.tattoo.findMany({
    include: {
      artist: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="border-b border-white/10 px-6 py-12 md:px-10 md:py-16">
        <Link

          href="/"
          className="text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:text-white"
        >
          ← Back to studio
        </Link>
      </section>

      {/* Page introduction */}
      <section className="border-b border-white/10 px-6 py-24 md:px-10 md:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
          01 — Portfolio
        </p>

        <h1 className="max-w-6xl text-6xl font-bold leading-[0.85] tracking-tighter md:text-9xl">
          THE
          <br />
          <span className="text-(--muted)">WORK.</span>
        </h1>

        <p className="mt-10 max-w-xl text-sm leading-7 text-(--muted) md:text-base">
          A selection of work from the artists at our studio. Different
          styles, different approaches, one commitment to good work.
        </p>
      </section>

      {/* Portfolio grid */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        {tattoos.length === 0 ? (
          <p className="text-sm text-(--muted)">
            No portfolio work has been added yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {tattoos.map((tattoo) => (
              <article
                key={tattoo.id}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-white/10 bg-[#151515] p-6 transition-colors duration-500 hover:bg-[#1d1d1d]"
              >
                {/* Tattoo image */}
                {tattoo.image && (
                    <img
                        src={tattoo.image}
                        alt={`${tattoo.title} tattoo by ${tattoo.artist.name}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                )}

                {/* Tattoo information */}
                <div className="relative z-10 border-t border-white/10 bg-black/50 pt-4 backdrop-blur-sm">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <h2 className="text-lg font-medium">
                        {tattoo.title}
                      </h2>

                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-(--muted)">
                        {tattoo.style}
                      </p>

                      <a
                        href={`/artists/${tattoo.artist.slug}`}
                        className="mt-3 inline-block text-xs uppercase tracking-[0.15em] text-(--accent) transition-opacity hover:opacity-70"
                      >
                        {tattoo.artist.name} →
                      </a>
                    </div>

                    <span className="text-xs text-(--muted)">
                      {String(tattoo.id).padStart(2, "0")}
                    </span>
                  </div>

                  {tattoo.description && (
                    <p className="mt-4 max-w-lg text-sm leading-6 text-(--muted)">
                      {tattoo.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Booking CTA */}
      <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-(--muted)">
              Like what you see?
            </p>

            <h2 className="text-5xl font-bold leading-[0.9] tracking-tighter md:text-7xl">
              LET&apos;S MAKE
              <br />
              <span className="text-(--muted)">SOMETHING.</span>
            </h2>
          </div>

          <a
            href="/booking"
            className="inline-block border border-(--accent) px-8 py-5 text-xs uppercase tracking-[0.25em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black"
          >
            Book an appointment →
          </a>
        </div>
      </section>
    </main>
  );
}