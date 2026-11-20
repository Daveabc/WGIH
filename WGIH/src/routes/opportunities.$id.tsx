import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Handshake,
  TrendingUp,
  Search,
  ArrowRight,
  Target,
  Users,
  Coins,
  ClipboardList,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { getOpportunity, getOpportunities } from "@/services/api";
import { ContactUnlock } from "@/components/ContactUnlock";
import { OpportunityCard } from "@/components/BusinessCards";
import { countries, type Opportunity } from "@/data/mock";

export const Route = createFileRoute("/opportunities/$id")({
  head: () => ({
    meta: [
      { title: "Opportunity — WGIH Business & Opportunities" },
      {
        name: "description",
        content:
          "Full details of this dealer, distribution, investment or joint-venture opportunity: country, sector, requirements, desired partner and cooperation terms.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OpportunityDetail,
});

const oppIcon = {
  "Joint Venture": Handshake,
  Investment: TrendingUp,
  "Partner Wanted": Search,
  Distribution: ArrowRight,
} as const;

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Icon className="h-5 w-5 text-primary" /> {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function OpportunityDetail() {
  const { id } = Route.useParams();
  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [related, setRelated] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpportunity(id).then(async (o) => {
      setOpp(o ?? null);
      if (o) {
        const all = await getOpportunities();
        setRelated(
          all
            .filter(
              (x) => x.id !== o.id && (x.countryCode === o.countryCode || x.sector === o.sector),
            )
            .slice(0, 3),
        );
      }
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  if (!opp)
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p>
          Opportunity not found.{" "}
          <Link to="/business" className="text-primary underline">
            Back to Business &amp; Opportunities
          </Link>
        </p>
      </main>
    );

  const country = countries.find((c) => c.code === opp.countryCode);
  const Icon = oppIcon[opp.type];
  const isInvestment = opp.type === "Investment" || opp.type === "Joint Venture";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link
        to="/business"
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Business &amp; Opportunities
      </Link>

      {/* Header */}
      <header className="mt-4 overflow-hidden rounded-2xl border border-border">
        <div
          className={`px-6 py-5 ${
            isInvestment
              ? "bg-gradient-to-r from-primary-dark to-primary text-white"
              : "bg-gradient-to-r from-accent/80 to-accent text-accent-foreground"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
              <Icon className="h-4 w-4" /> {opp.type}
            </span>
            <span className="text-2xl leading-none">{country?.flag}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold md:text-3xl">{opp.title}</h1>
          <p className="mt-1 text-sm opacity-90">
            {country?.name} · {opp.sector}
          </p>
          {opp.featured && (
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold">
              <Flame className="h-3 w-3" /> Hot Opportunity
            </span>
          )}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <Section icon={Target} title="Overview">
            <p className="text-muted-foreground">{opp.description ?? opp.summary}</p>
          </Section>

          {opp.projectRequirements && (
            <Section icon={ClipboardList} title="Project Requirements">
              <BulletList items={opp.projectRequirements} />
            </Section>
          )}

          {opp.desiredPartnerProfile && (
            <Section icon={Users} title="Desired Partner">
              <BulletList items={opp.desiredPartnerProfile} />
            </Section>
          )}

          {isInvestment && opp.investmentExpectations && (
            <Section icon={Coins} title="Investment Expectations">
              <dl className="grid gap-3 sm:grid-cols-2">
                {opp.investmentExpectations.range && (
                  <div className="rounded-lg border border-border bg-surface p-3">
                    <dt className="text-xs text-muted-foreground">Indicative size</dt>
                    <dd className="text-sm font-semibold">{opp.investmentExpectations.range}</dd>
                  </div>
                )}
                {opp.investmentExpectations.structure && (
                  <div className="rounded-lg border border-border bg-surface p-3">
                    <dt className="text-xs text-muted-foreground">Structure</dt>
                    <dd className="text-sm font-semibold">
                      {opp.investmentExpectations.structure}
                    </dd>
                  </div>
                )}
                {opp.investmentExpectations.returnExpectations && (
                  <div className="rounded-lg border border-border bg-surface p-3">
                    <dt className="text-xs text-muted-foreground">Return expectations</dt>
                    <dd className="text-sm font-semibold">
                      {opp.investmentExpectations.returnExpectations}
                    </dd>
                  </div>
                )}
                {opp.investmentExpectations.timeline && (
                  <div className="rounded-lg border border-border bg-surface p-3">
                    <dt className="text-xs text-muted-foreground">Timeline</dt>
                    <dd className="text-sm font-semibold">{opp.investmentExpectations.timeline}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                All figures are illustrative and indicative only — confirm current terms with WGIH.
              </p>
            </Section>
          )}

          {opp.cooperationOpportunities && (
            <Section icon={Handshake} title="Cooperation Opportunities">
              <div className="flex flex-wrap gap-2">
                {opp.cooperationOpportunities.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar: contact unlock + CTA */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {opp.contact && (
            <ContactUnlock
              contact={opp.contact}
              label="Opportunity Lead"
              note="Unlock the WGIH lead contact coordinating this opportunity."
            />
          )}
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <h3 className="font-bold">Interested in this opportunity?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Submit an inquiry and WGIH will connect you with the right people.
            </p>
            <Link
              to="/cooperate"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
            >
              Enquire via WGIH <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">Related Opportunities</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => (
              <OpportunityCard key={o.id} opp={o} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
