"use client";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  align?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  className?: string;
};

export function StudyActionBar({
  children,
  align = "center",
  wrap = true,
  className,
}: Props) {
  const justifyClass =
    align === "start"
      ? "justify-start"
      : align === "end"
        ? "justify-end"
        : align === "between"
          ? "justify-between"
          : "justify-center";

  return (
    <div
      className={cn(
        "flex gap-2",
        wrap ? "flex-wrap" : "flex-nowrap",
        justifyClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

