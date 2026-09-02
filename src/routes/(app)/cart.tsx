import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ShoppingBasket } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(app)/cart")({
  component: Cart,
  head: () => ({
    meta: [{ title: "Cart — Cropwise" }],
  }),
});

function Cart() {
  const { cartLines, setQty, removeFromCart, cartTotal } = useStore();

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-5 py-10 lg:px-8">
        <div className="mb-8">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Continue shopping
          </Link>
          <div className="mt-3">
            <PageHeader
              title="Your cart"
              description={
                cartLines.length === 0
                  ? "Your cart is empty."
                  : `${cartLines.length} item${cartLines.length === 1 ? "" : "s"} ready to grow.`
              }
            />
          </div>
        </div>

        {cartLines.length === 0 ? (
          <EmptyState icon={ShoppingBasket} title="Nothing here yet" description="Browse the shop for seeds, soil, and tools for your space.">
            <Button asChild variant="leaf" className="rounded-full">
              <Link to="/shop">
                <ShoppingBag className="size-4" />
                Go to shop
              </Link>
            </Button>
          </EmptyState>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {cartLines.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="reveal flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-soft"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.tagline}</p>
                    <p className="mt-1 text-sm font-medium text-sprout">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setQty(product.id, qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-7 text-center text-sm font-medium">{qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      onClick={() => setQty(product.id, qty + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="reveal h-fit rounded-2xl border border-border/70 bg-card p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-lg">Order summary</h2>
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
              <Button asChild variant="leaf" className="mt-5 w-full rounded-full">
                <Link to="/checkout">Checkout</Link>
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Secure checkout &middot; Free shipping over $50
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
