import { and, eq } from "drizzle-orm";
import { db, decksTable } from "@/db";

/** Kullanıcıya ait tüm desteleri getirir (ownership scope). */
export async function getDecksByUserId(clerkUserId: string) {
  return db
    .select()
    .from(decksTable)
    .where(eq(decksTable.clerkUserId, clerkUserId));
}

/** Belirli bir desteyi id ve sahiplik ile getirir. */
export async function getDeckById(deckId: number, clerkUserId: string) {
  const [deck] = await db
    .select()
    .from(decksTable)
    .where(
      and(
        eq(decksTable.id, deckId),
        eq(decksTable.clerkUserId, clerkUserId)
      )
    );
  return deck ?? null;
}

/** Tüm desteleri getirir (örn. dev/liste sayfaları için; ownership scope yok). */
export async function getAllDecks() {
  return db.select().from(decksTable);
}

/** Yeni deste ekler. Server action'lar bu helper'ı kullanmalı. */
export async function insertDeck(params: {
  clerkUserId: string;
  title: string;
  description: string | null;
}) {
  return db.insert(decksTable).values(params).returning();
}
