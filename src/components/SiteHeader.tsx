import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBasket, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const primary = [
  { to: "/guides", label: "Guides" },
  { to: "/shop", label: "Shop" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user, cartCount, signOut } = useStore();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 lg:px-8">
          <Brand />
          <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Primary">
            {primary.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="relative rounded-full">
              <Link to="/cart" aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : "Cart"}>
                <ShoppingBasket className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-clay text-[11px] font-semibold text-clay-foreground">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </Button>
            {user ? (
              <>
                <Button asChild variant="ghost" className="hidden sm:inline-flex rounded-full">
                  <Link to="/profile">{user.name.split(" ")[0]}</Link>
                </Button>
                <Button asChild variant="leaf" className="hidden sm:inline-flex rounded-full">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLogoutOpen(true)}
                  className="hidden rounded-full sm:inline-flex"
                >
                  <LogOut className="size-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden rounded-full sm:inline-flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild variant="leaf" className="hidden rounded-full sm:inline-flex">
                  <Link to="/signup">Start growing</Link>
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <div className="animate-fade-in border-t border-border bg-card px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {primary.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {item.label}
                </a>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => setLogoutOpen(true)}
                    className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Start growing
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      {logoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">Log out</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to log out? You will need to sign in again to access your account.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setLogoutOpen(false)}>
                Cancel
              </Button>
              <Button variant="leaf" onClick={() => { signOut(); setLogoutOpen(false); }}>
                Yes, log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
