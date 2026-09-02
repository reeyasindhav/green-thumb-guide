import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { img } from "@/lib/data";
import { Brand } from "@/components/Brand";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/(app)/signup")({
  component: SignupComponent,
  head: () => ({
    meta: [{ title: "Create account — Cropwise" }],
  }),
});

function SignupComponent() {
  const { signIn } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    signIn(email, name);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={img.balcony}
          alt="Balcony container garden"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-10">
          <Brand tone="light" />
          <p className="mt-4 max-w-md text-sm text-white/80">
            Start planning your plot, track every plant, and connect with local growers.
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
              <span>Get started</span>
            </div>
            <h1 className="font-display text-3xl tracking-tight text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join Cropwise and start planning your garden.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Gardener" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="At least 6 characters" required minLength={6} autoComplete="new-password" />
              </div>
              <Button type="submit" variant="leaf" className="w-full rounded-full">Start growing</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already growing? <Link to="/login" className="font-medium text-sprout hover:underline">Log in</Link>
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
