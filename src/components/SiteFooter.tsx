import { Link } from "@tanstack/react-router";
import { Brand } from "@/components/Brand";
import { Leaf, Instagram, Twitter } from "lucide-react";

const columns = [
  {
    title: "Grow",
    links: [
      { to: "/guides", label: "Plant guides" },
      { to: "/planner", label: "Plot planner" },
      { to: "/calendar", label: "Care calendar" },
      { to: "/tracker", label: "Growth tracker" },
    ],
  },
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All products" },
      { to: "/cart", label: "Cart" },
      { to: "/community", label: "Community" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/terms-of-use", label: "Terms of Use" },
      { to: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Tools for balcony, windowsill, and rooftop gardens — plan, tend, and harvest at your own pace.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:border-sprout hover:text-sprout">
                <Instagram className="size-4" />
              </a>
              <a href="#" className="rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:border-sprout hover:text-sprout">
                <Twitter className="size-4" />
              </a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-sprout">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cropwise. Grow at your own pace.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Leaf className="size-3.5 text-sprout" />
            <span>Made for urban gardeners</span>
          </div>
          <p className="text-xs text-muted-foreground">Demo storefront — no payment is charged.</p>
        </div>
      </div>
    </footer>
  );
}
