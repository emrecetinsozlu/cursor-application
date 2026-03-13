import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="floating-dots" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 sm:pt-16 lg:flex-row lg:items-center lg:gap-16 lg:pb-24 lg:pt-10">
      <div className="relative flex-1 space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          <Sparkles className="h-3 w-3" />
          <span>Öğrenmeyi oyunlaştıran flashcard deneyimi</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Düşün, hatırla ve{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-sky-400 bg-clip-text text-transparent">
              kartlarla öğren.
            </span>
          </h1>
          <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            FlashFlow, soru–cevap kartlarıyla dil, sınav ve her türlü konuyu
            eğlenceli mini oturumlara dönüştürür. Kısa tekrarlarla kalıcı
            öğrenme sağlayan akıcı bir deneyim.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <Button size="lg" className="gap-2 rounded-full px-6 text-sm">
              Hemen kart oluştur
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full border-primary/40 bg-background/40 px-6 text-sm text-primary hover:bg-primary/10"
            >
              Canlı önizlemeyi gör
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Kaydolmadan demo deneyimi</span>
          </div>
        </div>
        <div className="grid gap-4 text-xs text-muted-foreground sm:grid-cols-3 sm:text-[0.7rem]">
          <div className="flex items-start gap-2 rounded-xl border border-border/40 bg-background/60 p-3 backdrop-blur">
            <Timer className="mt-0.5 h-4 w-4 text-sky-400" />
            <div>
              <p className="font-medium text-foreground">Mikro oturumlar</p>
              <p>Günde sadece 5–10 dakika ile istikrarlı tekrar.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-border/40 bg-background/60 p-3 backdrop-blur">
            <Zap className="mt-0.5 h-4 w-4 text-amber-300" />
            <div>
              <p className="font-medium text-foreground">Akılda kalıcı kartlar</p>
              <p>Renkli kart yüzleriyle odaklanmayı kolaylaştır.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-border/40 bg-background/60 p-3 backdrop-blur">
            <Sparkles className="mt-0.5 h-4 w-4 text-fuchsia-300" />
            <div>
              <p className="font-medium text-foreground">Eğlenceli akış</p>
              <p>Doğru/yanlış etkileşimine göre uyumlu hissettiren akış.</p>
            </div>
          </div>
        </div>
      </div>
      <PreviewColumn />
    </section>
  );
}

function PreviewColumn() {
  return (
    <aside className="relative mt-4 flex flex-1 items-center justify-center lg:mt-0">
      <div className="floating-card-stack pointer-events-none relative w-full max-w-md">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-primary/10 to-fuchsia-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 rounded-3xl border border-border/60 bg-gradient-to-b from-background/80 via-background/95 to-background/98 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur">
          <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-1 text-[0.6rem] font-medium">
              Bugünün destesi
            </span>
            <span>7/20 kart</span>
          </div>
          <div className="relative h-52">
            <FlashcardLayer
              side="back"
              className="left-7 top-7 rotate-[-6deg] opacity-40"
              label="Cevap"
              color="from-sky-500/80 to-cyan-400/80"
              text="Fotosentez hangi organelde gerçekleşir?"
              helper="Kartı çevirerek detayları gör."
            />
            <FlashcardLayer
              side="front"
              className="right-3 top-3 rotate-3 opacity-70"
              label="Soru"
              color="from-fuchsia-500/80 to-rose-400/80"
              text="Bitki hücresinde enerji üreten organel hangisidir?"
              helper="Cevabı tahmin etmeye çalış."
            />
            <FlashcardLayer
              side="front"
              className="left-1 top-10 rotate-1"
              label="Soru"
              color="from-primary/90 to-sky-500/80"
              text="“Mitokondri” ne iş yapar?"
              helper="Cevabını söyle, sonra kartı çevir."
              isActive
            />
          </div>
          <div className="mt-1 flex items-center justify-between gap-3 text-[0.7rem] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-[0.6rem] text-emerald-300">
                ✓
              </span>
              <span>%86 doğru cevap oranı</span>
            </div>
            <div className="flex gap-1.5">
              <span className="inline-flex h-1.5 w-7 rounded-full bg-emerald-400/80" />
              <span className="inline-flex h-1.5 w-7 rounded-full bg-sky-500/60" />
              <span className="inline-flex h-1.5 w-7 rounded-full bg-fuchsia-500/40" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

type FlashcardLayerProps = {
  side: "front" | "back";
  label: string;
  text: string;
  helper: string;
  color: string;
  className?: string;
  isActive?: boolean;
};

function FlashcardLayer({
  side,
  label,
  text,
  helper,
  color,
  className,
  isActive,
}: FlashcardLayerProps) {
  return (
    <div
      className={`card-layer absolute flex h-40 w-64 flex-col justify-between rounded-2xl border border-border/60 bg-gradient-to-br ${color} p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.65)] ${
        isActive ? "ring-2 ring-primary/70" : "opacity-80"
      } ${className ?? ""}`}
    >
      <div className="flex items-center justify-between text-[0.6rem] font-medium text-background/80">
        <span className="rounded-full bg-background/15 px-2 py-1">
          {side === "front" ? "Ön yüz" : "Arka yüz"}
        </span>
        <span>{label}</span>
      </div>
      <p className="text-xs font-medium text-background drop-shadow">
        {text}
      </p>
      <p className="text-[0.65rem] text-background/80">{helper}</p>
    </div>
  );
}

function BenefitsGrid() {
  return (
    <section className="relative z-10 mx-auto mb-10 max-w-6xl px-4 pb-10 pt-2 sm:pb-16 lg:pb-20">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border/40 bg-background/60 p-5 text-sm backdrop-blur">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Kart tabanlı öğrenme
          </h3>
          <p className="text-xs text-muted-foreground">
            Zihni yormayan soru–cevap akışıyla bilgiyi küçük parçalara böl,
            tekrar aralıklarını kendin belirle.
          </p>
        </div>
        <div className="rounded-2xl border border-border/40 bg-background/60 p-5 text-sm backdrop-blur">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Tüm konular için esnek
          </h3>
          <p className="text-xs text-muted-foreground">
            Yabancı dil, sınav notları, kavram kartları veya ezber gerektiren
            her şey için özelleştirilebilir desteler.
          </p>
        </div>
        <div className="rounded-2xl border border-border/40 bg-background/60 p-5 text-sm backdrop-blur">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Akıcı ve karanlık arayüz
          </h3>
          <p className="text-xs text-muted-foreground">
            Göz yormayan koyu tema, yumuşak hareketler ve rahat okunabilir
            tipografi ile uzun oturumlarda bile konforlu.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <FloatingBackground />
      <Hero />
      <BenefitsGrid />
      <footer className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-8 pt-2 text-[0.7rem] text-muted-foreground">
        <p>© {new Date().getFullYear()} FlashFlow. Tüm hakları saklıdır.</p>
        <div className="flex gap-4">
          <span>Kullanım Koşulları</span>
          <span>Gizlilik</span>
        </div>
      </footer>
    </div>
  );
}
