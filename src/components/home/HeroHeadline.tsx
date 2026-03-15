export function HeroHeadline() {
  return (
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
  );
}
