import { Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  Handshake,
  TrendingUp,
  Search,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  countries,
  type Representative,
  type Company,
  type Product,
  type Opportunity,
  type Partner,
} from "@/data/mock";
import { LogoTile } from "@/components/LogoTile";

const flag = (code: string) => countries.find((c) => c.code === code)?.flag ?? "🌍";
const countryName = (code: string) => countries.find((c) => c.code === code)?.name ?? code;

export function RepresentativeCard({ rep }: { rep: Representative }) {
  return (
    <Link
      to="/representatives/$id"
      params={{ id: rep.id }}
      className="card-soft block overflow-hidden"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img src={rep.photo} alt={rep.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{flag(rep.countryCode)}</span>
          <p className="font-bold leading-tight">{rep.name}</p>
        </div>
        <p className="mt-1 text-sm text-primary">{rep.position}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {rep.city}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Mail className="h-3 w-3" /> Email
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" /> Call
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link
      to="/marketplace/$id"
      params={{ id: company.id }}
      className="card-soft block overflow-hidden"
    >
      <div className="aspect-[5/2] w-full overflow-hidden bg-muted">
        <img
          src={company.cover}
          alt={company.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <LogoTile name={company.name} color={company.logoColor} size={44} />
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate font-bold">
              {company.name}
              {company.verified && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label="Verified" />
              )}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {company.nameZh} · {company.city}
            </p>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{company.description}</p>
        <p className="mt-3 text-xs font-semibold text-primary">
          {company.products.length} products →
        </p>
      </div>
    </Link>
  );
}

export function ProductCard({ product, companyName }: { product: Product; companyName?: string }) {
  return (
    <div className="card-soft overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold leading-snug">{product.name}</h3>
        {companyName && <p className="mt-0.5 text-xs text-muted-foreground">{companyName}</p>}
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  );
}

const oppIcon = {
  "Joint Venture": Handshake,
  Investment: TrendingUp,
  "Partner Wanted": Search,
  Distribution: ArrowRight,
} as const;

/** Dealer/distributor and investor/JV opportunities get a bolder treatment
 * than a plain product listing — gradient header band + optional "hot" ribbon. */
export function OpportunityCard({ opp }: { opp: Opportunity }) {
  const Icon = oppIcon[opp.type];
  const isInvestment = opp.type === "Investment" || opp.type === "Joint Venture";
  return (
    <Link
      to="/opportunities/$id"
      params={{ id: opp.id }}
      className="card-soft block overflow-hidden"
    >
      <div
        className={`flex items-center justify-between gap-2 px-4 py-2.5 ${
          isInvestment
            ? "bg-gradient-to-r from-primary-dark to-primary text-white"
            : "bg-gradient-to-r from-accent/80 to-accent text-accent-foreground"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
          <Icon className="h-3.5 w-3.5" /> {opp.type}
        </span>
        <span className="text-xl leading-none">{flag(opp.countryCode)}</span>
      </div>
      <div className="p-5">
        {opp.featured && (
          <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
            <Flame className="h-3 w-3" /> Hot Opportunity
          </span>
        )}
        <h3 className="font-bold leading-snug">{opp.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {countryName(opp.countryCode)} · {opp.sector}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{opp.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="card-soft flex h-full flex-col p-4">
      <div className="flex items-center gap-3">
        <LogoTile name={partner.name} color={partner.color} size={44} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{partner.name}</p>
          <p className="text-xs text-muted-foreground">
            {partner.country} · {partner.type}
          </p>
        </div>
      </div>
      {partner.blurb && (
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{partner.blurb}</p>
      )}
      {partner.cooperation && partner.cooperation.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {partner.cooperation.map((c) => (
            <span
              key={c}
              className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary"
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
