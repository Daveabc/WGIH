import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Satellite } from "lucide-react";
import { getSolutions } from "@/services/api";
import { SolutionCard } from "@/components/Cards";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Solution } from "@/data/solutions";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Space & Geospatial Solutions — WGIH" },
      {
        name: "description",
        content:
          "Practical geospatial applications across surveying, agriculture, disaster monitoring, smart cities, energy, water, land administration and more.",
      },
      { property: "og:title", content: "Space & Geospatial Solutions — WGIH" },
      {
        property: "og:description",
        content: "From space to society — real geospatial applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SolutionsHub,
});

function SolutionsHub() {
  const [list, setList] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSolutions().then((s) => {
      setList(s);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(56,198,255,.5), transparent 45%), radial-gradient(circle at 80% 70%, rgba(124,92,255,.4), transparent 45%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
            <Satellite className="h-4 w-4" /> From Space to Society
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Space &amp; Geospatial Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Real-world applications of satellite, drone and GIS technology — turning spatial data
            into decisions across {list.length || 14} sectors, delivered through WGIH's global
            network.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Explore Solutions by Application</h2>
        <p className="mt-1 text-muted-foreground">
          Each solution shows the challenge, workflow, data, software, hardware and expected outputs
          — and how to request it.
        </p>

        {loading ? (
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {list.map((s, i) => (
              <ScrollReveal key={s.id} delayMs={(i % 4) * 60}>
                <SolutionCard solution={s} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
