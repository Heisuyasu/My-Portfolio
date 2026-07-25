import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="glow-blob absolute -z-10 h-96 w-96 rounded-full bg-accent/30" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-40" />

      <h1 className="font-display text-8xl font-bold text-gradient sm:text-9xl">404</h1>
      <p className="mt-4 text-lg text-foreground">This page drifted into deep space.</p>
      <p className="mt-2 max-w-md text-sm text-muted">
        The link you followed may be broken, or the page may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-glow transition-colors hover:bg-accent-glow"
      >
        <Home className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}
