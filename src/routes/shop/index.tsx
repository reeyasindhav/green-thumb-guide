import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop/")({
  component: ShopIndexComponent,
  head: () => ({
    meta: [{ title: "Shop — Cropwise" }],
  }),
});

const categories = ["All", "Seeds", "Soil & feed", "Tools", "Containers", "Kits"] as const;

function ShopIndexComponent() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(() => (cat === "All" ? products : products.filter((p) => p.category === cat)), [cat]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <PageHeader
          kicker="Store"
          title="Shop"
          description="Curated seeds, soil, and tools chosen for balconies, rails, and rooftops."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} variant={cat === c ? "leaf" : "outline"} size="sm" className="rounded-full" onClick={() => setCat(c)}>
              {c}
            </Button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState icon={PackageSearch} title="Nothing in this aisle" description="Try another category — new kits land with the season." />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </div>
        )}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Need something specific? Check the{" "}
          <Link to="/guides" className="font-medium text-sprout hover:underline">
            plant guides
          </Link>{" "}
          before you buy.
        </p>
      </div>
    </AppLayout>
  );
}
