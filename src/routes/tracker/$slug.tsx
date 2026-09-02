import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { plants, healthLabel, type Plant } from "@/lib/data";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Sun,
  Droplets,
  Ruler,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tracker/$slug")({
  component: PlantDetail,
  head: ({ params }) => {
    const plant = plants.find((p) => p.slug === params.slug);
    return {
      meta: plant
        ? [{ title: `${plant.name} — Growth tracker` }]
        : [{ title: "Plant not found — Cropwise" }],
    };
  },
});

function PlantDetail() {
  const { slug } = Route.useParams();
  const plant = plants.find((p) => p.slug === slug);

  if (!plant) {
    throw notFound();
  }

  const health = healthLabel[plant.health];
  const healthTone =
    plant.health === "well"
      ? "bg-sprout/15 text-sprout"
      : plant.health === "attention"
        ? "bg-sun/15 text-sun"
        : "bg-clay/15 text-clay";

  const diffTone =
    plant.difficulty === "Easy"
      ? "bg-sprout/15 text-sprout"
      : plant.difficulty === "Moderate"
        ? "bg-sun/15 text-sun"
        : "bg-clay/15 text-clay";

  const currentIdx = plant.stages.findIndex((s) => s.name === plant.currentStage);

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="mb-6 rounded-full">
        <Link to="/tracker">
          <ArrowLeft className="size-4" />
          Back to tracker
        </Link>
      </Button>

      <div className="reveal overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
          <img
            src={plant.image}
            alt={plant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-3xl sm:text-4xl">{plant.emoji}</p>
                <h1 className="mt-1 font-display text-3xl tracking-tight text-white sm:text-4xl">
                  {plant.name}
                </h1>
                <p className="mt-1 text-sm text-white/80">{plant.variety}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("border-0 shadow", healthTone)}>{health}</Badge>
                <Badge variant="outline" className={cn("border-white/20 bg-white/10 text-white", diffTone)}>
                  {plant.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{plant.currentStage}</span>
              <span className="text-muted-foreground">{plant.progress}%</span>
            </div>
            <Progress value={plant.progress} className="h-2.5" />
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">{plant.summary}</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Stat icon={<CalendarDays className="size-4 text-sprout" />} label="Planted" value={plant.plantedOn} />
            <Stat icon={<MapPin className="size-4 text-sprout" />} label="Location" value={plant.location} />
            <Stat icon={<Sun className="size-4 text-sun" />} label="Sun" value={plant.sun} />
            <Stat icon={<Droplets className="size-4 text-sun" />} label="Water" value={plant.water} />
            <Stat icon={<Ruler className="size-4 text-leaf" />} label="Spacing" value={plant.spacing} />
            <Stat icon={<Ruler className="size-4 text-leaf" />} label="Container depth" value={plant.containerDepth} />
            <Stat icon={<Leaf className="size-4 text-sprout" />} label="Family" value={plant.family} />
            <Stat icon={<CalendarDays className="size-4 text-clay" />} label="Days to harvest" value={`${plant.daysToHarvest} days`} />
          </div>

          {plant.companions.length > 0 && (
            <div>
              <h3 className="font-display text-lg text-foreground">Companions</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {plant.companions.map((name) => {
                  const match = plants.find((p) => p.name === name);
                  return (
                    <Badge key={name} variant="outline" className="gap-1.5 rounded-full">
                      <span>{match?.emoji ?? "🌱"}</span>
                      {name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-display text-lg text-foreground">Stages</h3>
            <ol className="relative ml-3 mt-4 border-l border-border pl-5">
              {plant.stages.map((stage, idx) => {
                const reached = idx <= currentIdx;
                return (
                  <li key={stage.name} className="relative pb-5 last:pb-0">
                    <span
                      className={cn(
                        "absolute -left-[17px] grid size-4 place-items-center rounded-full border-2",
                        reached ? "border-sprout bg-sprout" : "border-border bg-card",
                      )}
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={cn("text-sm font-medium", reached ? "text-foreground" : "text-muted-foreground")}>
                        {stage.name}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">{stage.days}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{stage.note}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            <h3 className="font-display text-lg text-foreground">Care tips</h3>
            <ul className="mt-3 space-y-3">
              {plant.tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm text-muted-foreground">
                  <ChevronRight className="mt-0.5 size-4 shrink-0 text-sprout" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
