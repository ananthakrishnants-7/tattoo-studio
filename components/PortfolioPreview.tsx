import { prisma } from "@/lib/prisma";

export default async function PortfolioPreview() {
  const tattoos = await prisma.tattoo.findMany({
    include: {
      artist: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 6,
  });

  return (
    <section
      id="work"
      className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32"
    >
      {/* Section heading */}
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-(--muted)">
            01 — Selected Work
          </p>

          <h2 className="text-5xl font-bold tracking-[-0.04em] md:text-7xl">
            RECENT INK.
          </h2>
        </div>

        <a
          href="/portfolio"
          className="hidden text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:text-white md:block"
        >
          View all work →
        </a>
      </div>

      {/* Tattoo grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {tattoos.map((tattoo) => (
          <article
            key={tattoo.id}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-white/10 bg-[#151515] p-6 transition-all duration-500 hover:bg-[#1d1d1d]"
          >
            {/* Tattoo image */}
            {tattoo.image && (
              <img
                src={tattoo.image}
                alt={`${tattoo.title} tattoo by ${tattoo.artist.name}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
            )}

            {/* Card information */}
            <div className="relative z-10 flex items-end justify-between border-t border-white/10 bg-black/50 pt-4 backdrop-blur-sm">
              <div>
                <p className="mb-1 text-sm font-medium">{tattoo.title}</p>

                <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  {tattoo.style}
                </p>
              </div>

              <span className="text-xs text-(--muted)">
                {String(tattoo.id).padStart(2, "0")}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile link */}
      <a
        href="/portfolio"
        className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-(--muted) md:hidden"
      >
        View all work →
      </a>
    </section>
  );
}