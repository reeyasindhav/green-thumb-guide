import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/tracker")({
  component: TrackerLayout,
});

function TrackerLayout() {
  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Outlet />
      </div>
    </AppLayout>
  );
}
