"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, RotateCw, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

function normalizeAnswer(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

type StudyViewClientProps = {
  deck: { id: number; title: string };
  cards: Array<{ id: number; front: string; back: string }>;
};

export function StudyViewClient({ deck, cards }: StudyViewClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState("");
  /** Once the back of the card is shown, answer is locked for this card. */
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const total = cards.length;
  const hasCards = total > 0;
  const currentCard = hasCards ? cards[currentIndex]! : null;
  const canGoPrev = hasCards && currentIndex > 0;
  const canGoNext = hasCards && currentIndex < total - 1;

  const isCorrect = useMemo(() => {
    if (!answerRevealed || !currentCard) return null;
    return (
      normalizeAnswer(answer) === normalizeAnswer(currentCard.back)
    );
  }, [answerRevealed, answer, currentCard]);

  const flip = useCallback(() => {
    setIsFlipped((prev) => {
      const next = !prev;
      if (next) setAnswerRevealed(true);
      return next;
    });
  }, []);
  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setCurrentIndex((i) => i - 1);
    setIsFlipped(false);
    setAnswer("");
    setAnswerRevealed(false);
  }, [canGoPrev]);
  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setCurrentIndex((i) => i + 1);
    setIsFlipped(false);
    setAnswer("");
    setAnswerRevealed(false);
  }, [canGoNext]);

  if (!hasCards) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-16 text-center">
        <Layers className="mb-4 h-12 w-12 text-muted-foreground" aria-hidden />
        <h2 className="text-lg font-semibold text-foreground">
          Henüz kart yok
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Bu destede çalışmak için önce kart ekleyin.
        </p>
        <Button className="mt-6" asChild>
          <Link href={`/decks/${deck.id}`}>Desteye dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {deck.title}
        </h1>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {currentIndex + 1} / {total}
        </p>
      </div>

      <div className="flex min-h-[280px] flex-col items-center justify-center">
        <Card
          className="w-full max-w-xl cursor-pointer select-none shadow-md transition-shadow hover:shadow-lg"
          onClick={flip}
        >
          <CardContent className="flex min-h-[240px] flex-col items-center justify-center p-8 text-center">
            <p className="text-lg text-foreground">
              {isFlipped ? currentCard!.back : currentCard!.front}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Kartı çevirmek için tıklayın
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "mt-6 w-full max-w-xl cursor-default py-0 shadow-md transition-[box-shadow,border-color]",
            "border-2",
            !answerRevealed && "border-border",
            answerRevealed &&
              isCorrect === true &&
              "border-green-600 dark:border-green-500",
            answerRevealed &&
              isCorrect === false &&
              "border-destructive",
          )}
          role="region"
          aria-labelledby="study-answer-label"
        >
          <CardContent className="flex flex-col gap-3 p-6 pt-5">
            <label
              id="study-answer-label"
              htmlFor="study-answer"
              className="text-sm font-medium text-foreground"
            >
              Cevabınız
            </label>
            <Input
              id="study-answer"
              name="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={answerRevealed}
              placeholder="Çevirmeden önce yazın…"
              autoComplete="off"
              spellCheck={false}
              className="h-10 bg-background disabled:cursor-not-allowed disabled:opacity-90"
              aria-describedby="study-answer-hint"
              aria-invalid={answerRevealed && isCorrect === false}
              onClick={(e) => e.stopPropagation()}
            />
            <p
              id="study-answer-hint"
              className={cn(
                "text-xs",
                !answerRevealed && "text-muted-foreground",
                answerRevealed &&
                  isCorrect === true &&
                  "font-medium text-green-700 dark:text-green-400",
                answerRevealed &&
                  isCorrect === false &&
                  "font-medium text-destructive",
              )}
            >
              {!answerRevealed &&
                "Kartı çevirmeden önce cevabınızı yazın; çevirince kilitlenir."}
              {answerRevealed && isCorrect === true && "Doğru — arka yüzle eşleşiyor."}
              {answerRevealed && isCorrect === false && "Yanlış — arka yüzle karşılaştırın."}
            </p>
          </CardContent>
        </Card>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-4 gap-2"
          onClick={(e) => {
            e.stopPropagation();
            flip();
          }}
        >
          <RotateCw className="h-4 w-4" />
          Çevir
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="default"
          className="gap-2"
          disabled={!canGoPrev}
          onClick={goPrev}
          aria-label="Önceki kart"
        >
          <ChevronLeft className="h-4 w-4" />
          Önceki
        </Button>
        <Button
          type="button"
          variant="outline"
          size="default"
          className="gap-2"
          disabled={!canGoNext}
          onClick={goNext}
          aria-label="Sonraki kart"
        >
          Sonraki
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
