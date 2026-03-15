import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import { db, decksTable, cardsTable } from "@/db";
import { FloatingBackground, Footer } from "@/components/home";
import {
  DashboardWelcome,
  DashboardStats,
  DashboardQuickActions,
} from "@/components/dashboard";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName ?? null;

  const decks = await db
    .select({ id: decksTable.id })
    .from(decksTable)
    .where(eq(decksTable.clerkUserId, userId));
  const deckCount = decks.length;

  const deckIds = decks.map((d) => d.id);
  const cardCount =
    deckIds.length === 0
      ? 0
      : (
          await db
            .select({ id: cardsTable.id })
            .from(cardsTable)
            .where(inArray(cardsTable.deckId, deckIds))
        ).length;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <FloatingBackground />
      <DashboardWelcome firstName={firstName} />
      <DashboardStats deckCount={deckCount} cardCount={cardCount} />
      <DashboardQuickActions />
      <Footer />
    </div>
  );
}
