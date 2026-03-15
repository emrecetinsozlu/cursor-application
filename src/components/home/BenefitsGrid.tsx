export function BenefitsGrid() {
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
