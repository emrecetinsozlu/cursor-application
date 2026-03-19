"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shuffle } from "lucide-react";
import { StudyScoreBadges } from "./StudyScoreBadges";

type Props = {
  title: string;
  currentIndex: number;
  total: number;
  progressPercent: number;
  score: { correct: number; incorrect: number };
  onShuffle: () => void;
};

export function StudyHeader({
  title,
  currentIndex,
  total,
  progressPercent,
  score,
  onShuffle,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p
            className="text-sm tabular-nums text-muted-foreground"
            aria-live="polite"
          >
            Kart {currentIndex + 1} / {total}
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onShuffle}
            aria-label="Karıştır"
          >
            <Shuffle className="h-4 w-4" aria-hidden />
            Karıştır
          </Button>
          <div className="text-xs">
            <StudyScoreBadges
              correct={score.correct}
              incorrect={score.incorrect}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="w-full space-y-2" role="group" aria-label="Çalışma ilerlemesi">
        <Progress
          value={progressPercent}
          className="h-2.5 w-full bg-muted"
          aria-valuetext={`${currentIndex + 1} karttan ${total}, yüzde ${progressPercent}`}
        />
        <p className="text-xs text-muted-foreground">
          Destenin %{progressPercent}&apos;i tamamlandı
        </p>
      </div>
    </div>
  );
}

