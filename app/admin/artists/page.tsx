import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddArtistForm from "@/components/AddArtistForm";
import EditArtistForm from "@/components/EditArtistForm";
import DeleteArtistButton from "@/components/DeleteArtistButton";

export default async function AdminArtistsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const artists = await prisma.artist.findMany({
    include: {
      _count: {
        select: {
          tattoos: true,
          bookings: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <a
            href="/admin"
            className="text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:text-white"
          >
            ← Back to dashboard
          </a>

          <p className="mt-20 mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
            Studio Management
          </p>

          <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-9xl">
            THE
            <br />
            <span className="text-(--muted)">ARTISTS.</span>
          </h1>
        </div>
        <AddArtistForm />
        {/* Artist list */}
        <div className="border-t border-white/10">
          {artists.map((artist) => (
            <article
              key={artist.id}
              className="border-b border-white/10 py-8 md:py-10"
            >
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs text-(--muted)">
                      {String(artist.id).padStart(2, "0")}
                    </span>

                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                      {artist.name}
                    </h2>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-6 text-xs uppercase tracking-[0.15em] text-(--muted)">
                    {artist.specialty && (
                      <span>{artist.specialty}</span>
                    )}

                    <span>
                      {artist._count.tattoos} portfolio{" "}
                      {artist._count.tattoos === 1 ? "piece" : "pieces"}
                    </span>

                    <span>
                      {artist._count.bookings}{" "}
                      {artist._count.bookings === 1
                        ? "booking"
                        : "bookings"}
                    </span>
                  </div>

                  {artist.bio && (
                    <p className="mt-6 max-w-2xl text-sm leading-7 text-(--muted)">
                      {artist.bio}
                    </p>
                  )}
                </div>

                <a
                  href={`/artists/${artist.slug}`}
                  className="border border-white/20 px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:border-white hover:text-white"
                >
                  View Profile →
                </a>
                <EditArtistForm
                    artist={{
                        id: artist.id,
                        name: artist.name,
                        slug: artist.slug,
                        specialty: artist.specialty,
                        bio: artist.bio,
                        instagram: artist.instagram,
                    }}
                 />
                 <div className="mt-3">
                  <DeleteArtistButton
                    artistId={artist.id}
                    artistName={artist.name}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {artists.length === 0 && (
          <div className="border border-white/10 p-10">
            <p className="text-sm text-(--muted)">
              No artists have been added yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}   