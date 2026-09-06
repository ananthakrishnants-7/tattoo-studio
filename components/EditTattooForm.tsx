"use client";

import { FormEvent, useState } from "react";

type Artist = {
  id: number;
  name: string;
};

type EditTattooFormProps = {
  tattoo: {
    id: number;
    title: string;
    style: string;
    description: string | null;
    image: string | null;
    artistId: number;
  };
  artists: Artist[];
};

export default function EditTattooForm({
  tattoo,
  artists,
}: EditTattooFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(tattoo.title);
  const [style, setStyle] = useState(tattoo.style);
  const [artistId, setArtistId] = useState(String(tattoo.artistId));
  const [description, setDescription] = useState(
    tattoo.description ?? ""
  );
  const [image, setImage] = useState(tattoo.image ?? "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/tattoos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tattoo.id,
          title,
          style,
          artistId,
          description,
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update tattoo.");
      }

      setMessage("Portfolio piece updated.");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update tattoo."
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
        {open ? "Close Editor ↑" : "Edit Tattoo →"}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-6 border-t border-white/10 pt-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor={`tattoo-title-${tattoo.id}`}
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
              >
                Title
              </label>

              <input
                id={`tattoo-title-${tattoo.id}`}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
              />
            </div>

            <div>
              <label
                htmlFor={`tattoo-style-${tattoo.id}`}
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
              >
                Style
              </label>

              <input
                id={`tattoo-style-${tattoo.id}`}
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                required
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
              />
            </div>

            <div>
              <label
                htmlFor={`tattoo-artist-${tattoo.id}`}
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
              >
                Artist
              </label>

              <select
                id={`tattoo-artist-${tattoo.id}`}
                value={artistId}
                onChange={(event) => setArtistId(event.target.value)}
                required
                className="w-full border-b border-white/20 bg-black px-0 py-3 text-sm outline-none focus:border-(--accent)"
              >
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`tattoo-image-${tattoo.id}`}
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
              >
                Image Path
              </label>

              <input
                id={`tattoo-image-${tattoo.id}`}
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="/images/tattoos/example.jpg"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`tattoo-description-${tattoo.id}`}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-(--muted)"
            >
              Description
            </label>

            <textarea
              id={`tattoo-description-${tattoo.id}`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
            />
          </div>

          {message && (
            <p className="text-sm text-(--muted)">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-fit border border-(--accent) px-6 py-4 text-xs uppercase tracking-[0.2em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes →"}
          </button>
        </form>
      )}
    </div>
  );
}