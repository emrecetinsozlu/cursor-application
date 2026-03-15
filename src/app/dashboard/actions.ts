"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { decksTable } from "@/db/schema";

const createDeckSchema = z.object({
  title: z.string().min(1, "Başlık gerekli").max(255),
  description: z.string().max(2000).optional(),
});

export type CreateDeckInput = z.infer<typeof createDeckSchema>;

export async function createDeck(input: CreateDeckInput) {
  const parsed = createDeckSchema.safeParse(input);
  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return { ok: false as const, error: flattened.fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { ok: false as const, error: { _form: ["Oturum açmanız gerekiyor."] } };
  }

  await db.insert(decksTable).values({
    clerkUserId: userId,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
  });

  revalidatePath("/dashboard");
  return { ok: true as const };
}
