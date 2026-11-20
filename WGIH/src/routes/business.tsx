import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Store,
  Handshake,
  TrendingUp,
  Users,
  ArrowRight,
  type LucideIcon,
  Car,
  Tractor,
  Satellite,
  Sun,
  Plug,
  Wrench,
  Cpu,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCompanies, getProductCategories, getOpportunities } from "@/services/api";
import { CompanyCard, OpportunityCard } from "@/components/BusinessCards";
import { PromoSlider } from "@/components/PromoSlider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InquiryForm, RegisterForm } from "@/routes/cooperate";
import type { Company, ProductCategory, Opportunity } from "@/data/mock";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Business & Opportunities — WGIH" },
      {
        name: "description",
        content:
          "Verified Chinese manufacturers, dealer and distributor opportunities, investment and joint ventures, and direct inquiry — all in one place through WGIH.",
      },
      { property: "og:title", content: "Business & Opportunities — WGIH" },
      {
        property: "og:description",
        content: "Manufacturers, dealers, investors and joint ventures through WGIH.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Business,
});

const catIcons: Record<string, LucideIcon> = { Car, Tractor, Satellite, Sun, Plug, Wrench, Cpu };

function Business() {
  const [cats, setCats] = useState<ProductCategory[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [activeCat, setActiveCat] = useState("all");
  const [oppFilter, setOppFilter] = useState<"all" | "Distribution" | "Partner Wanted">("all");
  const [invFilter, setInvFilter] = useState<"all" | "Investment" | "Joint Venture">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductCategories(), getCompanies(), getOpportunities()]).then(([c, co, o]) => {
      setCats(c);
      setCompanies(co);
      setOpps(o);
      setLoading(false);
    });
  }, []);

  const shownCompanies =
    activeCat === "all" ? companies : companies.filter((c) => c.categoryId === activeCat);
  const dealerOpps = opps.filter((o) =>
    oppFilter === "all"
      ? o.type === "Distribution" || o.type === "Partner Wanted"
      : o.type === oppFilter,
  );
  const investOpps = opps.filter((o) =>
    invFilter === "all"
      ? o.type === "Investment" || o.type === "Joint Venture"
      : o.type === invFilter,
  );

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
            <Handshake className="h-4 w-4" /> Connect with China
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Business &amp; Opportunities</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Verified manufacturers, dealer and distributor openings, investment and joint-venture
            opportunities, and a direct line to WGIH — all in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <Tabs defaultValue="manufacturers" className="w-full">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 overflow-x-auto bg-muted p-1.5">
              <TabsTrigger value="manufacturers" className="gap-1.5">
                <Store className="h-4 w-4" /> Manufacturers &amp; Suppliers
              </TabsTrigger>
              <TabsTrigger value="dealers" className="gap-1.5">
                <Handshake className="h-4 w-4" /> Dealer &amp; Distributor
              </TabsTrigger>
              <TabsTrigger value="invest" className="gap-1.5">
                <TrendingUp className="h-4 w-4" /> Investment &amp; Joint Ventures
              </TabsTrigger>
              <TabsTrigger value="register" className="gap-1.5">
                <Users className="h-4 w-4" /> Register / Inquire
              </TabsTrigger>
            </TabsList>

            {/* Tab 1 — Manufacturers & Suppliers */}
            <TabsContent value="manufacturers" className="mt-6">
              <p className="text-muted-foreground">
                Browse verified Chinese manufacturers and their products. WGIH connects you directly
                with suppliers — no online payments, just introductions and cooperation.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCat("all")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${activeCat === "all" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                >
                  All
                </button>
                {cats.map((c) => {
                  const Icon = catIcons[c.icon] ?? Store;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveCat(c.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${activeCat === c.id ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                    >
                      <Icon className="h-4 w-4" /> {c.name}
                    </button>
                  );
                })}
              </div>
              {loading ? (
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {shownCompanies.map((c, i) => (
                    <ScrollReveal key={c.id} delayMs={(i % 3) * 60}>
                      <CompanyCard company={c} />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tab 2 — Dealer & Distributor Opportunities */}
            <TabsContent value="dealers" className="mt-6">
              <p className="text-muted-foreground">
                Chinese manufacturers appointing authorized dealers and distributors in new markets
                — territory rights, dealer pricing and training included.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["all", "Distribution", "Partner Wanted"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOppFilter(t)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold ${oppFilter === t ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                  >
                    {t === "all" ? "All dealer opportunities" : t}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {dealerOpps.map((o, i) => (
                  <ScrollReveal key={o.id} delayMs={(i % 3) * 60}>
                    <OpportunityCard opp={o} />
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            {/* Tab 3 — Investment & Joint Ventures */}
            <TabsContent value="invest" className="mt-6">
              <p className="text-muted-foreground">
                Investors seeking projects, and projects seeking investors — joint ventures and
                technology-transfer opportunities facilitated through WGIH.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["all", "Investment", "Joint Venture"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setInvFilter(t)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold ${invFilter === t ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
                  >
                    {t === "all" ? "All investment & JV" : t}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {investOpps.map((o, i) => (
                  <ScrollReveal key={o.id} delayMs={(i % 3) * 60}>
                    <OpportunityCard opp={o} />
                  </ScrollReveal>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Browsing by country instead?{" "}
                <Link to="/opportunities" className="font-semibold text-primary hover:underline">
                  View all opportunities by country →
                </Link>
              </p>
            </TabsContent>

            {/* Tab 4 — Register / Inquire */}
            <TabsContent value="register" className="mt-6">
              <RegisterOrInquire />
            </TabsContent>
          </Tabs>

          {/* Sidebar */}
          <aside className="space-y-6">
            <PromoSlider />
            <div className="card-soft p-5">
              <h3 className="font-bold">Why go through WGIH?</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Verified manufacturers and factory information</li>
                <li>• A local representative in your region</li>
                <li>• No online payment required to make an introduction</li>
              </ul>
              <Link
                to="/representatives"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Find your country office <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function RegisterOrInquire() {
  const [tab, setTab] = useState<"inquiry" | "register">("inquiry");
  return (
    <div className="max-w-2xl">
      <p className="text-muted-foreground">
        Looking for a product or manufacturer? Submit a business inquiry. Want to join our network
        as a dealer, investor or partner? Register your interest below.
      </p>
      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setTab("inquiry")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "inquiry" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
        >
          Business Inquiry
        </button>
        <button
          onClick={() => setTab("register")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "register" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
        >
          Register Interest
        </button>
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        {tab === "inquiry" ? <InquiryForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
