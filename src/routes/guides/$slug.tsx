import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { GuideCard } from "@/components/GuideCard";
import { guides } from "@/lib/data";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guides/$slug")({
  component: GuideDetailComponent,
  head: ({ params }) => {
    const guide = guides.find((g) => g.slug === params.slug);
    return {
      meta: [{ title: guide ? `${guide.title} — Cropwise` : "Guide — Cropwise" }],
    };
  },
});

function GuideDetailComponent() {
  const { slug } = Route.useParams();
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    throw notFound();
  }

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <AppLayout>
      <article className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <div className="animate-fade-up">
          <Link to="/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All guides
          </Link>
          <div className="mt-6 overflow-hidden rounded-3xl shadow-soft">
            <img src={guide.image} alt="" className="h-56 w-full object-cover sm:h-72" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">{guide.level}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {guide.minutes} min read
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">{guide.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{guide.excerpt}</p>
        </div>

        <div className="reveal mt-10 space-y-8">
          {guide.content.map((section, i) => (
            <section key={section.heading} style={{ animationDelay: `${i * 80}ms` }}>
              <h2 className="font-display text-xl text-foreground">{section.heading.trim()}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Ready to apply this?</p>
            <p className="mt-1 text-xs text-muted-foreground">Open the planner or calendar to put these steps into action.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/planner">Planner</Link>
            </Button>
            <Button asChild variant="leaf" size="sm" className="rounded-full">
              <Link to="/calendar">Calendar</Link>
            </Button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div className="border-t border-border/70 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <h2 className="font-display text-2xl text-foreground">Keep reading</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((g, i) => (
                <GuideCard key={g.slug} g={g} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
