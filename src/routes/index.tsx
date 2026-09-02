import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sprout, CalendarDays, BarChart3, Users, ShoppingBag, Leaf, Check } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { GuideCard } from "@/components/GuideCard";
import { Button } from "@/components/ui/button";
import { guides, img } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ title: "Cropwise — Grow more in small spaces" }],
  }),
});

const features = [
  { icon: Sprout, title: "Plot planner", to: "/planner", description: "Arrange beds and pots for the best light and yield." },
  { icon: CalendarDays, title: "Care calendar", to: "/calendar", description: "Never miss a watering, feeding, or sowing date." },
  { icon: BarChart3, title: "Growth tracker", to: "/tracker", description: "Watch each plant move from seed to harvest." },
  { icon: Users, title: "Community", to: "/community", description: "Swap seed, share harvests, and learn from neighbours." },
  { icon: ShoppingBag, title: "Shop", to: "/shop", description: "Curated seeds, soil, and tools for small spaces." },
] as const;

const stats = [
  { value: "12+", label: "Plant guides" },
  { value: "5", label: "Garden tools" },
  { value: "28", label: "Care days mapped" },
];

function Index() {
  const featured = guides.slice(0, 3);

  return (
    <AppLayout>
      <section className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-40" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
              <Leaf className="size-3.5 text-sprout" /> Small-space gardening
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Grow more in small spaces
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Plan your plot, track every plant, and harvest with confidence — from a balcony, windowsill, or rooftop.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="leaf" size="lg" className="rounded-full">
                <Link to="/signup">
                  Start growing
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-card">
                <Link to="/guides">Explore guides</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["No yard required", "Container-first advice", "Free to start"].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-sprout" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal relative" style={{ animationDelay: "0.1s" }}>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
              <img src={img.hero} alt="Lush container garden on a balcony" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 hidden rounded-2xl border border-border/70 bg-card p-4 shadow-soft sm:block">
              <p className="text-xs text-muted-foreground">This week</p>
              <p className="font-display text-lg text-foreground">+4 harvests</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border/70 px-5 py-8 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-3 text-center sm:px-6">
              <p className="font-display text-2xl text-foreground sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="reveal overflow-hidden rounded-3xl shadow-soft">
            <img src={img.rooftop} alt="Rooftop garden beds" className="h-full max-h-[420px] w-full object-cover" />
          </div>
          <div className="reveal" style={{ animationDelay: "0.1s" }}>
            <p className="text-sm font-medium uppercase tracking-wider text-sprout">Built for real spaces</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">Every square foot counts</h2>
            <p className="mt-4 text-muted-foreground">
              Cropwise is designed for the spaces most gardeners actually have — balconies, railings, windowsills, and rooftops. Plan smarter, not bigger.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Square-foot planning for tight layouts", "Container-aware watering reminders", "Stage-based harvest windows"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Sprout className="mt-0.5 size-4 shrink-0 text-sprout" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-sprout">Everything you need</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">Five tools, one garden</h2>
            <p className="mt-3 text-muted-foreground">From planning to harvest, Cropwise keeps every part of your garden in one place.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="lift reveal group rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
              >
                <f.icon className="size-7 text-sprout" />
                <h3 className="mt-4 font-display text-lg text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sprout transition-all group-hover:gap-2">
                  Open <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-sprout">From the library</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground">Guides worth reading this week</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/guides">
              All guides <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((g, i) => (
            <GuideCard key={g.slug} g={g} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="reveal order-2 lg:order-1" style={{ animationDelay: "0.1s" }}>
            <p className="text-sm font-medium uppercase tracking-wider text-sprout">Grown together</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">Rooted in community</h2>
            <p className="mt-4 text-muted-foreground">
              Share surplus seed, swap harvests, and learn from gardeners on your street. The best tips come from the plot next door.
            </p>
            <Button asChild variant="leaf" className="mt-6 rounded-full">
              <Link to="/community">
                Join the community
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="reveal order-1 overflow-hidden rounded-3xl shadow-soft lg:order-2">
            <img src={img.community} alt="Community garden volunteers" className="h-full max-h-[380px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-leaf px-8 py-12 text-center text-leaf-foreground shadow-lift sm:px-12">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Ready to plant your first square?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-leaf-foreground/80">
            Create a free account to save your beds, tick off care tasks, and keep your cart across visits.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full bg-sprout text-sprout-foreground hover:bg-sprout/90">
              <Link to="/signup">Create account</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-leaf-foreground/30 bg-transparent text-leaf-foreground hover:bg-leaf-foreground/10">
              <Link to="/planner">Try the planner</Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
