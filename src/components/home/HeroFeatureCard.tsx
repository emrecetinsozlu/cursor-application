import { type LucideIcon } from "lucide-react";

type HeroFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName?: string;
  className?: string;
};

export function HeroFeatureCard({
  icon: Icon,
  title,
  description,
  iconClassName,
  className,
}: HeroFeatureCardProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl border border-border/40 bg-background/60 p-3 backdrop-blur transform transition-all duration-300 hover:-translate-y-1 hover:bg-background/90 ${className ?? ""}`}
    >
      <Icon className={`${iconClassName ?? ""}`} size={24} />
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
