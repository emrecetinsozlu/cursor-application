"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { StudyEmptyState } from "./components/StudyEmptyState";
import { StudyHeader } from "./components/StudyHeader";
import { StudyFlashcard } from "./components/StudyFlashcard";
import { StudyAnswerPanel } from "./components/StudyAnswerPanel";
import { StudyNav } from "./components/StudyNav";
import { StudySessionSummary } from "./components/StudySessionSummary";
import { Button } from "@/components/ui/button";

function normalizeAnswer(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function shuffleArray<T>(arr: T[]) {
  // Fisher–Yates shuffle (in-place copy)
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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
  const [orderedIds, setOrderedIds] = useState<number[] | null>(null);
  const [resultsByCardId, setResultsByCardId] = useState<Record<number, boolean>>(
    {},
  );
  const [sessionPhase, setSessionPhase] = useState<"study" | "summary">(
    "study",
  );

  const total = cards.length;
  const hasCards = total > 0;

  const orderedCards = useMemo(() => {
    if (!hasCards) return cards;

    const ids = orderedIds && orderedIds.length === cards.length ? orderedIds : null;
    if (!ids) return cards;

    const byId = new Map(cards.map((c) => [c.id, c] as const));
    const mapped = ids.map((id) => byId.get(id)).filter(Boolean) as typeof cards;
    // If mapping failed due to data changes, fall back to current list order.
    return mapped.length === cards.length ? mapped : cards;
  }, [orderedIds, cards, hasCards]);

  const currentCard = hasCards ? orderedCards[currentIndex]! : null;
  const canGoPrev = hasCards && currentIndex > 0;
  const canGoNext = hasCards && currentIndex < total - 1;
  const progressPercent =
    total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  const isCorrect = useMemo(() => {
    if (!answerRevealed || !currentCard) return null;
    return (
      normalizeAnswer(answer) === normalizeAnswer(currentCard.back)
    );
  }, [answerRevealed, answer, currentCard]);

  const score = useMemo(() => {
    const values = Object.values(resultsByCardId);
    const correct = values.filter(Boolean).length;
    const incorrect = values.filter((v) => !v).length;
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { correct, incorrect, attempted, accuracy };
  }, [resultsByCardId]);

  const resetPerCardState = useCallback(() => {
    setIsFlipped(false);
    setAnswer("");
    setAnswerRevealed(false);
  }, []);

  const flip = useCallback(() => {
    setIsFlipped((prev) => {
      const next = !prev;
      if (next) {
        setAnswerRevealed(true);
        if (currentCard) {
          setResultsByCardId((rPrev) => {
            if (rPrev[currentCard.id] !== undefined) return rPrev;
            const correct =
              normalizeAnswer(answer) === normalizeAnswer(currentCard.back);
            return { ...rPrev, [currentCard.id]: correct };
          });
        }
      }
      return next;
    });
  }, [answer, currentCard]);
  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setCurrentIndex((i) => i - 1);
    resetPerCardState();
  }, [canGoPrev, resetPerCardState]);
  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setCurrentIndex((i) => i + 1);
    resetPerCardState();
  }, [canGoNext, resetPerCardState]);

  const shuffleNow = useCallback(() => {
    if (!hasCards) return;
    const ids = shuffleArray(cards.map((c) => c.id));
    setOrderedIds(ids);
    setCurrentIndex(0);
    setResultsByCardId({});
    setSessionPhase("study");
    resetPerCardState();
  }, [cards, hasCards, resetPerCardState]);

  const studyAgainFromSummary = useCallback(() => {
    setSessionPhase("study");
    setCurrentIndex(0);
    setResultsByCardId({});
    resetPerCardState();
  }, [resetPerCardState]);

  if (!hasCards) {
    return <StudyEmptyState deckId={deck.id} />;
  }

  /** Same width as soru kartı — tek sütun, ortalanmış */
  const studyColumnClass = "mx-auto w-full max-w-xl";

  if (sessionPhase === "summary") {
    return (
      <div className={cn(studyColumnClass)}>
        <StudySessionSummary
          deckTitle={deck.title}
          deckId={deck.id}
          totalCards={total}
          score={score}
          onStudyAgain={studyAgainFromSummary}
        />
      </div>
    );
  }

  const isLastCardRevealed =
    currentIndex === total - 1 && answerRevealed;

  return (
    <div className={cn(studyColumnClass, "space-y-8")}>
      <StudyHeader
        title={deck.title}
        currentIndex={currentIndex}
        total={total}
        progressPercent={progressPercent}
        score={score}
        onShuffle={() => {
          shuffleNow();
        }}
      />

      <div>
        <StudyFlashcard
          front={currentCard!.front}
          back={currentCard!.back}
          isFlipped={isFlipped}
          onFlip={flip}
        />
        <StudyAnswerPanel
          answer={answer}
          onAnswerChange={setAnswer}
          answerRevealed={answerRevealed}
          isCorrect={isCorrect}
        />
        {isLastCardRevealed && (
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              size="lg"
              className="min-w-[200px]"
              onClick={() => setSessionPhase("summary")}
            >
              Özete geç
            </Button>
          </div>
        )}
      </div>

      <StudyNav
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
