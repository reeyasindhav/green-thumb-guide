import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { User, MapPin, CreditCard, LogOut, Save, Check } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/profile")({
  component: Profile,
  head: () => ({
    meta: [{ title: "Profile — Cropwise" }],
  }),
});

function Profile() {
  const { user, signOut, updateProfile, hydrated } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCity(user.city);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSave = () => {
    updateProfile({ name, city });
    if (timerRef.current) clearTimeout(timerRef.current);
    setSaved(true);
    toast.success("Profile saved");
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  if (!hydrated || !user) {
    return (
      <AppLayout variant="garden">
        <div className="mx-auto max-w-3xl px-5 py-20 text-sm text-muted-foreground">Loading profile…</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-3xl px-5 py-10 lg:px-8">
        <PageHeader
          kicker="Settings"
          title="Your profile"
          description="Manage your account details and plan."
        />

        <div className="mt-8 grid gap-5">
          <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <User className="size-5 text-sprout" />
              <h2 className="font-display text-lg">Account</h2>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Display name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <Input value={user?.email ?? ""} disabled className="bg-muted/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  <MapPin className="mr-1 inline size-4" />City
                </label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Portland, OR"
                />
              </div>
              <Button onClick={handleSave} variant="leaf" className="gap-2 rounded-full">
                {saved ? <Check className="size-4" /> : <Save className="size-4" />}
                {saved ? "Saved" : "Save changes"}
              </Button>
            </div>
          </div>

          <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-3">
              <CreditCard className="size-5 text-sprout" />
              <h2 className="font-display text-lg">Plan</h2>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/50 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{user?.plan ?? "Grower"} plan</p>
                <p className="text-xs text-muted-foreground">Full access to planning tools and community</p>
              </div>
              <span className="rounded-full bg-sprout/15 px-3 py-1 text-xs font-medium text-sprout-foreground">
                Active
              </span>
            </div>
          </div>

          <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-display text-lg">Session</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign out of this device. Your data stays safe in your account.
            </p>
            <Button
              onClick={() => {
                signOut();
                navigate({ to: "/" });
              }}
              variant="outline"
              className="mt-4 gap-2 rounded-full"
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Back to home</Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
