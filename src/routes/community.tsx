import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { posts as seedPosts, type Post } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  component: CommunityComponent,
  head: () => ({
    meta: [{ title: "Community — Cropwise" }],
  }),
});

const tags = ["All", "Harvest", "Question", "Swap", "Tip"] as const;

const tagClass: Record<string, string> = {
  Harvest: "bg-sprout/15 text-sprout-foreground hover:bg-sprout/15",
  Question: "bg-sun/15 text-sun-foreground hover:bg-sun/15",
  Swap: "bg-clay/15 text-clay-foreground hover:bg-clay/15",
  Tip: "bg-leaf/10 text-leaf-foreground hover:bg-leaf/10",
};

function CommunityComponent() {
  const { user } = useStore();
  const [filter, setFilter] = useState<(typeof tags)[number]>("All");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState("");
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  const feed = useMemo(() => {
    const all = [...localPosts, ...seedPosts];
    return filter === "All" ? all : all.filter((p) => p.tag === filter);
  }, [filter, localPosts]);

  const publish = () => {
    const body = draft.trim();
    if (!body) return;
    if (!user) {
      toast.message("Log in to post", { description: "Create a free account to share with neighbours." });
      return;
    }
    const next: Post = {
      id: `local-${Date.now()}`,
      author: user.name,
      initials: user.initials,
      handle: `@${user.name.toLowerCase().replace(/\s+/g, "")}`,
      time: "Just now",
      neighbourhood: user.city,
      body,
      likes: 0,
      replies: 0,
      tag: "Tip",
    };
    setLocalPosts((prev) => [next, ...prev]);
    setDraft("");
    toast.success("Posted to the neighbourhood board");
  };

  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <PageHeader
          kicker="Neighbours"
          title="Community"
          description="Share harvests, ask questions, and swap seed with gardeners nearby."
        />

        <div className="mt-8 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
          <label htmlFor="composer" className="text-sm font-medium text-foreground">
            What's growing?
          </label>
          <Textarea
            id="composer"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={user ? "Share a tip, harvest, or question…" : "Log in to share with the community"}
            className="mt-2 min-h-24 resize-none bg-background"
          />
          <div className="mt-3 flex justify-end">
            <Button variant="leaf" className="rounded-full" onClick={publish} disabled={!draft.trim()}>
              Post
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Button key={t} variant={filter === t ? "leaf" : "outline"} size="sm" className="rounded-full" onClick={() => setFilter(t)}>
              {t}
            </Button>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          {feed.map((post, i) => {
            const isLiked = !!liked[post.id];
            return (
              <article
                key={post.id}
                className="reveal rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">{post.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{post.author}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {post.handle} · {post.time} · {post.neighbourhood}
                    </p>
                  </div>
                  <Badge className={cn("ml-auto border-0", tagClass[post.tag])}>{post.tag}</Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{post.body}</p>
                {post.image && (
                  <div className="mt-3 overflow-hidden rounded-xl">
                    <img src={post.image} alt="" className="h-56 w-full object-cover sm:h-64" />
                  </div>
                )}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <button
                    type="button"
                    className={cn("inline-flex items-center gap-1.5 hover:text-foreground", isLiked && "text-clay")}
                    onClick={() => setLiked((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                    aria-pressed={isLiked}
                    aria-label={`Like post by ${post.author}`}
                  >
                    <Heart className={cn("size-4", isLiked && "fill-clay")} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </button>
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="size-4" /> {post.replies}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
