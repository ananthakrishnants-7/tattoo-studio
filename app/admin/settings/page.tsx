import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StudioSettingsForm from "@/components/StudioSettingsForm";

export default async function AdminSettingsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const settings = await prisma.studioSettings.findUnique({
    where: {
      id: 1,
    },
  });

  const currentSettings = settings ?? {
    address: null,
    phone: null,
    email: null,
    instagram: null,
    whatsapp: null,
    openingHours: null,
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
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
            STUDIO
            <br />
            <span className="text-(--muted)">SETTINGS.</span>
          </h1>
        </div>

        <section className="border border-white/10 p-6 md:p-8">
          <div className="mb-10">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
              Public Information
            </p>

            <h2 className="text-2xl font-bold md:text-3xl">
              CONTACT & HOURS
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-(--muted)">
              These details appear on the public studio and contact
              sections of the website.
            </p>
          </div>

          <StudioSettingsForm settings={currentSettings} />
        </section>
      </div>
    </main>
  );
}   