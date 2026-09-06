"use client";

import { FormEvent, useState } from "react";

type Artist = {
  id: number;
  name: string;
};

type AddTattooFormProps = {
  artists: Artist[];
};

export default function AddTattooForm({
  artists,
}: AddTattooFormProps) {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/tattoos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          style,
          artistId,
          description,
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create tattoo.");
      }

      setMessage("Portfolio piece added successfully.");

      setTitle("");
      setStyle("");
      setArtistId("");
      setDescription("");
      setImage("");

      window.location.reload();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create tattoo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label
            htmlFor="tattoo-title"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Title *
          </label>

          <input
            id="tattoo-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Blackwork Study"
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
          />
        </div>

        <div>
          <label
            htmlFor="tattoo-style"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Style *
          </label>

          <input
            id="tattoo-style"
            value={style}
            onChange={(event) => setStyle(event.target.value)}
            required
            placeholder="Blackwork"
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
          />
        </div>

        <div>
          <label
            htmlFor="tattoo-artist"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Artist *
          </label>

          <select
            id="tattoo-artist"
            value={artistId}
            onChange={(event) => setArtistId(event.target.value)}
            required
            className="w-full border-b border-white/20 bg-black px-0 py-3 text-sm outline-none focus:border-(--accent)"
          >
            <option value="">Select artist</option>

            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="tattoo-image"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Image Path
          </label>

          <input
            id="tattoo-image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="/images/tattoos/example.jpg"
            className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none focus:border-(--accent)"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="tattoo-description"
          className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
        >
          Description
        </label>

        <textarea
          id="tattoo-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder="Describe the piece..."
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
        {loading ? "Adding..." : "Add Portfolio Piece →"}
      </button>
    </form>
  );
}