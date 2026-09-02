import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  kicker,
  title,
  description,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("animate-fade-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {kicker ? (
          <p className="text-sm font-medium uppercase tracking-wider text-sprout">{kicker}</p>
        ) : null}
        <h1 className="mt-1 font-display text-3xl tracking-tight text-foreground sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 text-muted-foreground">{description}</p> : null}
      </div>
      {children ? <div className="shrink-0">{children}</div> : null}
    </div>
  );
}
