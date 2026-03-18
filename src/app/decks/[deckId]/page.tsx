import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getDeckById } from "@/db/queries/decks";
import { getCardsByDeckId } from "@/db/queries/cards";
import { DeckDetailClient } from "./DeckDetailClient";
import { FloatingBackground } from "@/components/home";

type Props = {
  params: Promise<{ deckId: string }>;
};

export default async function DeckDetailPage({ params }: Props) {
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
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Dashboard&apos;a dön
          </Link>
        </Button>

        <DeckDetailClient
          deckId={deck.id}
          deckTitle={deck.title}
          deckDescription={deck.description ?? null}
          cards={cards.map((c) => ({
            id: c.id,
            deckId: c.deckId,
            front: c.front,
            back: c.back,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt ?? null,
          }))}
        />
      </div>
    </div>
  );
}
