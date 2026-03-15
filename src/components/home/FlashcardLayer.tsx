export type FlashcardLayerProps = {
  side: "front" | "back";
  label: string;
  text: string;
  helper: string;
  color: string;
  className?: string;
  isActive?: boolean;
};

export function FlashcardLayer({
  side,
  label,
  text,
  helper,
  color,
  className,
  isActive,
}: FlashcardLayerProps) {
  return (
    <div
      className={`card-layer absolute flex h-40 w-64 flex-col justify-between rounded-2xl border border-border/60 bg-gradient-to-br ${color} p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.65)] ${
        isActive ? "ring-2 ring-primary/70" : "opacity-80"
      } ${className ?? ""}`}
    >
      <div className="flex items-center justify-between text-[0.6rem] font-medium text-background/80">
        <span className="rounded-full bg-background/15 px-2 py-1">
          {side === "front" ? "Ön yüz" : "Arka yüz"}
        </span>
        <span>{label}</span>
      </div>
      <p className="text-xs font-medium text-background drop-shadow">
        {text}
      </p>
      <p className="text-[0.65rem] text-background/80">{helper}</p>
    </div>
  );
}
