import { Link } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  Home,
  Leaf,
  Menu,
  Sprout,
  Users,
  X,
  ShoppingBasket,
  LayoutGrid,
  BookOpen,
  CloudSun,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { plants, weather } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const mainNav = [
  { to: "/dashboard", label: "Overview", icon: Home },
  { to: "/calendar", label: "Care calendar", icon: CalendarDays },
  { to: "/tracker", label: "My plants", icon: Sprout },
  { to: "/community", label: "Community", icon: Users },
] as const;

const extraNav = [
  { to: "/planner", label: "Plot planner", icon: LayoutGrid },
  { to: "/guides", label: "Guides", icon: BookOpen },
  { to: "/shop", label: "Shop", icon: ShoppingBasket },
  { to: "/weather", label: "Weather", icon: CloudSun },
] as const;

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const seasonPct = Math.round(plants.reduce((n, p) => n + p.progress, 0) / plants.length);

  return (
    <>
      <div className="px-5 pt-6">
        <Brand tone="light" />
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1 px-3" aria-label="Garden">
        {mainNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
        <p className="mb-1 mt-6 px-3 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/45">More</p>
        {extraNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="m-4 rounded-2xl bg-sidebar-accent p-4">
        <p className="text-sm font-medium text-sidebar-accent-foreground">Season progress</p>
        <Progress value={seasonPct} className="mt-3 h-1.5 bg-sidebar-foreground/15 [&>div]:bg-sprout" />
        <p className="mt-2 text-xs text-sidebar-foreground/70">{seasonPct}%</p>
        <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/55">
          You're growing {plants.length} plants this season. Keep it up.
        </p>
      </div>
    </>
  );
}

export function GardenLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, cartCount } = useStore();
  const today = format(new Date(), "EEEE, d MMMM yyyy");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-leaf focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-leaf-foreground"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar lg:flex">
        <SidebarBody />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-leaf/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-64 flex-col bg-sidebar shadow-lift">
            <button
              type="button"
              className="absolute right-3 top-4 grid size-9 place-items-center rounded-full text-sidebar-foreground"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/90 px-4 backdrop-blur-md sm:px-8">
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <p className="hidden text-sm text-muted-foreground sm:block">{weather.city}</p>
          <span className="hidden text-border sm:inline">·</span>
          <p className="truncate text-sm text-muted-foreground">{today}</p>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="relative rounded-full">
              <Link to="/cart" aria-label="Cart">
                <ShoppingBasket className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-clay text-[10px] font-semibold text-clay-foreground">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link to="/calendar" aria-label="Notifications">
                <Bell className="size-5" />
              </Link>
            </Button>
            <Link
              to={user ? "/profile" : "/login"}
              className="grid size-9 place-items-center rounded-full bg-leaf text-xs font-semibold text-leaf-foreground"
              aria-label={user ? "Profile" : "Log in"}
            >
              {user?.initials ?? <Leaf className="size-4" />}
            </Link>
          </div>
        </header>
        <main id="main" className="flex-1 px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function RingProgress({ value, label }: { value: number; label?: string }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative grid size-14 place-items-center">
      <svg viewBox="0 0 44 44" className="size-14 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" className="stroke-muted" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          className="stroke-sprout"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-semibold text-foreground">{label ?? `${value}%`}</span>
    </div>
  );
}

export function healthTile(health: "attention" | "harvest" | "well") {
  if (health === "attention") return "bg-clay text-clay-foreground";
  if (health === "harvest") return "bg-sprout text-sprout-foreground";
  return "bg-sun text-sun-foreground";
}

export function PlotBed({
  cells,
  size,
}: {
  cells: Array<{ id: string; plant: string; emoji: string; health: "attention" | "harvest" | "well"; col: number; row: number; w: number; h: number }>;
  size?: string;
}) {
  const maxCol = Math.max(...cells.map((c) => c.col + c.w - 1), 6);
  const maxRow = Math.max(...cells.map((c) => c.row + c.h - 1), 4);
  const CELL = 56;

  return (
    <div className="overflow-x-auto">
      <div
        className="relative mx-auto rounded-[1.75rem] bg-secondary/70 p-4"
        style={{ width: maxCol * CELL + 32, minHeight: maxRow * CELL + 32 }}
      >
        {size ? <p className="absolute left-4 top-3 text-[11px] text-muted-foreground">{size}</p> : null}
        <div className="relative mt-4" style={{ width: maxCol * CELL, height: maxRow * CELL }}>
          {cells.map((cell) => (
            <div
              key={cell.id}
              className={cn(
                "absolute flex flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-center shadow-soft",
                healthTile(cell.health),
              )}
              style={{
                left: (cell.col - 1) * CELL + 4,
                top: (cell.row - 1) * CELL + 4,
                width: cell.w * CELL - 8,
                height: cell.h * CELL - 8,
              }}
            >
              <span className="text-lg leading-none">{cell.emoji}</span>
              <span className="text-[10px] font-medium leading-tight">{cell.plant}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
