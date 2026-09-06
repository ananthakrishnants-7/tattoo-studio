import { prisma } from "@/lib/prisma";

export default async function StudioSection() {
  const settings = await prisma.studioSettings.findUnique({
    where: {
      id: 1,
    },
  });

  return (
    <section
      id="studio"
      className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
            03 — The Studio
          </p>

          <h2 className="text-5xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
            YOUR SKIN.
            <br />
            <span className="text-(--muted)">OUR CANVAS.</span>
          </h2>
        </div>

        <div>
          <p className="max-w-md text-sm leading-7 text-(--muted) md:text-base">
            A space built for creativity, conversation, and tattoos worth
            keeping forever. We believe getting tattooed should feel as good
            as the tattoo looks.
          </p>

          <div className="mt-10 grid grid-cols-2 border-t border-white/10 pt-6">
            <div>
              <p className="text-3xl font-bold">01</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
                Private Studios
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">05+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
                Years Experience
              </p>
            </div>
          </div>

          {/* Studio details from database */}
          {settings && (
            <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 text-sm md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Location
                </p>
                <p>{settings.address}</p>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Opening Hours
                </p>
                <p className="leading-6 text-(--muted)">
                  {settings.openingHours}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}