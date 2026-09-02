import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { plots, type PlotCell } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Ruler, Sun, Sprout } from "lucide-react";
import { PlotBed } from "@/components/GardenLayout";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({
  component: Planner,
  head: () => ({
    meta: [{ title: "Plot planner — Cropwise" }],
  }),
});

function healthColor(health: PlotCell["health"]) {
  if (health === "well") return "bg-sun";
  if (health === "attention") return "bg-clay";
  return "bg-sprout";
}

function Planner() {
  const [activeId, setActiveId] = useState(plots[0]!.id);
  const plot = plots.find((p) => p.id === activeId) ?? plots[0]!;

  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          kicker="Plot planner"
          title="Map your garden"
          description="Visualise each bed or railing, track what's planted where, and spot crops that need attention at a glance."
        />

        <Tabs
          value={activeId}
          onValueChange={setActiveId}
          className="reveal mt-8 space-y-6"
        >
          <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
            {plots.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium data-[state=active]:border-leaf data-[state=active]:bg-leaf data-[state=active]:text-leaf-foreground"
              >
                {p.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={plot.id} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="reveal overflow-x-auto rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
                <PlotBed cells={plot.cells} size={plot.size} />
                <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-clay" /> Needs attention
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-sprout" /> Ready to harvest
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-sun" /> Growing well
                  </span>
                </div>
              </div>

              <aside className="reveal space-y-4 lg:pt-0">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-2xl text-leaf">
                      {plot.name}
                    </h2>
                    <Badge
                      variant={
                        plot.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {plot.status}
                    </Badge>
                  </div>
                  <p className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Ruler className="size-4 text-sprout" /> {plot.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <Sun className="size-4 text-sprout" /> {plot.light}
                    </span>
                    <span className="flex items-center gap-2">
                      <Sprout className="size-4 text-sprout" />{" "}
                      {plot.cells.length} crop
                      {plot.cells.length > 1 ? "s" : ""}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-lg text-leaf">Crops</h3>
                  <ul className="mt-3 space-y-2">
                    {plot.cells.map((cell) => (
                      <li
                        key={cell.id}
                        className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cell.emoji}</span>
                          <span className="font-medium text-foreground">
                            {cell.plant}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "size-2.5 rounded-full",
                            healthColor(cell.health),
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-lg text-leaf">Legend</h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-sprout" />
                      <span className="text-muted-foreground">
                        Growing well
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-sun" />
                      <span className="text-muted-foreground">
                        Needs attention
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-clay" />
                      <span className="text-muted-foreground">
                        Ready to harvest
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
