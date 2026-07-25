export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-accent-glow" />
    </div>
  );
}
