import { NeonDataList } from "@/components/NeonDataList";

/**
 * Neon DB (cold-cake-04006233) decks ve cards listesi.
 * Server component kullanır.
 */
export default function NeonDataPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-2xl font-semibold mb-2">Neon DB — Decks & Cards</h1>
      <p className="text-sm text-muted-foreground mb-6">
        cold-cake-04006233 projesi · decks ve cards tabloları
      </p>
      <NeonDataList />
    </div>
  );
}
