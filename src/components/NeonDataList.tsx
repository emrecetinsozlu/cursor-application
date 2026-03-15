import { db } from "@/db";
import { cardsTable, decksTable } from "@/db/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Server component: Neon DB (proje cold-cake-04006233) üzerindeki
 * decks ve cards tablolarını listeler.
 */
export async function NeonDataList() {
  const [decks, cards] = await Promise.all([
    db.select().from(decksTable),
    db.select().from(cardsTable),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Decks ({decks.length})</h2>
        <Card>
          <CardHeader className="pb-2">
            <span className="text-sm text-muted-foreground">decks tablosu</span>
          </CardHeader>
          <CardContent>
            {decks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Kayıt yok.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {decks.map((deck) => (
                  <li
                    key={deck.id}
                    className="rounded-lg border border-border/40 p-3"
                  >
                    <span className="font-medium">#{deck.id}</span> {deck.title}
                    {deck.description && (
                      <p className="text-muted-foreground mt-1 truncate">
                        {deck.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {deck.clerkUserId} · {deck.createdAt?.toISOString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Cards ({cards.length})</h2>
        <Card>
          <CardHeader className="pb-2">
            <span className="text-sm text-muted-foreground">cards tablosu</span>
          </CardHeader>
          <CardContent>
            {cards.length === 0 ? (
              <p className="text-sm text-muted-foreground">Kayıt yok.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {cards.map((card) => (
                  <li
                    key={card.id}
                    className="rounded-lg border border-border/40 p-3"
                  >
                    <span className="font-medium">#{card.id}</span> deck_id:{" "}
                    {card.deckId}
                    <p className="mt-1">
                      <span className="text-muted-foreground">Ön:</span>{" "}
                      {card.front}
                    </p>
                    <p className="mt-1">
                      <span className="text-muted-foreground">Arka:</span>{" "}
                      {card.back}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.createdAt?.toISOString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
