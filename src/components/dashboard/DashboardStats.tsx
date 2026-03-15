import { Card, CardContent } from "@/components/ui/card";
import { Layers, FileQuestion, BookOpen } from "lucide-react";

type DashboardStatsProps = {
  deckCount: number;
  cardCount: number;
};

export function DashboardStats({ deckCount, cardCount }: DashboardStatsProps) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold tabular-nums text-foreground">
                  {deckCount}
                </p>
                <p className="text-xs text-muted-foreground">Toplam destek</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <FileQuestion className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold tabular-nums text-foreground">
                  {cardCount}
                </p>
                <p className="text-xs text-muted-foreground">Toplam kart</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold tabular-nums text-foreground">
                  {deckCount > 0 ? Math.round(cardCount / deckCount) : 0}
                </p>
                <p className="text-xs text-muted-foreground">Destek başına kart</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
