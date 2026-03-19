"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  deckId: number;
};

export function StudyEmptyState({ deckId }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-16 text-center">
      <Layers className="mb-4 h-12 w-12 text-muted-foreground" aria-hidden />
      <h2 className="text-lg font-semibold text-foreground">Henüz kart yok</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Bu destede çalışmak için önce kart ekleyin.
      </p>
      <Button className="mt-6" asChild>
        <Link href={`/decks/${deckId}`}>Desteye dön</Link>
      </Button>
    </div>
  );
}

