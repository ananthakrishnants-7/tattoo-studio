"use client";

import { FormEvent, useState } from "react";

export default function AddArtistForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          specialty,
          bio,
          instagram,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create artist.");
      }

      setMessage("Artist created successfully.");

      setName("");
      setSlug("");
      setSpecialty("");
      setBio("");
      setInstagram("");

      window.location.reload();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create artist."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-16 border border-white/10 p-6 md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-(--muted)">
          Add Artist
        </p>

        <h2 className="text-2xl font-bold md:text-3xl">
          NEW ARTIST
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
        <div>
          <label
            htmlFor="artist-name"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Name *
          </label>

          <input
            id="artist-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-(--accent)"
            placeholder="Artist name"
          />
        </div>

        <div>
          <label
            htmlFor="artist-slug"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            URL Slug *
          </label>

          <input
            id="artist-slug"
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-(--accent)"
            placeholder="artist-name"
          />
        </div>

        <div>
          <label
            htmlFor="artist-specialty"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Specialty
          </label>

          <input
            id="artist-specialty"
            type="text"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-(--accent)"
            placeholder="Blackwork"
          />
        </div>

        <div>
          <label
            htmlFor="artist-instagram"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Instagram
          </label>

          <input
            id="artist-instagram"
            type="url"
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-(--accent)"
            placeholder="https://instagram.com/..."
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="artist-bio"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Bio
          </label>

          <textarea
            id="artist-bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            rows={4}
            className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors focus:border-(--accent)"
            placeholder="Short artist biography..."
          />
        </div>

        {message && (
          <p className="text-sm text-(--muted) md:col-span-2">
            {message}
          </p>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="border border-(--accent) px-6 py-4 text-xs uppercase tracking-[0.2em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Add Artist →"}
          </button>
        </div>
      </form>
    </section>
  );
}
