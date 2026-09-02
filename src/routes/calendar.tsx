import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { tasks, type Task } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Scissors,
  Flower2,
  Wheat,
  Search,
  Shovel,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  component: Calendar,
  head: () => ({
    meta: [{ title: "Care calendar — Cropwise" }],
  }),
});

const kindIcon: Record<Task["kind"], typeof Droplets> = {
  water: Droplets,
  inspect: Search,
  harvest: Scissors,
  feed: Flower2,
  prune: Wheat,
  sow: Shovel,
};

const kindColor: Record<Task["kind"], string> = {
  water: "text-blue-500",
  inspect: "text-sun",
  harvest: "text-clay",
  feed: "text-sprout",
  prune: "text-bark",
  sow: "text-primary",
};

const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

function groupByDay(list: Task[]) {
  const map = new Map<number, Task[]>();
  for (const t of list) {
    const arr = map.get(t.day) ?? [];
    arr.push(t);
    map.set(t.day, arr);
  }
  return map;
}

function Calendar() {
  const { doneTasks, toggleTask, todayProgress } = useStore();
  const byDay = useMemo(() => groupByDay(tasks), []);

  const todayTasks = tasks.filter((t) => t.day === 1);
  const weekTasks = tasks.filter((t) => t.day <= 7);
  const completedWeek = weekTasks.filter((t) => doneTasks.includes(t.id)).length;
  const weekPct = weekTasks.length
    ? Math.round((completedWeek / weekTasks.length) * 100)
    : 0;

  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            className="flex-1"
            kicker="Plant care"
            title="Care calendar"
            description="Everything your garden needs this month, organised by day. Tick off tasks as you go and watch your weekly progress grow."
          />
          <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-4 shadow-soft sm:max-w-xs">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Today
              </span>
              <span className="font-display text-2xl text-leaf">
                {todayProgress}%
              </span>
            </div>
            <Progress value={todayProgress} className="mt-2 h-2" />
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                This week
              </span>
              <span className="font-display text-2xl text-leaf">
                {weekPct}%
              </span>
            </div>
            <Progress value={weekPct} className="mt-2 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {completedWeek} of {weekTasks.length} weekly tasks complete
            </p>
          </div>
        </div>

        <div className="reveal mt-8 grid gap-4 sm:grid-cols-7">
          {DAYS.slice(0, 7).map((d) => {
            const dayTasks = byDay.get(d) ?? [];
            const allDone = dayTasks.length > 0 && dayTasks.every((t) => doneTasks.includes(t.id));
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  const el = document.getElementById(`day-${d}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-lift",
                  allDone
                    ? "border-sprout/40 bg-sprout/10"
                    : "border-border bg-card",
                )}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Day
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-2xl text-leaf">{d}</span>
                  <span className="text-xs text-muted-foreground">
                    {dayTasks.length} task{dayTasks.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-8">
          {DAYS.map((d) => {
            const dayTasks = byDay.get(d);
            if (!dayTasks || dayTasks.length === 0) return null;
            return (
              <section
                key={d}
                id={`day-${d}`}
                className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-2xl text-leaf">Day {d}</h2>
                  <Badge variant="secondary">
                    {dayTasks.filter((t) => doneTasks.includes(t.id)).length}/
                    {dayTasks.length} done
                  </Badge>
                </div>
                <ul className="divide-y divide-border/60">
                  {dayTasks.map((task) => {
                    const done = doneTasks.includes(task.id);
                    const Icon = kindIcon[task.kind];
                    return (
                      <li
                        key={task.id}
                        className="flex items-center gap-4 py-3"
                      >
                        <Checkbox
                          checked={done}
                          onCheckedChange={() => toggleTask(task.id)}
                          aria-label={`Mark ${task.title} as done`}
                        />
                        <div
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-xl bg-muted",
                            kindColor[task.kind],
                          )}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              done
                                ? "text-muted-foreground line-through"
                                : "text-foreground",
                            )}
                          >
                            {task.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {task.plant} &middot; {task.where}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          {task.minutes} min
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
