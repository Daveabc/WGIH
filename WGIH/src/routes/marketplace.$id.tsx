import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  MapPin,
  Calendar,
  ArrowRight,
  Factory,
  Gauge,
  Award,
  Globe2,
  PlayCircle,
  Wrench,
} from "lucide-react";
import { getCompany } from "@/services/api";
import { LogoTile } from "@/components/LogoTile";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactUnlock } from "@/components/ContactUnlock";
import { countries, type Company, type Product } from "@/data/mock";

export const Route = createFileRoute("/marketplace/$id")({
  head: () => ({
    meta: [
      { title: "Manufacturer — WGIH Marketplace" },
      {
        name: "description",
        content:
          "Chinese manufacturer profile and product catalog on the WGIH Business Marketplace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CompanyDetail,
});

function CompanyDetail() {
  const { id } = Route.useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    getCompany(id).then((c) => {
      setCompany(c ?? null);
      setSelected(c?.products[0] ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  if (!company)
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p>
          Manufacturer not found.{" "}
          <Link to="/marketplace" className="text-primary underline">
            Back to marketplace
          </Link>
        </p>
      </main>
    );

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/marketplace" className="text-sm text-primary hover:underline">
        ← Back to marketplace
      </Link>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        <img src={company.cover} alt={company.name} className="aspect-[5/2] w-full object-cover" />
      </div>

      <header className="mt-5 flex flex-wrap items-center gap-4">
        <LogoTile name={company.name} color={company.logoColor} size={64} />
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {company.name}
            {company.verified && (
              <BadgeCheck className="h-5 w-5 text-primary" aria-label="Verified manufacturer" />
            )}
          </h1>
          <p className="text-sm text-muted-foreground">{company.nameZh}</p>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {company.city}, China
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Founded {company.founded}
            </span>
          </p>
        </div>
      </header>
      <p className="mt-4 max-w-2xl text-muted-foreground">{company.description}</p>

      {/* Factory information */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        {company.productionCapacity && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Gauge className="h-4 w-4 text-primary" /> Production Capacity
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{company.productionCapacity}</p>
          </div>
        )}
        {company.machinery && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Wrench className="h-4 w-4 text-primary" /> Machinery
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {company.machinery.map((m) => (
                <span key={m} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
        {company.certifications && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Award className="h-4 w-4 text-primary" /> Certifications
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {company.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
        {company.exportMarkets && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Globe2 className="h-4 w-4 text-primary" /> Export Markets
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {company.exportMarkets.map((code) => {
                const c = countries.find((x) => x.code === code);
                return (
                  <span key={code} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {c?.flag} {c?.name ?? code}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {company.factoryPhotos && (
        <section className="mt-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Factory className="h-4 w-4 text-primary" /> Factory Gallery
          </p>
          <ImageGallery images={company.factoryPhotos} alt={`${company.name} factory`} />
        </section>
      )}

      {company.videoUrl && (
        <section className="mt-6 rounded-xl border border-border bg-surface p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <PlayCircle className="h-4 w-4 text-primary" /> Factory &amp; Product Video
          </p>
          <a
            href={company.videoUrl}
            className="mt-1 inline-block text-sm text-primary hover:underline"
          >
            {company.videoUrl}
          </a>
        </section>
      )}

      {/* Product viewer */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Products ({company.products.length})</h2>
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {selected && (
              <>
                <ImageGallery images={selected.photos} alt={selected.name} />
                <h3 className="mt-4 text-lg font-bold">{selected.name}</h3>
                <p className="mt-1 text-muted-foreground">{selected.description}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selected.specs.map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-surface p-3">
                      <dt className="text-xs text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-semibold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  to="/cooperate"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
                >
                  Contact WGIH about this product <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>

          <aside className="space-y-2">
            {company.products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition ${selected?.id === p.id ? "border-primary bg-primary-light" : "border-border hover:bg-muted"}`}
              >
                <img
                  src={p.photos[0]}
                  alt=""
                  className="h-12 w-16 shrink-0 rounded-md object-cover"
                />
                <span className="text-sm font-medium leading-tight">{p.name}</span>
              </button>
            ))}
          </aside>
        </div>
      </section>

      {/* Partnership opportunities + contact unlock */}
      <section className="mt-12 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-bold">Partnership Opportunities</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {company.name} works with WGIH to reach distributors, dealers and investors outside
            China. Submit a business inquiry to discuss distribution rights, bulk pricing or joint
            ventures for this manufacturer's product line.
          </p>
          <Link
            to="/business"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            Explore Business &amp; Opportunities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {company.contact && (
          <ContactUnlock
            contact={company.contact}
            label="Factory"
            note="Unlock this factory's direct export-sales contact."
          />
        )}
      </section>
    </main>
  );
}
