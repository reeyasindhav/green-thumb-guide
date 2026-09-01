import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./Brand";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/guides", label: "Plant guides" },
  { to: "/shop", label: "Shop" },
  { to: "/community", label: "Community" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, cartCount } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 py-4 lg:px-8">
        <Brand />
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative rounded-full">
            <Link to="/cart" aria-label="Cart">
              <ShoppingBasket className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-clay text-[11px] font-semibold text-clay-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          {user ? (
            <Button asChild variant="leaf" className="hidden sm:inline-flex">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild variant="leaf" className="hidden sm:inline-flex">
                <Link to="/signup">Start growing</Link>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="animate-fade-in border-t border-border bg-card px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={user ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {user ? "Dashboard" : "Log in"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
