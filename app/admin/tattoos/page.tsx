import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddTattooForm from "@/components/AddTattooForm";
import EditTattooForm from "@/components/EditTattooForm";
import DeleteTattooButton from "@/components/DeleteTattooButton";

export default async function AdminTattoosPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const tattoos = await prisma.tattoo.findMany({
    include: {
      artist: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const artists = await prisma.artist.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
            <span className="text-(--muted)">WORK.</span>
          </h1>
        </div>

        {/* Add tattoo placeholder */}
        <section className="mb-16 border border-white/10 p-6 md:p-8">
            <div className="mb-8">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
                    Portfolio Management
                </p>

                <h2 className="text-2xl font-bold md:text-3xl">
                    NEW TATTOO
                </h2>
            </div>

            <AddTattooForm
                artists={artists.map((artist) => ({
                id: artist.id,
                 name: artist.name,
            }))}
            />
        </section>

        {/* Existing tattoos */}
        <div className="border-t border-white/10">
          {tattoos.map((tattoo) => (
            <article
              key={tattoo.id}
              className="border-b border-white/10 py-8 md:py-10"
            >
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs text-(--muted)">
                      {String(tattoo.id).padStart(2, "0")}
                    </span>

                    <h2 className="text-2xl font-bold md:text-4xl">
                      {tattoo.title}
                    </h2>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-6 text-xs uppercase tracking-[0.15em] text-(--muted)">
                    <span>{tattoo.style}</span>

                    <span>
                      Artist: {tattoo.artist.name}
                    </span>
                  </div>

                  {tattoo.description && (
                    <p className="mt-6 max-w-2xl text-sm leading-7 text-(--muted)">
                      {tattoo.description}
                    </p>
                  )}

                  {tattoo.image && (
                    <p className="mt-4 break-all text-xs text-(--muted)">
                      Image: {tattoo.image}
                    </p>
                  )}
                </div>

                <a
                  href={`/artists/${tattoo.artist.slug}`}
                  className="border border-white/20 px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:border-white hover:text-white"
                >
                  View Artist →
                </a>
                <EditTattooForm
                    tattoo={{
                        id: tattoo.id,
                        title: tattoo.title,
                        style: tattoo.style,
                        description: tattoo.description,
                        image: tattoo.image,
                        artistId: tattoo.artistId,
                    }}
                    artists={artists.map((artist) => ({
                        id: artist.id,
                        name: artist.name,
                    }))}
                />

<DeleteTattooButton
  tattooId={tattoo.id}
  tattooTitle={tattoo.title}
/>
              </div>
            </article>
          ))}
        </div>

        {tattoos.length === 0 && (
          <div className="border border-white/10 p-10">
            <p className="text-sm text-(--muted)">
              No portfolio work has been added yet.
            </p>
          </div>
        )}

        {/* Available artists */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-(--muted)">
            Available Artists
          </p>

          <div className="flex flex-wrap gap-3">
            {artists.map((artist) => (
              <span
                key={artist.id}
                className="border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.15em]"
              >
                {artist.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}