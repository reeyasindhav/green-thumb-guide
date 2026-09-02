import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-sprout">
        <Icon className="size-7" />
      </div>
      <p className="mt-4 font-display text-lg text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
