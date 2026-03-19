"use client";

import { Badge } from "@/components/ui/badge";

type Props = {
  correct: number;
  incorrect: number;
  accuracy?: number;
  size?: "sm" | "md";
};

export function StudyScoreBadges({
  correct,
  incorrect,
  accuracy,
  size = "md",
}: Props) {
  const badgeClass =
    size === "sm" ? "h-5 px-2 text-[11px]" : "h-6 px-2.5 text-sm";

  return (
    <div
      className="flex flex-wrap items-center gap-2 text-muted-foreground"
      aria-label="Skor"
    >
      <Badge variant="secondary" className={badgeClass}>
        Doğru <span className="ml-1 tabular-nums">{correct}</span>
      </Badge>
      <Badge variant="outline" className={badgeClass}>
        Yanlış <span className="ml-1 tabular-nums">{incorrect}</span>
      </Badge>
      {accuracy !== undefined && (
        <Badge variant="outline" className={badgeClass}>
          Doğruluk <span className="ml-1 tabular-nums">%{accuracy}</span>
        </Badge>
      )}
    </div>
  );
}

