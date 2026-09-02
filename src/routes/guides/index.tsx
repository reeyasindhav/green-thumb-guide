import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { guides } from "@/lib/data";
import { GuideCard } from "@/components/GuideCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/guides/")({
  component: GuidesIndexComponent,
  head: () => ({
    meta: [{ title: "Plant guides — Cropwise" }],
  }),
});

const levels = ["All", "Beginner", "Intermediate"] as const;

function GuidesIndexComponent() {
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides.filter((g) => {
      const matchLevel = level === "All" || g.level === level;
      const matchQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.level.toLowerCase().includes(q);
      return matchLevel && matchQuery;
    });
  }, [level, query]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <PageHeader
          kicker="Library"
          title="Plant guides"
          description="Practical advice for balconies, windowsills, and rooftops — written for the space you actually have."
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <Button key={l} variant={level === l ? "leaf" : "outline"} size="sm" className="rounded-full" onClick={() => setLevel(l)}>
                {l}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides"
              className="rounded-full bg-card pl-9"
              aria-label="Search guides"
            />
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState icon={Search} title="No matching guides" description="Try another search or reset the level filter.">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setQuery("");
                  setLevel("All");
                }}
              >
                Clear filters
              </Button>
            </EmptyState>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g, i) => (
              <GuideCard key={g.slug} g={g} index={i} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
