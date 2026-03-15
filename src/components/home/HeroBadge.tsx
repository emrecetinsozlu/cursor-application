import { Sparkles } from "lucide-react";

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
      <Sparkles className="h-3 w-3" />
      <span>Öğrenmeyi oyunlaştıran flashcard deneyimi</span>
    </div>
  );
}
