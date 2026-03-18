"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDeckById } from "@/db/queries/decks";
import {
  insertCard,
  updateCard,
  deleteCard,
} from "@/db/queries/cards";

const addCardSchema = z.object({
  deckId: z.coerce.number(),
  front: z.string().min(1, "Ön yüz gerekli").max(5000),
  back: z.string().min(1, "Arka yüz gerekli").max(5000),
});

export type AddCardInput = z.infer<typeof addCardSchema>;

const updateCardSchema = z.object({
  cardId: z.coerce.number(),
  deckId: z.coerce.number(),
  front: z.string().min(1, "Ön yüz gerekli").max(5000),
  back: z.string().min(1, "Arka yüz gerekli").max(5000),
});

export type UpdateCardInput = z.infer<typeof updateCardSchema>;

const deleteCardSchema = z.object({
  cardId: z.coerce.number(),
  deckId: z.coerce.number(),
});

export type DeleteCardInput = z.infer<typeof deleteCardSchema>;

export async function addCard(input: AddCardInput) {
  const parsed = addCardSchema.safeParse(input);
  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return { ok: false as const, error: flattened.fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, error: { _form: ["Oturum açmanız gerekiyor."] } };
  }

  const deck = await getDeckById(parsed.data.deckId, userId);
  if (!deck) {
    return { ok: false as const, error: { _form: ["Deste bulunamadı."] } };
  }

  await insertCard({
    deckId: parsed.data.deckId,
    front: parsed.data.front,
    back: parsed.data.back,
  });

  revalidatePath(`/decks/${parsed.data.deckId}`);
  return { ok: true as const };
}

export async function updateCardAction(input: UpdateCardInput) {
  const parsed = updateCardSchema.safeParse(input);
  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return { ok: false as const, error: flattened.fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, error: { _form: ["Oturum açmanız gerekiyor."] } };
  }

  const deck = await getDeckById(parsed.data.deckId, userId);
  if (!deck) {
    return { ok: false as const, error: { _form: ["Deste bulunamadı."] } };
  }

  const [updated] = await updateCard(parsed.data.cardId, parsed.data.deckId, {
    front: parsed.data.front,
    back: parsed.data.back,
  });
  if (!updated) {
    return { ok: false as const, error: { _form: ["Kart bulunamadı."] } };
  }

  revalidatePath(`/decks/${parsed.data.deckId}`);
  return { ok: true as const };
}

export async function deleteCardAction(input: DeleteCardInput) {
  const parsed = deleteCardSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: { _form: ["Geçersiz istek."] } };
  }

  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, error: { _form: ["Oturum açmanız gerekiyor."] } };
  }

  const deck = await getDeckById(parsed.data.deckId, userId);
  if (!deck) {
    return { ok: false as const, error: { _form: ["Deste bulunamadı."] } };
  }

  await deleteCard(parsed.data.cardId, parsed.data.deckId);
  revalidatePath(`/decks/${parsed.data.deckId}`);
  return { ok: true as const };
}
