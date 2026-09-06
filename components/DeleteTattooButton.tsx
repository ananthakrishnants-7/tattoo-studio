"use client";

import { useState } from "react";

type DeleteTattooButtonProps = {
  tattooId: number;
  tattooTitle: string;
};

export default function DeleteTattooButton({
  tattooId,
  tattooTitle,
}: DeleteTattooButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${tattooTitle}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/tattoos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tattooId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete tattoo.");
      }

      window.location.reload();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete tattoo."
      );

      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="mt-3 border border-red-500/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-red-400 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-black disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete Tattoo"}
    </button>
  );
}