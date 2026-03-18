import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getDeckById } from "@/db/queries/decks";
import { getCardsByDeckId } from "@/db/queries/cards";
import {StudyViewClient} from "./StudyViewClient";
import { FloatingBackground } from "@/components/home";

type Props = {
  params: Promise<{ deckId: string }>;
};

export default async function StudyPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { deckId: deckIdParam } = await params;
  const deckId = Number(deckIdParam);
  if (Number.isNaN(deckId)) notFound();

  const [deck, cards] = await Promise.all([
    getDeckById(deckId, userId),
    getCardsByDeckId(deckId, userId),
  ]);

  if (!deck) notFound();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <FloatingBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-6 sm:pt-8 lg:pt-10">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href={`/decks/${deck.id}`}>
            <ArrowLeft className="h-4 w-4" />
            Desteye dön
          </Link>
        </Button>

        <StudyViewClient
          deck={{ id: deck.id, title: deck.title }}
          cards={cards.map((c) => ({ id: c.id, front: c.front, back: c.back }))}
        />
      </div>
    </div>
  );
}
