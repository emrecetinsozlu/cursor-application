import { FlashcardLayer } from "./FlashcardLayer";
import { Check } from "lucide-react";

export function PreviewColumn() {
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
              text={'"Mitokondri" ne iş yapar?'}
              helper="Cevabını söyle, sonra kartı çevir."
              isActive
            />
          </div>
          <div className="mt-1 flex items-center justify-between gap-3 text-[0.7rem] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-flex p-1  items-center justify-center rounded-full bg-emerald-500/15 text-[0.6rem] text-emerald-300">
              <Check size={24} />
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
