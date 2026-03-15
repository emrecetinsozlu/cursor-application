export function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="floating-dots" />
    </div>
  );
}
