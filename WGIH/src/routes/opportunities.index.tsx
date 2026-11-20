import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { getOpportunities } from "@/services/api";
import { OpportunityCard } from "@/components/BusinessCards";
import { countries, type Opportunity } from "@/data/mock";

export const Route = createFileRoute("/opportunities/")({
  head: () => ({
    meta: [
      { title: "Business & Investment Opportunities — WGIH" },
      {
        name: "description",
        content:
          "Joint ventures, investment openings and partnership opportunities by country, facilitated through WGIH.",
      },
      { property: "og:title", content: "Business & Investment Opportunities — WGIH" },
      { property: "og:description", content: "Opportunities by country through WGIH." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Opportunities,
});

const types = ["Joint Venture", "Investment", "Partner Wanted", "Distribution"] as const;

function Opportunities() {
  const [list, setList] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpportunities().then((o) => {
      setList(o);
      setLoading(false);
    });
  }, []);

  const shown = filter === "all" ? list : list.filter((o) => o.type === filter);
  const byCountry = countries
    .map((c) => ({ country: c, items: shown.filter((o) => o.countryCode === c.code) }))
    .filter((g) => g.items.length > 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-sm text-muted-foreground">
        <Link to="/business" className="text-primary hover:underline">
          Business & Opportunities
        </Link>{" "}
        / Investment & Joint Ventures
      </p>
      <div className="mt-2 flex items-center gap-2">
        <TrendingUp className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold">Business & Investment Opportunities</h1>
      </div>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Chinese companies seeking international partners, investors looking for opportunities, and
        businesses interested in joint ventures — all connected through WGIH, organized by country.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${filter === "all" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
        >
          All types
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${filter === t ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : byCountry.length === 0 ? (
        <p className="mt-10 text-muted-foreground">No opportunities match this filter right now.</p>
      ) : (
        byCountry.map(({ country, items }) => (
          <section key={country.code} className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">{country.flag}</span> {country.name}
              <span className="text-sm font-normal text-muted-foreground">{country.nameZh}</span>
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((o) => (
                <OpportunityCard key={o.id} opp={o} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
