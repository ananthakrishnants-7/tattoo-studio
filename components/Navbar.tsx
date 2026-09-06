import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/80 px-6 py-5 backdrop-blur-md md:px-10">
      <Link
        href="/"
        className="text-2xl font-black tracking-tighter"
      >
        INK<span className="text-(--accent)">.</span>
      </Link>

      <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] md:flex">
        <a
          href="#work"
          className="transition-opacity hover:opacity-50"
        >
          Work
        </a>

        <a
          href="#artists"
          className="transition-opacity hover:opacity-50"
        >
          Artists
        </a>

        <a
          href="#studio"
          className="transition-opacity hover:opacity-50"
        >
          Studio
        </a>

        <a
          href="#contact"
          className="transition-opacity hover:opacity-50"
        >
          Contact
        </a>

        <a
          href="#booking"
          className="border border-white/30 px-5 py-3 transition-all hover:bg-white hover:text-black"
        >
          Book
        </a>
      </div>

      <a
        href="#booking"
        className="text-xs font-bold uppercase tracking-[0.2em] md:hidden"
      >
        Book →
      </a>
    </nav>
  );
}