"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Artist = {
  id: number;
  name: string;
  specialty: string | null;
};

export default function BookingPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtists() {
      try {
        const response = await fetch("/api/artists");

        if (!response.ok) {
          throw new Error("Failed to load artists");
        }

        const data = await response.json();
        setArtists(data.artists);
      } catch {
        setError("Unable to load artists. Please refresh the page.");
      } finally {
        setLoadingArtists(false);
      }
    }

    loadArtists();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setSuccess(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookingData = {
      customerName: formData.get("customerName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      artistId: formData.get("artistId"),
      tattooStyle: formData.get("tattooStyle"),
      preferredDate: formData.get("preferredDate"),
      preferredTime: formData.get("preferredTime"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your booking."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:text-white"
        >
          ← Back to studio
        </Link>

        {/* Header */}
        <div className="mt-20 mb-16">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
            06 — Book a Session
          </p>

          <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-9xl">
            LET&apos;S MAKE
            <br />
            <span className="text-(--muted)">IT PERMANENT.</span>
          </h1>

          <p className="mt-8 max-w-xl text-sm leading-7 text-(--muted) md:text-base">
            Tell us a little about your idea and preferred appointment. We&apos;ll
            review your request and get back to you to confirm the details.
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div className="mb-10 border border-(--accent) p-6">
            <p className="text-sm font-medium">
              Booking request received.
            </p>

            <p className="mt-2 text-sm leading-6 text-(--muted)">
              Your request has been submitted successfully. We&apos;ll be in
              touch to confirm your appointment.
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-10 border border-red-500/50 p-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Booking form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Personal details */}
          <div>
            <h2 className="mb-8 text-xs uppercase tracking-[0.25em] text-(--muted)">
              Your Details
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="customerName"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Name *
                </label>

                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                  placeholder="+91 ..."
                />
              </div>
            </div>
          </div>

          {/* Tattoo details */}
          <div>
            <h2 className="mb-8 text-xs uppercase tracking-[0.25em] text-(--muted)">
              Tattoo Details
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="artistId"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Preferred Artist *
                </label>

                <select
                  id="artistId"
                  name="artistId"
                  required
                  disabled={loadingArtists}
                  className="w-full border-b border-white/20 bg-black px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                >
                  <option value="">
                    {loadingArtists ? "Loading artists..." : "Select an artist"}
                  </option>

                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                      {artist.specialty ? ` — ${artist.specialty}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="tattooStyle"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Tattoo Style
                </label>

                <input
                  id="tattooStyle"
                  name="tattooStyle"
                  type="text"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                  placeholder="Blackwork, fine line, traditional..."
                />
              </div>
            </div>
          </div>

          {/* Appointment */}
          <div>
            <h2 className="mb-8 text-xs uppercase tracking-[0.25em] text-(--muted)">
              Preferred Appointment
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Preferred Date *
                </label>

                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
                >
                  Preferred Time
                </label>

                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              Tell Us About Your Idea
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full resize-none border border-white/10 bg-white/[0.02] p-4 text-sm outline-none transition-colors focus:border-(--accent)"
              placeholder="Describe your tattoo idea, size, placement, references, or anything else we should know..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || loadingArtists}
            className="w-full border border-(--accent) px-6 py-5 text-xs font-medium uppercase tracking-[0.25em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Request Appointment →"}
          </button>
        </form>
      </div>
    </main>
  );
}