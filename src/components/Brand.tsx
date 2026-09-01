import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl transition-transform duration-500 group-hover:rotate-12",
          tone === "light" ? "bg-sprout/20 text-sprout" : "bg-leaf text-leaf-foreground",
        )}
      >
        <Leaf className="size-5" />
      </span>
      <span
        className={cn(
          "font-display text-2xl tracking-tight",
          tone === "light" ? "text-leaf-foreground" : "text-leaf",
        )}
      >
        cropwise
      </span>
    </Link>
  );
}
