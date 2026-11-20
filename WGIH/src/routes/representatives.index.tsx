import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getRepresentatives } from "@/services/api";
import { RepresentativeCard } from "@/components/BusinessCards";
import { WorldMap } from "@/components/WorldMap";
import type { Representative } from "@/data/mock";

export const Route = createFileRoute("/representatives/")({
  head: () => ({
    meta: [
      { title: "Country Representatives — WGIH" },
      {
        name: "description",
        content:
          "Meet WGIH's country representatives across 14 offices worldwide, connecting local markets with Chinese companies and institutions.",
      },
      { property: "og:title", content: "Country Representatives — WGIH" },
      { property: "og:description", content: "WGIH representative offices around the world." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Representatives,
});

function Representatives() {
  const [list, setList] = useState<Representative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRepresentatives().then((r) => {
      setList(r);
      setLoading(false);
    });
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Country Representatives</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        WGIH operates through representative offices worldwide. Each representative connects local
        institutions, companies and professionals with Chinese manufacturers, geospatial technology
        and cooperation opportunities.
      </p>

      <section className="mt-8">
        <WorldMap reps={list} />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Click a pin to open a representative's profile.
        </p>
      </section>

      {loading ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((r) => (
            <RepresentativeCard key={r.id} rep={r} />
          ))}
        </div>
      )}
    </main>
  );
}
