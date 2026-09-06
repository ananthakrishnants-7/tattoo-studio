"use client";

import { FormEvent, useState } from "react";

type EditArtistFormProps = {
  artist: {
    id: number;
    name: string;
    slug: string;
    specialty: string | null;
    bio: string | null;
    instagram: string | null;
  };
};

export default function EditArtistForm({
  artist,
}: EditArtistFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(artist.name);
  const [slug, setSlug] = useState(artist.slug);
  const [specialty, setSpecialty] = useState(artist.specialty ?? "");
  const [bio, setBio] = useState(artist.bio ?? "");
  const [instagram, setInstagram] = useState(artist.instagram ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/artists", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: artist.id,
          name,
          slug,
          specialty,
          bio,
          instagram,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update artist.");
      }

      setMessage("Artist updated successfully.");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update artist."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:border-white hover:text-white"
      >
        {open ? "Close Editor ↑" : "Edit Artist →"}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor={`edit-name-${artist.id}`}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              Name
            </label>

            <input
              id={`edit-name-${artist.id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            />
          </div>

          <div>
            <label
              htmlFor={`edit-slug-${artist.id}`}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              URL Slug
            </label>

            <input
              id={`edit-slug-${artist.id}`}
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              required
              className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            />
          </div>

          <div>
            <label
              htmlFor={`edit-specialty-${artist.id}`}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              Specialty
            </label>

            <input
              id={`edit-specialty-${artist.id}`}
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value)}
              className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            />
          </div>

          <div>
            <label
              htmlFor={`edit-instagram-${artist.id}`}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              Instagram
            </label>

            <input
              id={`edit-instagram-${artist.id}`}
              type="url"
              value={instagram}
              onChange={(event) => setInstagram(event.target.value)}
              className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor={`edit-bio-${artist.id}`}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              Bio
            </label>

            <textarea
              id={`edit-bio-${artist.id}`}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
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
              className="border border-(--accent) px-6 py-4 text-xs uppercase tracking-[0.2em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}