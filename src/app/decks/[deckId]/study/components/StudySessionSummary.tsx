"use client";

import Link from "next/link";
import {
  BookOpen,
  Check,
  CheckCircle2,
  PartyPopper,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type StudySessionSummaryScore = {
  correct: number;
  incorrect: number;
  attempted: number;
  accuracy: number;
};

type Props = {
  deckTitle: string;
  deckId: number;
  totalCards: number;
  score: StudySessionSummaryScore;
  onStudyAgain: () => void;
};

export function StudySessionSummary({
  deckTitle,
  deckId,
  totalCards,
  score,
  onStudyAgain,
}: Props) {
  const skipped = Math.max(0, totalCards - score.attempted);
  const hasAttempts = score.attempted > 0;

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <Card
        className={cn(
          "overflow-hidden rounded-2xl border-border/50 bg-card/80 shadow-lg backdrop-blur-sm",
          "ring-1 ring-border/40",
        )}
      >
        <CardHeader className="space-y-1 border-b border-border/40 pb-4">
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              aria-hidden
            >
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <CardTitle className="text-xl font-semibold leading-tight tracking-tight text-foreground">
                {deckTitle}
              </CardTitle>
              <CardDescription className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Çalışma özeti
              </CardDescription>
              
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Tur tamamlandı */}
          <div
            className="flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-2.5 text-sm"
            role="status"
          >
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            <span className="text-foreground">
              <span className="font-medium tabular-nums">{totalCards}</span>{" "}
              kartlık tur tamamlandı
            </span>
          </div>

          {/* Doğru / Yanlış — kart içinde vurgulu */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={cn(
                "rounded-xl border px-4 py-4 text-center shadow-sm",
                "border-emerald-500/35 bg-emerald-500/[0.12]",
                "dark:border-emerald-400/30 dark:bg-emerald-500/10",
              )}
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <Check className="h-4 w-4 stroke-[2.5]" aria-hidden />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200/90">
                Doğru
              </p>
              <p
                className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-emerald-700 dark:text-emerald-300"
                aria-label={`Doğru cevap sayısı: ${score.correct}`}
              >
                {score.correct}
              </p>
            </div>

            <div
              className={cn(
                "rounded-xl border px-4 py-4 text-center shadow-sm",
                "border-red-500/35 bg-red-500/[0.10]",
                "dark:border-red-400/30 dark:bg-red-500/10",
              )}
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20 text-red-700 dark:text-red-300">
                <X className="h-4 w-4 stroke-[2.5]" aria-hidden />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-800 dark:text-red-200/90">
                Yanlış
              </p>
              <p
                className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-red-700 dark:text-red-300"
                aria-label={`Yanlış cevap sayısı: ${score.incorrect}`}
              >
                {score.incorrect}
              </p>
            </div>
          </div>

          {/* Cevaplanan + doğruluk */}
          <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Cevap verilen kart</span>
              <span className="tabular-nums font-medium text-foreground">
                {score.attempted}
                <span className="text-muted-foreground"> / {totalCards}</span>
              </span>
            </div>

            {skipped > 0 && (
              <p className="text-xs text-amber-700 dark:text-amber-400/90">
                {skipped} kart cevap kaydı olmadan geçildi; tur yine de
                tamamlandı.
              </p>
            )}

            {hasAttempts ? (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Doğruluk</span>
                  <span
                    className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400"
                    aria-label={`Doğruluk yüzdesi: yüzde ${score.accuracy}`}
                  >
                    %{score.accuracy}
                  </span>
                </div>
                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={score.accuracy}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Doğruluk çubuğu"
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-[width] duration-500 ease-out dark:bg-emerald-400"
                    style={{ width: `${score.accuracy}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Bu turda hiç kart için cevap kaydı yok; yeniden çalışarak
                skorunuzu oluşturabilirsiniz.
              </p>
            )}
          </div>

          <Separator className="bg-border/60" />

          <div className="flex gap-3 rounded-lg border border-dashed border-border/70 bg-muted/10 px-4 py-3">
            <PartyPopper
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden
            />
            <div className="space-y-1 text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">Tebrikler!</p>
              <p>
                Bu desteyi bir tur tamamladınız. İsterseniz yeniden çalışabilir
                veya desteye dönebilirsiniz.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t border-border/40 bg-muted/20 pt-4 sm:flex-row sm:justify-stretch">
          <Button
            type="button"
            size="lg"
            className="w-full gap-2 sm:flex-1"
            onClick={onStudyAgain}
          >
            <RotateCcw className="h-4 w-4" />
            Yeniden çalış
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full gap-2 sm:flex-1"
            asChild
          >
            <Link href={`/decks/${deckId}`}>Desteye dön</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
