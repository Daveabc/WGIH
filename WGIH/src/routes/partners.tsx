import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Crown, Landmark, GraduationCap, Cpu, Factory, Globe2 } from "lucide-react";
import { getPartners, getPartnerLogos } from "@/services/api";
import { PartnerCard } from "@/components/BusinessCards";
import { LogoTile } from "@/components/LogoTile";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Partner, PartnerLogo } from "@/data/mock";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners — WGIH" },
      {
        name: "description",
        content:
          "WGIH's tiered network: strategic partners, government bodies, academic institutions, technology companies, manufacturing partners and international collaborators.",
      },
      { property: "og:title", content: "Our Partners — WGIH" },
      { property: "og:description", content: "WGIH's tiered partner network worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Partners,
});

type Tier = Partner["tier"];

const tierMeta: { tier: Tier; icon: typeof Crown; description: string }[] = [
  {
    tier: "Strategic",
    icon: Crown,
    description: "Long-term strategic alliances shaping WGIH's global direction.",
  },
  {
    tier: "Government",
    icon: Landmark,
    description: "Ministries, agencies and public bodies cooperating with WGIH.",
  },
  {
    tier: "Academic",
    icon: GraduationCap,
    description: "Universities and research institutes advancing geospatial science.",
  },
  {
    tier: "Technology",
    icon: Cpu,
    description: "Technology companies providing platforms, hardware and software.",
  },
  {
    tier: "Manufacturing",
    icon: Factory,
    description: "Chinese manufacturers supplying equipment and industrial capacity.",
  },
  {
    tier: "International",
    icon: Globe2,
    description: "Cross-border collaborators extending WGIH's international reach.",
  },
];

function Partners() {
  const [list, setList] = useState<Partner[]>([]);
  const [logos, setLogos] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPartners(), getPartnerLogos()]).then(([p, l]) => {
      setList(p);
      setLogos(l);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            A Network Built on Trust
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Our Partners</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            WGIH collaborates across six tiers — from strategic alliances and governments to
            universities, technology firms, manufacturers and international collaborators.
          </p>
        </div>
      </section>

      {/* Logo strip */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-8">
          {logos.map((l) => (
            <LogoTile key={l.id} name={l.name} color={l.color} size={40} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          tierMeta.map(({ tier, icon: Icon, description }) => {
            const group = list.filter((p) => p.tier === tier);
            if (group.length === 0) return null;
            return (
              <section key={tier} className="mb-14">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold">{tier} Partners</h2>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((p, i) => (
                    <ScrollReveal key={p.id} delayMs={(i % 3) * 60}>
                      <PartnerCard partner={p} />
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            );
          })
        )}

        <section className="rounded-2xl border border-border bg-surface p-6 text-center">
          <h2 className="text-xl font-bold">Become a WGIH Partner</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Join our network of collaborators and unlock new markets and cooperation opportunities.
          </p>
          <Link
            to="/cooperate"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            Register Your Interest
          </Link>
        </section>
      </div>
    </main>
  );
}
