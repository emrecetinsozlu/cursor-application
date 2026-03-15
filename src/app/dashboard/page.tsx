import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { FloatingBackground } from "@/components/home";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cardsTable, decksTable } from "@/db/schema";
import { db } from "@/db";
import { CreateDeckModal } from "@/components/CreateDeckModal";


export default async function DashboardPage() {
  const [decks, cards] = await Promise.all([
    db.select().from(decksTable),
    db.select().from(cardsTable),
  ]);

  const totalCards = cards.length;
  const activeDecksCount = decks.length;
  const recentDecks = [...decks]
    .sort(
      (a, b) =>
        (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    )
    .slice(0, 5);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <FloatingBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pt-8 lg:pt-10">
        {/* Welcome + badge */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <Sparkles className="h-3 w-3" />
              <span>Dashboard</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Hoş geldin
            </h1>
            <p className="text-sm text-muted-foreground">
              Bugünkü öğrenme oturumuna başlamaya hazır mısın?
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="#" className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni deste
            </Link>
          </Button>
        </div>

        {/* Stat cards - same visual language as BenefitsGrid */}
        <section className="mb-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/40 bg-background/60 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{totalCards}</p>
                  <p className="text-xs text-muted-foreground">Toplam kart</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border/40 bg-background/60 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/15 text-chart-1">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{activeDecksCount}</p>
                  <p className="text-xs text-muted-foreground">Aktif desteler</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Son çalışılanlar / Hızlı erişim */}
          <section className="lg:col-span-2 h-full">
            <Card className="overflow-hidden rounded-2xl border-border/40 bg-background/60 shadow-sm backdrop-blur">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Son çalışılanlar
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" className="gap-1 text-muted-foreground">
                      Tümü
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {recentDecks.length > 0 ? (
                  <ul className="space-y-1">
                    {recentDecks.map((deck) => (
                      <li key={deck.id}>
                        <Button
                          variant="ghost"
                          className="w-full justify-between rounded-lg px-3 py-2 text-sm font-medium"
                          asChild
                        >
                          <Link href="#" className="gap-2">
                            <span className="truncate">{deck.title}</span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-xl border border-border/40 bg-background/40 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Henüz çalışılmış desten yok. İlk desteni oluştur veya
                      mevcut destelerden birini aç.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                      <Link href="#">Deste oluştur</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Hızlı işlemler */}
          <section className="h-full">
            <Card className="overflow-hidden rounded-2xl border-border/40 bg-background/60 shadow-sm backdrop-blur h-full">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold text-foreground">
                  Hızlı işlemler
                </h2>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="flex flex-col gap-1">
                  <CreateDeckModal />
                  <Separator className="my-1" />
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium"
                    asChild
                  >
                    <Link href="#">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Destelerimi görüntüle
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Önerilen / Son eklenen placeholder */}
        <section className="mt-8">
          <Card className="overflow-hidden rounded-2xl border-border/40 bg-background/60 shadow-sm backdrop-blur">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Destelerim
                </h2>
                <Badge variant="secondary">{activeDecksCount} deste</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Oluşturduğun veya abone olduğun flashcard desteleri burada
                listelenir.
              </p>
            </CardHeader>
            <CardContent>
              {decks.length > 0 ? (
                <ul className="space-y-1">
                  {decks.map((deck) => (
                    <li key={deck.id}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between rounded-lg px-3 py-2 text-sm font-medium"
                        asChild
                      >
                        <Link href="#" className="gap-2">
                          <span className="truncate">{deck.title}</span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-xl border border-dashed border-border/60 py-12 text-center">
                  <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-3 text-sm font-medium text-foreground">
                    Henüz desten yok
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    İlk desteni oluşturmak için yukarıdaki &quot;Yeni deste&quot;
                    butonunu kullan.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
