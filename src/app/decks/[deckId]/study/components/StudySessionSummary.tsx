"use client";

import Link from "next/link";
import { BookOpen, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StudyScoreBadges } from "./StudyScoreBadges";
import { StudyActionBar } from "./StudyActionBar";

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
  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {deckTitle}
          </h1>
          <p className="text-sm text-muted-foreground">
            Çalışma özeti
          </p>
        </div>

        <div
          className="w-full space-y-2"
          role="group"
          aria-label="Çalışma tamamlandı"
        >
          <Progress value={100} className="h-2.5 w-full bg-muted" />
          <p className="text-xs text-muted-foreground">
            {totalCards} kartın tamamı tamamlandı
          </p>
        </div>

        <div className="text-xs">
          <StudyScoreBadges
            correct={score.correct}
            incorrect={score.incorrect}
            accuracy={score.accuracy}
            size="sm"
          />
        </div>
      </div>

      <Card className="w-full shadow-md">
        <CardContent className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="rounded-full bg-muted/80 p-3 text-muted-foreground">
            <BookOpen className="h-8 w-8" aria-hidden />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-medium text-foreground">
              Tebrikler!
            </p>
            <p className="text-sm text-muted-foreground">
              Bu desteyi bir tur tamamladınız. İsterseniz yeniden çalışabilir veya
              desteye dönebilirsiniz.
            </p>
          </div>
          {score.attempted > 0 && (
            <p className="text-sm tabular-nums text-muted-foreground">
              Cevap verilen kart:{" "}
              <span className="font-medium text-foreground">
                {score.attempted}
              </span>{" "}
              / {totalCards}
            </p>
          )}
        </CardContent>
      </Card>

      <StudyActionBar align="center" className="sm:justify-center">
        <Button
          type="button"
          size="lg"
          className="gap-2"
          onClick={onStudyAgain}
        >
          <RotateCcw className="h-4 w-4" />
          Yeniden çalış
        </Button>
        <Button size="lg" variant="outline" className="gap-2" asChild>
          <Link href={`/decks/${deckId}`}>Desteye dön</Link>
        </Button>
      </StudyActionBar>
    </div>
  );
}
