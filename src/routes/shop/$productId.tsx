import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { ArrowLeft, ShoppingCart, Star, Ruler, Thermosphere } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/$productId")({
  component: ProductDetailComponent,
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    return {
      meta: [{ title: product ? `${product.name} — Shop` : "Shop — Cropwise" }],
    };
  },
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useStore();
  const navigate = useNavigate();

  if (!product) {
    throw notFound();
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success(`Added ${product.name}`, {
      description: "View your cart whenever you're ready.",
      action: {
        label: "Cart",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to shop
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="reveal overflow-hidden rounded-3xl bg-secondary/40">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              {product.badge && (
                <span className="rounded-full bg-sprout/15 px-2.5 py-1 text-[11px] font-medium text-sprout-foreground">
                  {product.badge}
                </span>
              )}
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                {product.category}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-4 fill-sun text-sun" />
              <span className="text-sm font-medium text-foreground">{product.rating.toFixed(1)}</span>
              <span aria-hidden className="mx-1">·</span>
              <span>{product.reviews} reviews</span>
            </div>

            <div className="mt-6 text-3xl font-display text-foreground">
              ${product.price.toFixed(2)}
              {product.compareAt && (
                <span className="ml-3 text-lg font-normal text-muted-foreground line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-lg text-foreground">What's included</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {product.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button variant="leaf" size="lg" className="w-full sm:w-auto" onClick={handleAddToCart}>
                <ShoppingCart className="size-4" />
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
