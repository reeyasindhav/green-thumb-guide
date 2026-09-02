import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/(app)/checkout")({
  component: Checkout,
  head: () => ({
    meta: [{ title: "Checkout — Cropwise" }],
  }),
});

function Checkout() {
  const { cartLines, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => navigate({ to: "/" }), 2000);
  };

  if (cartLines.length === 0 && !submitted) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <h1 className="font-display text-3xl text-foreground">Nothing to checkout</h1>
          <p className="mt-2 text-muted-foreground">Your cart is empty. Add some seeds or tools first.</p>
          <Button asChild variant="leaf" className="mt-6 rounded-full">
            <Link to="/shop">Browse shop</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (submitted) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <CheckCircle2 className="mx-auto size-12 text-sprout" />
          <h1 className="mt-4 font-display text-3xl text-foreground">Order placed</h1>
          <p className="mt-2 text-muted-foreground">Thanks for growing with Cropwise. Redirecting you home...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="animate-fade-up mb-8">
          <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to cart
          </Link>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground">Checkout</h1>
          <p className="mt-2 text-muted-foreground">Complete your order for pickup or delivery.</p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg">Shipping</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={form.name} onChange={set("name")} placeholder="Jane Gardener" required />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={form.address} onChange={set("address")} placeholder="123 Rooftop Rd" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={form.city} onChange={set("city")} placeholder="Portland" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="zip">ZIP code</Label>
                  <Input id="zip" value={form.zip} onChange={set("zip")} placeholder="97201" required />
                </div>
              </div>
            </div>

            <div className="reveal rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2">
                <CreditCard className="size-5 text-sprout" />
                <h2 className="font-display text-lg">Payment</h2>
                <Lock className="ml-auto size-4 text-muted-foreground" />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="card">Card number</Label>
                  <Input id="card" value={form.card} onChange={set("card")} placeholder="4242 4242 4242 4242" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" value={form.cvc} onChange={set("cvc")} placeholder="123" required />
                </div>
              </div>
            </div>
          </div>

          <div className="reveal h-fit rounded-2xl border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-24">
            <h2 className="font-display text-lg">Order summary</h2>
            <div className="mt-4 space-y-3">
              {cartLines.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {qty}</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">${(product.price * qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-border/70 pt-4 text-base font-medium">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button type="submit" variant="leaf" className="mt-5 w-full rounded-full">
              Place order
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Secure checkout &middot; Free shipping over $50
            </p>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
