"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { StudyActionBar } from "./StudyActionBar";

type Props = {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
};

export function StudyFlashcard({ front, back, isFlipped, onFlip }: Props) {
  return (
    <div className="flex min-h-[280px] flex-col">
      <Card
        className="w-full cursor-pointer select-none shadow-md transition-shadow hover:shadow-lg"
        onClick={onFlip}
      >
        <CardContent className="flex min-h-[240px] flex-col items-center justify-center p-8 text-center">
          <p className="text-lg text-foreground">{isFlipped ? back : front}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Kartı çevirmek için tıklayın
          </p>
        </CardContent>
      </Card>

      <StudyActionBar className="mt-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
        >
          <RotateCw className="h-4 w-4" />
          Çevir
        </Button>
      </StudyActionBar>
    </div>
  );
}

