import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Droplets,
  Sun,
  Search,
  Scissors,
  Plus,
  ChevronDown,
  Heart,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PlotBed, RingProgress } from "@/components/GardenLayout";
import { useStore } from "@/lib/store";
import { weather, tasks as allTasks, plots, posts, plants, type Task } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const kindIcon: Record<Task["kind"], typeof Droplets> = {
  water: Droplets,
  inspect: Search,
  harvest: Scissors,
  feed: Droplets,
  prune: Scissors,
  sow: Plus,
};

const kindTone: Record<Task["kind"], string> = {
  water: "bg-primary/15 text-primary",
  inspect: "bg-sun/30 text-sun-foreground",
  harvest: "bg-sprout/25 text-sprout-foreground",
  feed: "bg-accent text-accent-foreground",
  prune: "bg-muted text-foreground",
  sow: "bg-secondary text-secondary-foreground",
};

export const Route = createFileRoute("/(app)/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Overview — Cropwise" }],
  }),
});

function Dashboard() {
  const { user, hydrated, doneTasks, toggleTask, todayProgress, signOut } = useStore();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [user, hydrated, navigate]);

  if (!hydrated || !user) {
    return (
      <AppLayout variant="garden">
        <p className="text-sm text-muted-foreground">Loading your garden…</p>
      </AppLayout>
    );
  }

  const todays = allTasks.filter((t) => t.day === 1);
  const plot = plots[0]!;
  const firstName = user.name.split(" ")[0] ?? "gardener";
  const community = posts.slice(0, 2);

  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-[2.5rem]">
              Good {greeting()}, {firstName}.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {plants.filter((p) => p.health === "attention").length} plants need a look today — {todays.length} care tasks on the rooftop.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="leaf" className="rounded-full">
              <Link to="/tracker">
                <Plus className="size-4" />
                Add a plant
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLogoutOpen(true)} className="rounded-full">
              <LogOut className="size-4" />
              Log out
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-5">
          <section className="col-span-12 rounded-3xl border border-border/70 bg-card p-6 shadow-soft lg:col-span-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-foreground">{plot.name}</h2>
              <span className="rounded-full bg-sprout/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sprout-foreground">
                {plot.status}
              </span>
            </div>
            <div className="mt-5">
              <PlotBed cells={plot.cells} size={plot.size} />
            </div>
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
          </section>

          <section className="col-span-12 flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-soft lg:col-span-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-2xl text-foreground">Today's care</h2>
                <p className="mt-1 text-xs text-muted-foreground">{todays.length} tasks · rooftop &amp; balcony</p>
              </div>
              <RingProgress value={todayProgress} />
            </div>
            <ul className="mt-5 flex-1 space-y-3">
              {todays.map((task) => {
                const done = doneTasks.includes(task.id);
                const Icon = kindIcon[task.kind];
                return (
                  <li key={task.id} className="flex items-center gap-3 rounded-2xl border border-border/60 px-3 py-2.5">
                    <div className={cn("grid size-9 shrink-0 place-items-center rounded-xl", kindTone[task.kind])}>
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm font-medium", done ? "text-muted-foreground line-through" : "text-foreground")}>
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.where} · {task.minutes} min
                      </p>
                    </div>
                    <Checkbox
                      checked={done}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="size-5 rounded-full"
                      aria-label={`Mark ${task.title} as done`}
                    />
                  </li>
                );
              })}
            </ul>
            <Button asChild variant="outline" className="mt-5 w-full rounded-full">
              <Link to="/calendar">
                View full calendar
                <ChevronDown className="size-4 rotate-[-90deg]" />
              </Link>
            </Button>
          </section>

          <section className="col-span-12 overflow-hidden rounded-3xl bg-secondary p-6 shadow-soft lg:col-span-5">
            <Link to="/weather" className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Garden conditions</p>
                <p className="mt-4 font-display text-6xl tracking-tight text-foreground">{weather.temp}°</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">Perfect growing weather</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {weather.sky} in {weather.city}. Feels like {weather.feels}°.
                </p>
              </div>
              <Sun className="size-8 text-sun" />
            </Link>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-leaf/10 pt-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Rain chance</p>
                <p className="mt-1 font-medium text-foreground">{weather.rain}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="mt-1 font-medium text-foreground">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="mt-1 font-medium text-foreground">{weather.wind} mph</p>
              </div>
            </div>
          </section>

          <section className="col-span-12 rounded-3xl border border-border/70 bg-card p-6 shadow-soft lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-foreground">From the community</h2>
              <Link to="/community" className="text-sm font-medium text-sprout hover:underline">
                See all
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {community.map((post) => (
                <article key={post.id} className="rounded-2xl border border-border/60 p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-full bg-secondary text-[11px] font-semibold">
                      {post.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
                  <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="size-3.5" /> {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="size-3.5" /> {post.replies} replies
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { signOut(); setLogoutOpen(false); }}>Yes, log out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
