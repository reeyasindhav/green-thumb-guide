import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GardenLayout } from "@/components/GardenLayout";
import type { ReactNode } from "react";

export function AppLayout({
  children,
  variant = "site",
}: {
  children: ReactNode;
  variant?: "site" | "garden";
}) {
  if (variant === "garden") {
    return <GardenLayout>{children}</GardenLayout>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-leaf focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-leaf-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
