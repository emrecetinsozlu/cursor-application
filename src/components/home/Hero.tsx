import { PreviewColumn } from "./PreviewColumn";
import { HeroBadge } from "./HeroBadge";
import { HeroHeadline } from "./HeroHeadline";
import { HeroActions } from "./HeroActions";
import { HeroFeaturesGrid } from "./HeroFeaturesGrid";

export function Hero() {
  return (
    <section className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 pb-16 pt-10 sm:pt-16 lg:flex-row lg:items-center lg:pb-24 lg:pt-10">
      <div className="relative flex-1 space-y-8">
        <HeroBadge />
        <HeroHeadline />
        <HeroActions />
        <HeroFeaturesGrid />
      </div>
      <PreviewColumn />
    </section>
  );
}
