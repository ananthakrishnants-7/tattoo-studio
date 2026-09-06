import { prisma } from "@/lib/prisma";

export default async function ContactSection() {
  const settings = await prisma.studioSettings.findUnique({
    where: {
      id: 1,
    },
  });

  return (
    <section
      id="contact"
      className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
            05 — Find Us
          </p>

          <h2 className="text-5xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
            COME
            <br />
            <span className="text-(--muted)">SAY HELLO.</span>
          </h2>
        </div>

        <div className="grid gap-10 text-sm md:grid-cols-2">
          {/* Studio */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-(--muted)">
              Studio
            </p>

            <p className="leading-7">
              {settings?.address ?? "Address unavailable"}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-(--muted)">
              Contact
            </p>

            <div className="flex flex-col gap-2">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors hover:text-(--accent)"
                >
                  {settings.email}
                </a>
              )}

              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="transition-colors hover:text-(--accent)"
                >
                  {settings.phone}
                </a>
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-(--muted)">
              Social
            </p>

            <div className="flex flex-col gap-2">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-(--accent)"
                >
                  Instagram ↗
                </a>
              )}

              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-(--accent)"
                >
                  WhatsApp ↗
                </a>
              )}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-(--muted)">
              Hours
            </p>

            <p className="leading-7">
              {settings?.openingHours ?? "Hours unavailable"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}