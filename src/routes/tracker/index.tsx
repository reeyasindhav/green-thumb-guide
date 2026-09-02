import { createFileRoute, Link } from "@tanstack/react-router";
import { plants, healthLabel, type Plant } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, CalendarDays, Sun, Droplets } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tracker/")({
  component: TrackerIndex,
  head: () => ({
    meta: [{ title: "Growth tracker — Cropwise" }],
  }),
});

function healthBadge(health: Plant["health"]) {
  if (health === "well")
    return { label: healthLabel.well, className: "bg-sprout/15 text-sprout" };
  if (health === "attention")
    return { label: healthLabel.attention, className: "bg-sun/15 text-sun" };
  return { label: healthLabel.harvest, className: "bg-clay/15 text-clay" };
}

function difficultyBadge(difficulty: Plant["difficulty"]) {
  if (difficulty === "Easy")
    return { label: "Easy", className: "bg-sprout/15 text-sprout" };
  if (difficulty === "Moderate")
    return { label: "Moderate", className: "bg-sun/15 text-sun" };
  return { label: "Advanced", className: "bg-clay/15 text-clay" };
}

function TrackerIndex() {
  return (
    <>
      <PageHeader
        kicker="Growth tracker"
        title="Your plants"
        description="Track each crop's progress through its stages, check health at a glance, and click any plant to open its full detail page."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant, i) => {
          const health = healthBadge(plant.health);
          const diff = difficultyBadge(plant.difficulty);
          return (
            <Link
              key={plant.slug}
              to={`/tracker/${plant.slug}`}
              className="reveal lift block overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <Badge
                  className={cn(
                    "absolute left-3 top-3 border-0 shadow",
                    health.className,
                  )}
                >
                  {health.label}
                </Badge>
                <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-sm font-medium text-foreground shadow">
                  {plant.emoji} {plant.name}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-xl text-leaf">
                      {plant.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {plant.variety}
                    </p>
                  </div>
                  <Badge variant="outline" className={cn(diff.className)}>
                    {diff.label}
                  </Badge>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {plant.currentStage}
                    </span>
                    <span className="text-muted-foreground">
                      {plant.progress}%
                    </span>
                  </div>
                  <Progress value={plant.progress} className="h-2" />
                </div>

                <dl className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CalendarDays className="size-3" /> Planted
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {plant.plantedOn}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="size-3" /> Location
                    </dt>
                    <dd className="mt-0.5 truncate font-medium text-foreground">
                      {plant.location}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <Sun className="size-3" /> Sun
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {plant.sun}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <Droplets className="size-3" /> Water
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {plant.water}
                    </dd>
                  </div>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
