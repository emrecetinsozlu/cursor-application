import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Button size="lg" className="gap-2 rounded-full px-6 text-sm">
          Hemen kart oluştur
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2 rounded-full border-primary/40 bg-background/40 px-6 text-sm text-primary hover:bg-primary/10"
        >
          Canlı önizlemeyi gör
        </Button>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span>Kaydolmadan demo deneyimi</span>
      </div>
    </div>
  );
}
