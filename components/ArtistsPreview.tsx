import { prisma } from "@/lib/prisma";

export default async function ArtistsPreview() {
  const artists = await prisma.artist.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <section
      id="artists"
      className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mb-16">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-(--muted)">
          02 — The Artists
        </p>

        <h2 className="max-w-5xl text-5xl font-bold tracking-tighter md:text-8xl">
          MEET THE HANDS
          <br />
          <span className="text-(--muted)">BEHIND THE INK.</span>
        </h2>
      </div>

      <div className="border-t border-white/10">
        {artists.map((artist) => (
          <a
            key={artist.id}
            href={`/artists/${artist.slug}`}
            className="group flex flex-col gap-6 border-b border-white/10 py-8 transition-all hover:px-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-6">
              <span className="text-xs text-(--muted)">
                {String(artist.id).padStart(2, "0")}
              </span>

              <h3 className="text-3xl font-bold tracking-tight md:text-5xl">
                {artist.name}
              </h3>
            </div>

            <div className="flex items-center justify-between gap-8 md:justify-end">
              <span className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                {artist.specialty}
              </span>

              <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-10 max-w-lg text-sm leading-7 text-(--muted) md:text-base">
        Different styles. Different stories. One studio. Explore our artists,
        their specialties, and the work that defines them.
      </p>
    </section>
  );
}