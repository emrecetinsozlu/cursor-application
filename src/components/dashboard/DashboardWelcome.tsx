import { LayoutDashboard } from "lucide-react";

type DashboardWelcomeProps = {
  firstName: string | null;
};

export function DashboardWelcome({ firstName }: DashboardWelcomeProps) {
  const greeting = firstName
    ? `Merhaba, ${firstName}`
    : "Merhaba";

  return (
    <section className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 pb-8 pt-6 sm:pt-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur w-fit mb-4">
        <LayoutDashboard className="h-3.5 w-3.5" />
        <span>Kontrol paneli</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {greeting}
          <span className="bg-gradient-to-r from-primary via-primary/80 to-sky-400 bg-clip-text text-transparent">
            .
          </span>
        </h1>
        <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground">
          Destelerin ve kartların buradan yönetilir. Yeni bir destek oluştur veya
          mevcut kartlarla çalışmaya devam et.
        </p>
      </div>
    </section>
  );
}
