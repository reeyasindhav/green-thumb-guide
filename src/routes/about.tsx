import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { img } from "@/lib/data";
import { ArrowRight, Heart, Sprout, Users, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
  head: () => ({
    meta: [{ title: "About — Cropwise" }],
  }),
});

function AboutComponent() {
  return (
    <AppLayout>
      <div className="flex flex-col">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={img.rooftop} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="max-w-2xl animate-fade-up">
              <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
                Growing food shouldn’t require a farm
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Cropwise helps urban gardeners turn balconies, windowsills, and rooftops into productive growing spaces. We combine practical guidance, simple planning tools, and community support so you can grow with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="leaf" size="lg">
                  <Link to="/guides">Explore guides</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/community">Join community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="reveal overflow-hidden rounded-3xl">
              <img src={img.community} alt="Community gardening" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-3xl tracking-tight text-foreground">Our mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Most people want to grow some of their own food, but city life makes it feel complicated. Between limited space, confusing care advice, and the lack of a local grower network, many people give up before they start. Cropwise removes those barriers with practical, small-space-focused guidance and tools that make garden planning feel approachable.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We believe anyone can grow something edible, no matter how small their space. Our job is to make that first season easier, more enjoyable, and a little more social.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="reveal rounded-2xl border border-border/70 bg-card p-6 text-center shadow-soft">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-sprout/15 text-sprout">
                  <Sprout className="size-6" />
                </div>
                <p className="mt-4 font-display text-3xl text-foreground">5,000+</p>
                <p className="mt-1 text-sm text-muted-foreground">Active gardeners</p>
              </div>
              <div className="reveal rounded-2xl border border-border/70 bg-card p-6 text-center shadow-soft" style={{ animationDelay: "0.05s" }}>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-sun/15 text-sun">
                  <Globe className="size-6" />
                </div>
                <p className="mt-4 font-display text-3xl text-foreground">40+</p>
                <p className="mt-1 text-sm text-muted-foreground">Cities growing with Cropwise</p>
              </div>
              <div className="reveal rounded-2xl border border-border/70 bg-card p-6 text-center shadow-soft" style={{ animationDelay: "0.1s" }}>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                  <Users className="size-6" />
                </div>
                <p className="mt-4 font-display text-3xl text-foreground">120+</p>
                <p className="mt-1 text-sm text-muted-foreground">Community events hosted</p>
              </div>
              <div className="reveal rounded-2xl border border-border/70 bg-card p-6 text-center shadow-soft" style={{ animationDelay: "0.15s" }}>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-clay/15 text-clay">
                  <Heart className="size-6" />
                </div>
                <p className="mt-4 font-display text-3xl text-foreground">18,000+</p>
                <p className="mt-1 text-sm text-muted-foreground">Harvests shared</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h2 className="font-display text-3xl tracking-tight text-foreground">What we believe</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg text-foreground">Small spaces deserve big yields</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                With the right plants, pots, and timing, a single balcony rail can feed a household through the season. We design our tools around small-scale growing.
              </p>
            </div>
            <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft" style={{ animationDelay: "0.05s" }}>
              <h3 className="font-display text-lg text-foreground">Clarity over complexity</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Gardening is simple, but the internet is not. We cut through noise with straightforward steps, clear schedules, and plain-language guidance.
              </p>
            </div>
            <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft" style={{ animationDelay: "0.1s" }}>
              <h3 className="font-display text-lg text-foreground">Growers grow better together</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Local knowledge beats generic advice. That’s why we built community features that connect neighbours who share seeds, tips, and harvests.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border/70 bg-secondary/30">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8">
            <h2 className="font-display text-3xl tracking-tight text-foreground">Ready to start growing?</h2>
            <p className="mt-4 text-muted-foreground">
              Join Cropwise and turn your space into a garden. It’s free to get started.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="leaf" size="lg">
                <Link to="/signup">Create free account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/guides">Browse guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
