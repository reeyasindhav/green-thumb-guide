import { type Product } from "@/lib/data";
import { Star, ShoppingCart } from "lucide-react";

export function ProductCard({ p, index }: { p: Product; index: number }) {
  return (
    <form
      method="GET"
      action={`/shop/${p.id}`}
      className="lift reveal flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        type="submit"
        className="flex flex-1 flex-col text-left"
      >
        <div className="aspect-square overflow-hidden bg-secondary/40">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg text-foreground">{p.name}</h3>
            {p.badge && (
              <span className="shrink-0 rounded-full bg-sprout/15 px-2 py-0.5 text-[11px] font-medium text-sprout-foreground">
                {p.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-sun text-sun" />
            <span>{p.rating.toFixed(1)}</span>
            <span aria-hidden>·</span>
            <span>{p.reviews} reviews</span>
          </div>
          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="text-lg font-semibold text-foreground">
              ${p.price.toFixed(2)}
              {p.compareAt && <span className="ml-2 text-sm font-normal text-muted-foreground line-through">${p.compareAt.toFixed(2)}</span>}
            </div>
            <span className="text-sm font-medium text-sprout">View</span>
          </div>
        </div>
      </button>
    </form>
  );
}
