"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  answer: string;
  onAnswerChange: (value: string) => void;
  answerRevealed: boolean;
  isCorrect: boolean | null;
};

export function StudyAnswerPanel({
  answer,
  onAnswerChange,
  answerRevealed,
  isCorrect,
}: Props) {
  return (
    <Card
      className={cn(
        "mt-6 w-full cursor-default py-0 shadow-md transition-[box-shadow,border-color]",
        "border-2",
        !answerRevealed && "border-border",
        answerRevealed && isCorrect === true && "border-green-600 dark:border-green-500",
        answerRevealed && isCorrect === false && "border-destructive",
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
          onChange={(e) => onAnswerChange(e.target.value)}
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
            answerRevealed && isCorrect === true && "font-medium text-green-700 dark:text-green-400",
            answerRevealed && isCorrect === false && "font-medium text-destructive",
          )}
        >
          {!answerRevealed &&
            "Kartı çevirmeden önce cevabınızı yazın; çevirince kilitlenir."}
          {answerRevealed && isCorrect === true && "Doğru — arka yüzle eşleşiyor."}
          {answerRevealed && isCorrect === false && "Yanlış — arka yüzle karşılaştırın."}
        </p>
      </CardContent>
    </Card>
  );
}

