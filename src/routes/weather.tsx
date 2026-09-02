import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { weather } from "@/lib/data";
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/weather")({
  component: WeatherPage,
  head: () => ({
    meta: [{ title: "Weather — Cropwise" }],
  }),
});

const iconMap: Record<string, typeof Sun> = { sun: Sun, cloud: Cloud, rain: CloudRain };

function WeatherPage() {
  const tips = generateTips(weather);

  return (
    <AppLayout variant="garden">
      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-6 rounded-full">
          <Link to="/dashboard">
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </Button>

        <PageHeader
          kicker="Garden conditions"
          title="Weather"
          description={`Current conditions in ${weather.city} and what they mean for your plants.`}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="reveal overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Right now</p>
                <p className="mt-2 font-display text-7xl tracking-tight text-foreground">{weather.temp}°</p>
                <p className="mt-1 text-lg text-muted-foreground">Feels like {weather.feels}°</p>
                <p className="mt-4 text-base text-foreground">{weather.sky}</p>
              </div>
              <Sun className="size-16 text-sun" />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              <WeatherStat icon={<CloudRain className="size-5 text-sprout" />} label="Rain chance" value={`${weather.rain}%`} />
              <WeatherStat icon={<Droplets className="size-5 text-sun" />} label="Humidity" value={`${weather.humidity}%`} />
              <WeatherStat icon={<Wind className="size-5 text-leaf" />} label="Wind" value={`${weather.wind} mph`} />
            </div>
          </section>

          <section className="reveal rounded-3xl border border-border bg-secondary/60 p-6 shadow-soft" style={{ animationDelay: "80ms" }}>
            <h3 className="font-display text-lg text-foreground">Gardening tips</h3>
            <ul className="mt-4 space-y-3">
              {tips.map((tip) => (
                <li key={tip} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sprout" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8">
          <h3 className="font-display text-xl text-foreground">5-day forecast</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {weather.forecast.map((day) => {
              const Icon = iconMap[day.icon] ?? Cloud;
              return (
                <div key={day.day} className="reveal rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
                  <p className="text-sm font-medium text-foreground">{day.day}</p>
                  <Icon className="mx-auto mt-3 size-8 text-sun" />
                  <p className="mt-2 font-display text-2xl text-foreground">{day.temp}°</p>
                  <Badge variant="outline" className="mt-2 rounded-full text-[11px] capitalize">
                    {day.icon === "sun" ? "Sunny" : day.icon === "cloud" ? "Cloudy" : "Rain"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function WeatherStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon}{label}</p>
      <p className="mt-1 font-display text-xl text-foreground">{value}</p>
    </div>
  );
}

function generateTips(w: typeof weather) {
  const tips: string[] = [];
  if (w.rain > 40) tips.push("High rain chance — skip watering today and check drainage.");
  else if (w.rain < 20) tips.push("Low rain chance — keep containers moist, especially small pots.");
  if (w.wind > 10) tips.push("Windy conditions — stake tomatoes and secure lightweight planters.");
  if (w.temp > 80) tips.push("Hot day — water in the morning and provide afternoon shade.");
  if (w.temp < 55) tips.push("Cool temps — hold off on sowing warmth-loving seeds.");
  if (w.humidity > 70) tips.push("Humid air — improve airflow to reduce mildew risk.");
  if (w.sky.toLowerCase().includes("clear")) tips.push("Clear skies — perfect for pollinator visits.");
  if (tips.length === 0) tips.push("Balanced conditions — standard care routine works well today.");
  return tips;
}
