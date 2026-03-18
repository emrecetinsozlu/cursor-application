import { and, asc, eq, inArray } from "drizzle-orm";
import { db, cardsTable } from "@/db";
import { getDeckById, getDecksByUserId } from "@/db/queries/decks";

/** Verilen deck id listesine ait kartları getirir. */
export async function getCardsByDeckIds(deckIds: number[]) {
  if (deckIds.length === 0) return [];
  return db
    .select()
    .from(cardsTable)
    .where(inArray(cardsTable.deckId, deckIds));
}

/** Belirli bir destenin kartlarını getirir (ownership: deck must belong to clerkUserId). */
export async function getCardsByDeckId(deckId: number, clerkUserId: string) {
  const deck = await getDeckById(deckId, clerkUserId);
  if (!deck) return [];
  return db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.deckId, deckId))
    .orderBy(asc(cardsTable.createdAt));
}

/** Kart ekler (deck ownership is enforced by caller). */
export async function insertCard(params: {
  deckId: number;
  front: string;
  back: string;
}) {
  return db.insert(cardsTable).values(params).returning();
}

/** Kart günceller (ownership enforced by caller). */
export async function updateCard(
  cardId: number,
  deckId: number,
  updates: { front?: string; back?: string }
) {
  return db
    .update(cardsTable)
    .set({ ...updates, updatedAt: new Date() })
    .where(and(eq(cardsTable.id, cardId), eq(cardsTable.deckId, deckId)))
    .returning();
}

/** Kart siler (ownership enforced by caller). */
export async function deleteCard(cardId: number, deckId: number) {
  return db
    .delete(cardsTable)
    .where(and(eq(cardsTable.id, cardId), eq(cardsTable.deckId, deckId)))
    .returning();
}

/** Kullanıcıya ait destelerdeki tüm kartları getirir (ownership scope). */
export async function getCardsByUserId(clerkUserId: string) {
  const decks = await getDecksByUserId(clerkUserId);
  const deckIds = decks.map((d) => d.id);
  return getCardsByDeckIds(deckIds);
}

/** Tüm kartları getirir (örn. dev/liste sayfaları için). */
export async function getAllCards() {
  return db.select().from(cardsTable);
}
