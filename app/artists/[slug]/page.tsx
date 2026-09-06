import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type ArtistPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtistPage({
  params,
}: ArtistPageProps) {
  const { slug } = await params;

  const artist = await prisma.artist.findUnique({
    where: {
      slug,
    },
    include: {
      tattoos: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!artist) {
    notFound();
  }

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

      {/* Artist introduction */}
      <section className="border-b border-white/10 px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
              Artist
            </p>

            <h1 className="text-6xl font-bold leading-[0.85] tracking-tighter md:text-9xl">
              {artist.name}
            </h1>
          </div>

          <div>
            {artist.specialty && (
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-(--accent)">
                {artist.specialty}
              </p>
            )}

            {artist.bio && (
              <p className="max-w-lg text-sm leading-7 text-(--muted) md:text-base">
                {artist.bio}
              </p>
            )}

            {artist.instagram && (
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-xs uppercase tracking-[0.2em] transition-colors hover:text-(--accent)"
              >
                Instagram ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Artist portfolio */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-(--muted)">
            Selected Work
          </p>

          <h2 className="text-5xl font-bold tracking-tighter md:text-7xl">
            THE WORK.
          </h2>
        </div>

        {artist.tattoos.length === 0 ? (
          <p className="text-sm text-(--muted)">
            No portfolio work has been added yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {artist.tattoos.map((tattoo) => (
              <article
                key={tattoo.id}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-white/10 bg-[#151515] p-6"
              >
            {tattoo.image && (
                <img
                    src={tattoo.image}
                    alt={`${tattoo.title} tattoo by ${artist.name}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            )}

                <div className="relative z-10 border-t border-white/10 bg-black/50 pt-4 backdrop-blur-sm">
                  <p className="text-sm font-medium">
                    {tattoo.title}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-(--muted)">
                    {tattoo.style}
                  </p>

                  {tattoo.description && (
                    <p className="mt-4 max-w-md text-sm leading-6 text-(--muted)">
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
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-(--muted)">
              Work with {artist.name}
            </p>

            <h2 className="text-5xl font-bold tracking-tighter md:text-7xl">
              READY TO GET
              <br />
              <span className="text-(--muted)">INKED?</span>
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