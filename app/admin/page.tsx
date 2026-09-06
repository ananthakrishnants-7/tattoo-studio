import { cookies } from "next/headers";
import { verifyAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";
import BookingActions from "@/components/BookingActions";
import Link from "next/link";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!verifyAdminSession(session?.value)) {
  redirect("/admin/login");
  }
  const bookings = await prisma.booking.findMany({
    include: {
      artist: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
       <div className="mb-16">
         <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:text-white"
    >
      ← Back to studio
    </Link>

    <LogoutButton />
  </div>

          <p className="mt-20 mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
            Admin Dashboard
          </p>

          <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-9xl">
            BOOKING
            <br />
            <span className="text-(--muted)">REQUESTS.</span>
          </h1>
        </div>

        {/* Booking count */}
        <div className="mb-10 border-y border-white/10 py-6">
          <p className="text-xs uppercase tracking-[0.2em] text-(--muted)">
            Total Requests
          </p>

          <p className="mt-2 text-4xl font-bold">{bookings.length}</p>
        </div>

        {/* Bookings */}
        {bookings.length === 0 ? (
          <div className="border border-white/10 p-10">
            <p className="text-sm text-(--muted)">
              No booking requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="border border-white/10 p-6 transition-colors hover:border-white/20 md:p-8"
              >
                <div className="grid gap-8 md:grid-cols-[1fr_auto]">
                  {/* Customer */}
                  <div>
                    <div className="flex flex-wrap items-center gap-4">
                      <h2 className="text-2xl font-bold">
                        {booking.customerName}
                      </h2>

                      <span className="border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-6 text-sm md:grid-cols-2">
                      {/* Contact */}
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                          Contact
                        </p>

                        <div className="space-y-1">
                          <p>{booking.email}</p>

                          {booking.phone && <p>{booking.phone}</p>}
                        </div>
                      </div>

                      {/* Artist */}
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                          Artist
                        </p>

                        <p>
                          {booking.artist?.name ?? "No artist selected"}
                        </p>

                        {booking.tattooStyle && (
                          <p className="mt-1 text-(--muted)">
                            {booking.tattooStyle}
                          </p>
                        )}
                      </div>

                      {/* Appointment */}
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                          Preferred Appointment
                        </p>

                        <p>
                          {booking.preferredDate.toLocaleDateString("en-IN")}
                        </p>

                        {booking.preferredTime && (
                          <p className="mt-1 text-(--muted)">
                            {booking.preferredTime}
                          </p>
                        )}
                      </div>

                      {/* Submitted */}
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                          Submitted
                        </p>

                        <p>
                          {booking.createdAt.toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    {booking.message && (
                      <div className="mt-8 border-t border-white/10 pt-6">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                          Message
                        </p>

                        <p className="max-w-3xl text-sm leading-7 text-(--muted)">
                          {booking.message}
                        </p>
                      </div>
                    )}

                    {/* Status controls */}
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status}
                    />
                  </div>

                  {/* Booking ID */}
                  <div className="text-left md:text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-(--muted)">
                      Request
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      #{String(booking.id).padStart(3, "0")}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}