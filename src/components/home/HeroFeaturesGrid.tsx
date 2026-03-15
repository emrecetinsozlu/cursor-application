import { Timer, Zap, Sparkles } from "lucide-react";
import { HeroFeatureCard } from "./HeroFeatureCard";

export function HeroFeaturesGrid() {
  return (
    <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
      <HeroFeatureCard
        icon={Timer}
        title="Mikro oturumlar"
        description="Günde sadece 5–10 dakika ile istikrarlı tekrar."
        iconClassName="text-sky-400"
      />
      <HeroFeatureCard
        icon={Zap}
        title="Akılda kalıcı kartlar"
        description="Renkli kart yüzleriyle odaklanmayı kolaylaştır."
        iconClassName="text-amber-600"
       
      />
      <HeroFeatureCard
        icon={Sparkles}
        title="Eğlenceli akış"
        description="Doğru/yanlış etkileşimine göre uyumlu hissettiren akış."
        iconClassName="text-fuchsia-300"
       
      />
    </div>
  );
}
