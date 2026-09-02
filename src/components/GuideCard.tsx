import { type Guide } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function GuideCard({ g, index }: { g: Guide; index: number }) {
  return (
    <Link
      to="/guides/$slug"
      params={{ slug: g.slug }}
      className="lift reveal group block w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="w-full cursor-pointer rounded-2xl border border-border/70 bg-card text-left shadow-soft">
        <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
          <img src={g.image} alt={g.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{g.level}</span>
            <span>{g.minutes} min read</span>
          </div>
          <h3 className="mt-2 font-display text-lg text-foreground">{g.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{g.excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sprout">
            Read guide <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
