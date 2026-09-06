export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 md:px-10">
      <div className="flex flex-col justify-between gap-6 text-xs uppercase tracking-[0.2em] text-(--muted) md:flex-row md:items-center">
        <p>
          © 2026 Ink Studio
        </p>

        <p>
          Built with intention.
        </p>

        <a
          href="#"
          className="transition-colors hover:text-(--accent)"
        >
          Instagram ↗
        </a>
      </div>
    </footer>
  );
}