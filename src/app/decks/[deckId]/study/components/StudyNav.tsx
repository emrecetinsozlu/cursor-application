"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StudyActionBar } from "./StudyActionBar";

type Props = {
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onFinish?: () => void;
};

export function StudyNav({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onFinish,
}: Props) {
  return (
    <StudyActionBar
      className="w-full flex-col gap-2 sm:flex-row sm:justify-center sm:gap-4"
    >
      <Button
        type="button"
        variant="outline"
        size="default"
        className="w-full gap-2 sm:w-auto"
        disabled={!canGoPrev}
        onClick={onPrev}
        aria-label="Önceki kart"
      >
        <ChevronLeft className="h-4 w-4" />
        Önceki
      </Button>
      <Button
        type="button"
        variant="outline"
        size="default"
        className="w-full gap-2 sm:w-auto"
        disabled={!canGoNext}
        onClick={onNext}
        aria-label="Sonraki kart"
      >
        Sonraki
        <ChevronRight className="h-4 w-4" />
      </Button>
      {!canGoNext && onFinish && (
        <Button
          type="button"
          variant="default"
          size="default"
          className="w-full gap-2 sm:w-auto"
          onClick={onFinish}
          aria-label="Çalışmayı bitir"
        >
          Bitir
        </Button>
      )}
    </StudyActionBar>
  );
}

