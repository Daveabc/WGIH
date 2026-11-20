import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Car,
  Tractor,
  Satellite,
  Sun,
  Plug,
  Wrench,
  Cpu,
  Store,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { getCompanies, getProductCategories, getOpportunities } from "@/services/api";
import { CompanyCard, OpportunityCard } from "@/components/BusinessCards";
import type { Company, ProductCategory, Opportunity } from "@/data/mock";

export const Route = createFileRoute("/marketplace/")({
  head: () => ({
    meta: [
      { title: "Business Marketplace — WGIH" },
      {
        name: "description",
        content:
          "Discover Chinese manufacturers and products — EVs, machinery, GIS, solar, EV charging, spare parts and electronics. Connect through WGIH.",
      },
      { property: "og:title", content: "Business Marketplace — WGIH" },
      { property: "og:description", content: "Chinese manufacturers and products by category." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Marketplace,
});

const icons: Record<string, LucideIcon> = { Car, Tractor, Satellite, Sun, Plug, Wrench, Cpu };

function Marketplace() {
  const [cats, setCats] = useState<ProductCategory[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [active, setActive] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductCategories(), getCompanies(), getOpportunities()]).then(([c, co, o]) => {
      setCats(c);
      setCompanies(co);
      setOpps(o);
      setLoading(false);
    });
  }, []);

  const shown = active === "all" ? companies : companies.filter((c) => c.categoryId === active);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-sm text-muted-foreground">
        <Link to="/business" className="text-primary hover:underline">
          Business & Opportunities
        </Link>{" "}
        / Manufacturers & Suppliers
      </p>
      <div className="mt-2 flex items-center gap-2">
        <Store className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold">Business Marketplace</h1>
      </div>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Browse Chinese manufacturers and their products across industries. WGIH connects you
        directly with verified suppliers — no online payments, just introductions and cooperation.
      </p>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${active === "all" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
        >
          All
        </button>
        {cats.map((c) => {
          const Icon = icons[c.icon] ?? Store;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${active === c.id ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
            >
              <Icon className="h-4 w-4" /> {c.name}
            </button>
          );
        })}
      </div>

      {/* Category blurb */}
      {active !== "all" && (
        <p className="mt-4 rounded-lg bg-surface px-4 py-3 text-sm text-muted-foreground">
          {cats.find((c) => c.id === active)?.blurb}
        </p>
      )}

      {/* Companies */}
      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      )}

      {/* Investment & JV opportunities */}
      <section className="mt-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold">Investment & Joint Venture Opportunities</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Partnerships and investment openings coming through WGIH's global network.
            </p>
          </div>
          <Link to="/opportunities" className="text-sm font-semibold text-primary hover:underline">
            View all by country →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {opps.slice(0, 6).map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-2xl bg-primary-dark p-8 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold">Looking for a specific product or manufacturer?</h2>
        <p className="mx-auto mt-2 max-w-xl opacity-90">
          Tell WGIH what you need and we'll connect you with the right Chinese supplier.
        </p>
        <Link
          to="/cooperate"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90"
        >
          Submit a Business Inquiry <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
