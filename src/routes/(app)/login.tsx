import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { img } from "@/lib/data";
import { Brand } from "@/components/Brand";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/(app)/login")({
  component: LoginComponent,
  head: () => ({
    meta: [{ title: "Log in — Cropwise" }],
  }),
});

function LoginComponent() {
  const { signIn } = useStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signIn(email, name || undefined);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={img.rooftop}
          alt="Urban rooftop garden"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-10">
          <Brand tone="light" />
          <p className="mt-4 max-w-md text-sm text-white/80">
            Plan your plot, track every plant, and harvest with confidence — from a balcony, windowsill, or rooftop.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="lg:hidden border-b border-border/70 bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 py-4">
            <Brand />
          </div>
        </header>

        <main className="flex flex-1 items-center px-5 py-12">
          <div className="mx-auto w-full max-w-sm animate-fade-up">
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Leaf className="size-4 text-sprout" />
              <span>Welcome back</span>
            </div>
            <h1 className="font-display text-3xl tracking-tight text-foreground">Log in</h1>
            <p className="mt-1 text-sm text-muted-foreground">Access your garden dashboard.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required minLength={6} autoComplete="current-password" />
              </div>
              <Button type="submit" variant="leaf" className="w-full rounded-full">Log in</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              No account? <Link to="/signup" className="font-medium text-sprout hover:underline">Start growing</Link>
            </p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Back to home</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
