"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-(--muted) transition-colors hover:text-white"
        >
          ← Back to studio
        </Link>

        <div className="mt-16">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-(--muted)">
            Admin Access
          </p>

          <h1 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
            STUDIO
            <br />
            <span className="text-(--muted)">LOGIN.</span>
          </h1>

          <p className="mt-8 text-sm leading-7 text-(--muted)">
            Enter the studio administrator password to access booking
            requests.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <label
            htmlFor="password"
            className="mb-3 block text-xs uppercase tracking-[0.2em] text-(--muted)"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-sm outline-none transition-colors focus:border-(--accent)"
            placeholder="Enter admin password"
          />

          {error && (
            <p className="mt-6 border border-red-500/50 p-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full border border-(--accent) px-6 py-5 text-xs font-medium uppercase tracking-[0.25em] text-(--accent) transition-all hover:bg-(--accent) hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter Dashboard →"}
          </button>
        </form>
      </div>
    </main>
  );
}