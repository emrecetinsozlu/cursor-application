import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play, List } from "lucide-react";
import Link from "next/link";

export function DashboardQuickActions() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pb-10 sm:pb-16">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Hızlı işlemler</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Plus className="h-4 w-4" />
              </span>
              Yeni destek
            </CardTitle>
            <CardDescription>
              Yeni bir flashcard destesi oluştur ve kart eklemeye başla.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild size="sm" className="w-full rounded-full gap-2">
              <Link href="/dashboard/decks/new">
                Destek oluştur
                <Plus className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                <Play className="h-4 w-4" />
              </span>
              Çalışmaya başla
            </CardTitle>
            <CardDescription>
              Mevcut destelerinden biriyle tekrar oturumu başlat.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" size="sm" className="w-full rounded-full gap-2 border-primary/40 bg-background/40 text-primary hover:bg-primary/10">
              <Link href="/dashboard/decks">
                Desteleri gör
                <List className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <List className="h-4 w-4" />
              </span>
              Tüm desteler
            </CardTitle>
            <CardDescription>
              Oluşturduğun tüm desteleri listele, düzenle veya sil.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" size="sm" className="w-full rounded-full gap-2">
              <Link href="/dashboard/decks">Listeye git</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
